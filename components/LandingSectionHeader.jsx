export default function LandingSectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  children,
}) {
  const content = (
    <>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{subtitle}</p>
      )}
    </>
  )

  if (children) {
    return (
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">{content}</div>
        {children}
      </div>
    )
  }

  const alignClass = align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'

  return <div className={alignClass}>{content}</div>
}
