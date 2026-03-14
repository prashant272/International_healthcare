import { Link } from "react-router-dom";

export default function Media() {
  return (
    <section className="bg-slate-950 min-h-screen py-20 px-4 text-white relative overflow-hidden">
      {/* Subtle floating medical blue orbs */}
      <div className="pointer-events-none absolute -top-32 left-0 w-[400px] h-[320px] bg-gradient-to-br from-blue-600/20 via-blue-400/10 to-transparent rounded-full blur-3xl z-0 opacity-65"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 w-[280px] h-[280px] bg-gradient-to-bl from-blue-100/20 to-transparent blur-3xl rounded-full z-0 opacity-50"></div>

      <div className="max-w-7xl mx-auto z-10 relative">
        <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 px-1">
          <div>
            <h1 className="text-[2.25rem] sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-200 to-blue-400 drop-shadow-[0_4px_24px_rgba(37,99,235,0.20)] tracking-tight mb-2">
              Media Coverage
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl font-medium text-blue-100/90 leading-relaxed bg-blue-900/5 rounded-xl px-4 py-3 border border-blue-500/20 backdrop-blur-md">
              Experience our journey through the eyes of national and international media – in print, on screen, and across digital platforms.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/previous-editions"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-[2.5px] border-blue-300 px-7 py-2 text-lg font-extrabold text-white shadow-lg hover:scale-[1.035] focus:outline-none transition-all"
              style={{
                boxShadow: "0 4px 18px rgba(37,99,235,0.3)",
                letterSpacing: "0.015em",
              }}
            >
              <span className="text-blue-100 text-xl font-bold">⟵</span>
              <span>Previous Editions</span>
            </Link>
          </div>
        </header>

        {/* Media Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-fadein-fast">
          {/* Print Media */}
          <section className="relative border-[1px] border-blue-500/30 rounded-4xl p-7 shadow-[0_6px_34px_rgba(37,99,235,0.12)] flex flex-col overflow-hidden group hover:-translate-y-1 transition-transform duration-300 min-h-[370px] backdrop-blur-md"
            style={{ background: "rgba(15, 23, 42, 0.15)" }}>
            <div className="absolute -top-8 -right-8 w-36 h-36 bg-gradient-to-br from-blue-400/20 via-blue-900/10 to-transparent blur-2xl pointer-events-none rounded-full opacity-60 z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl drop-shadow">📰</span>
                <h2 className="text-[1.45rem] sm:text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-300 text-transparent bg-clip-text tracking-wide drop-shadow">
                  Print Media
                </h2>
                <span className="ml-auto px-3 py-1 bg-blue-500/20 text-blue-200 font-semibold text-xs rounded-full border border-blue-400/30 shadow">Premium</span>
              </div>
              <div className="space-y-5">
                <div className="bg-slate-900/20 rounded-2xl p-5 border border-blue-500/10 hover:border-blue-400/50 transition h-[126px] flex items-center justify-center text-blue-100/70 text-base shadow-lg font-medium italic tracking-wide">
                  [Sample] Times of India Feature (Jan 2024)
                </div>
                <div className="bg-slate-900/20 rounded-2xl p-5 border border-blue-500/10 hover:border-blue-400/50 transition h-[126px] flex items-center justify-center text-blue-100/70 text-base shadow-lg font-medium italic tracking-wide">
                  [Sample] Hindustan Exclusive Coverage (Feb 2023)
                </div>
              </div>
            </div>
          </section>

          {/* Electronic Media */}
          <section className="relative bg-slate-900/60 border-[2.5px] border-blue-500/20 rounded-4xl p-7 shadow-[0_6px_34px_rgba(37,99,235,0.15)] flex flex-col overflow-hidden group hover:-translate-y-1 transition-transform duration-300 min-h-[370px]">
            <div className="absolute -top-8 -right-8 w-36 h-36 bg-gradient-to-br from-emerald-500/20 via-blue-900/10 to-transparent blur-2xl pointer-events-none rounded-full opacity-60 z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl drop-shadow">📺</span>
                <h2 className="text-[1.45rem] sm:text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-300 text-transparent bg-clip-text tracking-wide drop-shadow">
                  Electronic Media
                </h2>
                <span className="ml-auto px-3 py-1 bg-emerald-500/20 text-emerald-200 font-semibold text-xs rounded-full border border-emerald-400/30 shadow">Featured</span>
              </div>
              <div className="space-y-5">
                <div className="bg-slate-900/20 rounded-2xl p-5 border border-blue-500/10 hover:border-blue-400/50 transition h-[126px] flex items-center justify-center text-blue-100/70 text-base shadow-lg font-medium italic tracking-wide">
                  [Sample] Zee News Interview <span className="ml-2 text-blue-300">— March 2024</span>
                </div>
                <div className="bg-slate-900/20 rounded-2xl p-5 border border-blue-500/10 hover:border-blue-400/50 transition h-[126px] flex items-center justify-center text-blue-100/70 text-base shadow-lg font-medium italic tracking-wide">
                  [Sample] DD National Event Coverage <span className="ml-2 text-blue-300">— 2023</span>
                </div>
              </div>
            </div>
          </section>

          {/* Digital Media */}
          <section className="relative border-[1px] border-blue-500/30 rounded-4xl p-7 shadow-[0_6px_34px_rgba(37,99,235,0.12)] flex flex-col overflow-hidden group hover:-translate-y-1 transition-transform duration-300 min-h-[370px] backdrop-blur-md"
            style={{ background: "rgba(15, 23, 42, 0.15)" }}>
            <div className="absolute -top-8 -right-8 w-36 h-36 bg-gradient-to-br from-blue-400/30 via-blue-900/10 to-transparent blur-2xl pointer-events-none rounded-full opacity-65 z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl drop-shadow">🌐</span>
                <h2 className="text-[1.45rem] sm:text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-300 text-transparent bg-clip-text tracking-wide drop-shadow">
                  Digital Media
                </h2>
                <span className="ml-auto px-3 py-1 bg-blue-500/20 text-blue-200 font-semibold text-xs rounded-full border border-blue-400/30 shadow">Online</span>
              </div>
              <div className="space-y-5">
                <div className="bg-slate-900/20 rounded-2xl p-5 border border-blue-500/10 hover:border-blue-400/50 transition h-[126px] flex items-center justify-center text-blue-100/70 text-base shadow-lg font-medium italic tracking-wide">
                  [Sample] The Print – Special Coverage <span className="ml-2 text-blue-300">May 2024</span>
                </div>
                <div className="bg-slate-900/20 rounded-2xl p-5 border border-blue-500/10 hover:border-blue-400/50 transition h-[126px] flex items-center justify-center text-blue-100/70 text-base shadow-lg font-medium italic tracking-wide">
                  [Sample] Twitter: #GlobalHealthcareAwards Trending <span className="ml-2 text-blue-300">2024</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="w-full flex justify-center mt-16">
          <span className="bg-gradient-to-r from-blue-400/80 to-blue-200/50 text-white font-extrabold text-lg px-8 py-3 rounded-full border-2 border-blue-500/20 drop-shadow-2xl shadow inline-flex items-center gap-2 tracking-wide animate-fadein-up">
            More highlights coming soon.
            <span className="ml-2 text-2xl">✨</span>
          </span>
        </div>
      </div>
    </section>
  );
}
