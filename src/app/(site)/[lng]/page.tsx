import { FeatureCards } from '@/modules/home/components/feature-cards'
import { Hero } from '@/modules/home/components/hero'
import { LearnMore } from '@/modules/home/components/learn-more'
import { Ximera } from '@/modules/home/components/ximera'
import { Branding } from '@/ui/components/branding'
import type { Locale } from '@/i18n/i18n-config'

// // Use this to debug ISR
// // export const dynamic = 'error'
export const dynamicParams = true // explicit, though default
// generateStaticParams stub - so that static pages can be generated on first request.
export async function generateStaticParams() {
  return []
}
export const revalidate = 60

export default async function HomePage({
  params,
}: {
  params: Promise<{ lng: Locale }>
}): Promise<React.JSX.Element> {
  const { lng } = await params
  return (
    <>
      {/* <Branding /> */}
      <Hero />
      <Ximera />
      <FeatureCards />
      <LearnMore />
    </>
  )
}
