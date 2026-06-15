/** OpenAI API pricing per 1M tokens (USD). Override via env when needed. */

export const DEFAULT_USD_TO_INR = Number(process.env.USD_TO_INR) || 90

export const MODEL_PRICING = {
  'gpt-4.1-nano': { inputPerMillion: 0.1, outputPerMillion: 0.4 },
  'gpt-4o-mini': { inputPerMillion: 0.15, outputPerMillion: 0.6 },
  'gpt-4o': { inputPerMillion: 2.5, outputPerMillion: 10 },
  'gpt-4.1-mini': { inputPerMillion: 0.4, outputPerMillion: 1.6 },
  'gpt-4.1': { inputPerMillion: 2, outputPerMillion: 8 },
  'gpt-5-mini': { inputPerMillion: 0.25, outputPerMillion: 2 },
  'gpt-5': { inputPerMillion: 1.25, outputPerMillion: 10 },
  'o4-mini': { inputPerMillion: 1.1, outputPerMillion: 4.4 },
  'o3-mini': { inputPerMillion: 1.1, outputPerMillion: 4.4 },
  'text-embedding-3-small': { inputPerMillion: 0.02, outputPerMillion: 0 },
  'text-embedding-3-large': { inputPerMillion: 0.13, outputPerMillion: 0 },
}

export function getModelPricing(model) {
  if (!model) return MODEL_PRICING['gpt-4o-mini']
  if (MODEL_PRICING[model]) return MODEL_PRICING[model]

  const key = Object.keys(MODEL_PRICING).find((name) => model.startsWith(name))
  return key ? MODEL_PRICING[key] : MODEL_PRICING['gpt-4o-mini']
}

export function calculateCost({
  inputTokens = 0,
  outputTokens = 0,
  model,
  inputPricePerMillion,
  outputPricePerMillion,
  usdToInr = DEFAULT_USD_TO_INR,
}) {
  const pricing = getModelPricing(model)
  const inputRate = inputPricePerMillion ?? pricing.inputPerMillion
  const outputRate = outputPricePerMillion ?? pricing.outputPerMillion

  const usd =
    (inputTokens / 1_000_000) * inputRate + (outputTokens / 1_000_000) * outputRate

  return {
    usd,
    inr: usd * usdToInr,
    inputRate,
    outputRate,
  }
}

export function formatUsd(amount) {
  if (amount < 0.01) return `$${amount.toFixed(4)}`
  return `$${amount.toFixed(2)}`
}

export function formatInr(amount) {
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
