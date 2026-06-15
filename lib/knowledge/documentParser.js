import { ACCEPTED_EXTENSIONS, MAX_UPLOAD_BYTES } from './documentTypes'
import { extractPdfText } from './pdfParse'

export { ACCEPTED_EXTENSIONS, MAX_UPLOAD_BYTES } from './documentTypes'

const TEXT_EXTENSIONS = new Set(['.txt', '.md', '.markdown', '.csv', '.html', '.htm'])

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function parseJsonText(raw) {
  try {
    const parsed = JSON.parse(raw)
    if (typeof parsed === 'string') return parsed
    return JSON.stringify(parsed, null, 2)
  } catch {
    return raw
  }
}

async function parsePdf(buffer) {
  return extractPdfText(buffer)
}

export function inferTitle(filename, text) {
  const base = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ').trim()
  if (base) return base
  const firstLine = text.split('\n').find((line) => line.trim())
  return firstLine?.slice(0, 80) || 'Untitled document'
}

export async function parseUploadedFile({ buffer, filename, mimeType = '' }) {
  const ext = filename.includes('.') ? filename.slice(filename.lastIndexOf('.')).toLowerCase() : ''
  const lowerMime = mimeType.toLowerCase()

  let text = ''

  if (ext === '.pdf' || lowerMime === 'application/pdf') {
    text = await parsePdf(buffer)
  } else if (ext === '.json' || lowerMime === 'application/json') {
    text = parseJsonText(buffer.toString('utf8'))
  } else if (TEXT_EXTENSIONS.has(ext) || lowerMime.startsWith('text/')) {
    text = buffer.toString('utf8')
    if (ext === '.html' || ext === '.htm' || lowerMime.includes('html')) {
      text = stripHtml(text)
    }
  } else {
    throw new Error(`Unsupported file type: ${ext || mimeType || 'unknown'}. Use ${ACCEPTED_EXTENSIONS.join(', ')}`)
  }

  text = text.replace(/\u0000/g, '').trim()

  if (!text || text.length < 20) {
    throw new Error('Could not extract enough text from this file (minimum 20 characters).')
  }

  return {
    title: inferTitle(filename, text),
    text,
    extension: ext,
  }
}
