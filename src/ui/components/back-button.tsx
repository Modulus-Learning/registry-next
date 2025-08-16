'use client'

import { Button, ReturnIcon } from '@infonomic/uikit/react'
import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      onClick={() => {
        router.back()
      }}
    >
      Back <ReturnIcon width="18px" height="18px" svgClassName="fill-white stroke-white" />
    </Button>
  )
}
