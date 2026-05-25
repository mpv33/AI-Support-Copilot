import OpenAI from 'openai'

export const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini'
export const EMBEDDING_MODEL = process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small'

export function assertOpenAiKey() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY. Copy .env.example to .env.local and add your key.')
  }
}

let client

export function getOpenAI() {
  assertOpenAiKey()

  if (!client) {
    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }

  return client
}
