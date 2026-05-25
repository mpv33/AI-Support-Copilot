export const supportDocs = [
  {
    id: 'billing-refunds-2026',
    tenantId: 'acme',
    title: 'Refund policy',
    url: '/docs/billing/refunds',
    text: `
Annual plans are refundable within 14 days of purchase.
Monthly plans are refundable within 7 days of purchase.
Refunds are returned to the original payment method.
Refund requests after the allowed window should be escalated to billing support.
    `,
  },
  {
    id: 'dashboard-auth-errors',
    tenantId: 'acme',
    title: 'Dashboard authorization errors',
    url: '/docs/dashboard/auth-errors',
    text: `
AUTH_403 means the user is authenticated but does not have permission for the requested dashboard.
Ask an organization admin to grant the required dashboard role.
If access was recently changed, the user should sign out and sign in again.
    `,
  },
  {
    id: 'support-reply-guidelines',
    tenantId: 'acme',
    title: 'Support reply guidelines',
    url: '/docs/support/replies',
    text: `
Support replies should be concise, polite, and specific.
When policy is involved, cite the relevant policy source.
Do not promise refunds, credits, or account changes unless a tool or policy confirms eligibility.
    `,
  },
]
