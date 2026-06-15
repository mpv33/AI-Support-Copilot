import ProductNav from './ProductNav'

export default function PageShell({ children, landing = false, wide = false }) {
  return (
    <div className="min-h-screen">
      <ProductNav />
      <main
        className={
          landing
            ? ''
            : wide
              ? 'mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10'
              : 'mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10'
        }
      >
        {children}
      </main>
    </div>
  )
}
