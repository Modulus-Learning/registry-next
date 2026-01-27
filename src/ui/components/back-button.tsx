'use client'

import { useRouter } from 'next/navigation'

import { Button, ReturnIcon } from '@infonomic/uikit/react'

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      onClick={() => {
        router.back()
      }}
    >
      Back <ReturnIcon width="18px" height="18px" svgClassName="text-white dark:text-black" />
    </Button>
  )
}
