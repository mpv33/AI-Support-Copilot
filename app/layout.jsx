import './globals.css'
import ThemeProvider from '../components/ThemeProvider'
import { themeInitScript } from '../lib/theme'

export const metadata = {
  title: 'AI Support Copilot | InterviewPro.info',
  description:
    'RAG-powered AI support for InterviewPro.info — grounded answers from Help Center articles with source citations.',
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
