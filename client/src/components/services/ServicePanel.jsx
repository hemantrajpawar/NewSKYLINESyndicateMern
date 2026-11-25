import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import Reveal from "@/components/site/Reveal";
import ActionLink from "@/components/site/ActionLink";

export default function ServicePanel({ service, index }) {
  const reversed = index % 2 === 1;

  return (
    <section
      id={service.id}
      className={cn(
        "scroll-mt-24 border-t border-obsidian/10 py-14 lg:py-20",
        index % 2 === 0 ? "bg-background" : "bg-white"
      )}
    >
      <div className="container-x grid items-center gap-9 lg:grid-cols-12 lg:gap-14">
        <Reveal
          className={cn(
            "lg:col-span-6",
            reversed ? "lg:order-2 lg:col-start-7" : "lg:order-1"
          )}
        >
          <div className="relative">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fittingType="fill"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            {/* <span className="absolute left-0 top-0 bg-obsidian/90 px-4 py-2 font-body text-[8px] uppercase tracking-[0.26em] text-gold">
              Practice {service.code}
            </span> */}
          </div>
        </Reveal>

        <Reveal
          className={cn(
            "lg:col-span-5",
            reversed ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-8"
          )}
          delay={0.06}
        >
          <h2 className="text-balance font-display text-[1.9rem] leading-[1.1] text-obsidian sm:text-[2.3rem]">
            {service.title}
          </h2>
          <p className="mt-3 font-display text-[1.15rem] italic leading-snug text-copper">
            {service.lead}
          </p>
          <p className="mt-5 text-[14px] leading-relaxed text-foreground/70">
            {service.body}
          </p>

          <ul className="mt-6 space-y-2.5">
            {service.points.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-[13px] leading-relaxed text-foreground/70"
              >
                <span className="mt-1 shrink-0 text-sm leading-none text-gold">
                  ✦
                </span>{" "}
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-obsidian/10 pt-5">
            <ActionLink
              to="/contact"
              variant="outline-dark"
              icon={false}
              className="h-11 px-5 text-[9px]"
            >
              Discuss this mandate
            </ActionLink>
            <p className="font-body text-[9px] uppercase tracking-[0.22em] text-foreground/40">
              {service.focus}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
