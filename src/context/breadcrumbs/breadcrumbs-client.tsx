'use client'

import { useEffect } from 'react'

import { useBreadcrumbs } from './breadcrumbs-provider'
import type { Breadcrumb } from './@types'

export function BreadcrumbsClient({
  breadcrumbs,
  homeLabel = 'Home',
  homePath = '/',
}: {
  breadcrumbs: Breadcrumb[]
  homeLabel?: string
  homePath?: string
}) {
  const { setBreadcrumbs } = useBreadcrumbs()
  useEffect(() => {
    setBreadcrumbs({ homeLabel, homePath, breadcrumbs })
  }, [breadcrumbs, homeLabel, homePath, setBreadcrumbs])
  return null
}
