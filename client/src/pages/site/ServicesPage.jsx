import { services } from "@/lib/content";
import { images } from "@/lib/siteConfig";
import PageHero from "@/components/site/PageHero";
import ServicePanel from "@/components/services/ServicePanel";
import Reveal from "@/components/site/Reveal";
import FinalCta from "@/components/site/FinalCta";


function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Real estate advisory,
            <br />
            built around your goals.
          </>
        }
        lead="Five disciplines, one standard of evidence. Each engagement is scoped to the decision in front of you  not to a product we need to move."
        meta={[
          { label: "Disciplines", value: "Five" },
          { label: "Base", value: "Pune" },
        ]}
        image={images.commercial}
        imageAlt="Base of a Grade-A office tower at dusk with a warm reflected horizon"
      />

      <section className="bg-background py-14 lg:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="meta-label text-copper">How we engage</p>
          </Reveal>
          <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.06}>
            <p className="text-balance font-display text-[1.5rem] leading-snug text-obsidian sm:text-[1.9rem]">
              Advisory is not a menu of properties. It is a defined question, examined properly,
              with a recommendation you can act on.
            </p>
            <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-foreground/70">
              Every practice area follows the same five-stage approach : understand, research,
              evaluate, advise, guide  with the depth of work adjusted to the size and complexity
              of the decision.
            </p>
          </Reveal>
        </div>
      </section>

      <div>
        {services.map((service, index) => (
          <ServicePanel key={service.id} service={service} index={index} />
        ))}
      </div>

      <FinalCta
        eyebrow="Next step"
        title="Start with the decision, not the shortlist."
        lead="Tell us what you are trying to resolve. We will tell you what the diligence should cover."
      />
    </>
  );
}

export default ServicesPage;
