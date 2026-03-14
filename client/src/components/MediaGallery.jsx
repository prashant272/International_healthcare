import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function MediaGallery() {
  const [activeTab, setActiveTab] = useState('photos');
  const sectionRef = useRef(null);

  const photos = [
    '/2023/1.jpg',
    '/2023/2.jpg',
    '/2023/3.jpg',
    '/2023/4.jpg',
    '/2023/5.jpg',
    '/2023/6.jpg',
    '/2023/7.jpg',
    '/2023/8.jpg',
    '/2023/9.jpg',
    '/2023/10.jpg',
    '/2023/11.jpg',
  ];

  const videos = [
    { title: "International Healthcare Awards Highlights 1", url: "https://www.youtube.com/shorts/f1hCBiFFKCU" },
    { title: "International Healthcare Awards Highlights 2", url: "https://www.youtube.com/shorts/5Lyy792EQ58" },
    { title: "International Healthcare Awards Highlights 3", url: "https://www.youtube.com/shorts/cnKleWrwtJM" },
    { title: "International Healthcare Awards Full Setup", url: "https://www.youtube.com/watch?v=xHRgL8I0TII" },
  ];

  // Helper function to extract YouTube video ID
  const getYouTubeVideoId = (url) => {
    let videoId = "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    }
    return videoId;
  };

  const [playingVideoId, setPlayingVideoId] = useState(null);

  return (
    <section ref={sectionRef} className="relative py-5 md:py-2 bg-slate-950 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl xs:text-4xl md:text-5xl font-extrabold font-heading mb-4 bg-gradient-to-r from-white via-blue-300 to-white bg-clip-text text-transparent drop-shadow">
            Media Gallery
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Relive the greatest moments from our previous editions through our exclusive photo and video coverage.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex justify-center items-center gap-4 mb-10 sm:mb-14">
          <button
            onClick={() => setActiveTab('photos')}
            className={`relative px-6 sm:px-10 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-lg transition-all duration-300 overflow-hidden group ${activeTab === 'photos'
                ? 'text-white bg-blue-600/20 border border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                : 'text-slate-400 border border-slate-700 hover:text-white hover:border-slate-500 bg-slate-900/50'
              }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              Photos
            </span>
            {activeTab === 'photos' && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-20 group-hover:opacity-30 transition-opacity"></div>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('videos'); setPlayingVideoId(null); }}
            className={`relative px-6 sm:px-10 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-lg transition-all duration-300 overflow-hidden group ${activeTab === 'videos'
                ? 'text-white bg-red-600/20 border border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                : 'text-slate-400 border border-slate-700 hover:text-white hover:border-slate-500 bg-slate-900/50'
              }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Videos
            </span>
            {activeTab === 'videos' && (
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-20 group-hover:opacity-30 transition-opacity"></div>
            )}
          </button>
        </div>

        {/* Gallery Content */}
        <div className="w-full relative min-h-[400px]">
          {/* Photos Tab */}
          <div className={`transition-all duration-700 absolute top-0 left-0 w-full ${activeTab === 'photos' ? 'opacity-100 z-10 translate-y-0 relative' : 'opacity-0 -z-10 translate-y-10'}`}>
            <style>{`
              .gallery-swiper .swiper-pagination-bullet { background: #3b82f6 !important; opacity: 0.5; }
              .gallery-swiper .swiper-pagination-bullet-active { background: #60a5fa !important; opacity: 1; box-shadow: 0 0 10px #3b82f6; }
              .gallery-swiper .swiper-button-next, .gallery-swiper .swiper-button-prev { color: #fff !important; background: rgba(0,0,0,0.5); width: 44px; height: 44px; border-radius: 50%; opacity: 0; transition: opacity 0.3s; backdrop-filter: blur(4px); }
              .gallery-swiper:hover .swiper-button-next, .gallery-swiper:hover .swiper-button-prev { opacity: 1; }
              .gallery-swiper .swiper-button-next:after, .gallery-swiper .swiper-button-prev:after { font-size: 20px !important; font-weight: bold; }
            `}</style>
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              loop={true}
              coverflowEffect={{
                rotate: 10,
                stretch: 0,
                depth: 400,
                modifier: 1,
                slideShadows: true,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation={true}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="gallery-swiper w-full pt-10 pb-16"
            >
              {photos.map((photo, index) => (
                <SwiperSlide key={index} style={{ width: '450px', height: 'auto', maxWidth: '90vw' }} className="sm:w-[500px] md:w-[700px] lg:w-[850px]">
                  <div className="relative group rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl aspect-[4/3]">
                    <img
                      src={photo}
                      alt={`Gallery Photo ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Videos Tab */}
          <div className={`transition-all duration-700 absolute top-0 left-0 w-full ${activeTab === 'videos' ? 'opacity-100 z-10 translate-y-0 relative' : 'opacity-0 -z-10 translate-y-10'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2">
              {videos.map((video, idx) => {
                const videoId = getYouTubeVideoId(video.url);
                const isPlaying = playingVideoId === idx;

                return (
                  <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 hover:border-red-500/50 transition-all duration-300 bg-black">
                    <div className="relative w-full aspect-video flex justify-center items-center bg-slate-900 cursor-pointer" onClick={() => !isPlaying && setPlayingVideoId(idx)}>
                      {isPlaying ? (
                        <iframe
                          src={`${video.url}${video.url.includes('?') ? '&' : '?'}autoplay=1`}
                          title={video.title}
                          className="absolute top-0 left-0 w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <>
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                            alt={video.title}
                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                              // Fallback if maxresdefault is not available
                              e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                            }}
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                          {/* Play Button Icon */}
                          <div className="relative z-10 w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] group-hover:bg-red-500 transform group-hover:scale-110 transition-all duration-300">
                            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="p-4 bg-slate-900 border-t border-white/5 group-hover:bg-slate-800 transition-colors">
                      <h3 className="text-white font-semibold text-sm sm:text-base line-clamp-1">{video.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* See More Button */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-slate-400 mb-4 text-sm sm:text-base font-medium">To explore more memories and past events</p>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              // We'll let the user interact with the navbar themselves once at the top,
              // as programmatically triggering a hover on a completely different React component
              // tree (Navbar) without global state is tricky. Scrolling to top is the standard UX here.
            }}
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-slate-900 border border-blue-500/30 text-white font-bold text-sm sm:text-lg hover:bg-slate-800 hover:border-blue-400 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(37,99,235,0.2)] transition-all duration-300 group"
          >
            <span>Check out Previous Editions</span>
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 group-hover:-translate-y-1 group-hover:text-blue-300 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
