import { ACCEPTED_EXTENSIONS, MAX_UPLOAD_BYTES } from '../knowledge/documentTypes'

const TEXT_EXTENSIONS = new Set(['.txt', '.md', '.markdown', '.csv', '.html', '.htm'])

function inferTitle(filename, text) {
  const base = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ').trim()
  if (base) return base
  const firstLine = text.split('\n').find((line) => line.trim())
  return firstLine?.slice(0, 80) || 'Untitled document'
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

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function validateFile(file) {
  if (!file || typeof file === 'string') throw new Error('file is required')
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(`File too large. Max size is ${Math.round(MAX_UPLOAD_BYTES / (1024 * 1024))}MB.`)
  }

  const filename = file.name || 'upload.txt'
  const ext = filename.includes('.') ? filename.slice(filename.lastIndexOf('.')).toLowerCase() : ''
  if (!ACCEPTED_EXTENSIONS.includes(ext)) {
    throw new Error(`Unsupported extension. Allowed: ${ACCEPTED_EXTENSIONS.join(', ')}`)
  }
  return { filename, ext, mimeType: file.type || '' }
}

function normalizeText(text) {
  const cleaned = String(text || '').replace(/\u0000/g, '').trim()
  if (!cleaned || cleaned.length < 20) {
    throw new Error('Could not extract enough text from this file (minimum 20 characters).')
  }
  return cleaned
}

async function parsePdfOnServer(file) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch('/api/demo/parse', { method: 'POST', body: formData })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Failed to parse PDF')
  return json
}

/** Parse a demo file in the browser; PDFs use a stateless server parse (no DB). */
export async function parseDemoFile(file) {
  const { filename, ext, mimeType } = validateFile(file)

  if (ext === '.pdf' || mimeType === 'application/pdf') {
    const parsed = await parsePdfOnServer(file)
    return {
      title: parsed.title || inferTitle(filename, parsed.text),
      text: normalizeText(parsed.text),
      filename,
      sizeBytes: file.size,
    }
  }

  let text = await file.text()
  if (ext === '.json' || mimeType === 'application/json') {
    text = parseJsonText(text)
  } else if (ext === '.html' || ext === '.htm' || mimeType.includes('html')) {
    text = stripHtml(text)
  } else if (!TEXT_EXTENSIONS.has(ext) && !mimeType.startsWith('text/')) {
    throw new Error(`Unsupported file type: ${ext || mimeType}`)
  }

  text = normalizeText(text)
  return {
    title: inferTitle(filename, text),
    text,
    filename,
    sizeBytes: file.size,
  }
}
