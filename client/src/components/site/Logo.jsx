import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

const heights = {
  sm: "h-8",
  md: "h-[42px]",
  lg: "h-20",
  xl: "h-28"
};

/**
 * The supplied Skyline Syndicate emblem, presented unaltered.
 * It carries its own black ground, so it always sits on an obsidian plate.
 */
export default function Logo({ className, size = "md", plateClassName }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center opacity-100 bg-[hsl(var(--obsidian))]",
        size === "sm" ? "p-1" : "p-1.5",
        plateClassName
      )}>
      
      <img
        src={siteConfig.logo.url}
        alt={siteConfig.logo.alt}
        className={cn("w-auto select-none object-contain", heights[size], className)}
        draggable="false" />
      
    </span>);

}