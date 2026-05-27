import { goldenQuestions } from '../data/goldenQuestions'
import { retrieveSupportChunks } from './hybridRetrieval'
import { shouldAnswerFromRetrieval } from './prompt'

export async function runRetrievalEval({ tenantId = 'interviewpro' } = {}) {
  const results = []

  for (const item of goldenQuestions) {
    const chunks = await retrieveSupportChunks({
      question: item.question,
      tenantId,
      k: 3,
      mode: 'hybrid',
    })

    const top = chunks[0]
    const topScore = top?.score ?? 0
    const sourceMatch = item.expectSourceIdPrefix
      ? top?.sourceId?.startsWith(item.expectSourceIdPrefix)
      : true
    const scoreOk = item.minScore != null ? topScore >= item.minScore : true
    const maxOk = item.maxScore != null ? topScore <= item.maxScore : true
    const guardrailOk = item.shouldRefuse
      ? !shouldAnswerFromRetrieval(chunks)
      : shouldAnswerFromRetrieval(chunks)

    const pass = sourceMatch && scoreOk && maxOk && guardrailOk

    results.push({
      id: item.id,
      question: item.question,
      pass,
      topChunkId: top?.id ?? null,
      topScore: Number(topScore.toFixed(3)),
      sourceMatch,
      scoreOk,
      maxOk,
      guardrailOk,
    })
  }

  const passed = results.filter((r) => r.pass).length

  return {
    total: results.length,
    passed,
    failed: results.length - passed,
    passRate: Number(((passed / results.length) * 100).toFixed(1)),
    results,
  }
}
