import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.BASE_PATH
const imagePathPrefix = process.env.IMAGE_PATH_PREFIX || ''

const Image = ({ src, ...rest }: ImageProps) => (
  <NextImage src={`${imagePathPrefix}${basePath || ''}${src}`} {...rest} />
)

export default Image
