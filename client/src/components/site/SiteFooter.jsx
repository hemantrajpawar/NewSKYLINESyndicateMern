import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig, whatsappHref } from "@/lib/siteConfig";
import { services } from "@/lib/content";
import Logo from "./Logo";

const companyLinks = [
  { label: "About the practice", to: "/about" },
  { label: "Our approach", to: "/approach" },
  { label: "Insights", to: "/insights" },
  { label: "Contact", to: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-obsidian text-ivory">
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo size="lg" />
            <p className="mt-7 max-w-xs font-display text-[1.35rem] leading-snug text-ivory/85">
              {siteConfig.descriptor} · {siteConfig.city}
            </p>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-ivory/45">
              Independent counsel on residential, commercial and industrial property
              decisions across Pune.
            </p>
            <a
              href={siteConfig.contact.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-7 inline-flex items-center gap-2.5 font-body text-[10px] uppercase tracking-[0.22em] text-ivory/60 transition-colors hover:text-gold"
            >
              <Instagram className="h-3.5 w-3.5" strokeWidth={1.5} />
              {siteConfig.contact.instagramHandle}
            </a>
          </div>

          <div className="lg:col-span-3">
            <p className="meta-label text-ivory/40">Practices</p>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services#${service.id}`}
                    className="text-[13px] text-ivory/65 transition-colors hover:text-gold"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="meta-label text-ivory/40">Practice</p>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[13px] text-ivory/65 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="meta-label text-ivory/40">Advisory desk</p>
            <ul className="mt-5 space-y-4 text-[13px] text-ivory/65">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" strokeWidth={1.5} />
                <span>
                  {siteConfig.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              <li>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="flex items-center gap-3 transition-colors hover:text-gold"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 text-gold/70" strokeWidth={1.5} />
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-gold"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-gold/70" strokeWidth={1.5} />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-3 font-body text-[10px] uppercase tracking-[0.22em] text-ivory/60 transition-colors hover:text-gold"
                >
                  Message on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-[10px] uppercase tracking-[0.2em] text-ivory/35">
            © {siteConfig.establishedYear}–{new Date().getFullYear()} {siteConfig.legalName}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-[10px] uppercase tracking-[0.2em] text-ivory/35">
            <Link to="/contact#privacy" className="transition-colors hover:text-gold">
              Privacy notice
            </Link>
            {/* <Link to="/projects" className="transition-colors hover:text-gold">
              Internal · Project desk
            </Link>
            <span>Prototype — details provisional</span> */}
          </div>
        </div>
      </div>
    </footer>
  );
}