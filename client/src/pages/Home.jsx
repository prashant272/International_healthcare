import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import MediaGallery from "../components/MediaGallery.jsx";
import { PageHero, FadeUp, StaggerContainer, StaggerItem, NeonCard } from "../components/Motion.jsx";
import GuestCard from "../components/GuestCard.jsx";
import { Autoplay, Pagination, EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchPreviousEditions } from "../services/api.js";



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-coverflow";

// Centralized brand background
// Centralized medical background

export default function Home() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const sectionRefs = useRef([]);

  // Removed local video playbackRate effect as we've switched to YouTube embed
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Delay heavy iframe load to unblock main thread
    const timer = setTimeout(() => setIsVideoLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const [editions, setEditions] = useState([]);
  const [editionsLoading, setEditionsLoading] = useState(true);

  useEffect(() => {
    const loadEditions = async () => {
      try {
        const res = await fetchPreviousEditions();
        setEditions(res.data || []);
      } catch (err) {
        console.error("Failed to load editions:", err);
      } finally {
        setEditionsLoading(false);
      }
    };
    loadEditions();
  }, []);



  const handleNominateClick = () => {
    navigate("/nominate");
  };

  //Event Data

  const events = [
    {
      title: "International Healthcare Awards 2026 – Dubai Edition ",
      desc: "Honoring groundbreaking achievements and revolutionary leaders who are shaping the future of global medicine and healthcare excellence across the UAE.",
      date: "26 April 2026",
      place: "Dubai, UAE",
      highlight: "International Excellence",
    },
    {
      title: "International Healthcare Awards 2026 – London Edition",
      desc: "Celebrating high-impact pioneers and visionaries in medical research and healthcare management in the heart of Europe’s most prestigious clinical landscape.",
      date: "9 June 2026",
      place: "House Of Common , London",
      highlight: "Global Recognition",
    },
  ];

  const juryMembers = [
    {
      name: "Rohit Sharma",
      designation: "Indian Cricketer",
      img: "jury1.jpeg"
    },

    {
      name: "Sunil Manohar Gavaskar",
      designation: "Indian Cricket Commentator & Former Cricketer",
      img: "jury2.jpeg"
    },

    {
      name: "Ms. Lara Dutta",
      designation: "Indian Actress & Model",
      img: "jury3.jpeg"
    },

    {
      name: "Brett Lee",
      designation: "Australian Cricketer",
      img: "jury4.jpeg"
    },

    {
      name: "Virender Sehwag",
      designation: "Indian Cricket Commentator & Former Cricketer",
      img: "jury5.jpeg"
    },

    {
      name: "Dr. Yoganand Shashtri",
      designation: "Former Reader, Shaheed Bhagat Singh College, Delhi",
      img: "jury6.jpeg"
    },

    {
      name: "Shri Sandeep Patil",
      designation: "Former Indian Cricketer & Chief of the BCCI Selection Committee",
      img: "jury7.jpeg"
    },

    {
      name: "Dr. Raj Aggarwal",
      designation: "Director of AIMA-CME",
      img: "jury8.jpeg"
    },

    {
      name: "Chetan Sharma",
      designation: "Former Indian Cricketer",
      img: "jury9.jpeg"
    },

    {
      name: "Padma Shri Dr. J. K. Singh",
      designation: "President, Cancer Care India; Former National Vice President, India Medical Association",
      img: "jury10.jpeg"
    },

    {
      name: "Mr. Arvind Sawant",
      designation: "Hon'ble Minister of Heavy Industries and Public Enterprise",
      img: "jury11.jpeg"
    },

    {
      name: "Mukesh Agnihotri",
      designation: "Deputy Chief Minister of Himachal Pradesh",
      img: "jury12.jpeg"
    },
  ];
  // Previous Media Partners
  const mediaPartners = [
    // ===== Premium National & International Media =====
    {
      name: "India Today",
      tagline: "India’s Leading News & Media Network",
      logo: "../india-today.png",
    },
    // {
    //   name: "Aaj Tak",
    //   tagline: "India’s No.1 Hindi News Channel",
    //   logo: "../aaj-tak.png",
    // },
    {
      name: "CNN ",
      tagline: "Global & National News Network",
      logo: "../cnn.jpg",
    },
    {
      name: "News18 India",
      tagline: "Trusted Hindi News Network",
      logo: "../news.png",
    },

    // ===== Strong National Hindi News =====
    {
      name: "Bharat 24",
      tagline: "Hindi News & Current Affairs Channel",
      logo: "../bharat.jpg",
    },
    {
      name: "Doordarshan's",
      tagline: "India’s Public Service News Channel",
      logo: "../ddd.png",
    },
    {
      name: "News 1 India",
      tagline: "National Hindi News Channel",
      logo: "../new1.png",
    },
    {
      name: "News 10 India",
      tagline: "National News & Current Affairs Network",
      logo: "../news10.jpg",
    },

    // ===== Regional / Specialised Media =====
    {
      name: "Delhi Aaj Tak",
      tagline: "Regional Hindi News Network",
      logo: "../delhiaajtk.jpg",
    },

    // ===== Event & Partner Media =====
    {
      name: "TIME Cyber Media Pvt Ltd",
      tagline: "National News & Media Network",
      logo: "../prime.png",
    },
    {
      logo: "../The-SME-Times.png",
    },

    // ===== Production & Foundation =====
    {
      name: "Xoom Studio",
      tagline: "Media Production & Event Coverage Partner",
      logo: "../xoom.jpg",
    },
    {
      logo: "../remont.jpg"
    },
  ];
  const nomineeCategories = [
    {
      title: "Hospitals & Healthcare Institutions",
      desc: "Recognising excellence in patient care, infrastructure, safety standards, and overall healthcare delivery.",
      icon: "🏥",
      color: "from-emerald-50 to-teal-500"
    },
    {
      title: "Clinics & Diagnostic Centers",
      desc: "Honouring clinics and diagnostic centres for accuracy, affordability, and quality medical services.",
      icon: "🧪",
      color: "from-cyan-50 to-cyan-600"
    },
    {
      title: "Healthcare Professionals & Leaders",
      desc: "Celebrating doctors, nurses, surgeons, and healthcare leaders for exceptional service and leadership.",
      icon: "👩‍⚕️",
      color: "from-emerald-50 to-medical-accent"
    },
    {
      title: "HealthTech & Digital Healthcare",
      desc: "Recognising innovation in digital health, telemedicine, AI-driven healthcare, and medical technology platforms.",
      icon: "💊",
      color: "from-indigo-50 to-indigo-600"
    }
  ];

  const upcomingAwards = [
    {
      title: "14th International Global Healthcare Awards & Summit 2026",
      desc: "Honouring excellence, innovation, and leadership in the global healthcare industry.",
      date: "26 April 2026",
      location: "Dubai",
      banner: "/healthcaredubai.png",
      link: "https://www.globalhealthcareawards.com",
      color: "from-[#ffecd2] to-[#fcb69f]"
    },
    {
      title: "14th Global Education Excellence Awards 2026",
      desc: "Celebrating outstanding contributions and leadership in the education sector.",
      date: "14 March 2026",
      location: "New Delhi, India",
      banner: "/educationdelhi.png",
      link: "https://globaleducationawards.in",
      color: "from-[#e0c3fc] to-[#8ec5fc]"
    },
    {
      title: "India Excellence Awards & Conference 2026",
      desc: "Recognising excellence, innovation, and leadership across Indian industries.",
      date: "14 March 2026",
      location: "New Delhi, India",
      banner: "/excellencedelhi.png",
      link: "https://www.primetimemedia.in/india-excellence-awards",
      color: "from-[#fddb92] to-[#d1fdff]"
    },
    {
      title: "Global Achievers Awards 2026",
      desc: "Honouring global leaders and achievers across multiple industries.",
      date: "9 June 2026",
      location: "House of Commons, London",
      banner: "/archiverlondon.png",
      link: "https://www.primetimemedia.in/global-achievers-awards",
      color: "from-[#cfd9df] to-[#e2ebf0]"
    },
    {
      title: "International Global Healthcare Awards 2026 – Washington DC Edition",
      desc: "Celebrating healthcare visionaries and policy leaders at the heart of the United States' medical capital.",
      date: "30 June 2026",
      location: "Washington, DC, USA",
      banner: "/USA.png",
      link: "https://www.globalhealthcareawards.com",
      color: "from-[#fdfbfb] to-[#ebedee]"
    },
    {
      title: "USA Business Leadership Summit 2026",
      desc: "A premier summit recognising visionary business leaders and entrepreneurs.",
      date: "30 June 2026",
      location: "Washington, DC, USA",
      banner: "/USA.png",
      link: "https://www.primetimemedia.in/usa-business-summit",
      color: "from-[#fdfbfb] to-[#ebedee]"
    }
  ];

  const homeFaqs = [
    {
      q: "What is International Global Healthcare Awards 2026?",
      a: "International Global Healthcare Awards 2026 is an international recognition platform that honours hospitals, doctors, clinics, healthcare organisations, and healthtech companies for excellence, innovation, and quality patient care.",
    },
    {
      q: "Who can apply for nomination?",
      a: "Hospitals and healthcare institutions, clinics and diagnostic centres, individual doctors and medical professionals, healthcare startups, healthtech companies, and medical or wellness organisations can apply for nomination.",
    },
    {
      q: "What is the nomination process and deadline?",
      a: "The nomination process is completely online. Applicants need to fill out the nomination form and submit the required details and documents. The current extended deadline mentioned on this page is 15 April 2026; for any change, updated dates will always be shown on the website.",
    },
    {
      q: "How are the winners selected?",
      a: "Winners are selected through a structured evaluation process that includes research-based assessment, service quality, innovation, patient impact, and ethical practices, as explained in the Research Methodology and Selection Process sections.",
    },
    {
      q: "What are the benefits of participating?",
      a: "Participants receive global recognition and credibility, enhanced brand visibility and media exposure, greater trust among patients and partners, networking with healthcare leaders, and marketing assets such as certificates and winner logos.",
    },
    {
      q: "Is self-nomination allowed?",
      a: "Yes, eligible organisations and individuals can nominate themselves directly for relevant categories.",
    },
  ];

  // Responsive and premium utility variables
  const getGridCols = (len) => {
    if (len >= 4) {
      return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
    }
    if (len === 3) {
      return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
    }
    if (len === 2) {
      return "grid-cols-1 sm:grid-cols-2";
    }
    return "grid-cols-1";
  };

  return (
    <div className={`w-full text-[#f5f3f0]  `}>
      {/* SEO H1 - Hidden */}
      <h1 className="sr-only mt-24 ">
        Healthcare Awards – International Global Healthcare Awards by TIME Cyber Media Pvt Ltd
      </h1>
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* ===== BACKGROUND VIDEO: Responsive & Premium ===== */}
        <div className="absolute inset-0 z-0 w-full h-full pointer-events-none select-none overflow-hidden ">
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
            {isVideoLoaded && (
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/Th0wptIA0f4?autoplay=1&mute=1&loop=1&playlist=Th0wptIA0f4&start=35&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1"
                title="International Healthcare Awards Background"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  pointerEvents: "none",
                  transform: "scale(1.3)", // Zoom in slightly to hide black bars/UI
                }}
              ></iframe>
            )}
          </div>
          {/* Fallback Image for mobile if video fails */}
          <noscript>
            <img
              src="/videos/hero-poster.jpg"
              alt="Award Ceremony"
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
          </noscript>
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

            <h1 className="text-lg xs:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-black font-heading tracking-tight leading-tight text-white px-2 [text-shadow:_0_0_30px_rgba(16,185,129,0.4),_0_0_60px_rgba(16,185,129,0.2)]">
              <span className="inline-block whitespace-nowrap text-center">
                <span className="text-cyan-50 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">International</span>{" "}
                <span className="bg-gradient-to-r from-emerald-300 via-white to-cyan-300 bg-clip-text text-transparent inline-block font-black filter drop-shadow-[0_0_50px_rgba(16,185,129,1)]">
                  Healthcare
                </span>{" "}
                <span className="text-emerald-50 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">Awards</span>
                <span className="text-emerald-50 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">, 2026</span>
              </span>
            </h1>
            <div className="mx-auto w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full -mt-2" />
            <p className="mt-2 text-sm xs:text-base md:text-lg lg:text-xl text-white font-black leading-relaxed [text-shadow:_0_2px_15px_rgba(0,0,0,1)] max-w-none mx-auto whitespace-nowrap">
              Organised by{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-black drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]">
                TIME Cyber Media Pvt Ltd.
              </span>{" "}
              – Global Award Events
            </p>
          </div>

          {/* ===== EVENTS SECTION ===== */}
          <div className="w-full max-w-[1600px] mx-auto relative z-30">
            <div className="w-full relative z-10 px-3">
              {(() => {
                const displayEvents = events;
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
                      640: { slidesPerView: 1, spaceBetween: 6 },
                      768: { slidesPerView: 2, spaceBetween: 7 },
                      1024: { slidesPerView: 2, spaceBetween: 7 },
                    }}
                    className="hero-swiper w-full pb-16"
                  >
                    {displayEvents.map((event, index) => (
                      <SwiperSlide key={index} className="h-auto flex justify-center py-2 px-2">
                        <div className="group relative w-full max-w-[95%] sm:max-w-[520px] mx-auto h-full min-h-[450px] flex flex-col rounded-[1.5rem] overflow-hidden transition-all duration-700 hover:-translate-y-3 hover:scale-[1.02] p-4 xs:p-5 sm:p-6 md:p-8 bg-slate-900/40  border border-white/20 shadow-2xl shadow-black/60">

                          {/* 4 Corner Brackets */}
                          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-emerald-500/40 rounded-tl-lg" />
                          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-emerald-500/40 rounded-tr-lg" />
                          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-emerald-500/40 rounded-bl-lg" />
                          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-emerald-500/40 rounded-br-lg" />

                          {/* Decorative Header (Absolute Top) */}
                          <div className="relative flex items-center gap-2.5 mb-2">
                            <div className="w-9 h-9 bg-emerald-500/20  rounded-xl border border-emerald-500/30 flex items-center justify-center shadow-xl">
                              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" />
                              </svg>
                            </div>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent" />
                          </div>

                          {/* Title (Centered) */}
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white leading-tight drop-shadow-2xl text-center relative z-10 mb-2">
                            {event.title}
                          </h3>

                          {/* Left-Aligned Description & Data */}
                          <div className="flex-1 flex flex-col justify-start text-left space-y-2.5 relative z-10">
                            <p className="text-white/80 text-xs sm:text-sm font-medium leading-relaxed">
                              {event.desc}
                            </p>

                            {/* Side-by-Side Data Boxes */}
                            <div className="grid grid-cols-2 gap-2.5 mt-10">
                              <div className="bg-white/5  p-2 rounded-2xl border border-white/10 flex flex-col items-center justify-center min-h-[3.4rem]">
                                <div className="flex items-center gap-1.5 mb-0.5 w-full justify-center">
                                  <svg className="w-3 h-3 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /></svg>
                                  <span className="text-[7px] font-black text-emerald-400 uppercase tracking-widest">DATE</span>
                                </div>
                                <span className="font-bold text-white text-[10px] sm:text-[12px] text-center leading-tight whitespace-normal">{event.date}</span>
                              </div>
                              <div className="bg-white/5  p-2 rounded-2xl border border-white/10 flex flex-col items-center justify-center min-h-[3.4rem]">
                                <div className="flex items-center gap-1.5 mb-0.5 w-full justify-center">
                                  <svg className="w-3 h-3 text-cyan-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                  <span className="text-[7px] font-black text-cyan-400 uppercase tracking-widest">VENUE</span>
                                </div>
                                <span className="font-bold text-white text-[10px] sm:text-[12px] text-center leading-tight whitespace-normal">{event.place}</span>
                              </div>
                            </div>
                          </div>

                          {/* Dual Equal-Width Buttons */}
                          <div className="grid grid-cols-2 gap-2.5 mt-4 sm:mt-6 mb-4">
                            <button onClick={() => navigate("/nominate")}
                              className="bg-gradient-to-r from-emerald-500 to-emerald-700 py-2.5 rounded-lg font-black text-white shadow-lg hover:shadow-emerald-500/40 transition-all duration-300 flex items-center justify-center gap-1.5 text-[9px] sm:text-[11px] uppercase tracking-wider">
                              NOMINATE <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </button>
                            <button onClick={() => navigate(`/edition/${event._id || event.id}`)}
                              className="bg-white/10  border border-white/20 py-2.5 rounded-lg font-black text-emerald-400 shadow-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-1.5 text-[9px] sm:text-[11px] uppercase tracking-wider">
                              MORE INFO <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </button>
                          </div>

                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                );
              })()}
            </div>
          </div>
        </div>
      </section>
      {/*. uniform background using pagehero   */}
      
        <div className="relative w-full">
          {/* OVERVIEW + DATES: Main theme background (use SECTION_BG to keep consistent) */}
          <section className={`relative overflow-hidden border-b border-[#10b981]/20 pb-2`}>
            {/* Gradient Glow Background */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full mix-blend-screen animate-blob" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 65%)' }} />
              <div className="absolute bottom-[20%] right-[-15%] w-[600px] h-[600px] rounded-full mix-blend-screen animate-blob animation-delay-2000" style={{ background: 'radial-gradient(circle, rgba(4, 120, 87, 0.15) 0%, transparent 65%)' }} />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 gap-x-12">
                {/* ==== LEFT: OVERVIEW ==== */}
                <div className="flex flex-col justify-center h-full lg:pr-6 xl:pr-12 text-left">
                  {/* Section Badge */}
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-500/10  border border-emerald-500/20 shadow-2xl hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-500 group/badge mb-4 self-start">
                    <div className="relative">
                      <svg className="w-5 h-5 text-emerald-400 group-hover/badge:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
                      <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-sm font-bold tracking-wider text-emerald-50 uppercase">ABOUT THE AWARDS</span>
                  </div>

                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-left">
                    <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
                      Overview of Healthcare Awards 2026
                    </span>
                  </h2>
                  <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-100 via-emerald-500 to-emerald-700 rounded-full mb-7" />

                  <div className="relative group">
                    {/* Intense Outer Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 via-emerald-400/20 to-emerald-500/30 opacity-0 group-hover:opacity-100 blur-3xl transition-all duration-1000 rounded-[2rem]" />

                    <div className="relative  rounded-[2rem] border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-700 p-8 lg:p-10 group-hover:border-emerald-400/50 group-hover:bg-white/[0.03]"
                      style={{
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
                        boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 8px 32px 0 rgba(0, 0, 0, 0.37)"
                      }}>
                      {/* Glass Shine Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                      {/* SEO Paragraph - Hidden */}
                      <p className="sr-only text-left">
                        Healthcare Awards by TIME Cyber Media Pvt Ltd, also known as International Global Healthcare
                        Awards, recognize excellence, innovation, hospitals, doctors, and healthcare
                        leaders worldwide.
                      </p>
                      {/* Emerald Bar */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-transparent" />
                      {/* Decorative Orb */}
                      <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-emerald-500/10 to-emerald-400/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
                      <div className="relative space-y-6 text-left">
                        {/* Award Name + Icon */}
                        <div className="flex items-start gap-4">
                          <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-100 opacity-30 blur-lg rounded-xl" />
                            <div className="relative p-3.5 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-100 to-emerald-700 shadow-xl">
                              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                                <path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" />
                              </svg>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-2xl lg:text-3xl font-black text-emerald-50 leading-tight">
                              International Global Healthcare Excellence Awards, 2026
                            </h3>
                            <p className="text-emerald-400 font-semibold mt-1 text-sm tracking-wide">
                              Achieving Excellence in Healthcare
                            </p>
                          </div>
                        </div>
                        <p className="text-emerald-100/60 leading-relaxed text-lg font-medium text-left">
                          The <span className="font-bold text-emerald-400">International Global Healthcare Awards, 2026</span> recognize significant contributions in the healthcare sector.<br /><br />
                          The Awards showcase the highest academic goals and outstanding achievements through <span className="font-semibold text-emerald-300">innovation, leadership, dedication,</span> and commitment towards learning.<br /><br />
                          <span className="font-semibold text-emerald-300">International Global Healthcare Excellence Awards, 2026</span> will be a converging point of the industry's elite – a celebration and recognition of excellence, reputation, and exemplary service.
                        </p>
                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-3 pt-4">
                          {['Excellence', 'Innovation', 'Leadership'].map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-4 py-2 rounded-xl text-sm font-bold bg-emerald-500/10 text-emerald-50 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                            >{feature}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ==== RIGHT: Key Dates ==== */}
                <div className="flex flex-col justify-center h-full lg:pl-8 xl:pl-16 space-y-8 text-left">
                  <div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-left">
                      <span className="bg-gradient-to-r from-emerald-50 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                        Key Dates
                      </span>
                    </h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-50 to-emerald-500 rounded-full" />
                  </div>
                  {/* Timeline Style Cards */}
                  <div className="space-y-6">
                    {[
                      {
                        title: 'Dubai Edition',
                        date: '26 April 2026',
                        icon: (
                          <span className="block w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-300 flex items-center justify-center shadow-lg">
                            <span className="text-xl">🇦🇪</span>
                          </span>
                        ),
                        border: 'from-emerald-500 to-emerald-300',
                      },
                      {
                        title: 'London Edition',
                        date: '9 June 2026',
                        icon: (
                          <span className="block w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center shadow-lg">
                            <span className="text-xl">🇬🇧</span>
                          </span>
                        ),
                        border: 'from-teal-500 to-cyan-400',
                      },
                      {
                        title: 'Washington DC Edition',
                        date: '30 June 2026',
                        icon: (
                          <span className="block w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg">
                            <span className="text-xl">🇺🇸</span>
                          </span>
                        ),
                        border: 'from-emerald-600 to-teal-400',
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="relative group"
                        style={{ animation: `fade-up 0.8s ease-out ${(idx + 1) * 120}ms both` }}>
                        <div className={`absolute -inset-1 bg-gradient-to-r ${item.border} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 rounded-2xl`} />
                        <div className="relative border border-emerald-500/30 shadow-xl overflow-hidden hover:bg-slate-900/20 hover:border-emerald-400/40 hover:shadow-2xl hover:shadow-emerald-500/10 transform hover:-translate-x-1 hover:scale-[1.02] transition-all duration-500 rounded-2xl bg-slate-900/40 ">
                          <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${item.border}`} />
                          <div className="p-6 flex items-center gap-5 text-left">
                            {/* Icon */}
                            <div>{item.icon}</div>
                            {/* Content */}
                            <div className="flex-1 pt-1 text-left">
                              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-emerald-50 mb-1 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-50 group-hover:to-white group-hover:bg-clip-text transition-all duration-500 text-left">{item.title}</h3>
                              <div className="flex items-center gap-2 text-emerald-400 text-sm sm:text-base text-left">
                                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /></svg>
                                <span className="font-bold">{item.date}</span>
                              </div>
                            </div>
                            {/* Checkmark */}
                            <div className="flex-shrink-0">
                              <div className="p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors duration-300">
                                <svg className="w-5 h-5 text-emerald-500 opacity-50 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 13l2.25 2L15 11" /></svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* CTA Card */}
                  <div className="relative group mt-8">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-50 via-emerald-500 to-emerald-500 opacity-20 group-hover:opacity-40 blur-xl transition-all duration-700 rounded-2xl" />
                    <div className="relative bg-emerald-950/70  rounded-2xl border border-emerald-500/30 shadow-2xl overflow-hidden hover:bg-emerald-900/40 hover:border-emerald-500/50 transition-all duration-500 p-8 text-left">
                      {/* Emerald Bar */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-100 to-emerald-500" />
                      <div className="flex items-center gap-4 mb-4 text-left">
                        <span className="text-2xl text-emerald-400 animate-pulse">✨</span>
                        <h4 className="text-xl font-black text-white text-left">Don't Miss Out!</h4>
                      </div>
                      <p className="text-emerald-100/70 leading-relaxed mb-6 font-medium text-left">
                        Submit your nomination before the deadline and be recognized for healthcare excellence.
                      </p>
                      <button onClick={handleNominateClick} className="relative w-full py-4 px-6 rounded-xl font-black text-white overflow-hidden group/btn transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-100 via-emerald-500 to-emerald-700 shadow hover:shadow-lg ">
                        <span className="relative z-10 text-lg tracking-wide">Nominate Now</span>
                        <svg className="w-5 h-5 relative z-10 group-hover/btn:rotate-12 transition-transform duration-500 text-white" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Decorative */}
              <div className="mt-20 text-center">
                <div className="inline-flex items-center gap-2 text-[#a7f3d0]/70 text-sm">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#a7f3d0]/50" />
                  <svg className="w-4 h-4 animate-pulse text-[#6ee7b7]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
                  <span className="font-medium">Celebrating Excellence in Healthcare</span>
                  <svg className="w-4 h-4 animate-pulse animation-delay-1000 text-[#6ee7b7]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
                  <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#a7f3d0]/50" />
                </div>
              </div>
            </div>
          </section>
          {/* ================= WHY ENTER ================= */}
          <section className={`relative overflow-hidden py-8`}>
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
              <div className="absolute top-0 right-1/4 w-[320px] sm:w-[420px] md:w-[500px] h-[320px] sm:h-[420px] md:h-[500px] bg-[#10b981]/5 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-0 left-1/4 w-[320px] sm:w-[420px] md:w-[500px] h-[320px] sm:h-[420px] md:h-[500px] bg-[#047857]/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
            </div>
            {/* ...rest code unchanged... */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
              {/* Heading and grid as before */}
              {/* ... code unchanged ... */}
              <FadeUp className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-black mb-4 bg-gradient-to-r from-white via-emerald-400 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  Why Enter Healthcare Awards 2026
                </h2>
                <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto rounded-full" />
                <p className="mt-6 text-emerald-100/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                  Gain global recognition, validate your achievements through independent jury assessment, and position your brand at the forefront of healthcare innovation.
                </p>
              </FadeUp>
              {/* ...grid ... */}
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {[
                  {
                    title: "National & Global Recognition",
                    desc: "Gain prestigious recognition across the healthcare industry and position your organisation among the most trusted and respected leaders.",
                    icon: "🌟",
                  },
                  {
                    title: "Independent Jury Validation",
                    desc: "All nominations are evaluated by an eminent and independent jury panel, ensuring credibility, transparency, and unbiased assessment.",
                    icon: "⚖️",
                  },
                  {
                    title: "Showcase Innovation & Impact",
                    desc: "Highlight your innovations, achievements, and measurable impact before policymakers, industry leaders, and stakeholders.",
                    icon: "💡",
                  },
                  {
                    title: "Strengthen Brand Authority",
                    desc: "Enhance brand reputation and reinforce trust among partners, clients, investors, and the broader healthcare ecosystem.",
                    icon: "🏆",
                  },
                  {
                    title: "Benchmark Against Industry Leaders",
                    desc: "Measure your performance against industry best practices, global standards, and emerging healthcare trends.",
                    icon: "📊",
                  },
                  {
                    title: "Future-Ready Positioning",
                    desc: "Demonstrate your organisation's readiness for future challenges through leadership, scalability, and sustainable growth.",
                    icon: "🚀",
                  },
                ].map((item, index) => (
                  <StaggerItem
                    key={index}
                    className="h-full"
                  >
                    <NeonCard color="emerald" className="h-full">
                      <div className="p-10 flex flex-col h-full text-left">
                        <div className="text-4xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                          {item.icon}
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-2xl font-black bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent group-hover:text-emerald-400 transition-colors duration-300 leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-emerald-100/60 text-base leading-relaxed font-medium group-hover:text-emerald-100 transition-colors duration-300">
                            {item.desc}
                          </p>
                        </div>

                        <div className="mt-auto pt-8 flex items-center gap-3">
                          <div className="h-1 w-12 bg-gradient-to-r from-emerald-500/50 to-transparent rounded-full group-hover:w-20 transition-all duration-500" />
                        </div>
                      </div>
                    </NeonCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
          {/* ================= RESEARCH METHODOLOGY ================= */}
          <section className={`relative overflow-hidden py-5`}>
            {/* Glow Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
              <div className="absolute top-1/3 right-0 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-[#10b981]/8 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/3 left-0 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-[#047857]/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
              <FadeUp className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-black mb-4 bg-gradient-to-r from-white via-emerald-400 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  Research <span className="text-emerald-400">Methodology</span>
                </h2>
                <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto rounded-full" />
                <p className="mt-6 text-emerald-100/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                  Our evaluation framework combines qualitative insights and quantitative metrics to ensure a transparent, unbiased, and credible assessment.
                </p>
              </FadeUp>

              {/* DATA */}
              {(() => {
                const items = [
                  {
                    title: "Data Collection & Screening",
                    desc: "All nominations are collected through a structured submission process. Each entry undergoes an initial screening to ensure eligibility, completeness, and alignment with the award category.",
                    number: "01",
                  },
                  {
                    title: "Qualitative & Quantitative Analysis",
                    desc: "Submissions are evaluated using a balanced research framework combining qualitative insights and quantitative metrics to assess performance, innovation, and impact.",
                    number: "02",
                  },
                  {
                    title: "Expert Jury Evaluation",
                    desc: "An independent panel of industry experts, academicians, and subject-matter specialists reviews shortlisted entries to ensure unbiased and credible assessment.",
                    number: "03",
                  },
                  {
                    title: "Benchmarking & Industry Standards",
                    desc: "Each nomination is benchmarked against industry best practices, regulatory standards, and emerging global trends to measure relevance and excellence.",
                    number: "04",
                  },
                  {
                    title: "Score Normalisation & Validation",
                    desc: "Scores from multiple evaluators are normalised to eliminate bias and ensure consistency, fairness, and transparency across all categories.",
                    number: "05",
                  },
                  {
                    title: "Final Review & Approval",
                    desc: "The final results undergo an internal audit and validation process before approval, ensuring accuracy, integrity, and credibility of the award outcomes.",
                    number: "06",
                  },
                ];

                return (
                  <StaggerContainer className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
                    {items.map((item, index) => (
                      <StaggerItem key={index}>
                        <NeonCard color="emerald" className="h-full">
                          <div className="p-10 flex flex-col h-full min-h-[320px] text-left">
                            {/* Step Number Badge */}
                            <div className="absolute top-6 left-8 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-black text-xl shadow-xl border border-white/20 group-hover:scale-110 transition-transform duration-500 z-20">
                              {item.number}
                            </div>

                            <div className="space-y-6 pt-10">
                              <h3 className="text-2xl font-black bg-gradient-to-r from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent leading-tight">
                                {item.title}
                              </h3>
                              <p className="text-emerald-100/60 text-base leading-relaxed font-medium group-hover:text-emerald-100 transition-colors duration-300">
                                {item.desc}
                              </p>
                            </div>

                            <div className="mt-auto pt-10">
                              <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-500/50 to-transparent rounded-full group-hover:w-full transition-all duration-700" />
                            </div>
                          </div>
                        </NeonCard>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                );
              })()}
            </div>
          </section>

          {/* ================= GUESTS & SPEAKERS ================= */}
          <section className="relative overflow-hidden py-12">
            <FadeUp className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-black mb-4 bg-gradient-to-r from-white via-emerald-400 to-white bg-clip-text text-transparent drop-shadow-2xl">
                Our Esteemed <span className="text-emerald-400">Guests & Speakers</span>
              </h2>
              <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto rounded-full" />
              <p className="mt-6 text-emerald-100/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                Join our network of eminent medical professionals and visionaries.
              </p>
            </FadeUp>
            <FadeUp className="max-w-7xl mx-auto px-6 pt-10">
              {(() => {
                const displayJury = juryMembers.length > 0 && juryMembers.length < 12
                  ? [...juryMembers, ...juryMembers]
                  : juryMembers;
                return (
                  <Swiper
                    modules={[Autoplay, Pagination, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor
                    centeredSlides
                    slidesPerView="auto"
                    coverflowEffect={{
                      rotate: 15,
                      stretch: 0,
                      depth: 100,
                      modifier: 2.5,
                      slideShadows: false
                    }}
                    autoplay={{ delay: 1000, disableOnInteraction: false }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    loop={displayJury.length > 1}
                    className="!pb-20"
                  >
                    {displayJury.map((member, i) => (
                      <SwiperSlide key={i} className="!w-[320px] md:!w-[380px]">
                        <GuestCard member={member} index={i} isFeatured={true} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                );
              })()}
            </FadeUp>
          </section>

          {/* ================= MEDIA GALLERY ================= */}
          <MediaGallery />

          {/* ================= PREVIOUS MEDIA PARTNERS ================= */}
          <section className="relative overflow-hidden py-12">
            {/* Decorative mesh gradients */}
            <div className="absolute inset-0 pointer-events-none -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-emerald-500/5 rounded-full animate-pulse" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
              <FadeUp className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-black mb-4 bg-gradient-to-r from-white via-emerald-400 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  Our Previous Media Partners
                </h2>
                <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto rounded-full" />
                <p className="mt-6 text-emerald-100/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                  A strong network of global media partners has helped amplify our vision across the international healthcare landscape.
                </p>
              </FadeUp>

              {/* Automatic Infinite Slider */}
              <div className="overflow-hidden py-10 w-full relative">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--base-bg)] to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--base-bg)] to-transparent z-10" />

                <div className="animate-marquee flex gap-12 items-center">
                  {[...mediaPartners, ...mediaPartners].map((partner, idx) => (
                    <div key={idx} className="flex-shrink-0 group">
                      <div className="
                      relative h-32 w-32 sm:h-40 sm:w-40 rounded-[2rem]
                      bg-slate-900/40 
                      border border-emerald-500/20 hover:border-emerald-400/60
                      transition-all duration-500 hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.3)]
                      flex items-center justify-center p-6
                    ">
                        {partner.logo ? (
                          <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                        ) : (
                          <span className="text-emerald-400 text-4xl font-black">{partner.name?.[0]}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* Selection Process */}
          <section className="relative overflow-hidden py-12">
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full animate-pulse" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
              <FadeUp className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-black mb-4 bg-gradient-to-r from-white via-emerald-400 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  Selection <span className="text-emerald-400">Process</span>
                </h2>
                <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto rounded-full" />
                <p className="mt-6 text-emerald-100/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                  A structured and transparent evaluation framework that maintains complete impartiality and ethical standards throughout.
                </p>
              </FadeUp>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { title: "Judging Criteria", desc: "A structured evaluation framework ensures credibility, consistency, and fairness across all nominations.", icon: "📋" },
                  { title: "Persistent Fairness", desc: "Each entry is reviewed independently by an eminent jury panel, maintaining complete impartiality.", icon: "⚖️" },
                  { title: "Confidentiality", desc: "All nomination data and outcomes are treated with the highest level of security and confidentiality.", icon: "🔒" },
                ].map((item, index) => (
                  <StaggerItem key={index} className="h-full">
                    <NeonCard color="emerald" className="h-full">
                      <div className="relative flex flex-col items-start text-left h-full p-10">
                        <div className="text-5xl mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                          {item.icon}
                        </div>
                        <h3 className="text-2xl font-black bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent group-hover:text-emerald-400 transition-colors duration-300 mb-4">
                          {item.title}
                        </h3>
                        <p className="text-emerald-100/60 text-base leading-relaxed font-medium group-hover:text-emerald-100 transition-colors duration-300">
                          {item.desc}
                        </p>
                        <div className="mt-auto pt-8">
                          <div className="h-1.5 w-12 bg-gradient-to-r from-emerald-500/50 to-transparent rounded-full group-hover:w-20 transition-all duration-500" />
                        </div>
                      </div>
                    </NeonCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
          {/* ================= KEY FAQ SNAPSHOT ================= */}
          <section className="relative overflow-hidden py-12">
            <div className="absolute inset-0 pointer-events-none -z-10">
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full " style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)' }} />
              <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full " style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
              <FadeUp className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-black mb-4 bg-gradient-to-r from-white via-emerald-400 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  Frequently Asked <span className="text-emerald-400">Questions</span>
                </h2>
                <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto rounded-full" />
                <p className="mt-6 text-emerald-100/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                  Find essential information about nominations, eligibility, and the recognition process.
                </p>
              </FadeUp>

              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {homeFaqs.map((item, index) => (
                  <StaggerItem key={index}>
                    <NeonCard color="emerald" className="h-full !p-0">
                      <div className="group relative flex flex-col h-full p-8 text-left">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-xl font-black text-emerald-400 border border-emerald-500/20">
                            Q{index + 1}
                          </div>
                          <h3 className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors duration-300 leading-tight">
                            {item.q}
                          </h3>
                        </div>
                        <p className="text-emerald-100/60 text-base leading-relaxed font-medium group-hover:text-emerald-100 transition-colors duration-300">
                          {item.a}
                        </p>
                      </div>
                    </NeonCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
          {/* CTA section */}
          <section className="relative overflow-hidden py-16">
            <div className="absolute inset-0 pointer-events-none -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-emerald-500/10 rounded-full blur-[160px] animate-pulse" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <FadeUp>
                <h2 className="text-4xl xs:text-5xl md:text-6xl font-heading font-black mb-8 bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent leading-tight">
                  Get the recognition you and your team deserve
                </h2>
                <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto rounded-full mb-10" />
                <p className="text-emerald-100/70 text-xl md:text-2xl mb-12 font-medium leading-relaxed">
                  Nomination Extended Deadline – <span className="text-emerald-400 font-black">15 April 2026</span>
                </p>
                <button
                  type="button"
                  onClick={handleNominateClick}
                  className="relative overflow-hidden group/btn rounded-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 text-white font-black px-12 py-6 text-xl transition-all duration-500 hover:scale-110 hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.5)] focus:outline-none tracking-[0.1em] uppercase"
                >
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    Nominate Now
                    <svg className="w-7 h-7 group-hover:translate-x-3 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-1000" />
                </button>
              </FadeUp>
            </div>
          </section>

          {/* PREVIOUS EDITIONS CAROUSEL SECTION */}
          <section className="relative overflow-hidden py-12">
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
              <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full animate-pulse" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)' }} />
              <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full animate-pulse delay-700" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)' }} />
            </div>

            <div className="max-w-[1800px] mx-auto px-6">
              <FadeUp className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-black mb-4 bg-gradient-to-r from-white via-emerald-400 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  Previous <span className="text-emerald-400">Editions</span>
                </h2>
                <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto rounded-full" />
                <p className="mt-6 text-emerald-100/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                  Relive the moments of global healthcare transformation and cinematic excellence.
                </p>
              </FadeUp>

              {!editionsLoading && editions.length > 0 ? (
                <FadeUp delay={0.2}>
                  {(() => {
                    const displayEditions = editions.length > 0 && editions.length < 8
                      ? [...editions, ...editions]
                      : editions;
                    return (
                      <Swiper
                        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={"auto"}
                        loop={displayEditions.length > 1}
                        speed={1000}
                        coverflowEffect={{
                          rotate: 0,
                          stretch: 0,
                          depth: 100,
                          modifier: 2.5,
                          slideShadows: false,
                        }}
                        autoplay={{
                          delay: 2000,
                          disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        navigation={true}
                        className="previous-editions-swiper !pb-20"
                      >
                        {displayEditions.map((edition, idx) => (
                          <SwiperSlide key={`${edition._id}-${idx}`} className="!w-[320px] sm:!w-[450px]">
                            <div
                              onClick={() => {
                                const formattedTitle = edition.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                                navigate(`/${edition.year}/${formattedTitle}`);
                              }}
                              className="group relative bg-slate-900/40  border border-white/10 rounded-[3rem] overflow-hidden transition-all duration-700 hover:border-emerald-500/50 shadow-2xl cursor-pointer"
                            >
                              <div className="h-[300px] sm:h-[400px] relative overflow-hidden">
                                {edition.images && edition.images.length > 0 ? (
                                  <img
                                    src={edition.images[0]}
                                    alt={edition.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-white/5 flex items-center justify-center text-4xl">🏆</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/40 to-transparent opacity-90" />

                                <div className="absolute top-8 left-8">
                                  <span className="bg-emerald-500 text-[#020817] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                    {edition.year}
                                  </span>
                                </div>

                                <div className="absolute bottom-8 left-8 right-8 text-left">
                                  <p className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.3em] mb-2 drop-shadow-lg">{edition.editionLabel}</p>
                                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter leading-none mb-3 line-clamp-2 drop-shadow-2xl">
                                    {edition.title}
                                  </h3>
                                  <div className="flex items-center gap-2 text-white/80">
                                    <span className="text-sm filter drop-shadow-md">📍</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest">{edition.locations.join(", ")}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="absolute inset-0 border-[1px] border-white/0 group-hover:border-emerald-500/30 rounded-[3rem] transition-all duration-700 pointer-events-none" />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    );
                  })()}
                </FadeUp>
              ) : (
                <div className="flex justify-center py-20">
                  {editionsLoading ? (
                    <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                  ) : (
                    <p className="text-white/20 font-black uppercase tracking-widest text-xs">No previous editions found</p>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* OUR OTHER UPCOMING AWARDS section */}
          <section className="relative overflow-hidden py-8">
            {/* Responsive glowing background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
              <div className="absolute top-[20%] left-[12%] w-[300px] h-[300px] bg-emerald-500/10 rounded-full animate-pulse" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)' }} />
              <div className="absolute bottom-[15%] right-[16%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] animate-pulse delay-700" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
              <FadeUp className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-black mb-4 bg-gradient-to-r from-white via-emerald-400 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  Upcoming <span className="text-emerald-400">Awards</span>
                </h2>
                <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto rounded-full" />
                <p className="mt-6 text-emerald-100/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                  Join us in celebrating excellence across various industries globally through our prestigious recognition platforms.
                </p>
              </FadeUp>

              <FadeUp delay={0.2} className="w-full">
                {(() => {
                  const displayAwards = upcomingAwards.length > 0 && upcomingAwards.length < 6
                    ? [...upcomingAwards, ...upcomingAwards]
                    : upcomingAwards;

                  return (
                    <Swiper
                      modules={[Autoplay, Pagination]}
                      spaceBetween={20}
                      slidesPerView={1.1}
                      loop={displayAwards.length > 1}
                      speed={1200}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                      }}

                      pagination={{
                        clickable: true,
                        dynamicBullets: true,
                      }}
                      breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 24 },
                        1024: { slidesPerView: 3, spaceBetween: 30 },
                        1280: { slidesPerView: 4, spaceBetween: 32 },
                      }}
                      className="!pb-20"
                    >
                      {displayAwards.map((award, index) => (
                        <SwiperSlide key={index} className="!px-0">
                          <NeonCard color="emerald" className="h-[450px] sm:h-[480px] !p-0">
                            <div className="relative w-full h-1/2 overflow-hidden">
                              <img
                                src={award.banner}
                                alt={award.title}
                                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                                loading="lazy"
                              />
                              {/* Overlay Gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

                              <div className="absolute bottom-4 left-4 z-20">
                                <span className="px-4 py-1.5 rounded-full bg-emerald-500/20  text-emerald-300 text-xs font-bold uppercase tracking-widest border border-emerald-400/30">
                                  {award.location}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col flex-grow justify-between px-2.5 xs:px-3.5 sm:px-5 pt-2 xs:pt-3 sm:pt-4 pb-2.5 sm:pb-5 h-full text-left">
                              <div className="space-y-4">
                                <h3 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300 leading-tight line-clamp-2">
                                  {award.title}
                                </h3>
                                <div className="flex items-center gap-2 text-emerald-400/80 font-bold text-sm tracking-wide">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /></svg>
                                  {award.date}
                                </div>
                                <p className="text-emerald-100/60 text-sm sm:text-base leading-relaxed line-clamp-3 group-hover:text-emerald-100 transition-colors">
                                  {award.desc}
                                </p>
                              </div>
                              <a
                                href={award.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative overflow-hidden group/btn rounded-md xs:rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 text-white hover:text-white font-extrabold px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 text-xs xs:text-sm sm:text-base text-center transition-all duration-300 hover:scale-105 hover:shadow-[0_2px_16px_-2px_rgba(37,99,235,0.5)] border border-emerald-300/40 group-hover/btn:border-emerald-200 tracking-wide"
                              >
                                <span className="relative z-10 flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2">
                                  Visit Website
                                  <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </span>
                              </a>
                            </div>
                          </NeonCard>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  );
                })()}
              </FadeUp>
            </div>
          </section>
          {/* WHO SHOULD NOMINATE section */}
          <section className="relative overflow-hidden py-8">
            {/* Animated Gradient Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
              <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full animate-pulse" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)' }} />
              <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12">
              <FadeUp className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-black mb-4 bg-gradient-to-r from-white via-emerald-400 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  Who Should <span className="text-emerald-400">Nominate?</span>
                </h2>
                <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto rounded-full" />
                <p className="mt-6 text-emerald-100/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                  We invite visionaries, researchers, and leading institutions to join our elite circle of global healthcare pioneers.
                </p>
              </FadeUp>

              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {nomineeCategories.map((item, index) => (
                  <StaggerItem key={index} className="h-full">
                    <NeonCard color="emerald" className="h-full">
                      <div className="relative flex flex-col items-start h-full p-8 text-left">
                        {/* Icon with Glowing Ring */}
                        <div className="relative mb-8 flex items-center justify-center">
                          <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full group-hover:bg-emerald-500/40 transition-colors duration-500" />
                          <span className="relative text-5xl drop-shadow-2xl filter brightness-110">
                            {item.icon}
                          </span>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-black bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent group-hover:text-emerald-400 transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="text-emerald-100/60 text-sm sm:text-base leading-relaxed font-medium group-hover:text-emerald-100 transition-colors duration-300">
                            {item.desc}
                          </p>
                        </div>

                        <div className="mt-auto pt-8 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <div className="h-px w-8 bg-gradient-to-r from-emerald-500/50 to-transparent" />
                        </div>
                      </div>
                    </NeonCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        </div>
      
    </div>
  );
}
