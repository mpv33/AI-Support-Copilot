import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    plan: 'InterviewPro.info Pro',
    status: 'active',
    renewsOn: '2026-04-01',
    cancelAtPeriodEnd: false,
    billingNote: 'Manage at interviewpro.info → Settings → Billing',
  })
}
