'use client'

import { createContext, type ReactNode, useContext } from 'react'

import { getPublicConfig } from './index.ts'
import type { PublicConfig } from './index.ts'

export const PublicConfigContext = createContext<PublicConfig | null>(null)

export const PublicConfigProvider = ({ children }: { children: ReactNode }) => {
  const config = getPublicConfig()
  return <PublicConfigContext.Provider value={config}>{children}</PublicConfigContext.Provider>
}

export const usePublicConfig = () => {
  const context = useContext(PublicConfigContext)
  if (context != null) {
    return context
  }
  throw new Error('Public config not available - check public environment variables')
}
