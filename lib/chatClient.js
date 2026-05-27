export async function askCopilot({ question, history = [], onEvent, signal }) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal,
    body: JSON.stringify({ question, history, tenantId: 'interviewpro' }),
  })

  const contentType = res.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    const json = await res.json()
    onEvent({ type: 'sources', sources: json.sources || [] })
    onEvent({ type: 'token', token: json.answer || json.error || 'No answer.' })
    return
  }

  if (!res.ok || !res.body) {
    throw new Error(`Request failed: ${res.status}`)
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { value, done } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const events = buffer.split('\n\n')
    buffer = events.pop() ?? ''

    for (const event of events) {
      const line = event.trim()
      if (!line.startsWith('data:')) continue

      const payload = line.replace(/^data:\s*/, '')
      if (payload === '[DONE]') return

      onEvent(JSON.parse(payload))
    }
  }
}
