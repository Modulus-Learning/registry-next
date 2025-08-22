import type { NextRequest } from 'next/server'

import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

import { type Locale, i18nConfig } from '@/i18n/i18n-config'
import { localeFromPath } from '@/i18n/utils'

/**
 * Current detection strategy is 1) cookie, 2) path, 3) user agent, 4) default
 * @param request
 * @returns string locale
 */
export function getLocale(request: NextRequest): string {
  let locale

  // 1. Cookie detection first
  if (request.cookies.has(i18nConfig.cookieName)) {
    locale = request?.cookies?.get(i18nConfig.cookieName)?.value
    // Double check that the cookie value is actually a valid
    // locale (it may have been 'fiddled' with)
    if (locale != null && i18nConfig.locales.includes(locale as Locale) === false) {
      locale = undefined
    }
  }

  // 2. Path detection second
  if (locale == null) {
    const pathname = request.nextUrl.pathname
    locale = localeFromPath(pathname, false)
  }

  // 3. Browser / user agent locales third
  if (locale == null) {
    // NOTE: @formatjs/intl-localematcher will fail with RangeError: Incorrect locale information provided
    // of there is no locale information in the request (for example when benchmarking the application).
    // This will result in a request failure - 500 server error response. Not good.
    try {
      // Negotiator expects plain object so we need to transform headers
      const negotiatorHeaders: Record<string, string> = {}
      request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
      const browserLanguages = new Negotiator({ headers: negotiatorHeaders }).languages()
      locale = match(browserLanguages, i18nConfig.locales, i18nConfig.defaultLocale)
    } catch (error) {
      // console.warn(`Failed to match locale: ${error}`)
      locale = i18nConfig.defaultLocale
    }
  }

  // 4. Lastly - fallback to default locale
  if (locale == null) {
    locale = i18nConfig.defaultLocale
  }

  return locale
}
