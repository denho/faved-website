// Shared Open Graph image template + path helpers.
//
// This is the single source of truth for the OG card layout. It is consumed by:
//   - scripts/generate-og.mjs   (build time: rasterizes one static PNG per page)
//   - app/blog & app/docs metadata (references the matching static PNG path)
//
// It is intentionally plain `.mjs` using `React.createElement` (no JSX) so the
// exact same module can be imported by the Node build script and by the
// TypeScript pages without a compile step.

import React from 'react'

const h = React.createElement

export const OG_WIDTH = 1200
export const OG_HEIGHT = 630

export const BRAND = '#0062FF'

export const TITLE_MAX = 80
export const DESC_MAX = 130

export function truncate(s, max) {
  return s.length > max ? s.slice(0, max - 1) + '…' : s
}

/**
 * Deterministic file name for a page's OG image, derived from its content path.
 * `/docs/getting-started/installation` -> `docs__getting-started__installation.png`
 */
export function ogImageFileName(contentPath) {
  const key = contentPath.replace(/^\/+/, '').replace(/\/+$/, '')
  return `${key.replace(/\//g, '__')}.png`
}

/** Public URL path (honouring BASE_PATH) where the static OG image is served. */
export function ogImagePath(contentPath) {
  return `${process.env.BASE_PATH || ''}/static/og/${ogImageFileName(contentPath)}`
}

/**
 * Build the OG card as a React element for `next/og`'s ImageResponse.
 *
 * Black canvas with a soft brand-blue glow from the top, a centered column:
 * the real Faved logo lockup, a prominent section pill (the doc/blog
 * breadcrumb), a large title and description, and the page path at the bottom.
 *
 * Accepts raw (untruncated) strings; truncation happens here so every caller
 * produces identical output. `logoSrc` is a data URI for the real site logo
 * (the rasterizer can't reach the filesystem, so the logo is passed in).
 */
export function ogElement({ title, description, section, path, logoSrc }) {
  const finalTitle = truncate(title || 'Faved', TITLE_MAX)
  const finalDesc = description ? truncate(description, DESC_MAX) : ''

  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '1200px',
        height: '630px',
        backgroundColor: '#000000',
        // Soft brand-blue spotlight from the top edge (matches the logo).
        backgroundImage:
          'radial-gradient(900px 520px at 50% -8%, rgba(0, 98, 255, 0.28), rgba(0, 98, 255, 0) 60%)',
        paddingTop: '64px',
        paddingBottom: '56px',
        paddingLeft: '90px',
        paddingRight: '90px',
        position: 'relative',
        overflow: 'hidden',
      },
    },
    // Hairline along the bottom edge for a touch of structure.
    h('div', {
      style: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '1200px',
        height: '1px',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        display: 'flex',
      },
    }),
    // ── Logo lockup (top, centered) ──
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '13px' } },
      logoSrc
        ? h('img', { src: logoSrc, width: 42, height: 42, style: { display: 'flex' } })
        : null,
      h(
        'span',
        {
          style: {
            color: '#FFFFFF',
            fontSize: '27px',
            fontFamily: 'Inter',
            fontWeight: 600,
            letterSpacing: '-0.01em',
          },
        },
        'Faved'
      )
    ),
    // ── Main content (centered, fills remaining height) ──
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      // Section pill — the prominent doc/blog breadcrumb
      section
        ? h(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                color: '#9DBEFF',
                fontSize: '19px',
                fontFamily: 'Inter',
                fontWeight: 600,
                letterSpacing: '0.12em',
                backgroundColor: 'rgba(0, 98, 255, 0.12)',
                border: '1px solid rgba(0, 98, 255, 0.35)',
                borderRadius: '100px',
                paddingTop: '9px',
                paddingBottom: '9px',
                paddingLeft: '22px',
                paddingRight: '22px',
                marginBottom: '30px',
              },
            },
            section.toUpperCase()
          )
        : null,
      // Title
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: '#FFFFFF',
            fontSize: '64px',
            fontFamily: 'Inter',
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            textAlign: 'center',
            maxWidth: '1000px',
            marginBottom: finalDesc ? '26px' : '0',
          },
        },
        finalTitle
      ),
      // Description
      finalDesc
        ? h(
            'div',
            {
              style: {
                display: 'flex',
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '27px',
                fontFamily: 'Inter',
                fontWeight: 400,
                lineHeight: 1.45,
                textAlign: 'center',
                maxWidth: '880px',
              },
            },
            finalDesc
          )
        : null
    ),
    // ── Footer (page path, centered) ──
    path
      ? h(
          'div',
          { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' } },
          h('div', {
            style: {
              display: 'flex',
              width: '7px',
              height: '7px',
              borderRadius: '4px',
              backgroundColor: BRAND,
            },
          }),
          h(
            'span',
            {
              style: {
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '20px',
                fontFamily: 'Inter',
                fontWeight: 400,
              },
            },
            `faved.to${path}`
          )
        )
      : null
  )
}
