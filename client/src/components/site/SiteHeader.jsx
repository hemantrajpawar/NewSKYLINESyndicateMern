import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import BrandLockup from "./BrandLockup";
import ActionLink from "./ActionLink";
import MobileMenu from "./MobileMenu";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const solid = scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          solid
            ? "border-b border-obsidian/10 bg-ivory/95 backdrop-blur-md"
            : "border-b border-white/10 bg-transparent"
        )}
      >
        <div
          className={cn(
            "overflow-hidden transition-all duration-500",
            solid ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          )}
        >
          <div className="container-x flex h-9 items-center justify-between gap-6 border-b border-white/10">
            <p className="flex items-center gap-2.5 font-body text-[8px] uppercase tracking-[0.3em] text-ivory/45">
              <span className="h-1 w-1 rounded-full bg-gold" />
              CLIENT-FIRST APPROACH
            </p>
            <div className="hidden items-center gap-5 font-body text-[8px] uppercase tracking-[0.3em] text-ivory/40 sm:flex">
              <span>Mon – Sat · 9:00 – 19:00</span>
              <span className="h-3 w-px bg-white/15" />
              <span className="text-gold/70">Pune · Maharashtra</span>
            </div>
          </div>
        </div>

        <div className="container-x flex h-[76px] items-center justify-between gap-6">
          <BrandLockup solid={solid} />

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {siteConfig.nav.map((item) => {
              const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "group relative font-body text-[10px] uppercase tracking-[0.24em] transition-colors duration-300",
                    solid
                      ? active
                        ? "text-obsidian"
                        : "text-obsidian/55 hover:text-obsidian"
                      : active
                        ? "text-ivory"
                        : "text-ivory/65 hover:text-ivory"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-2 left-0 h-px bg-gold transition-all duration-300",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ActionLink
              to="/contact"
              variant={solid ? "outline-dark" : "outline-light"}
              icon={false}
              className="hidden h-11 px-6 text-[9px] sm:inline-flex"
            >
              Private consultation
            </ActionLink>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center border transition-colors duration-300 lg:hidden",
                solid
                  ? "border-obsidian/20 text-obsidian hover:border-copper hover:text-copper"
                  : "border-white/25 text-ivory hover:border-gold hover:text-gold"
              )}
            >
              <Menu className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}