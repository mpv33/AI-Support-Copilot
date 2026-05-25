/**
 * Multi-step agent workflow (plan → retrieve → act → answer).
 * Mirrors ReAct-style loops in a support copilot.
 */

export function createAgentRun({ question, traceId }) {
  const steps = []

  return {
    traceId,
    question,
    steps,
    record(name, detail = {}) {
      steps.push({
        name,
        detail,
        at: new Date().toISOString(),
      })
    },
    toJSON() {
      return { traceId, question, steps }
    },
  }
}

export const AGENT_STEPS = {
  SECURITY: 'security_check',
  RETRIEVE: 'hybrid_retrieval',
  GUARDRAIL: 'retrieval_guardrail',
  PLAN: 'tool_planning_pass',
  TOOL: 'tool_execution',
  ANSWER: 'stream_final_answer',
}
