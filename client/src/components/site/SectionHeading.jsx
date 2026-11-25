import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  dark = false,
  className,
  align = "left",
  action,
  level = 2,
}) {
  const Tag = `h${level}`;
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex w-full items-end justify-between gap-8",
          align === "center" && "flex-col items-center gap-5"
        )}
      >
        <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
          {eyebrow && (
            <div className="mb-5 flex items-center gap-3">
              <span className={cn("h-px w-8", dark ? "bg-gold/70" : "bg-copper/50")} />
              <span className={cn("eyebrow", dark ? "text-gold" : "text-copper")}>{eyebrow}</span>
            </div>
          )}
          <Tag
            className={cn(
              "text-balance text-[2rem] leading-[1.08] sm:text-[2.6rem] lg:text-[3.1rem]",
              dark ? "text-ivory" : "text-obsidian"
            )}
          >
            {title}
          </Tag>
        </div>
        {action && <div className="hidden shrink-0 pb-2 lg:block">{action}</div>}
      </div>
      {lead && (
        <p
          className={cn(
            "max-w-xl text-[15px] leading-relaxed sm:text-base",
            dark ? "text-ivory/65" : "text-foreground/70"
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}