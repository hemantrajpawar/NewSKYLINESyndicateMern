import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/content";
import Reveal from "@/components/site/Reveal";

export default function ServicesIndex() {
  return (
    <section className="border-y border-obsidian/10 bg-sand/60 py-16 lg:py-4">
      <div className="container-x">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">~~
            <div className="mb-5 flex items-center gap-3">
              {/* <span className="h-px w-8 bg-copper/50" />
              <span className="eyebrow text-copper">Practices</span> */}
            </div>
            <h2 className="text-balance text-[2.1rem] leading-[1.05] text-obsidian sm:text-[2.7rem] lg:text-[3.1rem]">
              Real estate advisory, built around your goals.
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-foreground/65 lg:col-span-4 lg:col-start-9">
            Five disciplines, one standard of evidence. Each engagement is scoped to the decision
            in front of you, not to a product we need to move.
          </p>
        </Reveal>

        <div className="mt-12 border-t border-obsidian/15">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.04}>
              <Link
                to={`/services#${service.id}`}
                className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 gap-y-2 border-b border-obsidian/15 py-6 transition-colors duration-300 hover:bg-white/70 sm:px-3"
              >
                <span className="font-display text-sm text-copper/70">{service.code}</span>
                <div>
                  <h3 className="font-display text-[1.4rem] leading-tight text-obsidian transition-colors duration-300 group-hover:text-copper sm:text-[1.7rem]">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-foreground/60">
                    {service.lead}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {/* <span className="hidden font-body text-[9px] uppercase tracking-[0.24em] text-foreground/40 xl:block">
                    {service.focus}
                  </span> */}
                  <ArrowUpRight
                    className="h-4 w-4 text-obsidian/35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-copper"
                    strokeWidth={1.5}
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}