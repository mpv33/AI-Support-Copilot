import SiteNav from './SiteNav'

export default function PageShell({ children, landing = false }) {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className={landing ? '' : 'mx-auto max-w-5xl px-4 py-10 sm:px-6'}>
        {children}
      </main>
    </div>
  )
}
