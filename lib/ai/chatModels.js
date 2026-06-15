import { CHAT_MODEL } from './openai.js'
import { MODEL_PRICING } from '../core/pricing.js'

/** Chat + reasoning models users may pick in the UI (not embeddings). */
export const CHAT_MODEL_OPTIONS = [
  { id: 'gpt-4o-mini', label: 'GPT-4o Mini', hint: 'Default · lowest cost' },
  { id: 'gpt-4.1-mini', label: 'GPT-4.1 Mini', hint: 'Better instruction-following' },
  { id: 'gpt-4.1-nano', label: 'GPT-4.1 Nano', hint: 'Fast · high volume' },
  { id: 'gpt-5-mini', label: 'GPT-5 Mini', hint: 'Newer mini tier' },
  { id: 'gpt-4.1', label: 'GPT-4.1', hint: 'Higher quality' },
  { id: 'gpt-4o', label: 'GPT-4o', hint: 'Premium' },
  { id: 'gpt-5', label: 'GPT-5', hint: 'Frontier' },
  { id: 'o4-mini', label: 'o4-mini', hint: 'Reasoning' },
  { id: 'o3-mini', label: 'o3-mini', hint: 'Budget reasoning' },
].filter((opt) => MODEL_PRICING[opt.id])

const ALLOWED_CHAT_MODELS = new Set(CHAT_MODEL_OPTIONS.map((o) => o.id))

export function isAllowedChatModel(model) {
  return typeof model === 'string' && ALLOWED_CHAT_MODELS.has(model)
}

export function resolveChatModel(requested) {
  if (isAllowedChatModel(requested)) return requested
  return CHAT_MODEL
}

export { CHAT_MODEL as DEFAULT_CHAT_MODEL }
