import type { NextFetchEvent, NextRequest } from 'next/server'

import type { MiddlewareFactory } from './@types'

export const withCurrentPath: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    request.headers.set('X-Current-Path', request.nextUrl.pathname)
    return next(request, event)
  }
}
