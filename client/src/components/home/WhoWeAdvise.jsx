import { segments } from "@/lib/content";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import ActionLink from "@/components/site/ActionLink";

export default function WhoWeAdvise() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Who we serve"
            title="Different Goals. Informed Decisions."
            lead="Every real estate decision comes with a different objective. Whether acquiring a first home, evaluating an investment or securing space for business, we bring the right research, perspective and professional guidance to each requirement."
          />
          <Reveal delay={0.1}>
            <div className="mt-8">
              <ActionLink to="/services" variant="outline-dark">
               EXPLORE WHO WE SERVE
              </ActionLink>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="divide-y divide-obsidian/10 border-y border-obsidian/10">
            {segments.map((segment, index) => (
              <Reveal key={segment.number} delay={index * 0.04}>
                <div className="group py-6">
                  <div className="flex items-baseline justify-between gap-6">
                    <div className="flex items-baseline gap-5">
                      <span className="font-display text-sm text-copper/60">{segment.number}</span>
                      <h3 className="font-display text-[1.35rem] leading-tight text-obsidian sm:text-[1.55rem]">
                        {segment.title}
                      </h3>
                    </div>
                    {/* <span className="hidden shrink-0 font-body text-[9px] uppercase tracking-[0.22em] text-foreground/40 md:block">
                      {segment.mandate}
                    </span> */}
                  </div>
                  <p className="mt-3 max-w-xl pl-0 text-[13.5px] leading-relaxed text-foreground/65 sm:pl-10">
                    {segment.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}