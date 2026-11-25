import { Link } from "react-router-dom";
import { insights } from "@/lib/content";
import { images } from "@/lib/siteConfig";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import InsightCard from "@/components/site/InsightCard";
import FinalCta from "@/components/site/FinalCta";


function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            The Skyline
            <br />
            perspective.
          </>
        }
        lead="Notes on how Pune property decisions are actually made  written by the advisory desk, not by a marketing team."
        image={images.puneDusk}
        imageAlt="City rooftops and towers across Pune at dusk"
      />

      <section className="bg-background py-14 lg:py-20">
        <div className="container-x">
          {/* <Reveal className="flex flex-col gap-3 border-b border-obsidian/12 pb-6 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="eyebrow text-copper">Editorial</p>
            <p className="max-w-lg text-[12.5px] leading-relaxed text-foreground/50">
              The articles below are drafts prepared for review. They are labelled as drafts and
              are not presented as published research.
            </p>
          </Reveal> */}

          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:gap-x-10 lg:gap-y-14">
            {insights.map((article, index) => (
              <Reveal key={article.slug} delay={index * 0.05}>
                <InsightCard article={article} featured={index === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        eyebrow="Conversation"
        title="Have a question the articles do not answer?"
        lead="Bring it to the desk. We will tell you what we would examine."
      />
    </>
  );
}

export default InsightsPage;
