
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";

export default function PageHero({
  eyebrow,
  title,
  lead,
  meta,
  image,
  imageAlt,
  backgroundImage,
  className,
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-obsidian text-ivory",
        className
      )}
    >
      {/* Blended background image */}
      {backgroundImage && (
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <Image
            src={backgroundImage}
            alt=""
            fittingType="fill"
            className="h-full w-full object-cover object-center"
            loading="eager"
          />

          {/* Base dark overlay */}
          <div className="absolute inset-0 bg-obsidian/55" />

          {/* Horizontal image blending */}
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-obsidian/30" />

          {/* Vertical image blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-transparent to-obsidian" />
        </div>
      )}

      {/* Hero content */}
      <div className="relative z-10 container-x pb-14 pt-[164px] lg:pb-20 lg:pt-[202px]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/70" />
              <span className="eyebrow text-gold">
                {eyebrow}
              </span>
            </div>

            <h1 className="text-balance text-[2.35rem] leading-[1.02] sm:text-[3.2rem] lg:text-[4rem]">
              {title}
            </h1>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-md text-[15px] leading-relaxed text-ivory/60">
              {lead}
            </p>

            {meta && (
              <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-5">
                {meta.map((item) => (
                  <div key={item.label}>
                    <dt className="meta-label text-ivory/35">
                      {item.label}
                    </dt>
                    <dd className="mt-1.5 font-display text-lg text-ivory/85">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>

      {/* Existing optional image section */}
      {image && (
        <div className="relative">
          <div className="container-x">
            <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
              <Image
                src={image}
                alt={imageAlt}
                fittingType="fill"
                className="h-full w-full rounded-lg object-cover"
                loading="eager"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/50 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
