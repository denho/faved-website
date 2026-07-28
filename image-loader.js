// Cloudflare Image Resizing loader for next/image.
// https://developers.cloudflare.com/images/transform-images/transform-via-url/
//
// IMAGE_PATH_PREFIX holds the transform endpoint with base options, e.g.
// "/cdn-cgi/image/format=auto" (no trailing slash). It is inlined into the
// client bundle via the `env` key in next.config.js. When unset (local dev,
// builds without Cloudflare in front), images are served untransformed.
const prefix = process.env.IMAGE_PATH_PREFIX

export default function cloudflareImageLoader({ src, width, quality }) {
  if (!prefix) {
    return src
  }
  // Cloudflare accepts a root-relative path or a full URL as the source,
  // separated from the options segment by a slash.
  const source = src.startsWith('/') ? src : `/${src}`
  return `${prefix},width=${width},quality=${quality ?? 75}${source}`
}
