'use client'

import { LangLink } from '@/i18n/components/lang-link'
import { Button } from '@infonomic/uikit/react'

export function Ctas({ lng }: { lng: string }) {
  return (
    <div className="ctas flex flex-col sm:flex-row gap-5 mt-14 mb-4">
      <Button asChild size="lg">
        <LangLink lng={lng} href="/dashboard">
          Get Started
        </LangLink>
      </Button>
      <Button variant="outlined" size="lg">
        Read the Docs
      </Button>
    </div>
  )
}
