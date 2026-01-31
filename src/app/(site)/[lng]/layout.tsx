import type { Metadata } from 'next'

import { getTranslations } from '@/i18n/server'
import { AppBarFront } from '@/ui/components/app-bar-front'
import { ConsoleCredit } from '@/ui/components/console-credit'
import { SiteFooter } from '@/ui/components/site-footer'
import { EarlyThemeDetector } from '@/ui/theme/early-theme-detector'
import { Providers } from './providers'

/**
 * Global style sheet, inside of which are uikit,
 * tailwind, app and other imports. Wrapping them in
 * global.css reduces the number of CSS postcss pipeline
 * iterations to one (as opposed to O(n)).
 */
import '@/ui/styles/global.css'

// import { StatusBanner } from '@/ui/components/status-banner'
import type { Locale } from '@/i18n/i18n-config'

export const metadata: Metadata = {
  title: 'Modulus Learning',
  description:
    'Modulus provides activity analytics for open education. An assignment-grade database designed to track progress on Ximera assignments.',
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[lng]'>): Promise<React.JSX.Element> {
  const { lng } = (await params) as { lng: Locale }
  const translations = await getTranslations(lng)
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Modulus Learning" />
        <meta name="color-scheme" content="dark light" />
        <EarlyThemeDetector force="dark" />
      </head>
      <body className="bg-white dark:bg-canvas-900 relative">
        <Providers translations={translations}>
          <div className="layout-container relative flex min-h-screen flex-col">
            {/* <StatusBanner /> */}
            <AppBarFront lng={lng} />
            <main className="flex flex-1 flex-col">{children}</main>
            <SiteFooter lng={lng} />
          </div>
        </Providers>
      </body>
      <ConsoleCredit />
    </html>
  )
}
