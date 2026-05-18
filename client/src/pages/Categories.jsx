import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { StaggerContainer, StaggerItem, PageHero, SectionHeading, FadeUp, AuroraBackground, NeonCard } from "../components/Motion.jsx";
import { useNavigate } from "react-router-dom";

const categoryGroups = [
  {
    group: "Healthcare Institution",
    icon: "🏥",
    color: "from-emerald-400 to-teal-500",
    items: [
      { title: "Excellence in AI-Driven Hospital Transformation", desc: "Recognizes hospitals that have strategically adopted Artificial Intelligence across clinical care, diagnostics, operations, and patient engagement to improve outcomes, efficiency, and innovation." },
      { title: "Outstanding Future-Ready Healthcare Institution", desc: "Honors healthcare institutions demonstrating visionary leadership in digital transformation, smart infrastructure, sustainability, and technology-enabled patient-centric care." },
      { title: "Excellence in Digital & Smart Hospital Infrastructure", desc: "Recognizes hospitals implementing advanced digital infrastructure such as HIS, EMR/EHR, IoT-enabled facilities, smart ICUs, and automated clinical workflows." },
      { title: "Excellence in Telemedicine & Virtual Care", desc: "Celebrates healthcare providers delivering high-quality care through teleconsultation platforms, remote monitoring, virtual diagnostics, and digital health ecosystems." },
      { title: "Excellence in Digital Diagnostics & Imaging Innovation", desc: "Recognizes healthcare institutions leveraging AI-powered diagnostics, advanced imaging systems, and data-driven clinical decision support." },
      { title: "Excellence in Patient Experience & Engagement Innovation", desc: "Honors hospitals enhancing patient experience through digital platforms, AI chatbots, mobile health apps, and personalized care journeys." },
      { title: "Outstanding Technology-Driven Medical Education & Training Institute", desc: "Honors medical colleges and healthcare training institutes using simulation labs, virtual learning, AI-assisted diagnostics training, and immersive education technologies." },
    ],
  },
  {
    group: "Leadership",
    icon: "👑",
    color: "from-amber-400 to-yellow-500",
    items: [
      { title: "Visionary Healthcare Leader in Digital Transformation", desc: "Honors healthcare leaders driving large-scale digital transformation, innovation, and technology-led healthcare excellence." },
      { title: "Transformative Hospital CEO of the Year", desc: "Recognizes hospital CEOs leading technology-driven growth, operational excellence, and patient-centric innovation." },
      { title: "Pioneering Medical Director in Clinical Innovation", desc: "Honors medical directors advancing clinical excellence through AI-driven diagnostics, digital treatment models, and innovation-led care delivery." },
      { title: "Outstanding Doctor in Technology-Enabled Patient Care", desc: "Recognizes doctors leveraging digital tools, telemedicine, AI, and advanced technologies to deliver superior patient outcomes." },
      { title: "Emerging Healthcare Leader in Digital Innovation", desc: "Recognizes rising healthcare leaders demonstrating early impact through innovation, technology adoption, and digital healthcare initiatives." },
    ],
  },
  {
    group: "HealthTech / MedTech",
    icon: "💊",
    color: "from-blue-400 to-indigo-500",
    items: [
      { title: "Excellence in AI-Powered Healthcare Solutions", desc: "Recognizes companies delivering AI-driven platforms for diagnostics, clinical decision support, and healthcare automation." },
      { title: "Excellence in Digital Health & Telemedicine Innovation", desc: "Honors organizations redefining healthcare delivery through telehealth platforms, virtual care, and remote monitoring technologies." },
      { title: "Excellence in Medical Devices & Smart Health Technologies", desc: "Recognizes MedTech companies innovating in connected devices, smart diagnostics, wearables, and medical hardware solutions." },
      { title: "Excellence in Healthcare Data Analytics & Intelligence Platforms", desc: "Honors companies leveraging healthcare data, predictive analytics, and AI to drive better outcomes and operational efficiency." },
      { title: "Excellence in Digital Mental Health & Wellness Technology", desc: "Honors platforms delivering digital mental health services, therapy solutions, wellbeing apps, and emotional support technologies." },
      { title: "Rising Star HealthTech / MedTech Company", desc: "Celebrates emerging healthcare technology companies demonstrating strong innovation, scalability, and market impact." },
      { title: "Outstanding HealthTech / MedTech Company of the Year", desc: "Recognizes an organization demonstrating exceptional leadership, innovation, and impact in healthcare technology." },
    ],
  },
  {
    group: "Patient Care & Clinical Excellence",
    icon: "❤️",
    color: "from-rose-400 to-pink-500",
    items: [
      { title: "Excellence in Patient-Centric Care Model", desc: "Recognizes healthcare institutions delivering holistic, personalized, and outcome-driven patient care through integrated clinical and digital approaches." },
      { title: "Excellence in Clinical Outcomes & Quality Care", desc: "Honors hospitals achieving superior clinical outcomes, patient safety, and quality benchmarks through evidence-based and technology-supported practices." },
      { title: "Excellence in Multispecialty Care Delivery", desc: "Recognizes institutions providing comprehensive multispecialty healthcare with seamless coordination, advanced treatment protocols, and patient-focused services." },
    ],
  },
  {
    group: "Public Health & Social Impact",
    icon: "🌍",
    color: "from-green-400 to-emerald-500",
    items: [
      { title: "Excellence in Community Healthcare Outreach", desc: "Honors organizations improving healthcare access through community programs, rural health initiatives, and preventive care outreach." },
      { title: "Excellence in Preventive & Population Health Management", desc: "Recognizes initiatives focused on preventive healthcare, population health analytics, and proactive disease management strategies." },
      { title: "Outstanding Contribution to Public Health Innovation", desc: "Celebrates organizations driving impactful public health solutions through policy innovation, technology, and large-scale health programs." },
    ],
  },
  {
    group: "Specialty Healthcare",
    icon: "🔬",
    color: "from-purple-400 to-violet-500",
    items: [
      { title: "Excellence in Oncology Care & Innovation", desc: "Recognizes healthcare providers delivering advanced cancer care through precision medicine, technology, and patient-centered approaches." },
      { title: "Excellence in Cardiac Care & Innovation", desc: "Honors institutions achieving excellence in cardiac treatment, digital diagnostics, and interventional cardiology." },
      { title: "Excellence in Women & Child Healthcare", desc: "Recognizes organizations delivering comprehensive, technology-enabled care for women's health and pediatric services." },
    ],
  },
];

const colorMap = {
  "Healthcare Institution": "border-emerald-400/30 hover:border-emerald-400/60",
  "Leadership": "border-amber-400/30 hover:border-amber-400/60",
  "HealthTech / MedTech": "border-blue-400/30 hover:border-blue-400/60",
  "Patient Care & Clinical Excellence": "border-rose-400/30 hover:border-rose-400/60",
  "Public Health & Social Impact": "border-green-400/30 hover:border-green-400/60",
  "Specialty Healthcare": "border-purple-400/30 hover:border-purple-400/60",
};

export default function Categories() {
  const navigate = useNavigate();

  return (

    <PageHero
      badge="Global Healthcare Awards 2026"
      icon="🏆"
      title="International Healthcare Award Categories"
      subtitle="Recognizing global excellence and innovation across healthcare, leadership and technology."

    >
      {/* Category Sections */}
      <div className="max-w-6xl mx-auto px-2 sm:px-6 pb-2 space-y-0.5">
        {categoryGroups.map((group, gi) => (
          <section key={gi}>
            {/* Group heading */}
            <FadeUp className="flex items-center gap-2 mb-1">
              <span className="text-3xl">{group.icon}</span>
              <div>
                <h2 className="text-2xl md:text-3xl font-black font-serif text-white">{group.group}</h2>
                <div className={`mt-1 h-[3px] w-20 rounded-full bg-gradient-to-r ${group.color}`} />
              </div>
            </FadeUp>

            {/* Swiper for this group */}
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              loop={group.items.length > 3}
              autoplay={{ delay: 3800 + gi * 200, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 18 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              className="!pb-12"
            >
              {group.items.map((item, ii) => (
                <SwiperSlide key={ii} className="h-auto">
                  <NeonCard color="emerald" className="h-full !p-0">
                    <div className="h-full flex flex-col text-left p-6 md:p-7 min-h-[220px]">
                      {/* Category badge */}
                      <span className={`inline-block self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r ${group.color} text-white mb-4 opacity-90`}>
                        {group.group}
                      </span>
                      <div className="flex items-start gap-2 mb-3">
                        <span className="text-emerald-300 mt-0.5 flex-shrink-0">🏅</span>
                        <h3 className="text-base md:text-lg font-bold text-white group-hover:text-emerald-100 transition-colors leading-snug">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-emerald-100/65 text-sm leading-relaxed mt-auto group-hover:text-emerald-100/85 text-left transition-colors">
                        {item.desc}
                      </p>
                    </div>
                  </NeonCard>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        ))}
      </div>

      {/* CTA Footer */}
      <FadeUp className="text-center py-2 bg-gradient-to-t from-emerald-950/50 to-transparent border-t border-emerald-500/10">
        <p className="text-emerald-200/70 text-sm mb-4">All award categories are subject to jury review.</p>
        <div className="relative group w-max mx-auto">
          {/* The Glow Layer - Matches button shape exactly */}
          <div className="absolute inset-0 rounded-full bg-emerald-600/50 blur-md animate-border-glow group-hover:bg-emerald-400/40 transition-all" />

          {/* The Button */}
          <button
            onClick={() => navigate("/nominate")}
            className="relative z-10 btn-primary text-base px-8 py-3 rounded-full border border-emerald-400/50 bg-slate-950 text-white flex items-center gap-2"
          >
            Apply for Nomination →
          </button>
        </div>



      </FadeUp>
    </PageHero>
  );
}
