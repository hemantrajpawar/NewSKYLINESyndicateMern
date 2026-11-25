import Hero from "@/components/home/Hero";
import Marquee from "@/components/site/Marquee";
import PracticeIntro from "@/components/home/PracticeIntro";
import ServicesIndex from "@/components/home/ServicesIndex";
import EditorialGallery from "@/components/home/EditorialGallery";
import WhoWeAdvise from "@/components/home/WhoWeAdvise";
import WhyUs from "@/components/home/WhyUs";
import ApproachPreview from "@/components/home/ApproachPreview";
import PuneExpertise from "@/components/home/PuneExpertise";
import { InsightsPreview } from "@/components/site/InsightCard";
import TrustStatement from "@/components/home/TrustStatement";
import FinalCta from "@/components/site/FinalCta";


function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <PracticeIntro />
      <ServicesIndex />
      <EditorialGallery />
      <WhoWeAdvise />
      <WhyUs />
      <ApproachPreview />
      <PuneExpertise />
      <InsightsPreview />
      <TrustStatement />
      <FinalCta />
    </>
  );
}

export default HomePage;
