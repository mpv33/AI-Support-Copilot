'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  DEFAULT_USD_TO_INR,
  envVarRows,
  formatTotalVolumePrice,
  formatVolumePrice,
  modelCatalog,
  modelPricingMeta,
  usageScenarioRows,
} from '../content/modelPricing'
import { productDocs as docs } from '../content/productDocs'

function SectionHeading({ id, title, children }) {
  return (
    <header id={id} className="scroll-mt-24 border-b border-zinc-200 pb-3 dark:border-zinc-800">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">{title}</h2>
      {children && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{children}</p>
      )}
    </header>
  )
}

function StepList({ steps }) {
  return (
    <ol className="mt-4 space-y-3">
      {steps.map((item, i) => (
        <li key={item.step} className="flex gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[11px] font-semibold text-brand">
            {i + 1}
          </span>
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.step}</p>
            <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">{item.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function FaqItem({ question, answer }) {
  return (
    <details className="group rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-zinc-900 marker:hidden dark:text-zinc-100 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-3">
          {question}
          <span className="shrink-0 text-zinc-400 transition group-open:rotate-45">+</span>
        </span>
      </summary>
      <p className="border-t border-zinc-100 px-4 py-3 text-sm leading-relaxed text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        {answer}
      </p>
    </details>
  )
}

function OptionalSection({ id, title, summary, children }) {
  return (
    <details
      id={id}
      className="group scroll-mt-24 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
    >
      <summary className="cursor-pointer list-none px-4 py-4 marker:hidden [&::-webkit-details-marker]:hidden">
        <span className="flex items-start justify-between gap-3">
          <span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</span>
            <span className="ml-2 text-[10px] font-medium uppercase tracking-wide text-zinc-400">Optional</span>
            {summary && (
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{summary}</p>
            )}
          </span>
          <span className="mt-0.5 shrink-0 text-zinc-400 transition group-open:rotate-45">+</span>
        </span>
      </summary>
      <div className="border-t border-zinc-100 px-4 py-4 dark:border-zinc-800">{children}</div>
    </details>
  )
}

function DocsTable({ children, minWidth = '32rem' }) {
  return (
    <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
      <table className="w-full text-left text-sm" style={{ minWidth }}>
        {children}
      </table>
    </div>
  )
}

function FullModelPriceTable() {
  return (
    <DocsTable minWidth="44rem">
      <thead>
        <tr className="border-b border-zinc-200 text-[10px] text-zinc-500 dark:border-zinc-800">
          <th className="pb-2 pr-3 text-left font-medium" rowSpan={2}>
            Model
          </th>
          <th className="pb-2 pr-3 text-left font-medium" rowSpan={2}>
            Type
          </th>
          <th className="pb-1 text-center font-medium" colSpan={2}>
            Input · 1M tokens
          </th>
          <th className="pb-1 text-center font-medium" colSpan={2}>
            Output · 1M tokens
          </th>
          <th className="pb-1 text-center font-medium" colSpan={2}>
            Total · 1M tokens
          </th>
        </tr>
        <tr className="border-b border-zinc-200 text-[10px] text-zinc-400 dark:border-zinc-800">
          <th className="pb-2 pr-2 font-normal">USD</th>
          <th className="pb-2 pr-2 font-normal">INR</th>
          <th className="pb-2 pr-2 font-normal">USD</th>
          <th className="pb-2 pr-2 font-normal">INR</th>
          <th className="pb-2 pr-2 font-normal">USD</th>
          <th className="pb-2 font-normal">INR</th>
        </tr>
      </thead>
      <tbody>
        {modelCatalog.map((row) => {
          const in1m = formatVolumePrice(row.inputPerMillion, 1)
          const out1m = formatVolumePrice(row.outputPerMillion, 1)
          const total1m = formatTotalVolumePrice(row.inputPerMillion, row.outputPerMillion, 1)
          return (
            <tr
              key={row.model}
              className={`border-b border-zinc-100 dark:border-zinc-900 ${
                row.recommended ? 'bg-brand/5 dark:bg-brand/10' : ''
              }`}
            >
              <td className="py-2.5 pr-3 font-mono text-xs font-medium text-zinc-900 dark:text-zinc-100">
                {row.model}
                {row.recommended && (
                  <span className="ml-1 block text-[10px] font-medium text-brand sm:inline">· default</span>
                )}
              </td>
              <td className="py-2.5 pr-3 text-xs text-zinc-500">{row.type}</td>
              <td className="py-2.5 pr-2 font-mono text-[11px] text-zinc-800 dark:text-zinc-200">{in1m.usd}</td>
              <td className="py-2.5 pr-2 font-mono text-[11px] text-zinc-500">{in1m.inr}</td>
              <td className="py-2.5 pr-2 font-mono text-[11px] text-zinc-800 dark:text-zinc-200">{out1m.usd}</td>
              <td className="py-2.5 pr-2 font-mono text-[11px] text-zinc-500">{out1m.inr}</td>
              <td className="py-2.5 pr-2 font-mono text-[11px] font-medium text-zinc-900 dark:text-zinc-100">{total1m.usd}</td>
              <td className="py-2.5 pr-2 font-mono text-[11px] font-medium text-zinc-600 dark:text-zinc-400">{total1m.inr}</td>
            </tr>
          )
        })}
      </tbody>
    </DocsTable>
  )
}

export default function ProductDocs() {
  const [activeId, setActiveId] = useState('overview')
  const { meta, toc, overview, quickStart, demo, usage, api, faq, technical } = docs

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    const target = hash === 'model-pricing' ? 'pricing' : hash
    if (target === 'technical') {
      document.getElementById(target)?.setAttribute('open', '')
      setActiveId(target)
    } else if (target === 'pricing' || target === 'model-pricing') {
      setActiveId('pricing')
    }
  }, [])

  useEffect(() => {
    const headings = toc.map((s) => document.getElementById(s.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-15% 0px -75% 0px', threshold: 0 },
    )
    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [toc])

  return (
    <div className="pb-16 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
      <div className="mb-6 lg:hidden">
        <label htmlFor="docs-toc" className="sr-only">
          Jump to section
        </label>
        <select
          id="docs-toc"
          value={activeId}
          onChange={(e) => {
            const id = e.target.value
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setActiveId(id)
          }}
          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
        >
          {toc.map((item) => (
            <option key={item.id} value={item.id}>
              {item.optional ? `${item.label} (optional)` : item.label}
            </option>
          ))}
        </select>
      </div>

      <aside className="hidden lg:block">
        <nav className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto" aria-label="Table of contents">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">On this page</p>
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block rounded-md py-1.5 text-sm no-underline transition ${
                activeId === item.id
                  ? 'font-medium text-brand'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
              } ${item.optional ? 'text-zinc-400' : ''}`}
            >
              {item.label}
              {item.optional && <span className="ml-1 text-[10px]">· optional</span>}
            </a>
          ))}
          <div className="mt-6 space-y-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <Link href="/chat" className="block text-sm font-medium text-brand no-underline hover:underline">
              Open chat →
            </Link>
            <Link href="/usage" className="block text-sm text-zinc-600 no-underline hover:text-brand dark:text-zinc-400">
              Usage dashboard →
            </Link>
          </div>
        </nav>
      </aside>

      <article className="min-w-0 max-w-3xl">
        <header className="mb-10">
          <p className="text-xs font-medium uppercase tracking-wider text-brand">{meta.product}</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            {meta.title}
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{meta.subtitle}</p>
        </header>

        <section className="mb-10">
          <SectionHeading id="overview" title="Overview">
            {overview.summary}
          </SectionHeading>
          <ul className="mt-4 space-y-2">
            {overview.highlights.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <SectionHeading id="quick-start" title="Quick start" />
          <StepList steps={quickStart.steps} />
        </section>

        <section className="mb-10">
          <SectionHeading id="free-trial" title="Chat (/chat)">
            {demo.intro}
          </SectionHeading>
          <StepList steps={demo.steps} />
          <ul className="mt-5 space-y-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/40">
            {demo.limits.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/chat" className="mt-4 inline-block text-sm font-medium text-brand no-underline hover:underline">
            Open /chat →
          </Link>
        </section>

        <section className="mb-10">
          <SectionHeading id="usage" title="Usage dashboard">
            {usage.intro}
          </SectionHeading>
          <ul className="mt-4 space-y-2">
            {usage.points.map((point) => (
              <li key={point} className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                {point}
              </li>
            ))}
          </ul>
          <Link href="/usage" className="mt-4 inline-block text-sm font-medium text-brand no-underline hover:underline">
            Open /usage →
          </Link>
        </section>

        <section className="mb-10">
          <SectionHeading id="api" title="API routes">
            {api.intro}
          </SectionHeading>
          <div className="mt-4 space-y-3">
            {api.routes.map((route) => (
              <div
                key={route.path}
                className="rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <p className="font-mono text-sm text-brand">
                  {route.method} {route.path}
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{route.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">{api.envNote}</p>
        </section>

        <section className="mb-10">
          <SectionHeading id="faq" title="FAQ" />
          <div className="mt-4 space-y-2">
            {faq.map((item) => (
              <FaqItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading id="pricing" title={modelPricingMeta.title}>
            {modelPricingMeta.intro}
          </SectionHeading>

          <p className="mt-4 text-xs text-zinc-500">
            INR at ₹{DEFAULT_USD_TO_INR}/USD · {modelPricingMeta.formula}
          </p>

          <div className="mt-5">
            <FullModelPriceTable />
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Total = input + output at 1M tokens each. Embedding models are input-only (output —).
            Reasoning models may bill extra hidden tokens. Defaults:{' '}
            <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">gpt-4o-mini</code>,{' '}
            <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">text-embedding-3-small</code>.
          </p>

          <Link
            href="/usage"
            className="mt-4 inline-block text-sm font-medium text-brand no-underline hover:underline"
          >
            Usage dashboard →
          </Link>

          <details className="mt-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Example costs &amp; configuration
            </summary>
            <div className="border-t border-zinc-100 px-4 py-4 dark:border-zinc-800">
              <DocsTable minWidth="28rem">
                <thead>
                  <tr className="border-b border-zinc-200 text-[11px] text-zinc-500 dark:border-zinc-800">
                    <th className="pb-2 pr-3 font-medium">Action</th>
                    <th className="pb-2 pr-3 font-medium">USD</th>
                    <th className="pb-2 font-medium">INR</th>
                  </tr>
                </thead>
                <tbody>
                  {usageScenarioRows.map((row) => (
                    <tr key={row.action} className="border-b border-zinc-100 dark:border-zinc-900">
                      <td className="py-2 pr-3 text-xs text-zinc-700 dark:text-zinc-300">{row.action}</td>
                      <td className="py-2 pr-3 font-mono text-xs">{row.estUsd}</td>
                      <td className="py-2 font-mono text-xs">{row.estInr}</td>
                    </tr>
                  ))}
                </tbody>
              </DocsTable>

              <DocsTable minWidth="28rem">
                <thead>
                  <tr className="border-b border-zinc-200 text-[11px] text-zinc-500 dark:border-zinc-800">
                    <th className="pb-2 pr-3 font-medium">Env variable</th>
                    <th className="pb-2 pr-3 font-medium">Default</th>
                    <th className="pb-2 font-medium">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {envVarRows.map((row) => (
                    <tr key={row.variable} className="border-b border-zinc-100 dark:border-zinc-900">
                      <td className="py-2 pr-3 font-mono text-xs text-brand">{row.variable}</td>
                      <td className="py-2 pr-3 font-mono text-xs">{row.default}</td>
                      <td className="py-2 text-xs text-zinc-500">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </DocsTable>
            </div>
          </details>
        </section>

        <section className="mb-6">
          <OptionalSection id="technical" title={technical.title} summary={technical.intro}>
            <ol className="space-y-3">
              {technical.steps.map((item, i) => (
                <li key={item.step} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[11px] font-semibold text-zinc-500 dark:bg-zinc-800">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.step}</p>
                    <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </OptionalSection>
        </section>
      </article>
    </div>
  )
}
