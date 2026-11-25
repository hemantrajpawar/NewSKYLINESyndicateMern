import { Link } from "react-router-dom";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

export default function BrandLockup({ solid = false }) {
  return (
    <Link
      to="/"
      aria-label="Skyline Syndicate — home"
      className="group inline-flex shrink-0 items-center gap-3.5 sm:gap-4"
    >
      <span className="inline-flex items-center justify-center">
        <img
          src={siteConfig.logo.url}
          alt={siteConfig.logo.alt}
          className="h-[32px] w-auto select-none object-contain sm:h-[36px]"
          draggable="false"
        />
      </span>

      <span className="flex flex-col">
        <span
          className={cn(
            "font-display text-[14px] uppercase leading-none tracking-[0.3em] transition-colors duration-500 sm:text-[15px]",
            solid ? "text-obsidian" : "text-ivory"
          )}
        >
          Skyline
        </span>
        <span className="mt-1.5 flex items-center gap-2">
          <span className="h-px w-4 bg-gold/80 transition-all duration-500 group-hover:w-7" />
          <span
            className={cn(
              "font-body text-[8px] uppercase leading-none tracking-[0.4em] transition-colors duration-500",
              solid ? "text-obsidian/55" : "text-ivory/60"
            )}
          >
            Syndicate
          </span>
        </span>
      </span>

      <span
        className={cn(
          "hidden h-9 w-px xl:block",
          solid ? "bg-obsidian/12" : "bg-white/15"
        )}
      />

      <span
        className={cn(
          "hidden font-body text-[8px] uppercase leading-[1.9] tracking-[0.22em] xl:block",
          solid ? "text-obsidian/50" : "text-ivory/45"
        )}
      >
        Real estate
        <br />
        advisory
      </span>
    </Link>
  );
}