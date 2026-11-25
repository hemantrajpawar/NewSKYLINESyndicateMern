import { Image } from "@/components/ui/image";
import { images, siteConfig } from "@/lib/siteConfig";
import Reveal from "@/components/site/Reveal";
import ActionLink from "@/components/site/ActionLink";

export default function PracticeIntro() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div className="aspect-[4/5] w-full overflow-hidden">
              <Image
                src={images.courtyard}
                alt="Arched stone courtyard with a single olive tree in morning light"
                fittingType="fill"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-5 -right-3 hidden w-40 border border-gold/40 bg-background p-4 sm:block">
              
              <p className="mt-1 font-display text-lg leading-tight text-obsidian">
                Pune, since {siteConfig.establishedYear}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              {/* <span className="h-px w-8 bg-copper/50" />
              <span className="eyebrow text-copper">The practice</span> */}
            </div>
            <h2 className="text-balance text-[2.1rem] leading-[1.05] text-obsidian sm:text-[2.7rem] lg:text-[3.1rem]">
              A different perspective on real estate.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-foreground/75">
             <div className="space-y-5">
  <p>
    Skyline Syndicate is an independent real estate advisory practice built
    on one principle: our client's interests come first. We bring clarity,
    objectivity and informed judgement to every property decision.
  </p>

  <p>
    We go beyond transactions, carefully evaluating developers, legal titles,
    project fundamentals and investment potential. Our independent approach
    ensures every recommendation is based on merit, not sales interests.
  </p>

  <p>
    Across premium residential, commercial and industrial real estate in Pune,
    we remain committed to one standard: research thoroughly, assess
    objectively and recommend responsibly. Because a well-informed decision
    is more valuable than a completed transaction.
  </p>
</div>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ActionLink to="/about" variant="outline-dark">
                About the practice
              </ActionLink>
              <p className="font-body text-[10px] uppercase tracking-[0.24em] text-foreground/45">
                {siteConfig.locationLabel}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}