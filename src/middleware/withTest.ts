import type { NextFetchEvent, NextRequest } from 'next/server'

import type { MiddlewareFactory } from './@types'

import { getConfig } from '@/config'
import { decryptObject, encryptObject } from '@infonomic/shared/crypto'

export const withTest: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const secret = getConfig().sessionSecret
    const pathname = request.nextUrl.pathname
    console.log('Secret key from process.env.SESSION_SECRET', secret)
    const encrypted = await encryptObject({ hello: 'world' }, secret)
    const decrypted = await decryptObject(encrypted, secret)
    console.log('encrypted', encrypted)
    console.log('de-encrypted', decrypted)

    return next(request, event)
  }
}
