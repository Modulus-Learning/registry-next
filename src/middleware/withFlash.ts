import type { NextFetchEvent, NextRequest } from 'next/server'

import { getConfig } from '@/config'

import type { MiddlewareFactory } from './@types'

export const withFlash: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const config = getConfig()
    const flashCookie = request.cookies.get(config.cookies.flash.name)
    if (flashCookie != null) {
      const response = await next(request, event)
      // NOT sure if this is needed as the cookie is set to
      // expires 0
      request.cookies.delete(config.cookies.flash.name)
      response.headers.set('x-flash-message', flashCookie.value)
      return response
    }
    return next(request, event)
  }
}
