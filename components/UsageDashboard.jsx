'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import {
  buildChartSlices,
  ChartLegend,
  DonutChart,
  SpendAreaChart,
} from './usage/UsageCharts'
import { formatCompactTokenCount } from '../lib/ai/llm'
import { formatInr, formatUsd } from '../lib/core/pricing'

const PERIODS = [
  { days: 7, label: '7 days' },
  { days: 30, label: '30 days' },
  { days: 90, label: '90 days' },
]

const ENDPOINT_LABELS = {
  chat_stream: 'Chat',
  chat_plan: 'Planning',
  embedding: 'Embeddings',
}

function humanEndpoint(name) {
  return ENDPOINT_LABELS[name] || name
}

function formatTokens(n) {
  return (n ?? 0).toLocaleString()
}

function formatRelativeTime(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function Stat({ label, value, sub }) {
  return (
    <div className="px-5 py-4 sm:px-6 sm:py-5">
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{value}</p>
      {sub ? <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{sub}</p> : null}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white px-6 py-16 text-center dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">No usage yet</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
        Chat sessions and token costs appear here after you use{' '}
        <Link href="/chat" className="font-medium text-brand no-underline hover:underline">
          Chat
        </Link>
        .
      </p>
    </div>
  )
}

function ChartCard({ title, hint, children }) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
      {hint ? <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{hint}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default function UsageDashboard() {
  const [data, setData] = useState(null)
  const [days, setDays] = useState(30)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [tokenBudget, setTokenBudget] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [{ getClientUsageDashboard }, { fetchDemoGuestBudgetFromServer }] = await Promise.all([
        import('../lib/core/clientUsageStore.js'),
        import('../lib/demo/demoTokenBudget.js'),
      ])
      setData(await getClientUsageDashboard({ days }))
      setTokenBudget(await fetchDemoGuestBudgetFromServer())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [days])

  useEffect(() => {
    load()
  }, [load])

  const hasUsage = data && data.totals.requests > 0

  const endpointSlices = data
    ? buildChartSlices(data.byEndpoint, 'costUsd', (row) => humanEndpoint(row.endpoint), formatUsd)
    : []

  const modelSlices = data
    ? buildChartSlices(data.byModel, 'costUsd', (row) => row.model, formatUsd)
    : []

  const tokenSlices = data
    ? [
        {
          label: 'Input',
          value: data.totals.inputTokens,
          color: '#10a37f',
          display: formatTokens(data.totals.inputTokens),
        },
        {
          label: 'Output',
          value: data.totals.outputTokens,
          color: '#6366f1',
          display: formatTokens(data.totals.outputTokens),
        },
      ].filter((s) => s.value > 0)
    : []

  const barPoints =
    data?.dailySeries?.map((day) => ({
      key: day.date,
      label: day.date,
      value: day.costUsd,
    })) ?? []

  return (
    <div className="pb-12">
      <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
            Usage
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            OpenAI tokens and estimated cost · stored in this browser
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 dark:border-zinc-700 dark:bg-zinc-900">
            {PERIODS.map(({ days: d, label }) => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  days === d
                    ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="rounded-lg border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            Refresh
          </button>
        </div>
      </header>

      {tokenBudget && (
        <div className="mb-6 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950 sm:p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Free trial budget</p>
              <p className="mt-1 font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {formatCompactTokenCount(tokenBudget.used)}{' '}
                <span className="text-sm font-normal text-zinc-400">/</span>{' '}
                {formatCompactTokenCount(tokenBudget.budget)}
              </p>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {tokenBudget.exceeded
                ? 'Limit reached for this device / network'
                : `${formatCompactTokenCount(tokenBudget.remaining)} remaining`}
            </p>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className={`h-full rounded-full transition-all ${
                tokenBudget.exceeded ? 'bg-red-500' : 'bg-brand'
              }`}
              style={{
                width: `${Math.min(100, (tokenBudget.used / tokenBudget.budget) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {loading && !data ? (
        <div className="animate-pulse space-y-4">
          <div className="h-28 rounded-xl bg-zinc-100 dark:bg-zinc-900" />
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="h-56 rounded-xl bg-zinc-100 dark:bg-zinc-900" />
            <div className="h-56 rounded-xl bg-zinc-100 dark:bg-zinc-900" />
            <div className="h-56 rounded-xl bg-zinc-100 dark:bg-zinc-900" />
          </div>
        </div>
      ) : null}

      {error && !data ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}

      {data && !hasUsage ? <EmptyState /> : null}

      {data && hasUsage ? (
        <div className="space-y-6">
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <div className="grid divide-y divide-zinc-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-zinc-800">
              <Stat
                label="Estimated spend"
                value={formatUsd(data.totals.costUsd)}
                sub={formatInr(data.totals.costInr)}
              />
              <Stat
                label="Total tokens"
                value={formatTokens(data.totals.totalTokens)}
                sub={`${formatTokens(data.totals.inputTokens)} in · ${formatTokens(data.totals.outputTokens)} out`}
              />
              <Stat label="API requests" value={formatTokens(data.totals.requests)} sub={`Last ${days} days`} />
            </div>
          </div>

          <ChartCard title="Daily spend" hint="Estimated USD · hover points for details">
            <SpendAreaChart
              points={barPoints}
              formatLabel={(date) =>
                new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                })
              }
              formatValue={formatUsd}
            />
          </ChartCard>

          <div className="grid gap-6 lg:grid-cols-2">
            <ChartCard title="Cost by type" hint="Share of spend by endpoint">
              <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-6">
                <DonutChart
                  slices={endpointSlices}
                  centerLabel={formatUsd(data.totals.costUsd)}
                  centerSub="total"
                />
                <div className="w-full min-w-0 flex-1">
                  <ChartLegend items={endpointSlices} />
                </div>
              </div>
            </ChartCard>

            <ChartCard title="Cost by model" hint="Share of spend by model">
              <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-6">
                <DonutChart
                  slices={modelSlices}
                  centerLabel={String(data.byModel.length)}
                  centerSub="models"
                />
                <div className="w-full min-w-0 flex-1">
                  <ChartLegend items={modelSlices} />
                </div>
              </div>
            </ChartCard>
          </div>

          {tokenSlices.length > 0 ? (
            <ChartCard title="Token split" hint="Input vs output tokens">
              <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-8">
                <DonutChart
                  slices={tokenSlices}
                  size={140}
                  centerLabel={formatCompactTokenCount(data.totals.totalTokens)}
                  centerSub="tokens"
                />
                <ChartLegend items={tokenSlices} />
              </div>
            </ChartCard>
          ) : null}

          <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <div className="border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Recent requests</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50/50 text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/30">
                    <th className="px-5 py-2.5 font-medium">Time</th>
                    <th className="px-5 py-2.5 font-medium">Type</th>
                    <th className="px-5 py-2.5 font-medium">Model</th>
                    <th className="px-5 py-2.5 text-right font-medium">Tokens</th>
                    <th className="px-5 py-2.5 text-right font-medium">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recent.slice(0, 15).map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-zinc-50 last:border-0 dark:border-zinc-900"
                    >
                      <td className="whitespace-nowrap px-5 py-3 text-xs text-zinc-500">
                        {formatRelativeTime(row.timestamp)}
                      </td>
                      <td className="px-5 py-3 text-xs text-zinc-700 dark:text-zinc-300">
                        {humanEndpoint(row.endpoint)}
                      </td>
                      <td className="px-5 py-3 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                        {row.model}
                      </td>
                      <td className="px-5 py-3 text-right font-mono text-xs tabular-nums text-zinc-600 dark:text-zinc-400">
                        {formatTokens(row.totalTokens)}
                      </td>
                      <td className="px-5 py-3 text-right font-mono text-xs text-zinc-800 dark:text-zinc-200">
                        {formatUsd(row.costUsd)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Estimates use published OpenAI rates.{' '}
            <Link href="/docs#pricing" className="text-brand no-underline hover:underline">
              View pricing
            </Link>
          </p>
        </div>
      ) : null}
    </div>
  )
}
