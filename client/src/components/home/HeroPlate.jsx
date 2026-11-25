import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteConfig";
import Reveal from "@/components/site/Reveal";

export default function HeroPlate() {
  return (
    <Reveal className="relative w-full lg:ml-auto lg:max-w-[420px]" delay={0.28}>
      <div className="relative aspect-[16/11] w-full overflow-hidden border border-white/15 sm:aspect-[16/10] lg:aspect-[4/5] hidden">
        <Image
          src={images.facadeGeometry}
          alt="Rhythm of a stone and glass façade in warm evening light"
          fittingType="fill"
          className="h-full w-full object-cover hidden"
          loading="eager" />
        
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/10 to-obsidian/25" />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
          <p className="eyebrow text-ivory/70">
            Prime residential
            <br />
            Koregaon Park
          </p>
          <p className="font-display text-2xl leading-none text-gold">01</p>
        </div>

        <p className="absolute right-4 top-4 font-body text-[8px] uppercase tracking-[0.3em] text-ivory/50">
          In view
        </p>
      </div>

      <p
        aria-hidden="true"
        className="absolute -right-8 top-1/2 hidden -translate-y-1/2 rotate-90 whitespace-nowrap font-body text-[8px] uppercase tracking-[0.36em] text-ivory/30 xl:block">
        
        Advisory · Pune · Est. 2024
      </p>
    </Reveal>);

}