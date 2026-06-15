import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

/** Node-only PDF text extraction (pdf-parse v1 — no pdfjs worker). */
export async function extractPdfText(buffer) {
  const pdfParse = require('pdf-parse')
  const result = await pdfParse(buffer)
  return result.text?.trim() || ''
}
