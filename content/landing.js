export const landing = {
  hero: {
    eyebrow: 'Upload any file · Chat with AI',
    title: 'AI Support Copilot',
    headline:
      'Upload PDF, text, JSON, or Markdown — then chat with AI Support Copilot about your file. Like ChatGPT, but every answer is grounded in what you uploaded, with source citations.',
    highlights: ['Any file upload', 'ChatGPT-style chat', 'Cited answers', 'Hybrid RAG'],
    ctaPrimary: { label: 'Start chatting', href: '/chat' },
    ctaSecondary: { label: 'View usage', href: '/usage' },
    trustLine: 'Your files stay in the browser · 100K free trial tokens · No account required',
    quickLinks: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Features', href: '#features' },
      { label: 'Chat', href: '/chat' },
      { label: 'Guide', href: '/docs' },
    ],
    stats: [
      { value: 'Any', label: 'File you upload' },
      { value: '100%', label: 'Cited answers' },
      { value: 'Hybrid', label: 'Vector + BM25' },
      { value: '100K', label: 'Free trial tokens' },
    ],
  },

  chatPreview: {
    portalName: 'AI Support Copilot',
    portalTagline: 'Chat powered by your file',
    uploadedFile: 'Product Spec.pdf',
    userMessage: 'What are the key requirements in section 3?',
    assistantMessage:
      'Section 3 requires OAuth 2.0 for authentication, rate limiting at 100 req/min, and structured logging for all API errors.\n\nDeployments must pass the security checklist before production release.',
    sources: ['Product Spec.pdf'],
    inputPlaceholder: 'Ask anything about your file…',
  },

  flow: {
    eyebrow: 'How it works',
    title: 'Upload a file, chat like ChatGPT',
    subtitle: 'AI Support Copilot reads your upload and answers only from that content — with a source link on every reply.',
    steps: [
      {
        step: '01',
        title: 'Upload any file',
        detail: 'PDF, text, Markdown, JSON, CSV, or HTML — up to 5 files, 5 MB each. Drop in the sidebar at /chat.',
      },
      {
        step: '02',
        title: 'Ask anything',
        detail: 'Type a question or pick a suggested prompt — same natural chat flow you expect from ChatGPT.',
      },
      {
        step: '03',
        title: 'Get grounded answers',
        detail: 'Hybrid search finds the best passages in your file; the AI streams a reply from those matches only.',
      },
      {
        step: '04',
        title: 'Verify the source',
        detail: 'Each answer shows which file and section it came from — no guessing beyond your upload.',
      },
    ],
    paths: {
      demo: {
        label: 'Try it now',
        title: 'Chat with your file at /chat',
        steps: ['Upload any file', 'Ask a question', 'Get a cited AI answer'],
        cta: { label: 'Start chatting', href: '/chat' },
      },
    },
  },

  features: {
    eyebrow: 'Features',
    title: 'ChatGPT experience, your documents',
    items: [
      {
        title: 'Any file upload',
        detail: 'PDF, text, Markdown, JSON, CSV, and HTML — upload in the sidebar and start asking right away.',
      },
      {
        title: 'Natural AI chat',
        detail: 'Streaming replies with Markdown, follow-up questions, and suggested prompts from your file.',
      },
      {
        title: 'Grounded answers',
        detail: 'Hybrid vector + keyword search keeps responses tied to your upload — not the open internet.',
      },
      {
        title: 'Source citations',
        detail: 'Every reply links back to the file it came from, so you can trust and verify each answer.',
      },
    ],
  },

  cta: {
    title: 'Upload a file. Start chatting.',
    body: 'AI Support Copilot works like ChatGPT — except it only answers from the documents you provide.',
    primary: { label: 'Start chatting', href: '/chat' },
    secondary: { label: 'Read the guide', href: '/docs' },
  },
}
