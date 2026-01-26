import { Card, Container, Section } from '@infonomic/uikit/react'

import { Branding } from '@/modules/home/components/branding'
import type { Locale } from '@/i18n/i18n-config'

// Use this to debug ISR
// export const dynamic = 'error'
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
    <Section className="relative mb-12">
      <Branding />
      <Container className="relative flex flex-col">
        <div className="prose">
          <h1 className="text-center mb-8">Modulus</h1>
        </div>
        <p className="text-center">More soon...</p>
      </Container>
    </Section>
  )
}
