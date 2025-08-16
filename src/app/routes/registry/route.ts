import { NextResponse } from 'next/server'
import { getRegistry } from '@/modules/registry/get-registry'

export const GET = async () => {
  const data = await getRegistry()
  return NextResponse.json(data)
}
