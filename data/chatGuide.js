/** InterviewPro.info Help Desk — example questions */

import { interviewProBrand } from './siteConfig'

export const supportAssistant = {
  name: 'mateshwari',
  role: 'Support specialist',
  greeting: `Hi! I'm **mateshwari** from ${interviewProBrand.name} support.\n\nHow can I help you today?`,
}

export const sidebarExamples = [
  {
    label: 'ResumePro',
    prompt: 'How does ResumePro score my resume against a job description?',
  },
  {
    label: 'EvalPro',
    prompt: 'How does EvalPro evaluate my machine coding submission?',
  },
  {
    label: 'Sign in',
    prompt: 'Do I need an account to save progress on InterviewPro.info?',
  },
  {
    label: 'A2Z Frontend',
    prompt: 'What topics are covered in the A2Z Frontend track?',
  },
  {
    label: 'Machine Coding',
    prompt: 'What is machine coding practice on InterviewPro.info?',
  },
  {
    label: 'DSA',
    prompt: 'How many DSA problems are available and can I filter by company?',
  },
  {
    label: 'Progress',
    prompt: 'What is the progress dashboard and how do I open it?',
  },
  {
    label: 'Gen AI track',
    prompt: 'What is included in the Gen AI Fundamentals track?',
  },
  {
    label: 'FAQ',
    prompt: 'How is InterviewPro different from LeetCode?',
  },
  {
    label: 'Check subscription',
    prompt: 'Is my InterviewPro.info Pro subscription active?',
  },
]

export const sidebarCopy = {
  examplesTitle: 'Popular questions',
  intro: 'Ask anything about InterviewPro.info.',
  tip: 'You can ask follow-up questions in the same chat.',
}

export const quickStartPrompts = sidebarExamples.slice(0, 4)

export const chatWelcome = {
  title: 'How can we help?',
  body: 'Ask about learning tracks, tools, sign-in, or your progress dashboard.',
  inputHint: 'Press Enter to send',
  placeholder: 'Type your question…',
}
