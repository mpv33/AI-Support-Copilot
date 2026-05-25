import { portfolioSkills } from './skillsMatrix'

export const appNav = [
  { href: '/', label: 'Home' },
  { href: '/chat', label: 'Chat' },
]

export const productNav = [
  { href: '/#overview', label: 'Overview' },
  { href: '/skills', label: 'Gen AI topics' },
]

export const footerLinks = [
  { href: '/instructions', label: 'Setup' },
  { href: '/about', label: 'Architecture' },
  { href: '/features', label: 'Features' },
  { href: '/skills', label: 'All 13 topics' },
]

export const landingOverview = {
  what:
    'A support copilot that searches your help docs before answering — with sources shown. Also a hands-on Gen AI project: RAG, agents, streaming UI, and safety on a real backend.',
  steps: [
    { title: 'Open chat', text: 'Live demo or local — no docs to read first.' },
    { title: 'Ask', text: 'Tap an example or type your question.' },
    { title: 'Check sources', text: 'Streamed answer + cited articles.' },
  ],
  why: [
    { title: 'Grounded', text: 'Retrieval before generation — fewer made-up answers.' },
    { title: 'Production-shaped', text: 'Tools, guardrails, and evals — not one API call.' },
    { title: 'Learn by doing', text: '13 Gen AI topics with code you can run and explain.' },
  ],
  flow: ['Ask', 'Search docs', 'AI on server', 'Stream + cite'],
}

export const landingLearn = {
  title: 'Going deeper?',
  text: 'Architecture, features, and all 13 topics with file paths — on the skills page.',
  cta: 'View skills map',
  href: '/skills',
}

export const landingSkills = portfolioSkills.map((s) => ({
  id: s.id,
  name: s.topic,
  used: s.explore,
}))

export { demoPrompts, quickStartPrompts, sidebarExamples } from './chatGuide'
