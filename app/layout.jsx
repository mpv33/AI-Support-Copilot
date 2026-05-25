import './globals.css'
import ThemeProvider from '../components/ThemeProvider'
import { themeInitScript } from '../lib/theme'

export const metadata = {
  title: 'AI Support Copilot',
  description: 'AI support assistant with grounded answers from your documentation.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
