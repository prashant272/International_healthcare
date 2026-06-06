import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { fetchUpcomingEditions } from "../../services/api.js";

export default function HeroSection() {
  const navigate = useNavigate();
  const [shouldRenderIframe, setShouldRenderIframe] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [upcomingAwards, setUpcomingAwards] = useState([]);
  const [upcomingLoading, setUpcomingLoading] = useState(true);

  useEffect(() => {
    // Render iframe shortly after mount to keep initial page paint ultra-fast
    const timer = setTimeout(() => setShouldRenderIframe(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function loadUpcoming() {
      try {
        const res = await fetchUpcomingEditions();
        const flattened = res.reduce((acc, group) => acc.concat(group.items.map(item => ({ ...item, year: group.year }))), []);
        setUpcomingAwards(flattened);
      } catch (err) {
        console.error("Failed to fetch upcoming awards:", err);
      } finally {
        setUpcomingLoading(false);
      }
    }
    loadUpcoming();
  }, []);

  const EventCard = ({ event }) => (
    <article className="group relative w-full max-w-[95%] sm:max-w-[520px] mx-auto h-auto flex flex-col rounded-[1.5rem] overflow-hidden transition-all duration-700 hover:-translate-y-3 hover:scale-[1.02] p-4 xs:p-5 sm:p-6 md:p-8 bg-slate-900/40 bg-black/20 backdrop-blur-md border border-white/20 shadow-2xl shadow-black/60">
      {/* 4 Corner Brackets */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#FB7185] rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#FB7185] rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#60A5FA] rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#60A5FA] rounded-br-lg" />

      {/* Banner Image */}
      <img src={event.images?.[0] || event.banner} alt="banner" className="w-full h-full object-cover rounded-2xl" />

      {/* Dual Equal-Width Buttons */}
      <div className="grid grid-cols-2 gap-2.5 mt-4 sm:mt-6">
        <button onClick={() => navigate("/nominate")}
          className="bg-gradient-to-r cursor-pointer from-[#000080] via-[#B8860B] to-[#C41E3A] py-2.5 rounded-lg font-black text-white shadow-[0_0_20px_rgba(251,113,133,0.4)] hover:shadow-[0_0_30px_rgba(251,113,133,0.6)] transition-all duration-300 flex items-center justify-center gap-1.5 text-[9px] sm:text-[11px] uppercase tracking-wider">
          NOMINATE <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
        <button onClick={(e) => {
          e.stopPropagation();
          const formattedTitle = event.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          const year = event.year || event.date?.match(/\d{4}/)?.[0] || "2026";
          navigate(`/upcoming-editions/${year}/${formattedTitle}`);
        }}
          className="bg-white/10 border border-[#818CF8]/50 py-2.5 rounded-lg font-black text-[#D4A96A] shadow-[0_0_20px_rgba(129,140,248,0.2)] hover:bg-white/20 hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 text-[9px] sm:text-[11px] uppercase tracking-wider">
          MORE INFO <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>
      </div>
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
    </article>
  );

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* ===== BACKGROUND VIDEO: Responsive & Premium ===== */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none select-none overflow-hidden ">
        {/* Fallback / Placeholder Image displayed immediately */}
        <img
          src="/banner.jpg"
          alt="Award Ceremony Fallback"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000"
          style={{ opacity: isVideoLoaded ? 0.2 : 1 }}
        />

        {shouldRenderIframe && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000"
            style={{
              width: "100vw",
              height: "56.25vw",
              minHeight: "100vh",
              minWidth: "177.77vh",
              opacity: isVideoLoaded ? 1 : 0
            }}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/Th0wptIA0f4?autoplay=1&mute=1&loop=1&playlist=Th0wptIA0f4&start=35&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1"
              title="International Healthcare Awards Background"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setIsVideoLoaded(true)}
              style={{
                pointerEvents: "none",
                transform: "scale(1.3)", // Zoom in slightly to hide black bars/UI
              }}
            ></iframe>
          </div>
        )}
        {/* Top, bottom subtle overlays for extra premium depth */}
        <div className="absolute top-0 left-0 w-full h-1/6 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-[#2d180a]/80 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ===== LIGHTER GRADIENT OVERLAY ===== */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/50" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 md:px-8 pt-22 pb-12 text-center">

        {/* ===== HERO TEXT ===== */}
        <div className="max-w-[48rem] mx-auto space-y-2 sm:space-y-1 animate-fade-in pt-0.5 relative">
          {/* Backdrop Spotlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 pointer-events-none rounded-full" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)' }} />

          {/* Changed from h1 to h2 for SEO to avoid multiple H1 tags on the page */}
          <h2 className="text-[13px] xs:text-[16px] sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-black font-heading tracking-tight leading-tight text-white px-2 [text-shadow:_0_0_30px_rgba(16,185,129,0.4),_0_0_60px_rgba(16,185,129,0.2)]">
            <span className="inline-block whitespace-nowrap text-center">
              <span className="text-cyan-50 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">International</span>{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-white to-cyan-300 bg-clip-text text-transparent inline-block font-black filter drop-shadow-[0_0_50px_rgba(16,185,129,1)]">
                Healthcare
              </span>{" "}
              <span className="text-emerald-50 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">Awards</span>
              <span className="text-emerald-50 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">, 2026</span>
            </span>
          </h2>
          <div className="mx-auto w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full -mt-2" />
          <p className="mt-2 text-[10px] xs:text-xs sm:text-sm md:text-lg lg:text-xl text-white font-black leading-relaxed [text-shadow:_0_2px_15px_rgba(0,0,0,1)] max-w-none mx-auto whitespace-normal sm:whitespace-nowrap">
            Organised by{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-black drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]">
              TIME Cyber Media Pvt Ltd.
            </span>{" "}
            – International Award Events
          </p>
        </div>

        {/* ===== EVENTS SECTION ===== */}
        <div className="w-full max-w-[1600px] mx-auto relative z-30">
          <div className="w-full relative z-15 px-3">
            {(() => {
              const validAwards = upcomingAwards.filter(award => (award.images && award.images.length > 0) || (award.banner && award.banner.trim() !== ""));

              if (validAwards.length === 0) return null;

              if (validAwards.length === 1) {
                return (
                  <div className="flex justify-center w-full pb-5 pt-3">
                    <EventCard event={validAwards[0]} />
                  </div>
                );
              }

              const displayEvents = validAwards.length > 0 && validAwards.length < 6
                ? [...validAwards, ...validAwards]
                : validAwards;

              return (
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={24}
                  slidesPerView={1}
                  loop={displayEvents.length > 1}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  speed={1200}
                  pagination={{ clickable: true, dynamicBullets: true }}
                  breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 7 },
                    768: { slidesPerView: 2, spaceBetween: 7 },
                    1024: { slidesPerView: 2, spaceBetween: 7 },
                  }}
                  className="hero-swiper w-full pb-16"
                >
                  {displayEvents.map((event, index) => (
                    <SwiperSlide key={index} className="h-auto flex justify-center py-2 px-2">
                      <EventCard event={event} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
