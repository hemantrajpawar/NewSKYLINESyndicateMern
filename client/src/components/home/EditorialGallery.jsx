
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteConfig";
import Reveal from "@/components/site/Reveal";
import ActionLink from "@/components/site/ActionLink";

const frames = [
  {
    index: "01",
    image: images.apartment,
    alt: "Contemporary residential towers rising above landscaped grounds at dusk",
    label: "Residential",
    note: "Koregaon Park · Kharadi · Baner",
    ratio: "aspect-[3/4]",
    offset: "",
  },
  {
    index: "02",
    image: images.glassReflection,
    alt: "Reflection of a gold horizon across a commercial glass curtain wall",
    label: "Commercial",
    note: "Kharadi & Senapati Bapat Road",
    ratio: "aspect-[4/5]",
    offset: "lg:mt-14",
  },
  {
    index: "03",
    image: images.metro,
    alt: "Elevated metro line crossing a Pune corridor in late evening light",
    label: "Corridors",
    note: "Hinjawadi · Chakan · Talegaon",
    ratio: "aspect-[3/4]",
    offset: "lg:mt-28",
  },
];

export default function EditorialGallery() {
  return (
<section className="bg-background pt-8 pb-8 lg:pt-10 lg:pb-8">      <div className="container-x">

        {/* Section heading */}
        <Reveal>
          <h2 className="max-w-xl text-balance text-[2rem] leading-[1.06] text-obsidian sm:text-[2.6rem] lg:text-[3rem]">
            Beyond the Address.
          </h2>
        </Reveal>

        {/* Gallery grid */}
        <div className="mt-6 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-0">
          {frames.map((frame, index) => (
            <Reveal
              key={frame.index}
              delay={index * 0.06}
              className={`${frame.offset} ${
                index === 2
                  ? "lg:col-start-3 lg:row-start-1 lg:row-span-2"
                  : ""
              }`}
            >
              <figure className="group">
                <div
                  className={`relative overflow-hidden bg-sand ${frame.ratio}`}
                >
                  <Image
                    src={frame.image}
                    alt={frame.alt}
                    fittingType="fill"
                    className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045]"
                    loading="lazy"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/45 via-transparent to-transparent" />

                  <span className="absolute left-0 top-0 h-10 w-10 border-l border-t border-gold/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <figcaption className="absolute left-4 top-4 font-display text-sm text-ivory/85">
                    {frame.index}
                  </figcaption>
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-obsidian/15 pt-3">
                  <p className="font-display text-[1.15rem] leading-tight text-obsidian">
                    {frame.label}
                  </p>

                  <p className="font-body text-[8px] uppercase tracking-[0.2em] text-foreground/45">
                    {frame.note}
                  </p>
                </div>
              </figure>
            </Reveal>
          ))}

          {/* Description and button below the first two images */}
          <Reveal
            delay={0.2}
            className="sm:col-span-2 lg:col-start-1 lg:row-start-2 lg:mt-4"          >
            <div className="flex flex-col items-start gap-3">
              <p className="max-w-lg text-[13px] leading-relaxed text-foreground/60">
                Explore a considered selection of residential,
                commercial and investment properties, viewed
                through the lens of location, quality, potential
                and long-term value.
              </p>

              <ActionLink
                to="/services"
                variant="outline-dark"
                icon={false}
              >
                EXPLORE OUR PORTFOLIO All practices
              </ActionLink>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}