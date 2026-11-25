import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteConfig";
import Reveal from "@/components/site/Reveal";

export default function TrustStatement() {
  return (
    <section className="relative isolate overflow-hidden bg-obsidian py-20 text-ivory lg:py-28">
      <div className="absolute inset-0 -z-10">
        <Image
          src={images.material}
          alt="Close view of warm stone and brass detailing"
          fittingType="fill"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/85 to-obsidian/70" />
      </div>

      <div className="container-x">
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="mx-auto mb-7 block h-10 w-px bg-gold" />
          <p className="text-balance font-display text-[1.6rem] font-light leading-[1.35] text-ivory sm:text-[2.1rem] lg:text-[2.45rem]">
            “Every property has a price. But every property has value.”
          </p>
          <p className="mt-8 font-body text-[10px] uppercase tracking-[0.26em] text-ivory/45">
            The principle behind every mandate
          </p>
        </Reveal>
      </div>

      <div className="container-x mt-14 flex items-center justify-between border-t border-white/10 pt-6">
        <p className="meta-label text-ivory/35">Skyline Syndicate</p>
        <p className="meta-label text-gold/70">Pune · Est. 2026</p>
      </div>
    </section>
  );
}