import cx from 'classnames'
import { LangLink } from '@/i18n/components/lang-link'
import { truncate } from '@/utils/utils.general.ts'

import type { Breadcrumb } from './@types'

export function Breadcrumbs({
  breadcrumbs,
  className,
  homeLabel = 'Home',
  homePath = '/',
}: {
  breadcrumbs: Breadcrumb[]
  className?: string
  homeLabel?: string
  homePath?: string
}): React.JSX.Element {
  return (
    <nav aria-label="Breadcrumb" className={cx('flex', className)}>
      <ul className="m-0 inline-flex list-inside list-none flex-wrap items-center space-x-1 p-0 md:space-x-1">
        <li className="m-0 inline-flex items-center">
          <LangLink
            lng="en"
            href={homePath}
            className="m-0 text-sm inline-flex items-center font-medium text-gray-900 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
          >
            <svg
              role="presentation"
              className="mr-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            {homeLabel}
          </LangLink>
        </li>
        {breadcrumbs != null &&
          breadcrumbs.length > 0 &&
          breadcrumbs.map((breadcrumb, index) => {
            if (index < breadcrumbs.length - 1) {
              return (
                <li key={breadcrumb.href} className="m-0 p-0">
                  <div className="flex items-center m-0">
                    <svg
                      role="presentation"
                      className="h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <LangLink
                      lng={'en'}
                      href={breadcrumb.href}
                      className="text-sm m-0 font-medium text-gray-900 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                    >
                      {truncate(breadcrumb.label, 20, true)}
                    </LangLink>
                  </div>
                </li>
              )
            }
            return (
              <li key={breadcrumb.href} aria-current="page" className="m-0 p-0">
                <div className="flex items-center m-0">
                  <svg
                    role="presentation"
                    className="h-5 w-5 text-gray-900 dark:text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-400 leading-5">
                    {truncate(breadcrumb.label, 20, true)}
                  </span>
                </div>
              </li>
            )
          })}
      </ul>
    </nav>
  )
}
