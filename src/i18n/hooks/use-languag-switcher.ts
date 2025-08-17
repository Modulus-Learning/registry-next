// src/hooks/useLanguageSwitcher.ts
'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { startTransition, useActionState } from 'react'

import type { Locale } from '@/i18n/i18n-config'
import { type SetLanguageActionState, setLanguageAction } from '@/i18n/set-language-action'

interface UseLanguageSwitcherProps {
  initialLocale: Locale
}

export function useLanguageSwitcher({ initialLocale }: UseLanguageSwitcherProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initialState: SetLanguageActionState = { message: undefined, status: 'idle' }
  const [state, dispatch] = useActionState(setLanguageAction, initialState)

  const switchLanguage = (lng: Locale) => {
    const data = new FormData()
    data.set('lng', lng)
    data.set('pathname', pathname)
    data.set('searchParams', searchParams.toString())

    startTransition(() => {
      dispatch(data)
    })
  }

  return {
    switchLanguage,
    currentLocale: initialLocale,
    status: state.status,
    message: state.message,
  }
}
