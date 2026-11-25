import { stages } from "@/lib/content";
import { cn } from "@/lib/utils";
import Reveal from "@/components/site/Reveal";

export default function StageTimeline() {
  return (
    <div className="relative mt-12 lg:mt-16">
      <span className="absolute bottom-0 left-[7px] top-0 w-px bg-obsidian/12 md:left-1/2" />

      {stages.map((stage, index) => {
        const left = index % 2 === 0;
        return (
          <div key={stage.step} className="relative grid gap-4 pb-12 md:grid-cols-2 md:gap-14 md:pb-16">
            <span className="absolute left-[7px] top-3 h-2 w-2 -translate-x-1/2 rotate-45 bg-gold md:left-1/2" />

            <Reveal
              className={cn(
                "pl-9 md:pl-0",
                left ? "md:pr-14 md:text-right" : "md:order-2 md:pl-14"
              )}
            >
              <div className="flex items-center gap-3 md:justify-start">
                {/* <span
                  className={cn(
                    "eyebrow text-[9px] text-copper",
                    left && "md:order-2"
                  )}
                >
                  {stage.stage}
                </span> */}
                <span className="h-px w-6 bg-gold/60" />
                <h2 className="font-display text-[1.7rem] leading-none text-obsidian sm:text-[2rem]">
                  {stage.title}
                </h2>
              </div>
              <p className="mt-4 max-w-md text-[14px] leading-relaxed text-foreground/70 md:ml-auto">
                {stage.body}
              </p>
              <ul
                className={cn(
                  "mt-5 space-y-2 border-t border-obsidian/10 pt-4",
                  left && "md:ml-auto"
                )}
              >
                {stage.points.map((point) => (
                  <li
                    key={point}
                    className="text-[12.5px] leading-relaxed text-foreground/55 md:max-w-sm md:ml-auto"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div
              className={cn(
                "hidden md:block",
                left ? "md:order-2 md:pl-14" : "md:order-1 md:pr-14 md:text-right"
              )}
            >
              <span className="font-display text-[5.5rem] leading-none text-obsidian/[0.07] lg:text-[7rem]">
                {stage.step}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}