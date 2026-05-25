/** Golden eval set — retrieval quality regression checks. */

export const goldenQuestions = [
  {
    id: 'refund-window',
    question: 'Can annual users get refunds after 30 days?',
    expectSourceIdPrefix: 'billing-refunds',
    minScore: 0.2,
  },
  {
    id: 'auth-403',
    question: 'Why do I see AUTH_403 on dashboard?',
    expectSourceIdPrefix: 'dashboard-auth',
    minScore: 0.2,
  },
  {
    id: 'order-status',
    question: 'Where is order 123?',
    minScore: 0.1,
  },
  {
    id: 'off-topic',
    question: 'What is the weather in Tokyo?',
    maxScore: 0.35,
    shouldRefuse: true,
  },
]
