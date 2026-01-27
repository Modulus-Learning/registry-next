import Link from 'next/link'

import { Button, Container, Section } from '@infonomic/uikit/react'
import { ArrowRight } from 'lucide-react'

export function LearnMore() {
  return (
    <Section className="py-12">
      <Container className="max-w-[1100px] mx-auto">
        <div className="bg-linear-to-r from-primary/10 via-accent/10 to-primary/10 border border-border rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="relative">
            <div className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 mb-6">
              <span className="text-sm text-accent font-medium">
                Reference Installation Available
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Explore Modulus Today
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto text-pretty">
              You can view the source code and additional documentation for the project on GitHub. Full documentation and deployment guides are
              coming soon.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="outlined" size="lg">
                <Link
                  href="https://github.com/XimeraProject"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
