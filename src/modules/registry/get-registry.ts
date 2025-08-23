import { getPublicConfig } from '@/config'

type Registrant = {
  id: number
  'site-name': string
  'site-url': string
  organization: string
  contact: string
}

export async function getRegistry(): Promise<{ installations: Registrant[] }> {
  console.log('Fetching registry data...')
  const config = getPublicConfig()
  const res = await fetch(config.gitHubRegistryDataUrl)
  const data = await res.json()
  return data
}
