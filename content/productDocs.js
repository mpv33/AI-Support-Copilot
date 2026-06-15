export const productDocs = {
  meta: {
    product: 'AI Support Copilot',
    title: 'Product guide',
    subtitle: 'Upload any file and chat with AI — grounded answers with source citations.',
    lastUpdated: '2026-06-14',
  },

  toc: [
    { id: 'overview', label: 'Overview' },
    { id: 'quick-start', label: 'Quick start' },
    { id: 'free-trial', label: 'Chat (/chat)' },
    { id: 'usage', label: 'Usage dashboard' },
    { id: 'api', label: 'API routes' },
    { id: 'faq', label: 'FAQ' },
    { id: 'pricing', label: 'Model pricing' },
    { id: 'technical', label: 'RAG pipeline', optional: true },
  ],

  overview: {
    summary:
      'AI Support Copilot lets you upload any supported file and chat with AI about it — like ChatGPT, but every answer is grounded in your upload. Hybrid vector + keyword search finds the right passages; the model streams cited replies. No account required.',
    highlights: [
      'Chat at /chat — upload a file, ask anything, get cited answers.',
      'Supports PDF, text, Markdown, JSON, CSV, and HTML.',
      '100K token free-trial budget per browser (localStorage).',
      'Files in sessionStorage; usage history in IndexedDB at /usage.',
    ],
  },

  quickStart: {
    steps: [
      { step: 'Open /chat', detail: 'No account required. Meet AI Support Copilot.' },
      { step: 'Upload any file', detail: 'PDF, text, Markdown, JSON, CSV, or HTML in the sidebar (max 5 files, 5 MB each).' },
      { step: 'Ask a question', detail: 'Chat naturally — pick a suggested prompt or type your own. Answers stream with source chips.' },
      { step: 'Check /usage', detail: 'See estimated OpenAI spend from your sessions — stored in IndexedDB.' },
    ],
  },

  demo: {
    intro:
      'Upload any file and chat with AI Support Copilot. The experience feels like ChatGPT, but retrieval runs over your upload only — answers include source citations from your file.',
    steps: [
      { step: 'Open /chat', detail: 'No account required.' },
      { step: 'Upload any file', detail: 'Text/JSON/MD parse in-browser; PDF uses POST /api/demo/parse (stateless, not stored).' },
      { step: 'Ask anything', detail: 'Suggested prompts come from your file title and headings.' },
      { step: 'Watch your token budget', detail: 'Sidebar meter tracks usage in localStorage (100K max per browser).' },
    ],
    limits: [
      '5 files per session · 5 MB each · PDF, text, MD, JSON, CSV, HTML',
      '100K OpenAI tokens per browser (localStorage)',
      'Documents in sessionStorage — not saved to any database',
    ],
  },

  usage: {
    intro:
      'The usage dashboard reads from IndexedDB in your browser. Each chat session records input/output tokens and estimated USD/INR cost using published model rates.',
    points: [
      'Nothing is sent to a user database — clear site data to reset.',
      'Filter by 7, 30, or 90 days.',
      'Breakdown by endpoint and model; daily series for the last 14 days.',
    ],
  },

  api: {
    intro: 'AI Support Copilot runs on Next.js. These API routes power chat and PDF parsing:',
    routes: [
      {
        method: 'POST',
        path: '/api/chat',
        detail: 'Streams chat via SSE. Receives your question, uploaded file chunks, and token budget from the browser. Calls OpenAI for embeddings + chat.',
      },
      {
        method: 'POST',
        path: '/api/demo/parse',
        detail: 'Extracts text from a PDF upload. Stateless — file content is not stored on the server.',
      },
    ],
    envNote: 'Server env: OPENAI_API_KEY (required), OPENAI_CHAT_MODEL, OPENAI_EMBEDDING_MODEL, USD_TO_INR.',
  },

  faq: [
    {
      question: 'How is this different from ChatGPT?',
      answer:
        'ChatGPT answers from its general training. AI Support Copilot only answers from files you upload — every reply is grounded in your document with a source citation.',
    },
    {
      question: 'What files can I upload?',
      answer: 'PDF, plain text, Markdown, JSON, HTML, and CSV — up to 5 MB each, 5 files per session.',
    },
    {
      question: 'Do I need an account?',
      answer: 'No. Upload a file and start chatting. Documents, token budget, and usage all stay in your browser.',
    },
    {
      question: 'Is my data stored on a server?',
      answer: 'Upload text stays in sessionStorage. PDFs are parsed via a stateless API call and not persisted. Only OpenAI receives the question and retrieved chunks for each chat request.',
    },
    {
      question: 'What happens when I hit the token limit?',
      answer: 'Chat is disabled in that browser after 100K tokens. Clear localStorage or use a new browser profile to reset.',
    },
    {
      question: 'Can the AI hallucinate?',
      answer: 'It answers from retrieved chunks of your file only. Low-confidence queries are declined instead of guessed.',
    },
  ],

  technical: {
    title: 'How RAG works',
    intro: 'Optional technical overview of the retrieval pipeline.',
    steps: [
      { step: 'Chunk & embed', detail: 'Your file is split into paragraph chunks; embedded with text-embedding-3-small per request.' },
      { step: 'Hybrid retrieve', detail: 'Vector similarity (60%) + BM25 keywords (40%), then optional reranking.' },
      { step: 'Guardrail & generate', detail: 'Low-confidence matches refused. Matched chunks ground gpt-4o-mini with streaming SSE.' },
      { step: 'Local observability', detail: 'Token budget in localStorage; usage entries in IndexedDB; no server-side user DB.' },
    ],
  },
}
