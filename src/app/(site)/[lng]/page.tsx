import { Card, Container, Section } from '@infonomic/uikit/react'
import { Branding } from '@/modules/home/components/branding'
import { getRegistry } from '@/modules/registry/get-registry'

export const revalidate = 60

export default async function HomePage() {
  const { installations } = await getRegistry()
  return (
    <Section className="relative mb-12">
      <Branding />
      <Container className="relative flex flex-col">
        <div className="prose">
          <h1 className="text-center mb-8">Modulus Installations</h1>
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
