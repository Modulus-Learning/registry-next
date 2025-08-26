'use client'

import { LightIcon, MoonIcon } from '@infonomic/uikit/react'
import cx from 'classnames'
import { useTheme } from './provider'
import { Theme } from './utils'

import type React from 'react'

type ThemeSwitchIntrinsicProps = React.JSX.IntrinsicElements['div']
interface ThemeSwitchProps extends ThemeSwitchIntrinsicProps {
  className?: string
  moonIconClassName?: string
  lightIconClassName?: string
  ref?: React.Ref<HTMLDivElement>
}

const ThemeSwitch = ({
  className,
  moonIconClassName,
  lightIconClassName,
  ref,
  ...rest
}: ThemeSwitchProps) => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === Theme.DARK

  const handleThemeChange = (): void => {
    setTheme(isDark ? Theme.LIGHT : Theme.DARK)
  }

  const classes = cx('component--theme-switch flex items-center justify-center', className)

  return (
    <div
      ref={ref}
      className={classes}
      role="button"
      tabIndex={0}
      aria-label="Change theme"
      onClick={handleThemeChange}
      onKeyDown={handleThemeChange}
      {...rest}
    >
      <div className="relative w-[24px] h-[24px] flex items-center justify-center">
        <div className={`light ${isDark ? 'shown' : 'hidden'}`}>
          <LightIcon svgClassName={lightIconClassName} />
        </div>
        <div className={`moon ${isDark ? 'hidden' : 'shown'}`}>
          <MoonIcon svgClassName={moonIconClassName} height="22px" width="22px" />
        </div>
      </div>
    </div>
  )
}

ThemeSwitch.displayName = 'ThemeSwitch'

export { ThemeSwitch }

export type { ThemeSwitchProps }
