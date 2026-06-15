import { handleDemoChat } from '../../../lib/api/demoChat.js'

export const runtime = 'nodejs'

export async function POST(request) {
  return handleDemoChat(request)
}
