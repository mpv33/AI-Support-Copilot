/**
 * Platform configuration — AI Support Copilot.
 */
export const platformConfig = {
  brand: {
    name: 'AI Support Copilot',
    shortName: 'Support Copilot',
    tagline: 'Upload any file. Chat with AI.',
    description:
      'Upload PDF, text, or JSON and chat with AI Support Copilot about your file — like ChatGPT, grounded in your documents with cited answers.',
  },

  nav: [
    { href: '/chat', label: 'Chat' },
    { href: '/usage', label: 'Usage' },
    { href: '/docs', label: 'Guide' },
  ],

  features: {
    publicDemo: true,
    agentTools: false,
  },

  demo: {
    enabled: true,
    workspace: {
      name: 'AI Support Copilot',
      tagline: 'Chat powered by your files',
      welcomeMessage:
        'Upload any file in the sidebar — then ask AI Support Copilot anything about it, like ChatGPT but grounded in your upload.',
    },
  },
}

export const appBrand = platformConfig.brand
export const appNav = platformConfig.nav
