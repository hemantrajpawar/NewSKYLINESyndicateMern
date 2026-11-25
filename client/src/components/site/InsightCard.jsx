import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { insights } from "@/lib/content";
import Reveal from "@/components/site/Reveal";

export default function InsightCard({ article, featured = false }) {
  return (
    <Link
      to="/insights/$slug"
      params={{ slug: article.slug }}
      className="group flex h-full flex-col"
    >
      <div className="relative overflow-hidden bg-obsidian/5">
        <div className={featured ? "aspect-[16/10]" : "aspect-[4/3]"}>
          <Image
            src={article.image}
            alt={article.imageAlt}
            fittingType="fill"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        {/* <span className="absolute left-0 top-0 bg-background/95 px-2.5 py-1 font-body text-[8px] uppercase tracking-[0.22em] text-copper">
          Draft
        </span> */}
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-center gap-3 font-body text-[9px] uppercase tracking-[0.22em] text-foreground/45">
          <span>{article.category}</span>
          {/* <span className="h-px w-4 bg-obsidian/20" /> */}
          {/* <span>{article.readTime}</span> */}
        </div>
        <h3 className="mt-3 text-balance font-display text-[1.35rem] leading-snug text-obsidian transition-colors duration-300 group-hover:text-copper sm:text-[1.5rem]">
          {article.title}
        </h3>
        <p className="mt-2.5 text-[13px] leading-relaxed text-foreground/60">{article.summary}</p>
      </div>
    </Link>
  );
}

export function InsightsPreview({ limit = 3 }) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-copper/50" />
              <span className="eyebrow text-copper">Insights</span>
            </div>
            <h2 className="text-balance text-[2.1rem] leading-[1.05] text-obsidian sm:text-[2.7rem] lg:text-[3.1rem]">
              The Skyline perspective.
            </h2>
          </div>
          <Link
            to="/insights"
            className="font-body text-[10px] uppercase tracking-[0.24em] text-copper underline-offset-8 transition-colors hover:text-obsidian hover:underline"
          >
            All insights
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {insights.slice(0, limit).map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.06}>
              <InsightCard article={article} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}