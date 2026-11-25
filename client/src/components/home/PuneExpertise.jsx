import { Image } from "@/components/ui/image";
import { images, siteConfig } from "@/lib/siteConfig";
import Reveal from "@/components/site/Reveal";

export default function PuneExpertise() {
  return (
    <section className="bg-background pb-16 pt-16 lg:pb-24 lg:pt-24">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-copper/50" />
              <span className="eyebrow text-copper">Pune expertise</span>
            </div>
            <h2 className="text-balance text-[2.1rem] leading-[1.05] text-obsidian sm:text-[2.7rem] lg:text-[3.1rem]">
              Local knowledge. Broader perspective.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-foreground/70">
              Pune rewards a closer read. Corridors move at different speeds, infrastructure lands
              on different timelines, and the difference between two adjacent locations is often a
              matter of what is permitted rather than what is promised.
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-foreground/70">
              We work these corridors on the ground and in the records  which is the difference
              between a location on a map and a location you would commit to.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.08}>
            <div className="aspect-[16/11] w-full overflow-hidden">
              <Image
                src={images.puneDusk}
                alt="City rooftops and towers across Pune at dusk"
                fittingType="fill"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="mt-12 border-t border-obsidian/15 pt-6">
            <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
              {siteConfig.microMarkets.map((market) => (
                <p
                  key={market}
                  className="font-body text-[10px] uppercase tracking-[0.22em] text-foreground/50"
                >
                  {market}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}