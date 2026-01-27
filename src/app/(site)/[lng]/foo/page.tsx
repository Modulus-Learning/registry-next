import { Card, Container, Section } from '@infonomic/uikit/react'

import { getRegistry } from '@/modules/registry/get-registry'
import { Branding } from '@/ui/components/branding'
import type { Locale } from '@/i18n/i18n-config'

// https://nextjs.org/docs/app/guides/incremental-static-regeneration
// By NOT exporting generateStaticParams - we can delay the initial
// fetch or db request for the data for this page to first visit
// (i.e. not retrieve data at build time) - which is what we want.
// We don't want to generate all possible params either here or for slug/id
// dynamic route segments during build - which would require passing
// secrets to our Docker container during build in order to connect to
// the database (assuming a local API like db/Drizzle etc.)

// Cache-Control header s-maxage=60, stale-while-revalidate=31535940
// 60 seconds for now. We can increase this when our CMS or app is
// able to call revalidatePath, or the purge cache API of a CDN or
// proxy service like Cloudflare.
export const revalidate = 60

// If we don't export generateStaticParams - we have to 'force-static' in
// order for 'on-demand data on fist visit' to work, and for a static
// version of this page to be created during build (guaranteeing that the
// statically compiled page is included in the Docker container with no
// additional runtime space required).
// An alternative approach is to return an empty array from
// generateStaticParams although not tested.
// export async function generateStaticParams() {
//   return []
// }
export const dynamic = 'force-static'

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
// Important - default is true - but good to document here.
// Since we are NOT exporting generateStaticParams - this controls what will
// happen when a dynamic segment is visited with params that were not
// generated with generateStaticParams. True will allow params not known
// at build time. False will return 404 on params not known at build
// time (which we DON'T want).
export const dynamicParams = true // or false, to 404 params not known at build time.

export default async function FooPage({
  params,
}: {
  params: Promise<{ lng: Locale }>
}): Promise<React.JSX.Element> {
  const { lng } = await params
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
