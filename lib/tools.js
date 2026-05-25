const tools = {
  async get_order_status(args) {
    if (!args.orderId) throw new Error('orderId is required')

    return {
      orderId: args.orderId,
      status: 'shipped',
      eta: 'Tomorrow',
      carrier: 'DemoExpress',
    }
  },
}

export const openAiTools = [
  {
    type: 'function',
    function: {
      name: 'get_order_status',
      description: 'Get shipping status for a support order.',
      parameters: {
        type: 'object',
        properties: {
          orderId: {
            type: 'string',
            description: 'The order ID from the user request.',
          },
        },
        required: ['orderId'],
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
