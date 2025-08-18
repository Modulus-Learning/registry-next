'use client'

import Image from 'next/image'
import logoBlack from '@/images/logo/modulus-logo-symbol-black.svg'
import logoWhite from '@/images/logo/modulus-logo-symbol-white.svg'
import { useTheme } from '@/ui/theme/provider'

import './branding.css'

export function Branding() {
  const { theme } = useTheme()

  return (
    <>
      <div className="branding -z-10 flex items-center justify-center w-[250px] h-[140px] relative mx-auto">
        <div className="glow absolute rounded-[100px] z-0 w-[200px] h-[200px] items-center justify-center" />
        <div className="absolute flex z-10 w-[250px] h-[250px] items-center justify-center">
          {theme === 'dark' ? (
            <Image className="block m-0 p-0" src={logoWhite} width={110} alt="Modulus" />
          ) : (
            <Image className="block m-0 p-0" src={logoBlack} width={110} alt="Modulus" />
          )}
        </div>
      </div>
      <span
        className="absolute rounded-full glow -z-20 top-[-500px] opacity-[0.15] dark:opacity-20"
        style={{ width: '90vw', height: '90vh' }}
      />
    </>
  )
}
