/** Portfolio skills map — 13 Gen AI topics for next-gen AI roles. */

export const portfolioSkills = [
  {
    id: 1,
    topic: 'LLM Fundamentals',
    explore: 'Tokens, transformers, embeddings, context windows',
    inProject: [
      'OpenAI embeddings map text → vectors (semantic meaning).',
      'Chat completions consume prompt + retrieved context (limited context budget).',
      '`lib/llm.js` estimates token usage for observability.',
    ],
    code: ['lib/llm.js', 'lib/embeddings.js', 'lib/openai.js'],
    interview:
      'Explain embeddings vs tokens; why context limits force RAG instead of stuffing whole KB.',
  },
  {
    id: 2,
    topic: 'LLM Integration',
    explore: 'APIs, streaming, tool calling, structured output',
    inProject: [
      'Chat API with streaming SSE to the browser.',
      'Function calling for `get_order_status` with backend validation.',
      '`POST /api/structured` returns JSON schema ticket summaries.',
    ],
    code: ['app/api/chat/route.js', 'app/api/structured/route.js', 'lib/tools.js'],
    interview:
      'Never expose API keys client-side; backend owns model calls, tools, and response shaping.',
  },
  {
    id: 3,
    topic: 'Prompt Engineering',
    explore: 'CoT, ReAct, guardrails, evaluation',
    inProject: [
      'CoT-style prompts: step-by-step reasoning before final answer.',
      'ReAct system prompt: Reason → Act (tool) → Observe.',
      'Retrieval guardrail + injection blocking.',
      '`npm run eval` golden-question regression.',
    ],
    code: ['lib/prompt.js', 'lib/security.js', 'lib/eval.js', 'data/goldenQuestions.js'],
    interview:
      'Retrieval quality often beats prompt tweaks; evals catch regressions when docs change.',
  },
  {
    id: 4,
    topic: 'RAG Pipelines',
    explore: 'Chunking, retrieval, reranking, hybrid search',
    inProject: [
      'Paragraph chunking with size limits.',
      'Hybrid retrieval: vectors + BM25 + rerank boost.',
      'Tenant filter before ranking (multi-tenant safety).',
    ],
    code: ['lib/chunking.js', 'lib/hybridRetrieval.js', 'lib/rerank.js', 'lib/vectorStore.js'],
    interview:
      'Walk through ingest → chunk → embed → retrieve → prompt → generate; where would you add a reranker model?',
  },
  {
    id: 5,
    topic: 'Vector Embeddings',
    explore: 'ANN search, vector DBs, similarity',
    inProject: [
      'Cosine similarity over in-memory vectors (demo ANN substitute).',
      'Embedding cache to reduce API cost/latency.',
      'Production path: Pinecone/pgvector + HNSW indexes.',
    ],
    code: ['lib/embeddings.js', 'lib/cache.js', 'lib/hybridRetrieval.js'],
    interview:
      'Cosine similarity assumes normalized vectors; ANN trades exactness for speed at scale.',
  },
  {
    id: 6,
    topic: 'Semantic Search',
    explore: 'BM25 + vectors, ranking, optimization',
    inProject: [
      'BM25 lexical scores for exact terms (e.g. AUTH_403).',
      'Weighted fusion: 60% vector + 40% BM25.',
      'Rerank pass boosts exact error-code matches.',
    ],
    code: ['lib/bm25.js', 'lib/hybridRetrieval.js', 'lib/rerank.js'],
    interview:
      'Hybrid search fixes cases where embeddings miss rare codes; tune weights per domain.',
  },
  {
    id: 7,
    topic: 'AI Agents & Workflows',
    explore: 'Planning, tools, multi-step agents',
    inProject: [
      'Agent run trace: security → retrieve → guard → plan tools → stream.',
      'Tool allowlist; model cannot execute arbitrary code.',
    ],
    code: ['lib/agent.js', 'app/api/chat/route.js', 'lib/tools.js'],
    interview:
      'Agents need bounded steps, observability per step, and human escalation for low confidence.',
  },
  {
    id: 8,
    topic: 'AI-powered UI Systems',
    explore: 'Copilots, streaming chat, AI UX',
    inProject: [
      'Streaming tokens + citation chips + stop/cancel.',
      'Zustand chat store; example prompt cards.',
      'Status states: idle, streaming, stopped, error.',
    ],
    code: ['components/SupportCopilot.jsx', 'stores/chatStore.js'],
    interview:
      'Perceived latency matters: stream early, show sources, allow cancel, never block UI on full completion.',
  },
  {
    id: 9,
    topic: 'AI Backend Engineering',
    explore: 'SSE, queues, caching, observability',
    inProject: [
      'SSE-style ReadableStream from `/api/chat`.',
      'Embedding cache (`lib/cache.js`).',
      'Structured JSON logs: traceId, latency, chunk IDs, scores.',
      'Ingest endpoint rebuilds index (queue pattern in prod).',
    ],
    code: ['app/api/chat/route.js', 'lib/cache.js', 'lib/telemetry.js', 'app/api/ingest/route.js'],
    interview:
      'Scale ingest with BullMQ/SQS; cache embeddings; propagate trace IDs across services.',
  },
  {
    id: 10,
    topic: 'AI System Design',
    explore: 'Enterprise RAG, scalable AI architecture',
    inProject: [
      'Backend trust boundary: keys, retrieval ACLs, tools on server.',
      'Tenant-safe retrieval filter.',
      'Clear upgrade path: vector DB, auth, eval CI, rate limits.',
    ],
    code: ['app/api/chat/route.js', 'lib/hybridRetrieval.js', 'docs/PORTFOLIO.md'],
    interview:
      'LLM is not your auth layer; design retrieval filters and tool permissions in application code.',
  },
  {
    id: 11,
    topic: 'AI Performance & Security',
    explore: 'Latency, eval, prompt injection',
    inProject: [
      'Hybrid retrieval + cache reduces latency/cost.',
      '`detectPromptInjection` blocks suspicious user input.',
      'Context sanitization for untrusted doc text.',
      'Golden eval suite measures retrieval pass rate.',
    ],
    code: ['lib/security.js', 'lib/eval.js', 'lib/cache.js'],
    interview:
      'Measure p95 latency per stage; run evals on every index change; red-team injection prompts.',
  },
  {
    id: 12,
    topic: 'AI Interview Scenarios',
    explore: 'Debugging, tradeoffs, whiteboard drills',
    inProject: [
      'Debug wrong answers via chunk IDs + vector/BM25 scores in UI.',
      'Tradeoff docs: in-memory vs vector DB, hybrid weights, when to refuse.',
    ],
    code: ['app/skills/page.jsx', 'docs/PORTFOLIO.md', 'data/skillsMatrix.js'],
    interview:
      'Practice: "Answer is wrong" → check retrieval → check prompt → check tool result → check model version.',
  },
  {
    id: 13,
    topic: 'Full-stack AI Mini Project',
    explore: 'Full-stack support copilot capstone',
    inProject: [
      'Next.js 16 + React 19 + Tailwind + Zustand + OpenAI.',
      'End-to-end: UI → API → RAG → tools → stream → citations.',
    ],
    code: ['app/', 'components/', 'lib/', 'stores/'],
    interview:
      'One-liner: full-stack copilot with hybrid RAG, agent workflow, guardrails, evals, and production upgrade path.',
  },
]
