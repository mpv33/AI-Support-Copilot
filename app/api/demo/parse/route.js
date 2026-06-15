import { isDemoEnabled } from '../../../../platform/demo/index.js'
import { parseUploadedFile } from '../../../../lib/knowledge/documentParser.js'
import { MAX_UPLOAD_BYTES } from '../../../../lib/knowledge/documentTypes.js'

export const runtime = 'nodejs'

export async function POST(request) {
  if (!isDemoEnabled()) {
    return Response.json({ error: 'Demo is disabled.' }, { status: 404 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file || typeof file === 'string') {
      return Response.json({ error: 'file is required' }, { status: 400 })
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return Response.json({ error: 'File is too large (max 5 MB).' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const parsed = await parseUploadedFile({
      buffer,
      filename: file.name || 'upload.txt',
      mimeType: file.type || '',
    })

    return Response.json({
      ok: true,
      title: parsed.title,
      text: parsed.text,
      filename: file.name,
      sizeBytes: file.size,
    })
  } catch (error) {
    return Response.json({ error: error.message || 'Parse failed' }, { status: 400 })
  }
}
