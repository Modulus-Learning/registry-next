// https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy

import type { NextFetchEvent, NextRequest } from 'next/server'

import { getCSPHeader, getServerConfig } from '@/config'
import type { MiddlewareFactory } from './@types'

export const withCSP: MiddlewareFactory = (next) => {
  const config = getServerConfig()

  return async (request: NextRequest, event: NextFetchEvent) => {
    if (config.cspEnabled && request.headers.get('x-nonce') != null) {
      const nonce = request.headers.get('x-nonce')
      const cspHeader = getCSPHeader(nonce)
      // TODO: Should this be set on the request?
      request.headers.set('Content-Security-Policy', cspHeader)
      const response = await next(request, event)
      response.headers.set('Content-Security-Policy', cspHeader)
      return response
    }
    return next(request, event)
  }
}
