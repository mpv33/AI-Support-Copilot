import ChatLayout from '../../components/ChatLayout'
import SupportCopilot from '../../components/SupportCopilot'

export const metadata = {
  title: 'Chat | InterviewPro.info Help Desk',
  description: 'InterviewPro.info help desk with grounded answers from help articles.',
}

export default function ChatPage() {
  return (
    <ChatLayout>
      <SupportCopilot />
    </ChatLayout>
  )
}
