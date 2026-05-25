import { portfolioSkills } from './skillsMatrix'

export const appNav = [
  { href: '/', label: 'Home' },
  { href: '/chat', label: 'Chat' },
]

export const productNav = [
  { href: '/#capabilities', label: 'Capabilities' },
  { href: '/#concepts', label: 'Gen AI stack' },
  { href: '/#how-it-works', label: 'How it works' },
]

export const footerLinks = [
  { href: '/instructions', label: 'Setup' },
  { href: '/about', label: 'Architecture' },
  { href: '/features', label: 'Features' },
  { href: '/skills', label: 'Deep dive' },
]

export const heroStats = [
  { value: '13', label: 'Gen AI concepts' },
  { value: 'Hybrid', label: 'RAG pipeline' },
  { value: 'ReAct', label: 'Agent + tools' },
  { value: 'SSE', label: 'Live streaming' },
]

export const heroCapabilities = [
  'Hybrid RAG',
  'BM25 + vectors',
  'CoT grounding',
  'Tool calling',
  'Guardrails',
  'Eval suite',
]

/** Six pillars grouping core Gen AI engineering. */
export const genAiPillars = [
  {
    id: 'models',
    title: 'Models & LLMs',
    description: 'Embeddings, token budgets, chat APIs, and structured JSON from the model.',
    concepts: ['LLM Fundamentals', 'LLM Integration'],
    features: ['text-embedding-3-small', 'gpt-4o-mini streaming', 'JSON schema tickets'],
  },
  {
    id: 'rag',
    title: 'RAG & retrieval',
    description: 'Chunk, embed, search, and rerank — grounded answers from your knowledge base.',
    concepts: ['RAG Pipelines', 'Vector Embeddings', 'Semantic Search'],
    features: ['Paragraph chunking', 'Cosine + BM25 fusion', 'Tenant-safe filter'],
  },
  {
    id: 'agents',
    title: 'Agents & tools',
    description: 'Multi-step workflows where the model plans, calls tools, and observes results.',
    concepts: ['AI Agents & Workflows'],
    features: ['ReAct planning', 'get_order_status tool', 'Allowlisted execution'],
  },
  {
    id: 'prompts',
    title: 'Prompts & safety',
    description: 'Chain-of-thought grounding, injection defense, and retrieval guardrails.',
    concepts: ['Prompt Engineering', 'AI Performance & Security'],
    features: ['CoT prompts', 'Injection block', 'Weak-context refuse'],
  },
  {
    id: 'ux',
    title: 'AI product UX',
    description: 'Streaming copilot UI with citations, cancel, and guided example questions.',
    concepts: ['AI-powered UI Systems'],
    features: ['SSE token stream', 'Source citations', 'Zustand chat state'],
  },
  {
    id: 'platform',
    title: 'AI platform',
    description: 'Backend trust boundary, observability, caching, and system design patterns.',
    concepts: ['AI Backend Engineering', 'AI System Design'],
    features: ['Trace + latency logs', 'Embedding cache', 'Ingest pipeline'],
  },
]

export const productCapabilities = [
  {
    title: 'Hybrid retrieval',
    text: '60% semantic vectors + 40% BM25 lexical search with reranking for exact codes like AUTH_403.',
  },
  {
    title: 'Grounded generation',
    text: 'Answers cite source chunks. CoT prompts reason before responding — no invented policy.',
  },
  {
    title: 'Live streaming',
    text: 'Server-sent events deliver sources first, then tokens. Stop anytime.',
  },
  {
    title: 'Safe tool calls',
    text: 'Model requests order status; backend validates and runs allowlisted tools only.',
  },
  {
    title: 'Structured output',
    text: 'POST /api/structured returns ticket JSON — intent, urgency, actions, citations.',
  },
  {
    title: 'Quality evals',
    text: 'Golden-question retrieval tests via npm run eval before you ship or demo.',
  },
]

export const landingSkills = portfolioSkills.map((s) => ({
  id: s.id,
  name: s.topic,
  used: s.explore,
}))

export const howItWorksSteps = [
  {
    step: '01',
    title: 'Ask',
    text: 'User sends a support question from the copilot chat.',
  },
  {
    step: '02',
    title: 'Retrieve',
    text: 'Hybrid search finds tenant-safe chunks; low score triggers refuse.',
  },
  {
    step: '03',
    title: 'Plan & act',
    text: 'ReAct pass may call tools; CoT prompt builds grounded context.',
  },
  {
    step: '04',
    title: 'Stream',
    text: 'Citations and answer tokens stream to the UI in real time.',
  },
]

export const questionGuides = [
  {
    id: 'billing',
    title: 'Billing & refunds',
    hint: 'Plans, refund windows, payment policy',
    examples: [
      { label: 'Refund after 30 days', prompt: 'Can annual users get refunds after 30 days?' },
      { label: 'Draft refund reply', prompt: 'Draft a support reply about refund policy.' },
    ],
  },
  {
    id: 'access',
    title: 'Access & errors',
    hint: 'Login, permissions, dashboard errors',
    examples: [
      { label: 'AUTH_403 error', prompt: 'Why do I see AUTH_403 on dashboard?' },
    ],
  },
  {
    id: 'orders',
    title: 'Orders & shipping',
    hint: 'Track an order, delivery status',
    examples: [
      { label: 'Track order 123', prompt: 'Where is order 123?' },
    ],
  },
  {
    id: 'general',
    title: 'How to ask',
    hint: 'Use clear, specific questions',
    examples: [
      { label: 'Good question', prompt: 'What is the refund policy for annual plans?' },
      { label: 'Too vague', prompt: 'Help me with my account' },
    ],
  },
]

export const copilotHelp = {
  title: 'What can I ask?',
  intro: 'Tap any example to send it. Ask about refunds, dashboard errors, or order status.',
  tips: [
    'Be specific (plan, error code, order ID).',
    'One topic per message works best.',
    'If docs are missing, the copilot will say so.',
  ],
}

export const demoPrompts = questionGuides.flatMap((g) =>
  g.examples.slice(0, 1).map((e) => e.prompt),
)
