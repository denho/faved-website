import Image from '@/components/Image'
export default function TestimonialsSection() {
  return (
    <section data-slot="section" className="line-b px-4 py-12 sm:py-24 md:py-32">
      <div className="mx-auto max-w-[720px]">
        <div className="mb-16 flex flex-col items-center gap-8 text-center last:mb-0">
          <p className="text-muted-foreground leading-relaxed italic md:text-xl">
            “A bookmark manager that I genuinely should have installed a while ago... The way a
            bookmark manager is actually supposed to work.”
          </p>
          <div className="flex h-8 items-center gap-2">
            <Image
              src="/static/images/testimonials/dbtech.jpg"
              alt="DB Tech avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
            David Burgess (DB Tech)
          </div>
        </div>
      </div>
    </section>
  )
}
