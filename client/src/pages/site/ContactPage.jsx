import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig, whatsappHref } from "@/lib/siteConfig";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { useState } from "react";
import { X } from "lucide-react";
import { images } from "@/lib/siteConfig";


function ContactPage() {
  const { contact } = siteConfig;
  const [privacyOpen, setPrivacyOpen] = useState(false);
  return (
    <>
      <PageHero
  eyebrow="Consultation"
  title={<>Let's Connect</>}
  lead="One desk reads every enquiry. Expect a considered reply with a clear view of what the diligence should cover."
  meta={[
    { label: "Response", value: "2 working days" },
    { label: "Base", value: "Pune" },
  ]}
  backgroundImage={images.apartment}
/>

      <section className="bg-background py-14 lg:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-copper/50" />
                <span className="eyebrow text-copper">Consultation request</span>
              </div>
              <h2 className="text-balance font-display text-[1.9rem] leading-tight text-obsidian sm:text-[2.3rem]">
A conversation focused on your property goals              </h2>
            </Reveal>
            <Reveal delay={0.06} className="mt-9">
              <ContactForm onOpenPrivacy={() => setPrivacyOpen(true)} />
            </Reveal>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.08}>
              

<div className="border-t border-obsidian/15 pt-6">
  <p className="meta-label text-copper">Advisory Desk</p>

  
<ul className="mt-6 space-y-5 text-foreground/70">

  {/* Visit Us */}
  <li className="grid grid-cols-[16px_minmax(0,1fr)] items-start gap-x-3">
  <MapPin
    className="mt-[5px] h-4 w-4 text-copper/80"
    strokeWidth={1.5}
  />

  <div className="min-w-0">
    <h4 className="font-display text-[18px] font-normal leading-7 text-obsidian">
      Visit Us
    </h4>

    <a
      href="https://www.google.com/maps/search/?api=1&query=Excella+Co-working,+Baner+Balewadi+Rd,+near+Syngenta,+Laxman+Nagar,+Baner,+Pune,+Maharashtra+411045"
      target="_blank"
      rel="noopener noreferrer"
      title="Open in Google Maps"
      className="mt-0.5 block text-[13px] leading-relaxed transition-colors duration-300 hover:text-copper"
    >
      {contact.addressLines.join(", ")}
    </a>
  </div>
</li>

  {/* Call Us */}
  <li className="grid grid-cols-[16px_minmax(0,1fr)] items-start gap-x-3">
    <Phone className="mt-[5px] h-4 w-4 text-copper/80" strokeWidth={1.5} />
    <div className="min-w-0">
      <h4 className="font-display text-[18px] font-normal leading-7 text-obsidian">
        Call Us
      </h4>
      <a
        href={contact.phoneHref}
        className="mt-0.5 block text-[13px] leading-relaxed transition-colors hover:text-copper"
      >
        {contact.phoneDisplay}
      </a>
    </div>
  </li>

  {/* Email Us */}
  <li className="grid grid-cols-[16px_minmax(0,1fr)] items-start gap-x-3">
    <Mail className="mt-[5px] h-4 w-4 text-copper/80" strokeWidth={1.5} />
    <div className="min-w-0">
      <h4 className="font-display text-[18px] font-normal leading-7 text-obsidian">
        Email Us
      </h4>
      <a
        href={`mailto:${contact.email}`}
        className="mt-0.5 block break-all text-[13px] leading-relaxed transition-colors hover:text-copper"
      >
        {contact.email}
      </a>
    </div>
  </li>

  {/* WhatsApp */}
  <li className="grid grid-cols-[16px_minmax(0,1fr)] items-start gap-x-3">
    <MessageCircle className="mt-[5px] h-4 w-4 text-copper/80" strokeWidth={1.5} />
    <div className="min-w-0">
      <h4 className="font-display text-[18px] font-normal leading-7 text-obsidian">
        WhatsApp
      </h4>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-0.5 block text-[13px] leading-relaxed transition-colors hover:text-copper"
      >
        Connect directly with our team.
      </a>
    </div>
  </li>

  {/* Instagram */}
  <li className="grid grid-cols-[16px_minmax(0,1fr)] items-start gap-x-3">
    <Instagram className="mt-[5px] h-4 w-4 text-copper/80" strokeWidth={1.5} />
    <div className="min-w-0">
      <h4 className="font-display text-[18px] font-normal leading-7 text-obsidian">
        Instagram
      </h4>
      <a
        href={contact.instagramUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-0.5 block text-[13px] leading-relaxed transition-colors hover:text-copper"
      >
        {contact.instagramHandle}
      </a>
    </div>
  </li>

</ul>

</div>



              <div className="mt-8 border-t border-obsidian/15 pt-6">
                <p className="meta-label text-copper">Hours</p>
                <dl className="mt-4 space-y-2.5">
                  {contact.hours.map((row) => (
                    <div
                      key={row.day}
                      className="flex items-baseline justify-between gap-4 text-[12.5px] text-foreground/65"
                    >
                      <dt>{row.day}</dt>
                      <dd className="text-obsidian/70">{row.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* <p className="mt-8 border-t border-obsidian/15 pt-5 text-[11.5px] leading-relaxed text-foreground/40">
                Desk details shown on this prototype are provisional and remain configurable
                until verified.
              </p> */}
            </Reveal>
          </aside>
        </div>
      </section>

     
{/* Privacy Notice Modal */}
{privacyOpen && (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/55 px-4 py-6 backdrop-blur-[3px]"
    onClick={() => setPrivacyOpen(false)}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
      className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-copper/20 bg-[#F5F2EC] px-6 py-8 shadow-2xl sm:px-10 sm:py-10"
      onClick={(event) => event.stopPropagation()}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={() => setPrivacyOpen(false)}
        aria-label="Close privacy notice"
        className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center border border-obsidian/15 text-obsidian/60 transition-colors hover:border-copper hover:bg-copper hover:text-white"
      >
        <X className="h-4 w-4" strokeWidth={1.5} />
      </button>

      {/* Modal Heading */}
      <div className="mb-8 pr-10">
        <p className="meta-label text-copper">
          Privacy Notice
        </p>

        <h2
          id="privacy-title"
          className="mt-4 font-display text-[2rem] leading-tight text-obsidian sm:text-[2.5rem]"
        >
         Your Information. Our Responsibility.
        </h2>

        <div className="mt-5 h-px w-16 bg-copper/50" />
      </div>

      {/* Privacy Content */}
    
<div className="space-y-7 text-[14px] leading-[1.8] text-foreground/75">

  {/* Introduction */}
  <div>
    <h3 className="mb-3 font-display text-[1.35rem] leading-snug text-obsidian">
      Your Information. Our Responsibility.
    </h3>

    <p>
      At Skyline Syndicate, we respect the privacy of individuals who
      connect with us through our website, enquiry forms, telephone,
      email and other communication channels.
    </p>
  </div>

  {/* 01. Information We Collect */}
  <div>
    <h4 className="mb-2 font-display text-[1.1rem] text-obsidian">
      01. Information We Collect
    </h4>
    <p>
      We may collect your name, contact number, email address, property
      preferences, budget range, area of interest and any additional
      information you voluntarily provide.
    </p>
  </div>

  {/* 02. How We Use Your Information */}
  <div>
    <h4 className="mb-2 font-display text-[1.1rem] text-obsidian">
      02. How We Use Your Information
    </h4>

    <p className="mb-2">
      Your information may be used to:
    </p>

    <ul className="list-disc space-y-1 pl-5 marker:text-copper">
      <li>Understand your real estate requirements.</li>
      <li>Respond to enquiries and arrange consultations.</li>
      <li>Share relevant property and project information.</li>
      <li>Coordinate property visits and transaction-related communication.</li>
      <li>Improve our services and communication.</li>
    </ul>
  </div>

  {/* 03. Confidentiality */}
  <div>
    <h4 className="mb-2 font-display text-[1.1rem] text-obsidian">
      03. Confidentiality &amp; Non-Disclosure
    </h4>
    <p>
      Your personal information remains confidential. Skyline Syndicate
      does not sell, rent, disclose or share your personal details with
      developers, builders, sellers, channel partners, advertisers or
      any other external party.
    </p>
    <p className="mt-2">
      Your information is accessed only by authorised personnel for
      the purpose of handling your enquiry and providing the requested
      assistance.
    </p>
  </div>

  {/* 04. Data Protection */}
  <div>
    <h4 className="mb-2 font-display text-[1.1rem] text-obsidian">
      04. Data Protection &amp; Retention
    </h4>
    <p>
      We take reasonable measures to protect personal information
      against unauthorised access, misuse or disclosure. Information
      is retained only for the period necessary for its stated purpose
      and applicable legal requirements.
    </p>
  </div>

  {/* 05. Privacy Rights */}
  <div>
    <h4 className="mb-2 font-display text-[1.1rem] text-obsidian">
      05. Your Privacy Rights
    </h4>
    <p>
      You may contact us to request access to, correction of or
      deletion of your personal information, subject to applicable
      legal requirements.
    </p>
  </div>

  {/* 06. Contact */}
  <div>
    <h4 className="mb-2 font-display text-[1.1rem] text-obsidian">
      06. Contact
    </h4>
    <p>
      For privacy-related questions or requests, please contact
      the Skyline Syndicate team through our official business email.
    </p>
  </div>

</div>


      {/* Modal Footer */}
      <div className="mt-8 border-t border-obsidian/15 pt-5">
        <p className="text-[11.5px] leading-relaxed text-foreground/45">
          Provisional notice — to be reviewed by counsel before launch.
        </p>

        <button
          type="button"
          onClick={() => setPrivacyOpen(false)}
          className="mt-6 bg-copper px-7 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-obsidian"
        >
          Close Notice
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}

export default ContactPage;
