import { type NextFetchEvent, type NextRequest, NextResponse } from 'next/server'

import { i18nConfig } from '@/i18n/i18n-config'
import { getSession } from '@/modules/admin/session/session'
import type { MiddlewareFactory } from './@types'
import { getLocale } from './withI18n/get-locale'

function containsAdmin(value: string) {
  const regex = /^(\/[a-zA-Z]{2})?\/admin(\/.*)?$/
  return regex.test(value)
}

function isAdminSignIn(value: string) {
  return value.startsWith('/admin/sign-in')
}

export const withAdminAuth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const session = await getSession(request)

    const canViewAdmin = session
      ? session.abilities?.some((ability) => ability === 'access_admin')
      : false

    const { pathname } = request.nextUrl
    const isAdminRoute = containsAdmin(pathname) && !isAdminSignIn(pathname)

    if (!canViewAdmin && isAdminRoute) {
      const locale = getLocale(request)
      if (session != null) {
        const url = locale === i18nConfig.defaultLocale ? '/' : `/${locale}`
        return NextResponse.redirect(new URL(url, request.url))
      }
      const localePrefix = locale === i18nConfig.defaultLocale ? '' : `/${locale}`
      const url = `${localePrefix}/admin/sign-in?callbackUrl=${encodeURIComponent(pathname)}`
      return NextResponse.redirect(new URL(url, request.url))
    }

    return next(request, event)
  }
}
