/**
 * Gen AI topics for /docs — written in plain language.
 * Each topic: what it is, how this app uses it, which files to open.
 */

export const genAiTopics = [
  {
    id: 1,
    topic: 'LLM Fundamentals',
    summary: 'How tokens and context windows shape what the model can read and answer.',
    simpleWhat:
      'An LLM (Large Language Model) is the AI that reads text and writes answers — like ChatGPT. It works with small pieces called tokens, and it can only read a limited amount of text at once (context window).',
    usedHere:
      'We do not paste the whole help center into the model. We turn your question and help articles into number lists called embeddings, then only send the best matching pieces to the model.',
    steps: [
      'Your question is converted to an embedding (numbers that capture meaning).',
      'Help articles were embedded the same way when the app started.',
      'Only the top matching chunks go into the prompt — saves cost and reduces wrong answers.',
    ],
    code: [
      { path: 'lib/embeddings.js', note: 'Calls OpenAI to create embeddings' },
      { path: 'lib/llm.js', note: 'Checks how big the prompt is (tokens)' },
      { path: 'lib/openai.js', note: 'Connects to OpenAI API' },
    ],
  },
  {
    id: 2,
    topic: 'LLM Integration',
    summary: 'Connect the app to OpenAI — streaming chat, tools, and structured JSON output.',
    simpleWhat:
      'Integration means connecting your app to the AI: sending questions, getting answers back, sometimes word-by-word (streaming), and sometimes calling extra functions (tools).',
    usedHere:
      'The website talks to our server. The server talks to OpenAI. The browser never sees the secret API key. Chat streams live; billing questions can trigger a subscription check tool.',
    steps: [
      'You type in /chat → browser sends question to POST /api/chat.',
      'Server streams the answer back (SSE) so words appear one by one.',
      'For “Is my Pro active?” the server may call get_subscription_status, then answer.',
      'POST /api/structured returns JSON (ticket summary) instead of chat text.',
    ],
    code: [
      { path: 'app/api/chat/route.js', note: 'Main chat API — stream + RAG + tools' },
      { path: 'app/api/structured/route.js', note: 'Returns JSON ticket shape' },
      { path: 'lib/tools.js', note: 'Defines allowed tools' },
      { path: 'lib/chatClient.js', note: 'Browser code that calls /api/chat' },
    ],
  },
  {
    id: 3,
    topic: 'Prompt Engineering',
    summary: 'Grounded prompts, chat history, refusal rules, and eval-tested golden questions.',
    simpleWhat:
      'A prompt is the instruction you give the AI. Good prompts tell it how to think, what sources to trust, and when to say “I don’t know.”',
    usedHere:
      'We use CoT grounding prompts, ReAct tool planning, multi-turn chat history, and a support persona (mateshwari). The model must answer only from retrieved Help Center chunks and refuse when retrieval confidence is low.',
    steps: [
      'System prompt defines support voice; user prompt wraps TRUSTED_CONTEXT + question.',
      'Follow-up questions merge prior turns via lib/chatHistory.js and buildRetrievalQuery().',
      'If retrieval score is too low → refuse instead of guessing.',
      'npm run eval verifies golden questions still retrieve the right articles.',
    ],
    code: [
      { path: 'lib/prompt.js', note: 'System and CoT/ReAct prompt text' },
      { path: 'lib/security.js', note: 'Blocks prompt injection' },
      { path: 'lib/eval.js', note: 'Runs golden question tests' },
      { path: 'data/goldenQuestions.js', note: 'List of test questions + expected docs' },
    ],
  },
  {
    id: 4,
    topic: 'RAG Pipelines',
    summary: 'Chunk help articles, embed them, retrieve matches, then cite sources in replies.',
    simpleWhat:
      'RAG = Retrieval Augmented Generation. Instead of relying on the model’s memory, you search your own documents first, then ask the model to answer using only what you found.',
    usedHere:
      'Help articles live in data/supportDocs.js. They are split into chunks, embedded, stored in memory. When you ask a question, we retrieve the best chunks, then generate an answer with citations.',
    steps: [
      'Ingest: split articles into chunks (lib/chunking.js).',
      'Embed each chunk and save in vector store.',
      'On question: hybrid search finds top chunks.',
      'Rerank boosts important topics (billing, indexing).',
      'Model writes answer using those chunks + shows sources in UI.',
    ],
    code: [
      { path: 'data/supportDocs.js', note: 'All help article text' },
      { path: 'lib/chunking.js', note: 'Splits docs into pieces' },
      { path: 'lib/hybridRetrieval.js', note: 'Finds best chunks for a question' },
      { path: 'lib/vectorStore.js', note: 'Stores embeddings in memory' },
      { path: 'app/api/ingest/route.js', note: 'Rebuild index after doc changes' },
    ],
  },
  {
    id: 5,
    topic: 'Vector Embeddings',
    summary: 'Convert text to vectors so similar questions land on the right documentation.',
    simpleWhat:
      'An embedding turns text into a list of numbers. Similar meanings get similar numbers, so the computer can find “related” sentences without exact keyword match.',
    usedHere:
      'Every help chunk and every user question gets an embedding. We compare them with cosine similarity (how “close” two number lists are) to pick the best chunks.',
    steps: [
      'OpenAI model text-embedding-3-small creates the vectors.',
      'Similar questions like “cancel Pro” and “stop subscription” land near the right article.',
      'lib/cache.js remembers embeddings so repeat questions are faster and cheaper.',
    ],
    code: [
      { path: 'lib/embeddings.js', note: 'Creates embeddings via API' },
      { path: 'lib/vectorStore.js', note: 'Stores chunks + vectors' },
      { path: 'lib/cache.js', note: 'Caches question embeddings' },
    ],
  },
  {
    id: 6,
    topic: 'Semantic Search',
    summary: 'Blend vector meaning search with BM25 keywords for accurate retrieval.',
    simpleWhat:
      'Semantic search finds meaning (e.g. “refund” matches “money back”). Keyword search finds exact words (e.g. “Privacy Mode”). Hybrid search combines both.',
    usedHere:
      'We mix 60% vector (meaning) + 40% BM25 (exact words). That helps when users type product names, settings paths, or error codes that must match exactly.',
    steps: [
      'BM25 scores chunks that contain exact phrases from the question.',
      'Vector scores chunks that are similar in meaning.',
      'Scores are combined, then rerank.js boosts track-specific topics (ResumePro, EvalPro, DSA, etc.).',
    ],
    code: [
      { path: 'lib/bm25.js', note: 'Keyword-style search' },
      { path: 'lib/hybridRetrieval.js', note: 'Combines vector + BM25' },
      { path: 'lib/rerank.js', note: 'Final ranking tweaks' },
    ],
  },
  {
    id: 7,
    topic: 'AI Agents & Workflows',
    summary: 'Orchestrate safety checks, RAG, tool calls, and streaming in one request.',
    simpleWhat:
      'An agent is an AI that can take steps: check safety, search docs, maybe call a tool, then answer — not just one shot reply.',
    usedHere:
      'Each chat request runs a fixed workflow: security → retrieve docs → check score → plan (docs or tool?) → optional subscription lookup → stream answer.',
    steps: [
      'Step order is logged in lib/agent.js for debugging.',
      'Only one tool is allowed: get_subscription_status (Pro billing).',
      'Model cannot run random code — server validates every tool call.',
    ],
    code: [
      { path: 'lib/agent.js', note: 'Step names and trace logging' },
      { path: 'app/api/chat/route.js', note: 'Runs the full workflow' },
      { path: 'lib/tools.js', note: 'Subscription tool logic' },
      { path: 'app/api/tools/subscription-status/route.js', note: 'Tool HTTP endpoint' },
    ],
  },
  {
    id: 8,
    topic: 'AI-powered UI Systems',
    summary: 'ChatGPT-style UI with streaming, citations, sidebar prompts, and stop control.',
    simpleWhat:
      'The chat screen users see: typing box, streaming text, stop button, example questions, and links to sources under the answer.',
    usedHere:
      'The /chat page is a support desk UI: sidebar with example questions, streaming replies, citation chips, multi-turn memory, and stop control.',
    steps: [
      'Zustand store holds messages; buildHistoryFromMessages sends prior turns to /api/chat.',
      'SupportCopilot.jsx renders the thread and streams tokens via lib/chatClient.js.',
      'Enter sends; Shift+Enter adds a new line. User can stop mid-stream.',
    ],
    code: [
      { path: 'components/SupportCopilot.jsx', note: 'Main chat window' },
      { path: 'components/ChatSidebar.jsx', note: 'Example questions' },
      { path: 'components/ChatWelcome.jsx', note: 'First screen in chat' },
      { path: 'lib/chatHistory.js', note: 'Multi-turn history for follow-ups' },
      { path: 'stores/chatStore.js', note: 'Message + stream state' },
    ],
  },
  {
    id: 9,
    topic: 'AI Backend Engineering',
    summary: 'SSE streaming, embedding cache, ingest API, and trace logging on the server.',
    simpleWhat:
      'Backend work: how the server sends data (streaming), saves money (cache), rebuilds search index (ingest), and logs what happened (telemetry).',
    usedHere:
      'Answers stream over SSE (Server-Sent Events). Embeddings are cached. You can rebuild the doc index with POST /api/ingest. Logs include trace ID and retrieval scores.',
    steps: [
      'SSE sends events: meta → sources → tokens → done.',
      'Cache avoids paying twice for the same question embedding.',
      'Ingest re-reads supportDocs.js and rebuilds the search index.',
    ],
    code: [
      { path: 'app/api/chat/route.js', note: 'SSE stream implementation' },
      { path: 'lib/cache.js', note: 'Embedding cache' },
      { path: 'lib/telemetry.js', note: 'Logs trace + scores' },
      { path: 'app/api/ingest/route.js', note: 'Rebuild index API' },
    ],
  },
  {
    id: 10,
    topic: 'AI System Design',
    summary: 'Keep secrets server-side, scope retrieval by tenant, and design to scale.',
    simpleWhat:
      'How you split responsibility: what runs in the browser vs server, how to keep one customer’s data separate (multi-tenant), and how to scale later.',
    usedHere:
      'All secrets and AI calls stay on the server. Docs are tagged tenantId: interviewpro so only InterviewPro.info help articles are searched. Real apps would add login, database, rate limits.',
    steps: [
      'Browser = UI only. Server = OpenAI + search + tools.',
      'Every retrieve filters chunks where tenantId matches.',
      'Designed so you can swap in pgvector or Pinecone later.',
    ],
    code: [
      { path: 'app/api/chat/route.js', note: 'Server-side orchestration' },
      { path: 'lib/hybridRetrieval.js', note: 'tenantId filter on search' },
      { path: 'data/supportDocs.js', note: 'Each doc has tenantId' },
    ],
  },
  {
    id: 11,
    topic: 'AI Performance & Security',
    summary: 'Block injection, refuse low-confidence answers, and run golden eval tests.',
    simpleWhat:
      'Making sure the app is safe (block hacking prompts) and good (automated tests that the right docs are found before users complain).',
    usedHere:
      'We block jailbreak-style messages. Low search score → no fake answer. Golden questions in data/goldenQuestions.js are tested with npm run eval.',
    steps: [
      'detectPromptInjection runs before search or AI.',
      'If top chunk score is too low, user gets a polite refusal.',
      'Eval script checks cancel Pro, privacy, indexing questions still retrieve correct docs.',
    ],
    code: [
      { path: 'lib/security.js', note: 'Injection detection' },
      { path: 'lib/eval.js', note: 'Eval runner' },
      { path: 'data/goldenQuestions.js', note: 'Test questions' },
      { path: 'scripts/run-eval.mjs', note: 'npm run eval script' },
    ],
  },
]

export const docsMeta = {
  title: 'Technical guide',
  subtitle:
    'How AI Support Copilot works — RAG pipeline, agent workflow, APIs, and the code behind InterviewPro.info support chat.',
  stack: ['Next.js 16', 'React 19', 'OpenAI', 'Hybrid RAG', 'SSE', 'Zustand', 'Tailwind v4'],
  howToRead: [
    'What it is — core concept in one paragraph.',
    'In this app — how the copilot uses it end to end.',
    'Key files — where to read the implementation.',
  ],
  architecture: {
    title: 'System architecture',
    layers: [
      {
        name: 'Client',
        detail: 'Next.js chat UI streams answers over SSE. Zustand holds messages and multi-turn history.',
        files: ['components/SupportCopilot.jsx', 'stores/chatStore.js', 'lib/chatClient.js'],
      },
      {
        name: 'API',
        detail: 'Route handlers orchestrate retrieval, guardrails, tool calls, and streaming generation.',
        files: ['app/api/chat/route.js', 'app/api/structured/route.js', 'app/api/ingest/route.js'],
      },
      {
        name: 'Retrieval',
        detail: 'Help articles are chunked, embedded, and searched with hybrid vector + BM25 retrieval.',
        files: ['data/supportDocs.js', 'lib/hybridRetrieval.js', 'lib/vectorStore.js', 'lib/chunking.js'],
      },
      {
        name: 'Trust layer',
        detail: 'Injection checks, score guardrails, allowlisted tools, and golden eval regression tests.',
        files: ['lib/security.js', 'lib/prompt.js', 'lib/eval.js', 'data/goldenQuestions.js'],
      },
    ],
  },
  bigPicture: {
    title: 'Request flow',
    steps: [
      'Browser POSTs question + chat history to /api/chat.',
      'Server runs prompt-injection check; blocks unsafe input.',
      'Hybrid RAG retrieves top Help Center chunks (vector + BM25, reranked).',
      'Guardrail refuses if retrieval confidence is too low.',
      'ReAct planner may call get_subscription_status for billing questions.',
      'OpenAI generates a grounded answer; SSE streams tokens + source chips to UI.',
    ],
  },
  topicGroups: [
    { id: 'foundation', label: 'Foundation', topics: [1, 2, 3] },
    { id: 'retrieval', label: 'Retrieval', topics: [4, 5, 6] },
    { id: 'agents-ui', label: 'Agents & UI', topics: [7, 8] },
    { id: 'engineering', label: 'Engineering', topics: [9, 10, 11] },
  ],
  endpoints: [
    {
      method: 'POST',
      path: '/api/chat',
      simple: 'Send a question, get a streaming answer + sources',
    },
    {
      method: 'POST',
      path: '/api/structured',
      simple: 'Get a JSON summary (like a support ticket)',
    },
    {
      method: 'POST',
      path: '/api/ingest',
      simple: 'Reload help articles into search index',
    },
    {
      method: 'GET/POST',
      path: '/api/eval',
      simple: 'Run automatic quality tests',
    },
    {
      method: 'GET',
      path: '/api/tools/subscription-status',
      simple: 'Check Pro subscription (demo data)',
    },
  ],
  demoPrompts: [
    { label: 'ResumePro', prompt: 'How does ResumePro score my resume against a job description?' },
    { label: 'EvalPro', prompt: 'How does EvalPro evaluate my machine coding submission?' },
    { label: 'Uses a tool', prompt: 'Is my InterviewPro.info Pro still active?' },
    { label: 'Should refuse', prompt: 'What is the weather in Tokyo?' },
  ],
  commands: [
    { label: 'Test retrieval quality', cmd: 'npm run eval' },
    { label: 'Reload help articles', cmd: 'curl -X POST http://localhost:3010/api/ingest' },
  ],
}
