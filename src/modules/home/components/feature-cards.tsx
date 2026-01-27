import { Card, Container, Section } from '@infonomic/uikit/react'
import {
  BarChart3,
  Building2,
  Eye,
  GraduationCap,
  Link,
  Shield,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'

const features = [
  {
    icon: Building2,
    category: 'For Institutions',
    title: 'Simple, Secure, Compliant',
    description:
      'Deploy Modulus with minimal configuration. Stores assignment interaction data, not personal student information.',
    highlights: ['WCAG 2.1 AA compliant', 'Public-instance safe', 'Secure by design'],
  },
  {
    icon: GraduationCap,
    category: 'For Instructors',
    title: 'Elegant and Informative',
    description:
      'Get meaningful insight into how assignments function in practice while staying out of the way.',
    highlights: [
      'Seamless LTI 1.3 integration',
      'Time-series analytics',
      'No new workflows required',
    ],
  },
  {
    icon: Users,
    category: 'For Learners',
    title: 'Invisible and Freeing',
    description:
      'Reduce friction, not add it. Access through your LMS or track your own progress on the open web.',
    highlights: ['No accounts required', 'No institutional barriers', 'Progress tracking for all'],
  },
]

const capabilities = [
  {
    icon: Shield,
    title: 'Secure by Design',
    description: 'Student identity abstracted through LTI. Only minimum information retained.',
  },
  {
    icon: Link,
    title: 'LTI 1.3 Integration',
    description: 'Integrates cleanly with LMS platforms via LTI 1.3.',
  },
  {
    icon: BarChart3,
    title: 'Assessment Insight',
    description: 'Time-series and page-state data reveal how assignments function.',
  },
  {
    icon: Eye,
    title: 'Nearly Invisible',
    description: 'Learners access Ximera through their LMS with minimal interaction.',
  },
  {
    icon: Zap,
    title: 'Simple Deployment',
    description: 'Host your own instance or use the shared public service.',
  },
  {
    icon: Sparkles,
    title: 'Open Education',
    description: 'Committed to providing open educational resources for all.',
  },
]

export function FeatureCards() {
  return (
    <Section id="features" className="py-8 md:py-18">
      <Container className="max-w-6xl mx-auto">
        <div className="text-center mb-16 prose">
          <h2 className="mt-0 mb-4 text-balance">Built for Everyone in Education</h2>
          <p className="muted text-lg max-w-2xl mx-auto text-pretty">
            Modulus is designed to serve institutions, instructors, and learners with simplicity and
            transparency.
          </p>
        </div>

        {/* Main feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-15 md:mb-20">
          {features.map((feature) => (
            <Card
              hover={true}
              key={feature.title}
              className="backdrop-blur-sm transition-all duration-300 group p-8 prose"
            >
              <div className="h-12 w-12 rounded-lg bg-teal-500/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-teal-500" />
              </div>
              <span className="text-xs font-medium text-teal-500 uppercase tracking-wider">
                {feature.category}
              </span>
              <h3 className="mt-2 mb-1">{feature.title}</h3>
              <p className="muted text-sm mb-4">{feature.description}</p>
              <ul className="space-y-2" style={{ paddingInlineStart: 0 }}>
                {feature.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Capabilities grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="flex items-start gap-4 py-3 rounded-lg hover:bg-secondary/30 transition-colors"
            >
              <div className="h-10 w-10 rounded-lg bg-fuchsia-500/10 flex items-center justify-center shrink-0">
                <cap.icon className="h-5 w-5 text-fuchsia-500" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">{cap.title}</h3>
                <p className="text-sm muted">{cap.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
