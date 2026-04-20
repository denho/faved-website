import { ReactNode } from "react";
import { cn } from "@/components/lib/utils";
import siteMetadata from '@/data/siteMetadata'
import Image from '@/components/Image'

export interface BrandLogoProps extends React.HTMLAttributes<HTMLDivElement> {
}

export default function BrandLogo({
  className,
  ...props
}: BrandLogoProps) {
  return (
    <div data-slot="brand-logo" className={cn('flex items-center gap-2.5', className)} {...props}>
      <Image src={siteMetadata.siteLogo} width={26} height={26} alt="Faved logo" />
      <h3 className="text-xl font-medium">{siteMetadata.headerTitle}</h3>
    </div>
  )
}
