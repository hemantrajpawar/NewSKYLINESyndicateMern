import { whyUs } from "@/lib/content";
import Reveal from "@/components/site/Reveal";

export default function WhyUs() {
  return (
   
<section className="border-y border-obsidian/10 bg-white py-16 lg:py-24">
  <div className="container-x">
    <Reveal className="max-w-3xl">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-8 bg-copper/50" />
        <span className="eyebrow text-copper">Why Skyline Syndicate</span>
      </div>

      <h2 className="text-balance text-[2.1rem] leading-[1.05] text-obsidian sm:text-[2.7rem] lg:text-[3.1rem]">
        Beyond Property. Built on Perspective.
      </h2>
    </Reveal>

    <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {whyUs.map((item, index) => (
        <Reveal key={item.title} delay={index * 0.05}>
          <div>
            {/* Number and horizontal line */}
            <div className="flex items-center gap-4">
              <span className="shrink-0 font-display text-[21px] text-gold">
                0{index + 1}
              </span>
              <div className="h-px flex-1 bg-obsidian/15" />
            </div>

            {/* Heading */}
            <h3 className="mt-6 min-h-[2.8em] font-display text-[1.4rem] leading-[1.4] text-obsidian">
              {item.title}
            </h3>

            {/* Description */}
            <p className="mt-1 text-base leading-[1.55] text-foreground/65">
              {item.body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
</section>

  );
}