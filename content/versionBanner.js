import packageJson from '../package.json' with { type: 'json' }

/** Top-of-site version banner — version synced from package.json. */
export const versionBanner = {
  version: packageJson.version,
  banner: {
    label: 'Public preview',
    action: 'View v2.0 roadmap',
  },
  docsHref: '/docs',
  docsLabel: 'Product guide',
  roadmap: {
    title: 'Platform roadmap',
    nextVersion: 'v2.0',
    intro:
      'The current release is a browser-first preview. The next version adds a production backend, persistent vector search, and an embeddable chat SDK for any platform.',
    items: [
      {
        title: 'Python & FastAPI',
        detail: 'Dedicated API for chat, ingestion, and administration.',
      },
      {
        title: 'Vector database',
        detail: 'Persistent embeddings with hybrid retrieval at scale.',
      },
      {
        title: 'Embeddable chat SDK',
        detail:
          'Drop-in script and components to add AI Support Copilot to any site or app — like Crisp or Intercom, with your docs and branding.',
      },
      {
        title: 'Managed knowledge base',
        detail: 'Cloud document indexing for teams and customers.',
      },
    ],
  },
}
