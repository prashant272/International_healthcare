import { PageHero, FadeUp, StaggerContainer, StaggerItem, NeonCard } from "../components/Motion.jsx";
import { motion } from "framer-motion";

const mediaSections = [
  {
    icon: "📰",
    title: "Print Media",
    badge: "Premium",
    color: "from-emerald-400 to-teal-400",
    accent: "border-emerald-400/40",
    items: [
      { label: "Times of India Feature", date: "Jan 2024", desc: "Exclusive feature on International Healthcare Awards ceremony and its impact on the global medical community." },
      { label: "Hindustan Exclusive Coverage", date: "Feb 2023", desc: "Full-page coverage of award winners, keynote speeches, and healthcare milestones celebrated at the event." },
    ],
  },
  {
    icon: "📺",
    title: "Electronic Media",
    badge: "Featured",
    color: "from-blue-400 to-indigo-400",
    accent: "border-blue-400/40",
    items: [
      { label: "Zee News Interview", date: "March 2024", desc: "Special broadcast interview with key healthcare leaders and award organisers discussing the future of global healthcare." },
      { label: "DD National Event Coverage", date: "2023", desc: "National broadcast of the award ceremony, highlighting winners and their contributions to healthcare excellence." },
    ],
  },
  {
    icon: "🌐",
    title: "Digital Media",
    badge: "Online",
    color: "from-purple-400 to-violet-400",
    accent: "border-purple-400/40",
    items: [
      { label: "The Print – Special Coverage", date: "May 2024", desc: "In-depth digital report covering the awards, jury insights, and the journey of healthcare innovation in 2024." },
      { label: "#GlobalHealthcareAwards Trending", date: "2024", desc: "Award ceremony trended globally on social media with thousands of posts celebrating healthcare excellence." },
    ],
  },
];

export default function Media() {
  return (
    <>
      {/* Hero */}
      <PageHero
        badge="Media Coverage"
        icon="🎬"
        title="Media Coverage"
        subtitle="Experience our journey through the eyes of national and international media — in print, on screen, and across digital platforms."
      >
        {/* Media Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8" staggerDelay={0.12}>
            {mediaSections.map((section, si) => (
              <StaggerItem key={si}>
                <NeonCard color="emerald" className="h-full !p-0">
                  <div className="p-6 md:p-7 h-full flex flex-col text-left">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-3xl">{section.icon}</span>
                      <h2 className={`text-xl font-black bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                        {section.title}
                      </h2>
                      <span className={`ml-auto px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-gradient-to-r ${section.color} text-white opacity-80`}>
                        {section.badge}
                      </span>
                    </div>

                    {/* Accent line */}
                    <div className={`h-[2px] w-full rounded-full bg-gradient-to-r ${section.color} mb-5 opacity-60`} />

                    {/* Media Items */}
                    <div className="space-y-3 flex-1">
                      {section.items.map((item, ii) => (
                        <div
                          key={ii}
                          className="group relative rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:bg-white/10 hover:border-emerald-400/30 hover:shadow-[0_0_20px_rgba(52,211,153,0.12)]"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-sm font-bold text-white leading-snug">{item.label}</span>
                            <span className={`flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${section.color} text-white opacity-70`}>
                              {item.date}
                            </span>
                          </div>
                          <p className="text-xs text-emerald-100/55 text-left leading-relaxed group-hover:text-emerald-100/80 transition-colors">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </NeonCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* CTA + Previous Editions */}
          <FadeUp className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/previous-editions"
              className="btn-outline"
            >
              ← Previous Editions
            </a>
            <span className="glass-card border border-emerald-400/20 px-6 py-3 text-sm text-emerald-200/70 flex items-center gap-2 animate-border-glow">
              <span className="animate-pulse text-yellow-400">✨</span>
              More highlights coming soon
            </span>
          </FadeUp>
        </div>
      </PageHero>
    </>
  );
}
