import { getTranslations } from '@/i18n/server'
import { AppBarFront } from '@/ui/components/app-bar-front'
import { ConsoleCredit } from '@/ui/components/console-credit'
import { SiteFooter } from '@/ui/components/site-footer'
import { ClientThemeDetector } from '@/ui/theme/client-theme-detector'
import { EarlyThemeDetection } from '@/ui/theme/early-theme-detector'
import { Providers } from './providers'

import type { Metadata } from 'next'

import './global.css'

export const metadata: Metadata = {
  title: 'Modulus Registry',
  description:
    'Modulus Learning registry application that is used to announce all known Modulus installations.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const translations = await getTranslations('en')
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Modulus" />
        <meta name="color-scheme" content="dark light" />
        <EarlyThemeDetection force="dark" />
      </head>
      <body className="bg-white dark:bg-canvas-900 relative">
        <ClientThemeDetector force="dark" />
        <Providers translations={translations}>
          <div className="layout-container relative flex min-h-screen flex-col">
            <AppBarFront lng="en" />
            <main className="flex flex-1 flex-col">{children}</main>
            <SiteFooter lng="en" />
          </div>
        </Providers>
      </body>
      <ConsoleCredit />
    </html>
  )
}
