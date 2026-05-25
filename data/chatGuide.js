/** End-user copy for /chat */

export const sidebarExamples = [
  { label: 'Refund policy', prompt: 'What is the refund policy for annual and monthly plans?' },
  { label: 'Refund after 20 days', prompt: 'Can I get a refund on an annual plan purchased 20 days ago?' },
  { label: 'AUTH_403 error', prompt: 'Why do I see AUTH_403 on the dashboard?' },
  { label: 'Order 123 status', prompt: 'Where is order 123?' },
  { label: 'Draft refund reply', prompt: 'Draft a support reply about refund policy.' },
  { label: 'Role change / access', prompt: 'User cannot access dashboard after a role update. What should they try?' },
]

export const sidebarCopy = {
  examplesTitle: 'Try an example',
  intro: 'Tap to send — or type your own question.',
  tip: 'Tip: include plan type, error code, or order ID.',
}

export const quickStartPrompts = sidebarExamples.slice(0, 4)

export const chatWelcome = {
  title: 'How can I help?',
  body: 'Answers come from support articles in this demo. Pick an example or ask below.',
  inputHint: 'Type a question — or use examples in the sidebar',
  placeholder: 'Refund policy, AUTH_403, order 123…',
}

export const demoPrompts = sidebarExamples.map((e) => e.prompt)
