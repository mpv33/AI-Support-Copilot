import fs from 'fs/promises'
import path from 'path'
import {
  DEMO_GUEST_TOKEN_BUDGET,
  getDemoTokenBudgetRemaining,
  isDemoTokenBudgetExceeded,
  normalizeDemoTokenUsage,
} from '../demo/demoTokenLimit.js'

const USAGE_DIR = path.join(process.cwd(), 'data', 'guest-usage')
const LEDGER_PATH = path.join(USAGE_DIR, 'ledger.json')

const memoryLedger = { guests: {}, ips: {} }
let writeQueue = Promise.resolve()

async function readLedger() {
  try {
    const raw = await fs.readFile(LEDGER_PATH, 'utf8')
    const parsed = JSON.parse(raw)
    return {
      guests: parsed.guests && typeof parsed.guests === 'object' ? parsed.guests : {},
      ips: parsed.ips && typeof parsed.ips === 'object' ? parsed.ips : {},
    }
  } catch (error) {
    if (error.code === 'ENOENT') return { guests: { ...memoryLedger.guests }, ips: { ...memoryLedger.ips } }
    throw error
  }
}

async function writeLedger(ledger) {
  memoryLedger.guests = { ...ledger.guests }
  memoryLedger.ips = { ...ledger.ips }

  writeQueue = writeQueue.then(async () => {
    await fs.mkdir(USAGE_DIR, { recursive: true })
    await fs.writeFile(LEDGER_PATH, JSON.stringify(ledger, null, 2), 'utf8')
  })

  return writeQueue
}

function readBucket(ledger, bucket, key) {
  if (!key) return 0
  return normalizeDemoTokenUsage(ledger[bucket]?.[key]?.totalTokens)
}

export async function resolveGuestPriorTokens({ guestId, ipHash }) {
  const ledger = await readLedger()
  return Math.max(readBucket(ledger, 'guests', guestId), readBucket(ledger, 'ips', ipHash))
}

export async function recordGuestTokenUsage({ guestId, ipHash, sessionTokens }) {
  const total = normalizeDemoTokenUsage(sessionTokens)
  if (total <= 0) return

  const ledger = await readLedger()
  const now = new Date().toISOString()

  if (guestId) {
    const current = readBucket(ledger, 'guests', guestId)
    ledger.guests[guestId] = {
      totalTokens: Math.max(current, total),
      updatedAt: now,
    }
  }

  if (ipHash) {
    const current = readBucket(ledger, 'ips', ipHash)
    ledger.ips[ipHash] = {
      totalTokens: Math.max(current, total),
      updatedAt: now,
    }
  }

  await writeLedger(ledger)
}

export async function getGuestBudgetSnapshot({ guestId, ipHash }) {
  const used = await resolveGuestPriorTokens({ guestId, ipHash })
  return {
    used,
    budget: DEMO_GUEST_TOKEN_BUDGET,
    remaining: getDemoTokenBudgetRemaining(used),
    exceeded: isDemoTokenBudgetExceeded(used),
    source: 'server',
  }
}
