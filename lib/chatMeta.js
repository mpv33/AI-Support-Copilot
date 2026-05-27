import { formatTokenCount, estimateReplyTokens } from './llm'

const STEP_LABELS = {
  security_check: 'Safety check',
  hybrid_retrieval: 'Search Help Center',
  retrieval_guardrail: 'Verify sources',
  tool_planning_pass: 'Plan response',
  tool_execution: 'Run tool',
  stream_final_answer: 'Generate reply',
}

function formatStepDetail(step) {
  const { name, detail } = step

  if (name === 'hybrid_retrieval') {
    const count = detail?.chunkIds?.length
    const score = detail?.topScore != null ? Number(detail.topScore).toFixed(2) : null
    if (count != null && score) return `${count} articles · top score ${score}`
    if (count != null) return `${count} articles`
    return detail?.mode ? `${detail.mode} search` : null
  }

  if (name === 'retrieval_guardrail') {
    return detail?.pass ? 'Sources OK' : 'Low confidence'
  }

  if (name === 'security_check') {
    return detail?.blocked ? 'Blocked' : 'Passed'
  }

  if (name === 'tool_planning_pass') {
    const tools = detail?.toolCalls
    if (tools?.length) return tools.join(', ')
    return 'Answer from articles'
  }

  if (name === 'tool_execution') {
    return detail?.name || null
  }

  if (name === 'stream_final_answer') {
    return detail?.streaming ? 'Streaming' : null
  }

  return null
}

export function formatAgentSteps(steps) {
  if (!Array.isArray(steps) || !steps.length) return []

  return steps.map((step, index) => ({
    id: index + 1,
    label: STEP_LABELS[step.name] || step.name.replace(/_/g, ' '),
    detail: formatStepDetail(step),
  }))
}

/** Footer copy + stats for each assistant message. */
export function formatMessageMeta({ contextUsage, replyContent, agentSteps, retrievalMode }) {
  const contextTokens = contextUsage?.estimatedTokens
  const replyTokens = replyContent ? estimateReplyTokens(replyContent) : 0
  const chunkCount = contextUsage?.chunkCount
  const historyTurns = contextUsage?.historyTurns ?? 0

  if (!contextTokens && !replyTokens && !agentSteps?.length) return null

  const hasHistory = historyTurns > 0
  const articles =
    chunkCount != null
      ? `${chunkCount} Help Center article${chunkCount === 1 ? '' : 's'}`
      : null

  let headline = 'Based on Help Center articles'
  if (articles && hasHistory) headline = `Based on ${articles} · follow-up`
  else if (articles) headline = `Based on ${articles}`
  else if (hasHistory) headline = 'Follow-up using your chat history'

  const tokens = {
    context: contextTokens,
    reply: replyTokens,
    total: (contextTokens || 0) + replyTokens,
  }

  const steps = formatAgentSteps(agentSteps)

  const tooltip =
    'Token counts are approximate (text length ÷ 4). Steps show how the server built this reply.'

  return {
    headline,
    tokens,
    steps,
    retrievalMode,
    tooltip,
  }
}
