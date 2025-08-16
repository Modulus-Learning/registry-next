import { booleanSchema, urlSchema } from '@infonomic/shared/schemas'
import { z } from 'zod'

const publicSchema = z.object({
  siteName: z.string(),
  siteDescription: z.string(),
  serverUrl: urlSchema,
  gitHubRegistryDataUrl: urlSchema,
  cspEnabled: booleanSchema(),
})

const serverSchema = z.object({
  port: z.coerce.number().int(),
  siteName: z.string(),
  siteDescription: z.string(),
  publicServerUrl: urlSchema,
  gitHubRegistryDataUrl: urlSchema,
  cspEnabled: booleanSchema(),
  log: z.object({
    level: z.string().optional(),
    pretty: booleanSchema(),
  }),
  email: z.object({
    systemEmailFromAddress: z.string(),
    contactSubmissionFromAddress: z.string(),
    templateDirectory: z.string().optional(),
    transport: z.object({
      host: z.string(),
      port: z.coerce.number().int(),
      secure: booleanSchema(),
      auth: z.object({
        user: z.string().optional(),
        pass: z.string().optional(),
      }),
    }),
  }),
})

export type PublicConfig = z.infer<typeof publicSchema>

const initPublicConfig = (): PublicConfig =>
  publicSchema.parse({
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    siteDescription: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    gitHubRegistryDataUrl: process.env.NEXT_PUBLIC_GITHUB_REGISTRY_DATA_URL,
    cspEnabled: process.env.NEXT_PUBLIC_CSP_ENABLED,
  })

export type ServerConfig = z.infer<typeof serverSchema>

const initServerConfig = (): ServerConfig =>
  serverSchema.parse({
    port: process.env.PORT,
    siteName: process.env.SITE_NAME,
    siteDescription: process.env.SITE_DESCRIPTION,
    publicServerUrl: process.env.PUBLIC_SERVER_URL,
    gitHubRegistryDataUrl: process.env.GITHUB_REGISTRY_DATA_URL,
    cspEnabled: process.env.CSP_ENABLED,
    log: {
      level: process.env.LOG_LEVEL ?? 'info',
      pretty: process.env.LOG_PRETTY,
    },
    email: {
      templateDirectory: 'email-templates',
      systemEmailFromAddress: process.env.SYSTEM_EMAIL_FROM_ADDRESS,
      contactSubmissionFromAddress: process.env.CONTACT_SUBMISSION_FROM_ADDRESS,
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
    },
  })

let cachedServerConfig: ServerConfig

export const getServerConfig = (): ServerConfig => {
  if (cachedServerConfig == null) {
    cachedServerConfig = initServerConfig()
  }
  return cachedServerConfig
}

let cachedPublicConfig: PublicConfig

export const getPublicConfig = (): PublicConfig => {
  if (cachedPublicConfig == null) {
    cachedPublicConfig = initPublicConfig()
  }
  return cachedPublicConfig
}

export function getCSPHeader(nonce: string | null) {
  const cspHeader = `
    default-src 'self';
    connect-src 'self' modulus-api.fly.dev *.google.com *.gstatic.com *.recaptcha.net;
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    script-src-elem 'self' 'nonce-${nonce}' *.recaptcha.net;
    style-src 'self' 'unsafe-inline';
    frame-src 'self' *.google.com *.recaptcha.net www.youtube-nocookie.com *.vimeo.com;
    img-src 'self' blob: data: cdn.modulus.org *.picsum.photos picsum.photos;
    media-src 'self' blob: data: cdn.modulus.org;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    `

  // Replace newline characters and spaces
  return cspHeader.replace(/\s{2,}/g, ' ').trim()
}
