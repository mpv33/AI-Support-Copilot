/** Golden eval set — retrieval quality regression checks. */

export const goldenQuestions = [
  {
    id: 'resumepro',
    question: 'How does ResumePro score my resume against a job description?',
    expectSourceIdPrefix: 'resumepro',
    minScore: 0.2,
  },
  {
    id: 'evalpro',
    question: 'How does EvalPro evaluate my machine coding submission?',
    expectSourceIdPrefix: 'evalpro',
    minScore: 0.2,
  },
  {
    id: 'login',
    question: 'Do I need an account to save progress on InterviewPro.info?',
    expectSourceIdPrefix: 'login-account',
    minScore: 0.2,
  },
  {
    id: 'faq-who',
    question: 'Who is InterviewPro for?',
    expectSourceIdPrefix: 'faq-interviewpro',
    minScore: 0.2,
  },
  {
    id: 'dsa-patterns',
    question: 'How many DSA problems are on InterviewPro.info and how are they organized?',
    expectSourceIdPrefix: 'dsa-by-patterns',
    minScore: 0.2,
  },
  {
    id: 'machine-coding',
    question: 'What is machine coding practice on InterviewPro.info?',
    expectSourceIdPrefix: 'machine-coding',
    minScore: 0.2,
  },
  {
    id: 'progress',
    question: 'My progress dashboard is not updating after I solve problems.',
    expectSourceIdPrefix: 'progress-dashboard',
    minScore: 0.2,
  },
  {
    id: 'gen-ai',
    question: 'What is included in the Gen AI track on InterviewPro.info?',
    expectSourceIdPrefix: 'gen-ai-track',
    minScore: 0.2,
  },
  {
    id: 'subscription-status',
    question: 'Is my InterviewPro.info Pro subscription still active?',
    expectSourceIdPrefix: 'subscription-status',
    minScore: 0.15,
  },
  {
    id: 'off-topic',
    question: 'What is the weather in Tokyo?',
    maxScore: 0.35,
    shouldRefuse: true,
  },
]
