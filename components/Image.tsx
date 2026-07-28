import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.BASE_PATH

// The cdn-cgi transform prefix is applied per-width by image-loader.js;
// only the base path needs prepending here.
const Image = ({ src, ...rest }: ImageProps) => (
  <NextImage src={`${basePath || ''}${src}`} {...rest} />
)

export default Image
