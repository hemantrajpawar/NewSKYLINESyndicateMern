import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { stages } from "@/lib/content";
import Reveal from "@/components/site/Reveal";
import ActionLink from "@/components/site/ActionLink";

export default function ApproachPreview() {
  return (
    <section className="bg-obsidian py-16 text-ivory lg:py-24">
      <div className="container-x">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/70" />
              <span className="eyebrow text-gold">Our approach</span>
            </div>
            <h2 className="text-balance text-[2.1rem] leading-[1.05] text-ivory sm:text-[2.7rem] lg:text-[3.1rem]">
               The Skyline Standard.
            </h2>
            <h4>A thoughtful process. A well-informed decision.</h4>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-sm text-[14px] leading-relaxed text-ivory/55">
              Every property requirement deserves a structured approach. From understanding your objectives to identifying the right opportunity and facilitating the transaction, we bring clarity, market knowledge and attention to detail at every stage.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {stages.map((stage, index) => (
            <Reveal key={stage.step} delay={index * 0.06}>
              <div className="border-t border-white/15 pt-5">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-[2.6rem] leading-none text-white/12">
                    {stage.step}
                  </span>
                  <span className="eyebrow text-[8px] text-gold/70">{stage.stage}</span>
                </div>
                <h3 className="mt-4 font-display text-[1.3rem] leading-tight text-ivory">
                  {stage.title}
                </h3>
                <p className="mt-2.5 text-[12.5px] leading-relaxed text-ivory/50">{stage.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-start gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md font-display text-lg italic leading-snug text-ivory/70">
              If the evidence fails at stage three, we say so.
            </p>
            <ActionLink to="/approach" variant="outline-light">
              Read the full approach
            </ActionLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}