import { Button, Container, Section } from '@infonomic/uikit/react'

import { LangLink } from '@/i18n/components/lang-link'
import { BackButton } from '@/ui/components/back-button'

export default function NotFoundPage(): React.JSX.Element {
  return (
    <Section className="py-6 flex flex-1 items-center justify-center">
      <Container className="flex items-center flex-col min-h-[350px] sm:min-h-[350px] pt-[8vh] sm:pt-[50px]">
        <h1>Oops! Not found</h1>
        <p className="text-center">
          The page or resource you&apos;re looking for could not be found.
        </p>
        <div className="actions flex gap-3 py-2">
          <Button asChild>
            <LangLink prefetch={false} href="/">
              Home
            </LangLink>
          </Button>
          <BackButton />
        </div>
      </Container>
    </Section>
  )
}
