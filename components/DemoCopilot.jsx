'use client'

import { useEffect } from 'react'
import { useChatStore } from '../stores/chatStore'
import SupportCopilot from './SupportCopilot'

export default function DemoCopilot() {
  const configureDemo = useChatStore((s) => s.configureDemo)

  useEffect(() => {
    configureDemo()
  }, [configureDemo])

  return <SupportCopilot />
}
