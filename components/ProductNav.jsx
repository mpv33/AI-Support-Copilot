'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { appBrand, appNav } from '../content/siteConfig'
import ThemeToggle from './ThemeToggle'

function isNavActive(pathname, href) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

const linkClass = (active) =>
  `text-sm no-underline transition ${
    active
      ? 'font-medium text-zinc-900 dark:text-zinc-100'
      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
  }`

const mobileLinkClass = (active) =>
  `block py-2.5 text-sm no-underline ${
    active
      ? 'font-medium text-zinc-900 dark:text-zinc-100'
      : 'text-zinc-700 dark:text-zinc-300'
  }`

function NavLink({ item, pathname, onNavigate, mobile = false }) {
  const active = isNavActive(pathname, item.href)
  return (
    <Link
      href={item.href}
      className={mobile ? mobileLinkClass(active) : linkClass(active)}
      onClick={onNavigate}
    >
      {item.label}
    </Link>
  )
}

export default function ProductNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 no-underline"
          onClick={close}
          title="Home"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
            AI
          </span>
          <span className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {appBrand.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Main">
          {appNav.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-zinc-100 px-4 py-3 dark:border-zinc-800 md:hidden"
          aria-label="Main mobile"
        >
          <NavLink item={{ href: '/', label: 'Home' }} pathname={pathname} onNavigate={close} mobile />
          {appNav.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} onNavigate={close} mobile />
          ))}
        </nav>
      )}
    </header>
  )
}
