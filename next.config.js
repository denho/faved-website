const { withContentlayer } = require('next-contentlayer2')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// You might need to insert additional domains in script-src if you are using external services.
const ContentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' www.google.com google.com www.googletagmanager.com googletagmanager.com www.google-analytics.com google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  'img-src * blob: data: www.google-analytics.com google-analytics.com www.googletagmanager.com googletagmanager.com',
  // - media-src keeps 'self' so self-hosted post videos (public/static/.../*.mp4) can play; S3 hosts remote media.
  "media-src 'self' *.s3.amazonaws.com",
  // - connect-src stays wildcard on purpose: Zaraz + CookieChimp (and tags configured in the
  //   Cloudflare dashboard) beacon to endpoints outside this repo's control; an allowlist
  //   here would break consent/tracking silently.
  'connect-src * www.google-analytics.com google-analytics.com www.googletagmanager.com googletagmanager.com',
  "font-src 'self'",
  'frame-src giscus.app',
].join('; ')

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const output = process.env.EXPORT ? 'export' : undefined
const basePath = process.env.BASE_PATH || undefined
const unoptimized = process.env.UNOPTIMIZED ? true : undefined

// Polling file watcher for environments where native file events never
// arrive (the Claude sandbox mounts the repo from the host). Only enabled
// when scripts/dev.mjs sets NEXT_DEV_POLL — it pairs polling with webpack
// (`next dev --webpack`), because Turbopack's polling mode delivers no
// events on Linux (vercel/next.js#68255) and would silently kill HMR.
const devPolling = Boolean(process.env.NEXT_DEV_POLL)

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer]
  return plugins.reduce((acc, next) => next(acc), {
    output,
    basePath,
    // Inline these into the client bundle too — components/Image.tsx reads them
    // from client-component code, where only inlined values exist at runtime.
    env: {
      BASE_PATH: process.env.BASE_PATH || '',
      IMAGE_PATH_PREFIX: process.env.IMAGE_PATH_PREFIX || '',
    },
    distDir: process.env.DIST_DIR || undefined,
    watchOptions: devPolling ? { pollIntervalMs: 500 } : undefined,
    reactStrictMode: true,
    trailingSlash: false,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    images: {
      loader: 'custom',
      loaderFile: './image-loader.js',
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'picsum.photos',
        },
      ],
      unoptimized,
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ]
    },
    async redirects() {
      return [
        {
          source: '/waitlist',
          destination: 'https://app.faved.to/signup',
          permanent: true,
        },
        {
          source: '/legal/privacy',
          destination: '/privacy',
          permanent: true,
        },
        {
          source: '/legal/terms',
          destination: '/terms',
          permanent: true,
        },
      ]
    },
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })

      return config
    },
  })
}
