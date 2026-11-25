import { images, siteConfig } from "@/lib/siteConfig";
import { principles } from "@/lib/content";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import FinalCta from "@/components/site/FinalCta";


const facts = [
  { label: "Established", value: "2024" },
  { label: "Base", value: "Pune, Maharashtra" },
  { label: "Disciplines", value: "Five" },
  { label: "Micro-markets", value: "Eleven" },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            A practice built for the
            <br />
            decision, not the transaction.
          </>
        }
        lead="Skyline Syndicate advises on property decisions across Pune  established to replace transaction pressure with evidence."
        meta={[{ label: "Established", value: "2024" }, { label: "Base", value: "Pune" }]}
        image={images.material}
        imageAlt="Travertine wall meeting teak joinery with a brass detail in warm light"
      />

      <section className="bg-background py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-copper/50" />
                <span className="eyebrow text-copper">The company</span>
              </div>
              <h2 className="text-balance text-[2rem] leading-[1.08] text-obsidian sm:text-[2.5rem]">
                Independent counsel, on the client’s side of the table.
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-foreground/75">
                <p>
                  Skyline Syndicate was founded in {siteConfig.establishedYear} as a premium real
                  estate consulting and advisory practice in Pune. The premise was simple: most
                  property decisions are made with too little verified information and too much
                  persuasion around them.
                </p>
                <p>
                  We are retained by the client and paid by the client. No developer, seller or
                  channel partner compensates us for a recommendation. That independence is the
                  foundation of the practice  it is what allows us to test a project properly and
                  to say when it should not proceed.
                </p>
                <p>
                  The work covers prime residential corridors, IT-belt commercial premises,
                  industrial land, private family holdings and sale-side mandates for owners. The
                  scale changes,the standard of evidence does not.
                </p>
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1}>
              <dl className="divide-y divide-obsidian/10 border-y border-obsidian/10">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex items-baseline justify-between py-4">
                    <dt className="meta-label">{fact.label}</dt>
                    <dd className="font-display text-[1.15rem] text-obsidian">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              {/* <p className="mt-6 text-[12px] leading-relaxed text-foreground/50">
                Team profiles are not published in this prototype. Verified biographies will be
                added once approved — no credentials or histories are claimed here.
              </p> */}
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="border-y border-obsidian/10 bg-white py-16 lg:py-24">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-copper/50" />
              <span className="eyebrow text-copper">Principles</span>
            </div>
            <h2 className="text-balance text-[2rem] leading-[1.08] text-obsidian sm:text-[2.5rem]">
              How the practice works.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.05}>
                <div className="border-t border-obsidian/15 pt-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-xs text-gold">0{index + 1}</span>
                    <h3 className="font-display text-[1.35rem] leading-snug text-obsidian">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-foreground/65">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="meta-label text-copper">Engagement</p>
            <h2 className="mt-4 text-balance font-display text-[1.8rem] leading-tight text-obsidian">
              How a mandate begins.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.06}>
          <div className="grid gap-8 sm:grid-cols-3">
  {[
    {
      step: "01",
      title: "Conversation",
      body: "A private discussion of the decision at hand, the timeline and the constraints.",
    },
    {
      step: "02",
      title: "Scope",
      body: "A defined mandate — what will be examined, in what depth, and by when.",
    },
    {
      step: "03",
      title: "Recommendation",
      body: "Written reasoning you can act on, with the assumptions and risks visible.",
    },
  ].map((item) => (
    <div key={item.step}>
      <span className="font-display text-sm text-copper/70">
        {item.step}
      </span>

      {/* Horizontal divider */}
      <div className="my-4 h-px w-full bg-gold/40" />

      <h3 className="font-display text-[1.2rem] text-obsidian">
        {item.title}
      </h3>

      <p className="mt-2 text-[13px] leading-relaxed text-foreground/60">
        {item.body}
      </p>
    </div>
  ))}
</div>
          </Reveal>
        </div>
      </section>

      <FinalCta
        eyebrow="Introduction"
        title="Begin with a conversation."
        lead="No obligation and no sales pitch — a direct discussion about what you are deciding."
      />
    </>
  );
}

export default AboutPage;
