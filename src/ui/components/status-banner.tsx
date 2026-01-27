import Link from 'next/link'

import { Construction, ExternalLink } from 'lucide-react'

export function StatusBanner() {
  return (
    <div className="bg-accent/10 border-b border-accent/20">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm">
          <div className="flex items-center gap-2 text-accent">
            <Construction className="h-4 w-4" />
            <span className="font-medium">Early Development</span>
          </div>
          <span className="hidden sm:inline text-muted-foreground">|</span>
          <span className="text-muted-foreground text-center">
            Documentation and installation instructions coming soon
          </span>
          <Link
            href="https://app.modulus-learning.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Try the Demo
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
