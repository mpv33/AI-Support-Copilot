import { author } from '../../content/author'
import { landing } from '../../content/landing'

const { chatPreview } = landing

export default function ChatPreview() {
  return (
    <div className="relative mx-auto w-full">
      <div
        className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-brand/10 to-transparent blur-2xl dark:from-brand/15"
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xl shadow-zinc-200/60 ring-1 ring-zinc-900/5 dark:border-zinc-700 dark:bg-zinc-950 dark:shadow-none dark:ring-zinc-700/50">
        <div className="flex items-center gap-3 border-b border-zinc-100 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/80">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-xs font-semibold text-white">
            {author.name[0]}
          </span>
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {chatPreview.portalName}
            </p>
            <p className="text-xs text-zinc-500">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">{author.name}</span>
              <span className="text-zinc-300 dark:text-zinc-600"> · </span>
              {chatPreview.portalTagline}
            </p>
          </div>
          <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
            Online
          </span>
        </div>

        <div className="border-b border-zinc-100 bg-zinc-50/50 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-900/30">
          <p className="text-left text-[10px] font-medium uppercase tracking-wide text-zinc-400">Uploaded</p>
          <p className="mt-0.5 truncate text-left text-xs font-medium text-zinc-700 dark:text-zinc-300">
            {chatPreview.uploadedFile}
          </p>
        </div>

        <div className="space-y-4 bg-zinc-50/50 px-4 py-5 dark:bg-zinc-900/30">
          <div className="flex justify-end">
            <div className="max-w-[88%] rounded-2xl rounded-tr-sm bg-zinc-900 px-3.5 py-2.5 text-sm leading-relaxed text-white shadow-sm dark:bg-zinc-800">
              {chatPreview.userMessage}
            </div>
          </div>

          <div className="max-w-[92%] text-left">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-[10px] font-semibold text-brand">
                {author.name[0]}
              </span>
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{author.name}</p>
            </div>
            <div className="rounded-2xl rounded-tl-sm border border-zinc-100 bg-white px-3.5 py-3 text-sm leading-relaxed text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <p className="whitespace-pre-wrap">{chatPreview.assistantMessage}</p>
              <div className="mt-3 border-t border-zinc-100 pt-2.5 dark:border-zinc-800">
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                  Sources
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {chatPreview.sources.map((title) => (
                    <span
                      key={title}
                      className="rounded-md bg-brand/5 px-2 py-0.5 text-[11px] font-medium text-brand ring-1 ring-brand/15 dark:bg-brand/10 dark:ring-brand/25"
                    >
                      {title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-100 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-900">
            <span className="flex-1 text-left text-xs text-zinc-400">{chatPreview.inputPlaceholder}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
