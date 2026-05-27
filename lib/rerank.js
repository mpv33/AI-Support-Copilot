/** Lightweight reranker: exact-token boost on top of hybrid scores. */

export function rerankChunks(chunks, { question }) {
  const upper = question.toUpperCase()

  return chunks
    .map((chunk) => {
      let boost = 0
      const haystack = `${chunk.title} ${chunk.text}`.toUpperCase()

      if (/INTERVIEWPRO PRO|PRO SUBSCRIPTION|PRO PLAN/i.test(upper) && /pro/i.test(haystack)) boost += 0.06
      if (/RESUMEPRO|RESUME|JOB DESCRIPTION/i.test(upper) && /resume/i.test(haystack)) boost += 0.06
      if (/EVALPRO|MACHINE CODING|CODE EVAL/i.test(upper) && /evalpro|machine coding/i.test(haystack))
        boost += 0.06
      if (/A2Z|FRONTEND TRACK/i.test(upper) && /a2z frontend/i.test(haystack)) boost += 0.06
      if (/DSA|PATTERN|LEETCODE/i.test(upper) && /dsa by patterns|leetcode/i.test(haystack)) boost += 0.06
      if (/MACHINE CODING|IN-BROWSER/i.test(upper) && /machine coding/i.test(haystack)) boost += 0.06
      if (/FAQ|WHO IS INTERVIEWPRO|DIFFERENT FROM LEETCODE/i.test(upper) && /faq|who is interviewpro/i.test(haystack))
        boost += 0.05
      if (/JOB BOARD|JOBS/i.test(upper) && /job board/i.test(haystack)) boost += 0.05
      if (/PROGRESS|DASHBOARD|SOLVED/i.test(upper) && /progress|dashboard/i.test(haystack)) boost += 0.05
      if (/SUBSCRIPTION|RENEW|PRO PLAN/i.test(upper) && /subscription|pro plan/i.test(haystack)) boost += 0.05

      return {
        ...chunk,
        rerankBoost: boost,
        score: Number((chunk.score + boost).toFixed(4)),
      }
    })
    .sort((a, b) => b.score - a.score)
}
