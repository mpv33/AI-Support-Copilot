'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ChatMarkdown({ content }) {
  return (
    <div className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
          strong: ({ children }) => (
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">{children}</strong>
          ),
          em: ({ children }) => <em className="italic text-zinc-700 dark:text-zinc-300">{children}</em>,
          ul: ({ children }) => <ul className="mb-3 list-disc space-y-1.5 pl-5 last:mb-0">{children}</ul>,
          ol: ({ children }) => (
            <ol className="mb-3 list-decimal space-y-1.5 pl-5 last:mb-0">{children}</ol>
          ),
          li: ({ children }) => <li className="pl-0.5">{children}</li>,
          h1: ({ children }) => (
            <h3 className="mb-2 mt-4 text-base font-semibold text-zinc-900 first:mt-0 dark:text-zinc-100">
              {children}
            </h3>
          ),
          h2: ({ children }) => (
            <h3 className="mb-2 mt-4 text-base font-semibold text-zinc-900 first:mt-0 dark:text-zinc-100">
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="mb-2 mt-3 text-sm font-semibold text-zinc-900 first:mt-0 dark:text-zinc-100">
              {children}
            </h4>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand"
            >
              {children}
            </a>
          ),
          code: ({ className, children }) => {
            const isBlock = className?.includes('language-')
            if (isBlock) {
              return (
                <code className="block overflow-x-auto rounded-lg bg-zinc-900 px-3 py-2.5 font-mono text-xs leading-relaxed text-zinc-100">
                  {children}
                </code>
              )
            }
            return (
              <code className="rounded bg-zinc-200/80 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="mb-3 overflow-hidden rounded-lg last:mb-0">{children}</pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mb-3 border-l-2 border-brand/40 pl-3 text-zinc-600 italic last:mb-0 dark:text-zinc-400">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-4 border-zinc-200 dark:border-zinc-700" />,
          table: ({ children }) => (
            <div className="mb-3 overflow-x-auto last:mb-0">
              <table className="min-w-full text-left text-xs">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-zinc-200 bg-zinc-50 px-2 py-1.5 font-semibold dark:border-zinc-700 dark:bg-zinc-900">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-zinc-200 px-2 py-1.5 dark:border-zinc-700">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
