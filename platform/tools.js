import { platformConfig } from './config.js'

/**
 * Optional agent tools — extend for billing lookups, ticket creation, etc.
 * Set features.agentTools: false in config to disable entirely.
 */

const toolHandlers = {
  async get_subscription_status() {
    const demo = platformConfig.demo.workspace
    return {
      plan: `${demo.name} Pro`,
      status: 'active',
      renewsOn: '2026-04-01',
      cancelAtPeriodEnd: false,
      billingNote: `Manage at ${demo.website} → Settings → Billing`,
    }
  },
}

const toolDefinitions = [
  {
    type: 'function',
    function: {
      name: 'get_subscription_status',
      description:
        'Look up subscription plan status, renewal date, and cancel-at-period-end when the user asks about their subscription.',
      parameters: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
    },
  },
]

export function getAgentTools() {
  if (!platformConfig.features.agentTools) return []
  return toolDefinitions
}

export function getToolInstructions() {
  if (!platformConfig.features.agentTools) return []
  return ['When the user asks about Pro subscription status, renewal, or cancellation, call get_subscription_status.']
}

export async function runToolCall(toolCall) {
  const name = toolCall.function?.name
  const tool = toolHandlers[name]

  if (!tool) {
    throw new Error(`Tool not allowed: ${name}`)
  }

  const args = JSON.parse(toolCall.function?.arguments || '{}')
  return tool(args)
}
