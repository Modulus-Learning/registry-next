'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { Hamburger } from '@infonomic/uikit/react'
import cx from 'classnames'

import { ProgressBar } from '@/context/progress-bar-provider'
import { LanguageMenu } from '@/i18n/components/language-menu'
import { MainMenu } from '@/ui/components/main-menu'
import { MobileMenu } from '@/ui/components/mobile-menu'
import { ThemeSwitch } from '@/ui/theme/theme-switch'
import { Branding } from './branding'
import type { Locale } from '@/i18n/i18n-config'

interface AppBarProps {
  className?: string
  lng: Locale
  ref?: React.Ref<HTMLDivElement>
}

export const AppBarFront = ({ className, lng, ref, ...other }: AppBarProps) => {
  const pathName = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hasScrolledDown, setHasScrolledDown] = useState(false)

  const SCROLL_THRESHOLD = 50 // Minimum distance to trigger show/hide logic

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

  const handleScroll = (): void => {
    const currentScrollY = window.scrollY
    // Check if scroll distance exceeds the threshold
    if (Math.abs(currentScrollY - lastScrollY) > SCROLL_THRESHOLD) {
      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        // User scrolled down
        setHasScrolledDown(true)
      } else {
        // User scrolled up
        setHasScrolledDown(false)
      }
      setLastScrollY(currentScrollY) // Update lastScrollY after logic
    }

    // TODO - refine for correct locale detection
    // For now home / and anything with a two character path
    if (pathName.length <= 3) {
      const position = window.scrollY
      if (position > 100) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleWindowClick)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('click', handleWindowClick)
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

  const hamburgerColor = 'bg-black before:bg-black after:bg-black dark:bg-white dark:before:bg-white dark:after:bg-white'

  return (
    <>
      <ProgressBar className="fixed h-1 shadow-lg z-50 shadow-primary-600/20 bg-primary-900 dark:bg-white top-0" />
      <header
        className={cx('w-full sticky top-0 z-30', appBarBackground, className)}
        ref={ref}
        {...other}
      >
        <div
          className={cx(
            'app-bar flex h-[60px] w-full items-center gap-4 pl-0 pr-[12px]',
            'sm:gap-2 sm:pl-0 sm:pr-[18px]',
            'transition-all duration-500 ease-out'
          )}
        >
          <div className="lg:flex-initial mr-auto">
            <Branding lng={lng} hasScrolled={hasScrolled} pathName={pathName} />
          </div>
          <MainMenu lng={lng} color={appBarTextColor} />
          <div className="flex items-center gap-4 lg:gap-6 ml-auto">
            <LanguageMenu lng={lng} color={appBarTextColor} />
            <ThemeSwitch />
            <div className="lg:hidden">
              <Hamburger
                color={hamburgerColor}
                open={mobileMenuOpen}
                onChange={handleToggleMobileMenu}
              />
            </div>
            <MobileMenu lng={lng} open={mobileMenuOpen} onClose={handleMobileMenuClose} />
          </div>
        </div>
      </header>
    </>
  )
}
