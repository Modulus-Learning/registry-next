'use client'

import cx from 'classnames'
import { usePathname } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { ProgressBar } from '@/context/progress-bar-provider'
import { LanguageMenu } from '@/i18n/components/language-menu'
import type { Locale } from '@/i18n/i18n-config'
import { ThemeSwitch } from '@/ui/theme/switch'
import { Branding } from './branding'

interface AppBarProps {
  className?: string
  lng: Locale
  ref?: React.Ref<HTMLDivElement>
}

export const AppBarFront = ({ className, lng, ref, ...other }: AppBarProps) => {
  const pathName = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  const handleToggleMobileMenu = (event: React.MouseEvent<HTMLButtonElement> | null): void => {
    if (event != null) event.stopPropagation()
    // e.preventDefault()
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleMobileMenuClose = (): void => {
    setMobileMenuOpen(false)
  }

  const handleWindowClick = (): void => {
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    window.addEventListener('click', handleWindowClick)
    return () => {
      window.removeEventListener('click', handleWindowClick)
    }
  })

  const handleScroll = (): void => {
    // TODO - refine for correct locale detection
    // For now home / and anything with a two character path / locale will
    // work.
    if (pathName.length <= 3) {
      const position = window.scrollY
      if (position > 20) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const appBarBackground =
    hasScrolled || pathName.length > 3
      ? 'bg-white dark:bg-primary-900'
      : 'bg-transparent dark:bg-transparent'

  const appBarTextColor =
    hasScrolled || pathName.length > 3
      ? 'text-black fill-black dark:text-white dark:fill-white'
      : 'text-black fill-black dark:text-white dark:fill-white'

  const hamburgerColor =
    hasScrolled || pathName.length > 3
      ? 'bg-black before:bg-black after:bg-black dark:bg-white dark:before:bg-white dark:after:bg-white'
      : 'bg-white before:bg-white after:bg-white'

  const hamburgerColorMobileMenuOpen = 'bg-white before:bg-white after:bg-white'

  return (
    <header
      className={cx('sticky top-0 z-30 w-full', appBarBackground, className)}
      ref={ref}
      {...other}
    >
      <ProgressBar className="fixed h-1 shadow-lg z-50 shadow-primary-600/20 bg-primary-900 dark:bg-white top-0" />
      <div
        className={cx(
          'app-bar sticky top-0 flex min-h-[60px] w-full items-center gap-2 pl-0 pr-[12px]',
          'sm:gap-2 sm:pl-0 sm:pr-[18px]',
          'transition-all duration-500 ease-out'
        )}
      >
        <div className="lg:flex-initial mr-auto">
          <Branding lng={lng} hasScrolled={hasScrolled} pathName={pathName} />
        </div>
        <Suspense>
          <LanguageMenu lng={lng} color={appBarTextColor} />
        </Suspense>
        <ThemeSwitch className="mr-3" />
      </div>
    </header>
  )
}
