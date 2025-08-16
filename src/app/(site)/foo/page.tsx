import { Container, Section } from '@infonomic/uikit/react'

export default async function FooPage() {
  return (
    <Section>
      <Container>
        <div className="p-2 prose">
          <h1 className="my-2">Foo Page</h1>
        </div>
      </Container>
    </Section>
  )
}
