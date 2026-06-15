import { MAX_DEMO_UPLOADS_PER_SESSION } from '../../platform/demo/session.js'

const STORAGE_KEY = 'demo-browser-documents'

export function loadDemoDocuments() {
  if (typeof window === 'undefined') return []

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveDemoDocuments(documents) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(documents))
}

export function addDemoDocumentToStore(document) {
  const documents = loadDemoDocuments()
  if (documents.length >= MAX_DEMO_UPLOADS_PER_SESSION) {
    throw new Error(`Demo limit: ${MAX_DEMO_UPLOADS_PER_SESSION} uploads per browser session.`)
  }
  documents.push(document)
  saveDemoDocuments(documents)
  return document
}

export function removeDemoDocumentFromStore(id) {
  const documents = loadDemoDocuments().filter((doc) => doc.id !== id)
  saveDemoDocuments(documents)
  return documents
}

/** Metadata for UI lists (text stays in sessionStorage only). */
export function demoDocumentListView(documents) {
  return documents.map(({ id, title, filename, sizeBytes, uploadedAt }) => ({
    id,
    title,
    filename,
    sizeBytes,
    uploadedAt,
  }))
}
