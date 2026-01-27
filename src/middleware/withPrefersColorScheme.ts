import type { NextFetchEvent, NextRequest } from 'next/server'

import type { MiddlewareFactory } from './@types'

export const withPrefersColorScheme: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const response = await next(request, event)
    response.headers.set('Accept-CH', 'Sec-CH-Prefers-Color-Scheme')
    response.headers.set('Vary', 'Sec-CH-Prefers-Color-Scheme')
    response.headers.set('Critical-CH', 'Sec-CH-Prefers-Color-Scheme')
    return response
  }
}
