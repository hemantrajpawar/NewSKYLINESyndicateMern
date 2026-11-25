import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Image } from "@/components/ui/image";
import { insights } from "@/lib/content";
import Reveal from "@/components/site/Reveal";
import FinalCta from "@/components/site/FinalCta";
import { NotFound } from "@/components/NotFound";


function InsightPage() {
  const { slug } = useParams();
  const article = insights.find((item) => item.slug === slug);
  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} — Skyline Syndicate`;
    let description = document.querySelector('meta[name="description"]');
    if (!description) { description = document.createElement("meta"); description.name = "description"; document.head.appendChild(description); }
    description.content = article.summary || "Skyline Syndicate advisory insight.";
  }, [article]);
  if (!article) return <NotFound />;

  return (
    <>
      <article>
        <div className="bg-obsidian pb-12 pt-[128px] text-ivory lg:pb-16 lg:pt-[164px]">
          <div className="container-x">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.24em] text-ivory/50 transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
              All insights
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-body text-[9px] uppercase tracking-[0.24em] text-gold/80">
              <span className="border border-gold/40 px-2 py-1">Draft</span>
              <span>{article.category}</span>
              <span className="h-px w-4 bg-white/25" />
              <span>{article.readTime}</span>
            </div>

            <h1 className="mt-6 max-w-3xl text-balance text-[2.2rem] leading-[1.05] sm:text-[3rem] lg:text-[3.6rem]">
              {article.title}
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ivory/60">
              {article.summary}
            </p>
          </div>
        </div>

        <div className="bg-background">
          <div className="container-x">
            <div className="aspect-[16/9] w-full overflow-hidden">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fittingType="fill"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </div>

          <div className="container-x grid gap-10 py-14 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-7">
              <div className="space-y-6 text-[15.5px] leading-[1.8] text-foreground/80">
                {article.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-8 border-t border-obsidian/12 pt-5 text-[12px] leading-relaxed text-foreground/45">
                Draft editorial. Figures and market context will be verified against primary
                sources before publication.
              </p>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <Reveal>
                <div className="border border-obsidian/12 bg-white p-6">
                  <p className="meta-label text-copper">The takeaway</p>
                  <p className="mt-3 font-display text-[1.25rem] leading-snug text-obsidian">
                    {article.takeaway}
                  </p>
                </div>
                <div className="mt-8 border-t border-obsidian/12 pt-5">
                  <p className="meta-label">Written by</p>
                  <p className="mt-2 font-display text-lg text-obsidian">
                    The Skyline Syndicate advisory desk
                  </p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-foreground/50">
                    Pune · Maharashtra
                  </p>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </article>

      <FinalCta
        eyebrow="Discuss"
        title="Put the question to the desk."
        lead="Editorial is general. A mandate is specific — start with a conversation."
      />
    </>
  );
}

export default InsightPage;
