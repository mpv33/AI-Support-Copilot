/**
 * Chat UI copy — file upload and AI chat modes.
 */

import { platformConfig } from './config.js'

export const portalAssistant = {
  name: 'Support Assistant',
  role: 'Company knowledge',
  greeting:
    'Hi! Ask me anything from your company knowledge base — policies, benefits, tools, and internal docs.',
}

export const demoAssistant = {
  name: platformConfig.demo.workspace.name,
  role: 'Powered by your files',
  greeting:
    'Hi! **Upload any file** in the sidebar (PDF, text, JSON, and more), then ask me anything about it — like ChatGPT, but answers come only from your upload.',
}

export const portalExamples = [
  { label: 'Getting started', prompt: 'How do I get started as a new employee?' },
  { label: 'Time off', prompt: 'What is the time-off or PTO policy?' },
  { label: 'Benefits', prompt: 'Where can I find information about employee benefits?' },
  { label: 'IT support', prompt: 'How do I request IT help or reset my password?' },
  { label: 'Expenses', prompt: 'What is the expense reimbursement process?' },
  { label: 'Remote work', prompt: 'What are the remote work or WFH guidelines?' },
]

/** Build portal quick-start chips from employer-uploaded document titles. */
export function buildPortalExamplesFromDocuments(documents, { max = 6 } = {}) {
  if (!Array.isArray(documents) || !documents.length) return []

  return documents.slice(0, max).map((doc) => {
    const title = (doc.title || doc.filename || 'this document').trim()
    const label = title.length > 40 ? `${title.slice(0, 37)}…` : title
    return {
      label,
      prompt: `What are the key points in "${title}"?`,
    }
  })
}

/** Extract section titles from markdown, numbered lists, or plain-text headers. */
export function extractHeadingsFromText(text, { max = 6 } = {}) {
  const headings = []
  const seen = new Set()
  const lines = String(text || '').split('\n')

  function add(raw) {
    const clean = String(raw || '')
      .replace(/\s+/g, ' ')
      .replace(/[#*_`]+/g, '')
      .trim()
    if (clean.length < 3 || clean.length > 90 || seen.has(clean.toLowerCase())) return
    seen.add(clean.toLowerCase())
    headings.push(clean)
  }

  for (let i = 0; i < lines.length && headings.length < max; i++) {
    const trimmed = lines[i].trim()
    if (!trimmed) continue

    const markdown = trimmed.match(/^#{1,4}\s+(.+?)\s*$/)
    if (markdown) {
      add(markdown[1])
      continue
    }

    const numbered = trimmed.match(/^\d+[\.)]\s+(.+?)\s*$/)
    if (numbered && numbered[1].length <= 90) {
      add(numbered[1])
      continue
    }

    const next = lines[i + 1]?.trim() || ''
    if (next && (/^=+$/.test(next) || /^-+$/.test(next)) && trimmed.length <= 90) {
      add(trimmed)
      continue
    }

    if (
      trimmed.length >= 4 &&
      trimmed.length <= 70 &&
      trimmed === trimmed.toUpperCase() &&
      /[A-Z]/.test(trimmed) &&
      !/^\d+$/.test(trimmed)
    ) {
      add(trimmed.charAt(0) + trimmed.slice(1).toLowerCase())
    }
  }

  return headings.slice(0, max)
}

function truncateLabel(text, max = 36) {
  const s = String(text || '').trim()
  return s.length > max ? `${s.slice(0, max - 1)}…` : s
}

/** Build demo quick-start chips from uploaded file titles and in-doc headings. */
export function buildDemoExamplesFromDocuments(documents, { max = 6 } = {}) {
  if (!Array.isArray(documents) || !documents.length) return []

  const examples = []

  for (const doc of documents) {
    if (examples.length >= max) break

    const title = (doc.title || doc.filename || 'this document').trim()
    examples.push({
      label: truncateLabel(title),
      prompt: `What are the main points in "${title}"?`,
    })

    const headings = extractHeadingsFromText(doc.text, { max: 4 })
    for (const heading of headings) {
      if (examples.length >= max) break
      if (heading.toLowerCase() === title.toLowerCase()) continue
      examples.push({
        label: truncateLabel(heading),
        prompt: `What does "${title}" say about "${heading}"?`,
      })
    }
  }

  return examples.slice(0, max)
}

export const portalSidebarCopy = {
  examplesTitle: 'Try asking',
  intro: 'Answers come from your employer uploaded documents — with source links under each reply.',
  tip: 'Questions are private to this company portal.',
}

export const demoSidebarCopy = {
  examplesTitle: 'Ask about your file',
  intro: 'Upload any file below, then chat — suggested questions appear from your upload.',
  tip: 'Answers come only from your files, with source links under each reply.',
}

export const portalChatWelcome = {
  title: 'How can we help?',
  body: 'Ask about policies, benefits, tools, or anything in your company knowledge base.',
  inputHint: 'Press Enter to send',
  placeholder: 'Ask a question about your company…',
}

export const demoChatWelcome = {
  title: 'Upload a file to get started',
  body: 'Add PDF, text, JSON, or Markdown in the sidebar — then ask AI Support Copilot anything about it.',
  inputHint: 'Press Enter to send',
  placeholder: 'Upload a file first, then ask anything…',
}

export function getChatContext({
  demoMode,
  portalMode,
  hasUploads = false,
  portalExampleList = null,
  demoExampleList = null,
}) {
  if (demoMode) {
    const docExamples = Array.isArray(demoExampleList) ? demoExampleList : []
    return {
      assistant: demoAssistant,
      examples: hasUploads ? docExamples : [],
      sidebarCopy: hasUploads && docExamples.length
        ? { ...demoSidebarCopy, examplesTitle: 'Suggested from your file' }
        : demoSidebarCopy,
      welcome: demoChatWelcome,
    }
  }

  const docExamples = Array.isArray(portalExampleList) ? portalExampleList : []
  const hasDocExamples = portalMode && docExamples.length > 0

  return {
    assistant: portalAssistant,
    examples: portalMode ? docExamples : portalExamples,
    sidebarCopy: hasDocExamples
      ? { ...portalSidebarCopy, examplesTitle: 'Ask about uploaded documents' }
      : portalSidebarCopy,
    welcome: portalChatWelcome,
  }
}
