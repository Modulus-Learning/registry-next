import { type NextFetchEvent, type NextRequest, NextResponse } from 'next/server'

import type { MiddlewareFactory } from './@types'

// Matches both http and https, as well as single and double forward slashes
// after the scheme. Next.js will remove any double slashes before middleware
// NOTE: Next.js pathname always starts with /
function shouldRedirect(pathname: string) {
  const regex = /\/https?:\/\/?/
  return regex.test(pathname) && pathname.startsWith('/start-activity') === false
}

export const withActivity: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname

    if (shouldRedirect(pathname)) {
      return NextResponse.redirect(new URL(`/start-activity${pathname}`, request.url))
    }
    return next(request, event)
  }
}
