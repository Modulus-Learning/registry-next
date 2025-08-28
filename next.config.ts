import { resolve } from 'node:path'
import { config } from 'dotenv'

import type { NextConfig } from 'next'

// Disable dotenv tips/messages
process.env.DOTENV_CONFIG_QUIET = 'true'

// Load .env.public first, then .env (so .env can override)
config({ path: resolve(process.cwd(), '.env.public') })
config({ path: resolve(process.cwd(), '.env') })

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/images/**',
      },
    ],
  },
}

export default nextConfig
