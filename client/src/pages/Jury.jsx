import { useEffect, useRef } from "react";
import { PageHero, FadeUp, StaggerContainer, StaggerItem, NeonCard } from "../components/Motion.jsx";
import GuestCard from "../components/GuestCard.jsx";
import JurySection, { juryMembers } from "../components/JurySection.jsx";


export default function Jury() {
  return (
    <>
      <PageHero
        title="Our Esteemed Guests & Speakers"
      >
        {/* Featured Swiper Section */}
        <JurySection hideHeader={true} />

        {/* Grid Section */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white/40">
              Complete Honors List
            </span>
          </div>

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch"
            staggerDelay={0.08}
          >
            {juryMembers.map((member, i) => (
              <StaggerItem key={i} className="h-full flex justify-center">
                <GuestCard member={member} index={i} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </PageHero>
    </>
  );
}
