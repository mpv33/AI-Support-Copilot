import './globals.css'
import { themeInitScript } from '../lib/theme'

export const metadata = {
  title: 'AI Support Copilot',
  description: 'AI support assistant with grounded answers from your documentation.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
