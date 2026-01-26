'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { Accordion, ChevronDownIcon, HomeIcon } from '@infonomic/uikit/react'
import cx from 'classnames'
import { useSwipeable } from 'react-swipeable'

import { useLangNavigation } from '@/i18n/hooks/use-lang-navigation'
import { t } from '@/i18n/migrate-t'
import { pathWithoutLocale } from '@/i18n/utils'
import logoBlack from '@/images/modulus-logo-type-black-transparent.svg'
import logoWhite from '@/images/modulus-logo-type-white-transparent.svg'
import { useTheme } from '@/ui/theme/provider'
import { LangLink } from '../../i18n/components/lang-link'

interface MenuItem {
  title: string
  path: string
  children: MenuItem[] | null
}

const menuItems: MenuItem[] = [
  {
    title: 'Home',
    path: '/',
    children: null,
  },
  {
    title: 'Docs',
    path: '/docs',
    children: null,
  },
  {
    title: 'Ximera',
    path: '/ximera',
    children: null,
  },
  {
    title: 'Registry',
    path: '/registry',
    children: null,
  },
]

interface MobileMenuProps {
  open: boolean
  lng: string
  onClose: () => void
  joinRef?: any
}

function getActive(pathname: string, path: string): boolean {
  const withoutLocale = pathWithoutLocale(pathname)
  if (path === '/') {
    return withoutLocale === path
  }
  return withoutLocale.startsWith(path)
}

export function MobileMenu({
  open,
  lng,
  onClose,
  joinRef,
  ...other
}: MobileMenuProps): React.JSX.Element {
  const { navigate } = useLangNavigation(lng)
  const { theme } = useTheme()
  const pathname = usePathname()

  const handleMenuItemClick =
    (href: string | null) =>
      (event: any): void => {
        if (
          event != null &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return
        }
        if (onClose != null) onClose()
        if (href != null) navigate({ href, smoothScrollToTop: true })
      }

  const handlers = useSwipeable({
    onSwipedRight: () => {
      if (onClose != null) onClose()
    },
  })

  return (
    <div
      id="mobile-menu"
      {...other}
      {...handlers}
      className={cx(
        'fixed right-0 top-0 z-20 h-screen w-full overflow-hidden md:w-[50%]',
        'bg-white dark:bg-canvas-800',
        'transition-transform duration-200 ease-linear ',
        { 'translate-x-[100%]': !open },
        { 'translate-x-[0%]': open }
      )}
    >
      <div className="mt-[4vh] mx-4">
        <div className="branding ml-4 mb-2">
          <LangLink prefetch={false} href="/" lng={lng}>
            {theme === 'dark' ? (
              <Image src={logoWhite} width={160} alt="Modulus" />
            ) : (
              <Image src={logoBlack} width={160} alt="Modulus" />
            )}
          </LangLink>
        </div>
        <Accordion.Root asChild type="single">
          <div className="component--scroller max-h-[80vh]">
            <ul className="list-none px-3 pt-0 pb-6 mt-4">
              <Accordion.Item asChild value="home">
                <li className="m-0 mb-1 p-0">
                  <Accordion.Trigger
                    className={cx(
                      'text-xl flex menuItems-center text-black font-normal transition-all duration-500 ease-in-out dark:text-gray-200',
                      'm-0 block rounded px-2 py-1 no-underline',
                      'hover:text-white dark:hover:text-white hover:bg-canvas-400 dark:hover:bg-canvas-600'
                    )}
                    onClick={handleMenuItemClick('/')}
                  >
                    <HomeIcon className="mb-[-1px] mr-2 h-4 w-4" />
                    <span>{t('Home')}</span>
                  </Accordion.Trigger>
                </li>
              </Accordion.Item>

              {menuItems?.map((item: MenuItem) => (
                <Accordion.Item key={item?.path} value={item?.path} asChild>
                  <li className={cx('m-0 mb-1 p-0')}>
                    <Accordion.Trigger asChild>
                      {item?.children != null && item?.children?.length > 0 ? (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation()
                          }}
                          lang={lng}
                          className={cx(
                            'text-xl text-left font-normal transition-all duration-500 text-black ease-in-out dark:text-gray-200',
                            'm-0 block rounded px-2 py-1 no-underline',
                            'hover:text-white dark:hover:text-white hover:bg-canvas-400 dark:hover:bg-canvas-700',
                            {
                              'bg-canvas-400 text-black dark:text-white dark:bg-slate-800':
                                getActive(pathname, item.path),
                            }
                          )}
                        >
                          {t(item.title)}
                          {item?.children != null && item?.children?.length > 0 && (
                            <ChevronDownIcon
                              width="25px"
                              height="25px"
                              className="ml-auto -rotate-90 text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-0"
                              aria-hidden
                            />
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className={cx(
                            'text-xl text-left font-normal transition-all duration-500 ease-in-out text-black dark:text-gray-200',
                            'm-0 block rounded px-2 py-1 no-underline',
                            'hover:text-white dark:hover:text-white hover:bg-canvas-400 dark:hover:bg-canvas-600',
                            {
                              'bg-canvas-400 text-black dark:bg-slate-700 dark:text-gray-400':
                                getActive(pathname, item.path),
                            }
                          )}
                          onClick={
                            item?.children == null || item?.children?.length === 0
                              ? handleMenuItemClick(item.path)
                              : undefined
                          }
                        >
                          {t(item.title)}
                          {item?.children != null && item?.children?.length > 0 && (
                            <ChevronDownIcon
                              className="ml-auto -rotate-90 text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-0"
                              aria-hidden
                            />
                          )}
                        </button>
                      )}
                    </Accordion.Trigger>
                    {item?.children != null && item?.children?.length > 0 && (
                      <Accordion.Content>
                        <ul className="list-none m-0 mt-2 ml-[10px] mb-1 p-0 border-l border-white dark:border-slate-600">
                          {item.children.map((child) => (
                            <li key={child.path} className="m-0 mb-1 p-0 pl-[8px]">
                              <button
                                type="button"
                                className={cx(
                                  'text-xl text-left font-normal transition-all duration-500 ease-in-out text-black dark:text-gray-400',
                                  'm-0 block no-underline',
                                  'border rounded py-[3px] px-1 hover:border-canvas-400 dark:hover:border-canvas-600',
                                  {
                                    'active border-canvas-200 text-gray-600 dark:border-canvas-800 dark:text-gray-400':
                                      pathWithoutLocale(pathname) === child.path,
                                  },
                                  {
                                    'border-transparent': pathname !== child.path,
                                  }
                                )}
                                onClick={handleMenuItemClick(child?.path)}
                              >
                                {t(child.title)}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </Accordion.Content>
                    )}
                  </li>
                </Accordion.Item>
              ))}
            </ul>
          </div>
        </Accordion.Root>
      </div>
    </div>
  )
}
