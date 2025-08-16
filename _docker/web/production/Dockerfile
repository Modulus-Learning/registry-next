# Use the official Node.js Alpine base image
FROM node:lts-alpine AS base

# PNPM ENVs
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# See: https://github.com/nodejs/corepack/issues/612
ENV COREPACK_INTEGRITY_KEYS=0

# Install necessary packages, including Nginx, Supervisord, Ghostscript, and GraphicsMagick
RUN apk add --no-cache nginx supervisor

WORKDIR /app

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# deps
# Add node deps
FROM base AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN corepack enable pnpm && pnpm install --frozen-lockfile

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# production-deps
# Setup production node_modules
FROM base AS production-deps

WORKDIR /app

# NOTE: prune is not currently supported recursively.
# https://pnpm.io/cli/prune - prune is not currently supported recursively.
# COPY --from=deps /app/node_modules /app/node_modules
# COPY --from=deps /app/packages/shared/node_modules /app/packages/shared/node_modules

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN corepack enable pnpm && pnpm install --prod --frozen-lockfile

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# build
# Build the app
FROM base AS build

WORKDIR /app

# Likely only required here during build - but also included in the
# final stage below
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules /app/node_modules

COPY next.config.ts package.json pnpm-lock.yaml pnpm-workspace.yaml postcss.config.mjs tsconfig.json ./

# Copy all source code for the project (including .env.public)
COPY . .

# Load public vars at build time
RUN set -a && . ./.env.public && set +a
RUN corepack enable pnpm && pnpm run build

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# final
#
# Rebuild the source code only when needed
# This may be the case that you would try
# to build the app based on some `X_TAG` in my case (Git commit hash)
# but the code hasn't changed.
FROM base

LABEL io.infonomic.name="Modulus Registry App" \
      io.infonomic.version="${VERSION}" \
      io.infonomic.maintainer="Anthony Bouch <anthony@infonomic.io>" \
      io.infonomic.description="Modulus Learning registry application that is used to announce all known Modulus installations."

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

ARG VERSION

RUN set -eux; \
  mkdir -p /app; \
  mkdir -p /app/node_modules/.cache; \
  mkdir -p /app/.next/cache/images; \
  mkdir -p /var/run/nginx-cache; \
  chown -R nginx:nginx /app;  \
  chown -R nginx:nginx /app/.next/cache/images; \
  chown -R nginx:nginx /run; \
  chown -R nginx:nginx /var/lib/nginx; \
  chown -R nginx:nginx /var/log/nginx; \
  chown -R nginx:nginx /var/run/nginx-cache;

COPY _docker/nginx/ /etc/nginx/
COPY _docker/supervisord.conf /etc/supervisord.conf

USER nginx
WORKDIR /app

# main app build
COPY --from=production-deps --chown=nginx:nginx /app/node_modules /app/node_modules
COPY --from=build --chown=nginx:nginx /app/.next/standalone/.next /app/.next
COPY --from=build --chown=nginx:nginx /app/.next/standalone/package.json /app/package.json
COPY --from=build --chown=nginx:nginx /app/.next/standalone/server.js /app/server.js
COPY --from=build --chown=nginx:nginx /app/.next/static /app/.next/static
COPY --from=build --chown=nginx:nginx /app/public /app/public
  
# Root package.json and files
# COPY --from=build /app/package.json /app/package.json
# COPY --from=build /app/pnpm-lock.yaml /app/pnpm-lock.yaml
# COPY --from=build /app/pnpm-workspace.yaml /app/pnpm-workspace.yaml

COPY _docker/start-nginx.sh /app/start-nginx.sh
COPY _docker/start-node.sh /app/start-node.sh

EXPOSE 8000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
# HEALTHCHECK --timeout=10s CMD curl --silent --fail http://127.0.0.1:8000/elb-status || exit 1
