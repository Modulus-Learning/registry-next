'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function ClientThemeDetector() {
  const pathname = usePathname()

  // biome-ignore lint/correctness/useExhaustiveDependencies: We rely on pathname to trigger the effect
  useEffect(() => {
    // console.log("Client theme detector running for:", pathname)
    const classList = document.documentElement.classList
    const style = document.documentElement.style
    const theme = localStorage.theme

    if (localStorage.theme == null) {
      localStorage.setItem('theme', 'dark')
      classList.add('dark')
      style.colorScheme = 'dark'
    } else {
      if (theme === 'dark') {
        classList.remove('light')
        classList.add('dark')
        style.colorScheme = 'dark'
      } else if (theme === 'light') {
        classList.remove('dark')
        classList.add('light')
        style.colorScheme = 'light'
      }
    }
  }, [pathname]) // Runs on every route change

  return null
}
