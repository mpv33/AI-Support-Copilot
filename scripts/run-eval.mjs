/**
 * Retrieval eval runner — use in CI or before demos.
 * Usage: npm run eval
 */

const base = process.env.EVAL_BASE_URL || 'http://localhost:3010'

async function main() {
  const res = await fetch(`${base}/api/eval`, { method: 'POST' })
  if (!res.ok) {
    console.error('Eval failed:', res.status, await res.text())
    process.exit(1)
  }

  const report = await res.json()
  console.log('\n=== Retrieval Eval Report ===')
  console.log(`Pass rate: ${report.passRate}% (${report.passed}/${report.total})`)
  console.table(report.results)

  if (report.failed > 0) process.exit(1)
  console.log('\nAll golden questions passed.')
}

main().catch((err) => {
  console.error(err.message)
  console.error('Start the app first: npm run dev')
  process.exit(1)
})
