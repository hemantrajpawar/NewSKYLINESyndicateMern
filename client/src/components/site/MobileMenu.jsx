import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { siteConfig, whatsappHref } from "@/lib/siteConfig";
import Logo from "./Logo";
import ActionLink from "./ActionLink";

export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] overflow-y-auto bg-obsidian text-ivory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="container-x flex h-[74px] items-center justify-between">
            <Logo size="md" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center border border-white/20 text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-x mt-8 pb-12">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {siteConfig.nav.map((item, index) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className="flex items-baseline justify-between gap-6 py-5"
                  >
                    <span className="font-display text-[1.85rem] font-light tracking-tight text-ivory">
                      {item.label}
                    </span>
                    <span className="eyebrow text-[9px] text-gold/70">0{index + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3">
              <ActionLink to="/contact" variant="copper" onClick={onClose} className="w-full">
                Book a consultation
              </ActionLink>
              <ActionLink href={whatsappHref} variant="outline-light" className="w-full">
                WhatsApp the desk
              </ActionLink>
            </div>

            <div className="mt-10 space-y-2 font-body text-[11px] tracking-[0.18em] text-ivory/45">
              <p className="uppercase">{siteConfig.locationLabel}</p>
              <a href={siteConfig.contact.phoneHref} className="block hover:text-gold">
                {siteConfig.contact.phoneDisplay}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="block hover:text-gold">
                {siteConfig.contact.email}
              </a>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}