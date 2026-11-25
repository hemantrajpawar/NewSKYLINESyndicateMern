import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  copper: "bg-copper text-white hover:bg-obsidian",
  gold: "bg-gold text-obsidian hover:bg-white",
  "outline-light": "border border-white/25 text-ivory hover:border-gold hover:text-gold",
  "outline-dark": "border border-obsidian/20 text-obsidian hover:border-copper hover:text-copper",
  "ghost-light": "text-ivory/80 hover:text-gold",
};

export default function ActionLink({
  to,
  href,
  children,
  variant = "copper",
  className,
  icon = true,
  onDark = false,
  onClick,
  type,
  ...rest
}) {
  const classes = cn(
    "group inline-flex h-12 items-center justify-center gap-3 px-6 font-body text-[10px] uppercase tracking-[0.28em] transition-colors duration-300 sm:px-7",
    variants[variant],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.5}
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type || "button"} className={classes} onClick={onClick} {...rest}>
      {content}
    </button>
  );
}