import { docsMeta, genAiTopics } from './skillsMatrix'

export const interviewProBrand = {
  name: 'InterviewPro.info',
  tagline: 'Practice with intent. Land with confidence.',
  description:
    'Frontend, DSA, machine coding, Gen AI, and resume tools—plus a profile progress dashboard to track what you have solved.',
}

export const appNav = [
  { href: '/', label: 'Home' },
  { href: '/chat', label: 'Chat' },
  { href: '/support', label: 'Help Center' },
  { href: '/docs', label: 'Docs' },
]

export const landingOverview = {
  hero: {
    eyebrow: 'RAG-powered AI support',
    title: 'AI Support Copilot',
    tagline:
      'A RAG-powered help desk that retrieves real Help Center articles before every reply — grounded answers with source citations, live streaming, and clear refusals when confidence is low.',
    subline:
      'Frontend, DSA, machine coding, Gen AI, ResumePro, EvalPro, billing, and account support.',
    ctaPrimary: 'Start chatting',
    ctaSecondary: 'Browse Help Center',
    ctaSecondaryHref: '/support',
    stats: [
      { value: '16', label: 'Help articles indexed' },
      { value: '11', label: 'Gen AI topics built' },
      { value: 'Hybrid', label: 'Vector + keyword RAG' },
      { value: 'SSE', label: 'Live streaming chat' },
    ],
  },
  chatPreview: {
    userMessage: 'What is machine coding practice on InterviewPro.info?',
    assistantMessage:
      'Machine Coding includes 70+ JavaScript and 30+ React interview-style challenges — all in your browser with a live editor, test runs, and filters by company and difficulty.\n\nYour solved work syncs to your progress dashboard after sign-in.',
    articles: ['Machine Coding practice', 'Progress dashboard'],
  },
  features: {
    eyebrow: 'Why it works',
    title: 'Support you can trust',
    subtitle: 'Grounded in real documentation — with the UX of a live help desk.',
    items: [
      {
        title: 'Retrieval-first',
        text: 'Hybrid search finds Help Center articles before the model writes a single word.',
      },
      {
        title: 'Cited sources',
        text: 'Every reply links to the articles used — verify details anytime.',
      },
      {
        title: 'Live conversation',
        text: 'Streaming Markdown replies, follow-up memory, and mateshwari as your support specialist.',
      },
      {
        title: 'Safe by design',
        text: 'Injection checks, confidence guardrails, and allowlisted tools for billing questions.',
      },
    ],
  },
  pipelineTitle: 'How chat works',
  pipelineSubtitle: 'Six steps from your question to a grounded, streamed reply.',
  pipeline: [
    {
      step: 'Send message',
      detail: 'SupportCopilot + Zustand POST question and chat history to /api/chat. API keys never leave the server.',
      layer: 'Client',
      tech: 'React · Zustand · lib/chatClient.js',
    },
    {
      step: 'Safety check',
      detail: 'Server scans for prompt-injection patterns before any retrieval or model call.',
      layer: 'Server',
      tech: 'lib/security.js',
    },
    {
      step: 'Hybrid RAG',
      detail: 'Vector embeddings + BM25 keyword search over Help Center chunks, merged and reranked.',
      layer: 'Server',
      tech: 'OpenAI embeddings · lib/hybridRetrieval.js',
    },
    {
      step: 'Guardrail',
      detail: 'If top retrieval score is too low, the app refuses instead of guessing.',
      layer: 'Server',
      tech: 'lib/prompt.js',
    },
    {
      step: 'Agent + tools',
      detail: 'ReAct planner decides: answer from docs or call get_subscription_status for billing.',
      layer: 'Server',
      tech: 'OpenAI tools · lib/tools.js',
    },
    {
      step: 'Stream reply',
      detail: 'Grounded answer streams over SSE — Markdown in UI, source chips, token stats on hover.',
      layer: 'Client',
      tech: 'SSE · react-markdown · SupportCopilot.jsx',
    },
  ],
  technology: {
    title: 'Technology stack',
    subtitle: 'Full-stack Gen AI support — modern frontend, server-side trust boundary, production-style RAG.',
    groups: [
      {
        name: 'Frontend',
        items: [
          { name: 'Next.js 16', role: 'App router, API routes, SSR' },
          { name: 'React 19', role: 'Chat UI, streaming message list' },
          { name: 'Tailwind v4', role: 'Landing, chat, docs styling' },
          { name: 'Zustand', role: 'Chat state, history, stream events' },
          { name: 'react-markdown', role: 'Rich assistant replies (ChatGPT-style)' },
        ],
      },
      {
        name: 'AI & retrieval',
        items: [
          { name: 'OpenAI GPT', role: 'Grounded answer generation + ReAct planning' },
          { name: 'text-embedding-3-small', role: 'Semantic search over help articles' },
          { name: 'Hybrid RAG', role: 'Vector + BM25 with reranking' },
          { name: 'In-memory index', role: 'Chunked docs from supportDocs.js' },
        ],
      },
      {
        name: 'Backend & trust',
        items: [
          { name: 'SSE streaming', role: 'Token-by-token replies to the browser' },
          { name: 'ReAct agent', role: 'Plan → optional tool → answer' },
          { name: 'Guardrails', role: 'Injection block + low-confidence refusal' },
          { name: 'Golden evals', role: 'npm run eval retrieval regression tests' },
        ],
      },
    ],
  },
  chatFlowDiagram: [
    { from: 'Browser', to: '/api/chat', label: 'question + history' },
    { from: 'Server', to: 'Help Center index', label: 'hybrid RAG' },
    { from: 'Server', to: 'OpenAI', label: 'grounded generation' },
    { from: 'Server', to: 'Browser', label: 'SSE stream + sources' },
  ],
  genAiTopicsSection: {
    title: '11 Gen AI topics — all implemented',
    subtitle:
      'Each topic is wired into this app with real code—not just listed on a resume. Open the technical guide for architecture notes and file paths.',
    topics: genAiTopics.map(({ id, topic, summary }) => ({ id, name: topic, summary })),
  },
  topics: {
    title: 'What you can ask about',
    items: [
      'A2Z Frontend & Machine Coding',
      'DSA by Patterns & Gen AI track',
      'ResumePro & EvalPro',
      'Progress dashboard & sign-in',
      'Job Board & Interview Guide',
      'Plans, billing & troubleshooting',
    ],
  },
  demoExamples: docsMeta.demoPrompts.slice(0, 4),
  demoSection: {
    eyebrow: 'Try it',
    title: 'Ask a real question',
    subtitle: 'Tap a prompt to open chat — see RAG, citations, and streaming in action.',
  },
  cta: {
    title: 'Ready to try it?',
    text: 'Open the live copilot or explore the Help Center and technical guide.',
    primary: 'Open chat',
    secondary: 'Help Center',
    secondaryHref: '/support',
    tertiary: 'Technical guide',
    tertiaryHref: '/docs',
  },
}
