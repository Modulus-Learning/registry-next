// TODO: refactor our singletons to use some sort of container
// or context - like https://github.com/jeffijoe/awilix


import type { Logger } from 'pino'
import logger from 'pino'

let cached = (global as any).logger

export const getLogger = (): Logger => {
  if (cached == null) {
    cached = (global as any).logger = logger({ level: 'debug' })
    return cached
  }
  return cached
}
