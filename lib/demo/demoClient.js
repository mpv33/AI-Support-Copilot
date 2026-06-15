import {
  addDemoDocumentToStore,
  demoDocumentListView,
  loadDemoDocuments,
  removeDemoDocumentFromStore,
} from './demoBrowserStore.js'
import { parseDemoFile } from './demoFileParse.js'

export function getDemoDocumentsForChat() {
  return loadDemoDocuments()
}

export function listDemoDocumentsForUi() {
  return demoDocumentListView(loadDemoDocuments())
}

export async function addDemoDocument({ file, title }) {
  const parsed = await parseDemoFile(file)
  const document = {
    id: `demo-${crypto.randomUUID()}`,
    title: title?.trim() || parsed.title,
    filename: parsed.filename,
    sizeBytes: parsed.sizeBytes,
    text: parsed.text,
    uploadedAt: new Date().toISOString(),
  }

  try {
    addDemoDocumentToStore(document)
  } catch (err) {
    if (err.name === 'QuotaExceededError') {
      throw new Error('Browser storage full. Remove a file or use a smaller document.')
    }
    throw err
  }

  return document
}

export function removeDemoDocument(id) {
  return demoDocumentListView(removeDemoDocumentFromStore(id))
}
