import { images } from "@/lib/siteConfig";
import PageHero from "@/components/site/PageHero";
import StageTimeline from "@/components/approach/StageTimeline";
import Reveal from "@/components/site/Reveal";
import FinalCta from "@/components/site/FinalCta";


function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Our approach"
        title={
          <>
            Five stages between a
            <br />
            question and a possession.
          </>
        }
        lead="No stage is skipped and none is compressed to protect a transaction. If the evidence fails at stage three, we say so."
        meta={[
          { label: "Stages", value: "Five" },
          { label: "Output", value: "Written advice" },
        ]}
        image={images.facadeGeometry}
        imageAlt="Layered stone and shadow building facades in low warm sunlight"
      />

      <section className="bg-background py-16 lg:py-24">
        <div className="container-x">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              {/* <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-copper/50" />
                <span className="eyebrow text-copper">The process</span>
              </div> */}
              <h2 className="text-balance text-[2rem] leading-[1.08] text-obsidian sm:text-[2.5rem]">
                The Skyline approach.
              </h2>
            </div>
            <p className="max-w-sm text-[14px] leading-relaxed text-foreground/65 lg:col-span-4 lg:col-start-9">
              The same discipline is applied to a first apartment and to a warehousing portfolio.
              Only the depth of work scales.
            </p>
          </Reveal>

          <StageTimeline />
        </div>
      </section>

      <section className="border-y border-obsidian/10 bg-sand/50 py-14 lg:py-16">
        <div className="container-x grid items-center gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-balance font-display text-[1.6rem] leading-[1.35] text-obsidian sm:text-[2.1rem]">
              “Advisory that cannot say no is not advisory — it is marketing with a fee attached.”
            </p>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.06}>
            <p className="text-[13.5px] leading-relaxed text-foreground/65">
              Because we are paid by the client, a negative recommendation costs us the transaction
              and nothing else. That is the point.
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta
        eyebrow="Begin"
        title="Start at stage one."
        lead="A private conversation about the decision, the timing and what the diligence should cover."
      />
    </>
  );
}

export default ApproachPage;
