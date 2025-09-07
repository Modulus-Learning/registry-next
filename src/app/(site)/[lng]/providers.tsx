'use client'

import { DrawerProvider, ToastProvider, ToastViewport } from '@infonomic/uikit/react'
import { CookiesProvider } from 'react-cookie'
import { PublicConfigProvider } from '@/config/provider'
import { ProgressBarProvider } from '@/context/progress-bar-provider'
import { TranslationsProvider } from '@/i18n/client/translations-provider'
import { ThemeProvider } from '@/ui/theme/provider'
import { Theme } from '@/ui/theme/utils'

import type React from 'react'

import type { Translations } from '@/i18n/server'

export interface ProvidersProps {
  translations: Translations
  children: React.ReactNode
}

export function Providers({ translations, children }: ProvidersProps) {
  return (
    <PublicConfigProvider>
      <ThemeProvider force={Theme.DARK}>
        <ToastProvider swipeDirection="right">
          <ProgressBarProvider>
            <CookiesProvider defaultSetOptions={{ path: '/' }}>
              <DrawerProvider>
                <TranslationsProvider translations={translations}>{children}</TranslationsProvider>
              </DrawerProvider>
            </CookiesProvider>
          </ProgressBarProvider>
          <ToastViewport className="toast-viewport" />
        </ToastProvider>
      </ThemeProvider>
    </PublicConfigProvider>
  )
}
