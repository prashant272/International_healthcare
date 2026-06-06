import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow, Navigation } from "swiper/modules";
import { FadeUp } from "../Motion.jsx";
import { fetchPreviousEditions } from "../../services/api.js";


export default function PreviousEditionsSection() {
  const navigate = useNavigate();
  const handleNominateClick = () => navigate('/nominate');

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

  return (
    <>
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
                Relive the moments of international healthcare transformation and cinematic excellence.
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
                                  alt={edition.title || "Edition Title"}
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

        
    </>
  );
}