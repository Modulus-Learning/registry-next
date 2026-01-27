'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'

import cx from 'classnames'
import { NavigationMenu } from 'radix-ui'

import { useTranslations } from '@/i18n/client'
import { useLangNavigation } from '@/i18n/hooks/use-lang-navigation'
import { pathWithoutLocale } from '@/i18n/utils'
import type { Locale } from '@/i18n/i18n-config'

function getActive(pathname: string, path: string): boolean {
  const withoutLocale = pathWithoutLocale(pathname)
  if (path === '/') {
    return withoutLocale === path
  }
  return withoutLocale.startsWith(path)
}

export function MainMenu({ lng, color }: { lng: Locale; color: string }): React.JSX.Element {
  const { t } = useTranslations('common')
  return (
    <NavigationMenu.Root
      id="main-menu"
      className="relative hidden z-[1] flex-1 lg:flex justify-end"
    >
      <NavigationMenu.List className="center m-0 flex list-none p-1">
        <NavigationMenu.Item className="px-[1px]">
          <LinkItem href="/" lng={lng} color={color}>
            {t('Home')}
          </LinkItem>
        </NavigationMenu.Item>

        <NavigationMenu.Item className="px-[1px]">
          <LinkItem href="/" lng={lng} color={color}>
            Docs
          </LinkItem>
        </NavigationMenu.Item>

        <NavigationMenu.Item className="px-[1px]">
          <a
            href="https://ximera.osu.edu/"
            target="_blank"
            rel="noopener"
            className={cx(
              'block px-3 py-2 text-[1rem] font-medium leading-none no-underline',
              'outline-none rounded-sm focus:shadow-[0_0_0_1px]'
            )}
          >
            Ximera
          </a>
        </NavigationMenu.Item>

        <NavigationMenu.Item className="px-[1px]">
          <LinkItem href="/registry" lng={lng} color={color}>
            Registry
          </LinkItem>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
          <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="absolute right-0 top-full flex justify-center">
        <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden border dark:border-slate-700 shadow bg-white dark:bg-slate-800 transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  )
}

interface ListItemProps extends React.ComponentPropsWithoutRef<'a'> {
  lng: Locale
}

const ListItem = React.forwardRef<React.ComponentRef<'a'>, ListItemProps>(
  ({ className, href, title, children, lng }, ref) => {
    const { navigate } = useLangNavigation(lng)
    const pathname = usePathname()
    const isActive = getActive(pathname, href as string)
    return (
      <li>
        <NavigationMenu.Link
          href={href as string}
          active={isActive}
          className={cx(
            'focus:shadow-[0_0_0_2px] focus:shadow-secondary-200 hover:bg-canvas-25 dark:hover:bg-slate-700 block select-none p-3 text-[1rem] leading-none no-underline outline-none transition-colors',
            className
          )}
          onClick={(e) => {
            e.preventDefault()
            navigate({ href: href as string, smoothScrollToTop: true })
          }}
          ref={ref}
        >
          <div className="text-[1.185rem] text-secondary-700 dark:text-secondary-400 mb-[5px] font-medium leading-[1.2]">
            {title}
          </div>
          <p className="leading-[1.4]">{children}</p>
        </NavigationMenu.Link>
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'

interface LinkItemProps extends React.ComponentPropsWithoutRef<'a'> {
  lng: Locale
  className?: string
}

const LinkItem = ({ href, color, lng, children }: LinkItemProps) => {
  const { navigate } = useLangNavigation(lng)
  const pathname = usePathname()
  const isActive = getActive(pathname, href as string)

  return (
    <NavigationMenu.Link
      className={cx(
        color,
        'block px-3 py-2 text-[1rem] font-medium leading-none no-underline',
        'outline-none rounded-sm focus:shadow-[0_0_0_1px]'
        // 'data-[active]:shadow-[0_0_0_1px]'
      )}
      active={isActive}
      href={href}
      onClick={(e) => {
        e.preventDefault()
        navigate({ href: href as string, smoothScrollToTop: true })
      }}
    >
      {children}
    </NavigationMenu.Link>
  )
}
