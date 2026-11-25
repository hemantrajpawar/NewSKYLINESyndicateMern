import { Image } from "@/components/ui/image";
import { images, siteConfig, whatsappHref } from "@/lib/siteConfig";
import ActionLink from "./ActionLink";
import Reveal from "./Reveal";

export default function FinalCta({
  eyebrow = "START A CONVERSATION",
  title = "Your next real estate decision starts with the right conversation.",
  lead = "Whether you are exploring a home, evaluating an investment, expanding your business or considering a property sale, our team is here to help you navigate the possibilities..",
  note,
}) {
  return (
    <section className="relative isolate overflow-hidden bg-obsidian text-ivory">
      <div className="absolute inset-0 -z-10">
        <Image
          src={images.commercial}
          alt="Grade-A office tower base at dusk"
          fittingType="fill"
          className="h-full w-full object-cover opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/92 to-obsidian/55" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent" />
      <div className="container-x grid gap-10 py-20 lg:grid-cols-12 lg:items-end lg:gap-16 lg:py-24">
        <Reveal className="lg:col-span-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/70" />
            <span className="eyebrow text-gold">{eyebrow}</span>
          </div>
          <h2 className="max-w-7xl text-balance text-[2.1rem] leading-[1.05] text-ivory sm:text-[2.9rem] lg:text-[3.4rem]">
            {title}
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ivory/60">{lead}</p>
        </Reveal>

        <Reveal className="lg:col-span-4" delay={0.1}>
          <div className="flex flex-col gap-3">
            <ActionLink to="/contact" variant="copper">
             Connect with our advisors  
            </ActionLink>
            <ActionLink href={whatsappHref} variant="outline-light">
              Explore Our Experties
            </ActionLink>
            <p className="mt-2 font-body text-[10px] uppercase leading-relaxed tracking-[0.2em] text-ivory/35">
              {note || `${siteConfig.locationLabel} · Advisory by appointment`}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}