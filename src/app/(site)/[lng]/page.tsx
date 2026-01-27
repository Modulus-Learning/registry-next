import Link from 'next/link'

import { Button, Container, Section } from '@infonomic/uikit/react'
import { ArrowRight, BookOpen, ExternalLink } from 'lucide-react'

import { FeatureCards } from '@/modules/home/components/feature-cards'
import { HeroAnimation } from '@/modules/home/components/hero-animation'
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
      <Branding />
      {/* Hero Section */}
      <Section className="px-4 pt-16 md:pt-24 pb-20">
        <Container className="mx-auto max-w-[1200px]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="text-center lg:text-left">
              {/* Early development badge */}
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
                </span>
                <span className="text-sm text-accent font-medium">In Development</span>
              </div>

              <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-[1.1]">
                Understand{' '}
                <span className="bg-linear-to-r from-sky-500 via-sky-400 to-fuchsia-500 bg-clip-text text-transparent">
                  Learning
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-4 text-pretty">
                Modulus provides activity analytics for open education.
              </p>

              <p className="text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 text-pretty">
                An assignment-grade database designed to track progress on Ximera assignments using
                time-series data and latest page-state snapshots. Helping instructors understand
                their assignments.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
                >
                  <Link
                    href="#"
                  >
                    View on GitHub
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outlined"
                  size="lg"
                  className="w-full sm:w-auto border-border text-foreground hover:bg-secondary bg-transparent"
                >
                  <Link href="https://ximera.osu.edu/" target="_blank" rel="noopener noreferrer">
                    Learn about Ximera
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Additional info */}
              <div className="mt-8 flex items-center gap-2 justify-center lg:justify-start text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>Documentation and installation instructions coming soon</span>
              </div>
            </div>

            {/* Right: Animation */}
            <div className="lg:pl-4">
              <HeroAnimation />
            </div>
          </div>
        </Container>
      </Section>

      {/* About Ximera */}
      <Section id="about" className="px-4 py-16 border bg-secondary/20">
        <Container className=" max-w-[1024px] mx-auto text-center prose">
          <h2 className="mb-4 text-balance">
            Part of the Ximera Ecosystem
          </h2>
          <p className="text-muted-foreground text-lg mb-6 text-pretty">
            <strong className="text-foreground">Ximera</strong> is an open-source, interactive textbook platform,
            most commonly used in teaching math. The name stands for{" "}
            <span className="text-teal-500 font-medium">
              {"\""}Ximera: Interactive, Mathematics, Education, Resources, for All.{"\""}
            </span>
          </p>
          <p className="text-muted-foreground text-pretty">
            Both Modulus and Ximera share a commitment to providing open educational resources (OER) for all.
          </p>
        </Container>
      </Section>

      {/* Features Section */}
      <FeatureCards />

      {/* CTA Section */}
      <Section className="py-12">
        <Container className="max-w-[1100px] mx-auto">
          <div className="bg-linear-to-r from-primary/10 via-accent/10 to-primary/10 border border-border rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">

            <div className="relative">
              <div className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 mb-6">
                <span className="text-sm text-accent font-medium">Reference Installation Available</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Explore Modulus Today
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto text-pretty">
                While Modulus is still in early development can view the source code and
                additional documentation for the project on GitHub.
                Full documentation and deployment guides are coming soon.
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
    </>
  )
}
