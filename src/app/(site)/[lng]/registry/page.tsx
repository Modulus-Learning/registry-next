import { Card, Container, Section } from '@infonomic/uikit/react'

import { getRegistry } from '@/modules/registry/get-registry'
import type { Locale } from '@/i18n/i18n-config'

// Use this to debug ISR
// export const dynamic = 'error'
export const dynamicParams = true // explicit, though default
// generateStaticParams stub - so that static pages can be generated on first request.
export async function generateStaticParams() {
  return []
}
export const revalidate = 60

export default async function RegistryPage({
  params,
}: {
  params: Promise<{ lng: Locale }>
}): Promise<React.JSX.Element> {
  const { lng } = await params
  const { installations } = await getRegistry()
  return (
    <Section className="relative mb-12 py-4">
      {/* <Branding /> */}
      <Container className="relative flex flex-col">
        <div className="prose">
          <h1 className="mb-2">Modulus Installations</h1>
          <p className="m-0 mb-2 ml-[3px]">
            Below are the installations registered in the Modulus ecosystem.
          </p>
          <p className="m-0 mb-1 ml-[3px]">Loaded {installations.length} installations.</p>
        </div>
        <div className="grid grid-cols-auto-fit-320 gap-6">
          {installations.map((registrant) => (
            <Card key={registrant.id} hover={false}>
              <Card.Header>
                <Card.Title>{registrant['site-name']}</Card.Title>
                <Card.Description>{registrant.organization}</Card.Description>
              </Card.Header>
              <Card.Content className="wrap-anywhere">
                Visit:{' '}
                <a
                  className="hover:underline"
                  href={registrant['site-url']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {registrant['site-url']}
                </a>
              </Card.Content>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
