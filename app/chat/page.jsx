import ChatLayout from '../../components/ChatLayout'
import SupportCopilot from '../../components/SupportCopilot'

export const metadata = {
  title: 'Chat | Support Copilot',
  description: 'AI support copilot with grounded answers from your documentation.',
}

export default function ChatPage() {
  return (
    <ChatLayout>
      <SupportCopilot />
    </ChatLayout>
  )
}
