export default function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl lg:text-[1.75rem]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{subtitle}</p>
      ) : null}
    </div>
  )
}
