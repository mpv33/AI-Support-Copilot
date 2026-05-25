/** Prompt-injection and abuse guardrails before LLM calls. */

const INJECTION_PATTERNS = [
  /ignore (all )?(previous|prior|above) instructions/i,
  /disregard (the )?(system|developer) (prompt|message)/i,
  /you are now (a |an )?/i,
  /reveal (the )?(system prompt|api key|secret)/i,
  /<\s*script/i,
]

export function detectPromptInjection(text) {
  if (!text || typeof text !== 'string') return { blocked: false, reason: null }

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(text)) {
      return {
        blocked: true,
        reason: 'Potential prompt injection detected. Request blocked for safety.',
        pattern: pattern.source,
      }
    }
  }

  return { blocked: false, reason: null }
}

export function sanitizeUntrustedContext(text) {
  return text
    .replace(/^(system|assistant|user)\s*:/gim, '[redacted]:')
    .slice(0, 4000)
}
