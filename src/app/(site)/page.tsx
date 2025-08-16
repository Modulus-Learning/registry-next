import { Card, Container, Section } from '@infonomic/uikit/react'
import { LangLink } from '@/i18n/components/lang-link'
import { getRegistry } from '@/modules/registry/get-registry'

export const revalidate = 60

export default async function HomePage() {
  const { installations } = await getRegistry()
  return (
    <Section>
      <Container>
        <div className="p-2 prose">
          <h1 className="my-2">Modulus Installations</h1>
          <p>Loaded {installations.length} installations.</p>
          <LangLink href="/foo" lng="en">
            Foo
          </LangLink>
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
