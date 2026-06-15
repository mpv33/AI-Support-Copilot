import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import ThemeProvider from '../components/ThemeProvider'
import VersionBanner from '../components/VersionBanner'
import { platformConfig } from '../platform/config.js'
import { themeInitScript } from '../lib/core/theme'

export const metadata = {
  title: `${platformConfig.brand.name} | ${platformConfig.brand.tagline}`,
  description: platformConfig.brand.description,
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col font-sans">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <VersionBanner />
        <ThemeProvider>
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
