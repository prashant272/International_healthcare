
import MediaGallery from "../components/MediaGallery.jsx";
import JurySection from "../components/JurySection.jsx";
import UpcomingAwards from "../components/UpcomingAwards.jsx";
import MediaPartner from "../components/home/MediaPartner.jsx";
import HeroSection from "../components/home/HeroSection.jsx";
import OverviewDatesSection from "../components/home/OverviewDatesSection.jsx";
import WhyAwardsSection from "../components/home/WhyAwardsSection.jsx";
import ResearchMethodologySection from "../components/home/ResearchMethodologySection.jsx";
import SelectionProcessSection from "../components/home/SelectionProcessSection.jsx";
import WhoShouldNominateSection from "../components/home/WhoShouldNominateSection.jsx";
import CtaSection from "../components/home/CtaSection.jsx";
import FaqSection from "../components/home/FaqSection.jsx";
import PreviousEditionsSection from "../components/home/PreviousEditionsSection.jsx";


export default function Home() {

  return (
    <div className={`w-full text-[#f5f3f0]  `}>
      {/* SEO H1 - Hidden */}
      <h1 className="sr-only mt-24 ">
        Healthcare Awards – International Healthcare Awards by TIME Cyber Media Pvt Ltd
      </h1>
      {/* ================= HERO ================= */}
      <HeroSection />
      {/* OVERVIEW + DATES: Main theme background (use SECTION_BG to keep consistent) */}
      <OverviewDatesSection />
      {/* ================= WHY HealthCare Awards 2026 ================= */}
      <WhyAwardsSection />
      {/* ================= RESEARCH METHODOLOGY ================= */}
      <ResearchMethodologySection />
      {/* Selection Process */}
      <SelectionProcessSection />
      {/* WHO SHOULD NOMINATE section */}
      <WhoShouldNominateSection />
      {/* ================= GUESTS & SPEAKERS ================= */}
      <JurySection />

      {/* ================= MEDIA GALLERY ================= */}
      <MediaGallery />

      {/* CTA section */}
      <CtaSection />
      {/* ================= KEY FAQ SNAPSHOT ================= */}
      <FaqSection />
      {/* PREVIOUS EDITIONS CAROUSEL SECTION */}
      <PreviousEditionsSection />
      {/* OUR OTHER UPCOMING AWARDS section */}
      <div id="upcoming-awards">
        <UpcomingAwards />
      </div>
      {/* ================= MEDIA PARTNERS / COVERAGE ================= */}
      <MediaPartner />
    </div>
  );
}
