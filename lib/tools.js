const tools = {
  async get_subscription_status() {
    return {
      plan: 'InterviewPro.info Pro',
      status: 'active',
      renewsOn: '2026-04-01',
      cancelAtPeriodEnd: false,
      billingNote: 'Manage at interviewpro.info → Settings → Billing',
    }
  },
}

export const openAiTools = [
  {
    type: 'function',
    function: {
      name: 'get_subscription_status',
      description:
        'Look up InterviewPro.info Free or Pro plan status, renewal date, and cancel-at-period-end when the user asks about their subscription.',
      parameters: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
    },
  },
]

export async function runToolCall(toolCall) {
  const name = toolCall.function?.name
  const tool = tools[name]

  if (!tool) {
    throw new Error(`Tool not allowed: ${name}`)
  }

  const args = JSON.parse(toolCall.function?.arguments || '{}')
  return tool(args)
}
