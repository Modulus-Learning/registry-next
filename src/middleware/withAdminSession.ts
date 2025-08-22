import type { NextFetchEvent, NextRequest } from 'next/server'

import type { MiddlewareFactory } from './@types'

import { getConfig } from '@/config'
import { refreshCookieOptions, sessionCookieOptions } from '@/modules/admin/session/cookies'
import { SESSION_VALID_HEADER, verifySessionWithRefresh } from '@/modules/admin/session/session'

// Middleware factory / layer for validating the current session (as represented
// by an access / refresh token pair, sent in the request's cookies).  Will
// perform a token refresh if the access token is expired (or almost-expired).
// If the tokens get refreshed, this middleware layer ensures that the
// corresponding cookies are updated in both the request (so that later
// middleware layers, pages, server actions etc see the updated cookies) and the
// response (so that the updated cookies are sent back to the client).  This
// also sets a custom request header (X-MODULUS-ADMIN-SESSION-VALID) so that later
// middleware layers, pages etc will know that the session was successfully
// validated here.
export const withAdminSession: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const config = getConfig()
    const { valid, setCookies, deleteCookies } = await verifySessionWithRefresh(request)

    if (setCookies != null) {
      request.cookies.set(config.cookies.adminSession.name, setCookies.session)
      request.cookies.set(config.cookies.adminRefresh.name, setCookies.refresh)
    } else if (deleteCookies) {
      if (request.cookies.has(config.cookies.adminSession.name)) {
        request.cookies.delete(config.cookies.adminSession.name)
      }
      if (request.cookies.has(config.cookies.adminRefresh.name)) {
        request.cookies.delete(config.cookies.adminRefresh.name)
      }
    }

    request.headers.set(SESSION_VALID_HEADER, valid.toString())

    const response = await next(request, event)

    if (setCookies != null) {
      response.cookies.set(config.cookies.adminSession.name, setCookies.session, sessionCookieOptions())
      response.cookies.set(
        config.cookies.adminRefresh.name,
        setCookies.refresh,
        refreshCookieOptions(setCookies.remember_me)
      )
    } else if (deleteCookies) {
      response.cookies.delete(config.cookies.adminSession.name)
      response.cookies.delete(config.cookies.adminRefresh.name)
    }

    return response
  }
}
