import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteConfig";
import { siteConfig } from "@/lib/siteConfig";
import ActionLink from "@/components/site/ActionLink";
import Reveal from "@/components/site/Reveal";
import HeroPlate from "./HeroPlate";

const signals = [
"STRATEGIC PROPERTY ADVISORY",
"MARKET-LED INSIGHTS",
"CLIENT-FIRST APPROACH"];


export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-obsidian text-ivory">
      <div className="absolute inset-0 -z-10">
        <Image
          src={images.hero}
          alt="Contemporary stone and glass residence in Pune at blue hour"
          fittingType="fill"
          className="h-full w-full object-cover"
          loading="eager" />
        
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/88 to-obsidian/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/60" />
      </div>

      <div className="container-x flex flex-1 items-center pb-12 pt-[176px] lg:pt-[214px]">
        <div className="grid w-full items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="eyebrow text-gold">
                  Est. {siteConfig.establishedYear} · {siteConfig.city}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-7 max-w-[14ch] text-balance text-[2.4rem] leading-[0.98] tracking-[-0.02em] sm:text-[3.1rem] lg:max-w-none lg:text-[3.5rem] xl:text-[3.9rem]">
                VISION<br/> EXCELLENCE<br/> LEGACY
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-[610px] text-[20px] leading-[1.6] text-ivory/70">
  At Skyline Syndicate, we bring together market knowledge, strategic insight
  and personalised guidance to help you make confident real estate decisions.
  From finding the right property to identifying rewarding investment
  opportunities, we simplify every step with transparency, expertise and a
  long-term perspective across Pune.
</p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ActionLink to="/contact" variant="copper" className="w-full sm:w-auto">
                  Book a consultation
                </ActionLink>
                <ActionLink to="/services" variant="outline-light" className="w-full sm:w-auto">
                  Our services
                </ActionLink>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-12 hidden items-center gap-4 lg:flex">
                

                
                <span className="relative h-px w-16 overflow-hidden bg-white/15">
                  <span className="cue-line absolute inset-y-0 left-0 w-6 bg-gold/80" />
                </span>
              </div>
            </Reveal>
          </div>

          {/* <div className="hidden lg:col-span-5 lg:block">
            <HeroPlate />
          </div> */}
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="container-x grid gap-0 py-5 sm:grid-cols-3">
          {signals.map((signal, index) =>
          <div
            key={signal}
            className={`py-2 sm:py-0 ${
            index > 0 ? "sm:border-l sm:border-white/12 sm:pl-6" : ""}`
            }>
            
              <p className="font-body text-[9px] uppercase tracking-[0.26em] text-ivory/45">
                {signal}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

}