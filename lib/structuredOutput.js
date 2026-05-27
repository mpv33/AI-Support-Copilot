/** Support ticket summary schema for structured LLM output demos. */

export const supportTicketJsonSchema = {
  name: 'support_ticket_summary',
  schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      intent: {
        type: 'string',
        enum: ['billing', 'access', 'agent', 'indexing', 'privacy', 'subscription', 'general', 'unknown'],
      },
      urgency: { type: 'string', enum: ['low', 'medium', 'high'] },
      summary: { type: 'string' },
      suggestedActions: { type: 'array', items: { type: 'string' } },
      citedSourceIds: { type: 'array', items: { type: 'string' } },
    },
    required: ['intent', 'urgency', 'summary', 'suggestedActions', 'citedSourceIds'],
  },
  strict: true,
}

export function parseSupportTicket(raw) {
  const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw

  const required = ['intent', 'urgency', 'summary', 'suggestedActions', 'citedSourceIds']
  for (const key of required) {
    if (!(key in parsed)) throw new Error(`Missing field: ${key}`)
  }

  return parsed
}
