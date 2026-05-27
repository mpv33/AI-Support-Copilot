import { landingOverview } from '../data/siteConfig'
import { supportAssistant } from '../data/chatGuide'

const { chatPreview } = landingOverview

export default function LandingChatPreview() {
  return (
    <div className="relative mx-auto w-full">
      <div
        className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-brand/10 to-transparent blur-2xl dark:from-brand/15"
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xl shadow-zinc-200/60 ring-1 ring-zinc-900/5 dark:border-zinc-700 dark:bg-zinc-950 dark:shadow-none dark:ring-zinc-700/50">
        <div className="flex items-center gap-3 border-b border-zinc-100 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/80">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {supportAssistant.name}
            </p>
            <p className="text-xs text-zinc-500">Support · InterviewPro.info</p>
          </div>
          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
            Online
          </span>
        </div>

        <div className="space-y-4 bg-zinc-50/50 px-4 py-5 dark:bg-zinc-900/30">
          <div className="flex justify-end">
            <div className="max-w-[88%] rounded-2xl rounded-tr-sm bg-zinc-900 px-3.5 py-2.5 text-sm leading-relaxed text-white shadow-sm dark:bg-zinc-800">
              {chatPreview.userMessage}
            </div>
          </div>

          <div className="max-w-[92%]">
            <p className="mb-1.5 text-xs font-medium text-zinc-500">{supportAssistant.name}</p>
            <div className="rounded-2xl rounded-tl-sm border border-zinc-100 bg-white px-3.5 py-3 text-sm leading-relaxed text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <p className="whitespace-pre-wrap">{chatPreview.assistantMessage}</p>
              <div className="mt-3 border-t border-zinc-100 pt-2.5 dark:border-zinc-800">
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                  Sources
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {chatPreview.articles.map((title) => (
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
      </div>
    </div>
  )
}
