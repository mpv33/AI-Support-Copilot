/** Business email for custom-build enquiries. */
export const PARTNERSHIP_CONTACT_EMAIL = 'mateshwari33@gmail.com'

export const partnership = {
  eyebrow: 'For teams & businesses',
  title: 'Ship a branded AI copilot for your organization',
  subtitle:
    'End-to-end design and deployment of document-grounded chat — your logo, your content, production-ready infrastructure.',
  highlights: [
    'Customer & product support',
    'Embeddable SDK for any platform',
    'White-label platforms',
  ],
  contactLabel: 'Start a conversation',
  contactHint: 'Share your use case — we’ll reply within 24 hours.',
  cta: {
    getHref() {
      const subject = encodeURIComponent('AI Support Copilot — project enquiry')
      if (PARTNERSHIP_CONTACT_EMAIL) {
        return `mailto:${PARTNERSHIP_CONTACT_EMAIL}?subject=${subject}`
      }
      return `mailto:?subject=${subject}`
    },
  },
}
