import React from "react";

const GUIDELINES = [
  {
    icon: "📝",
    title: "General Submission",
    color: "from-blue-100 via-blue-300 to-medical-secondary",
    bg: "bg-blue-900/10 border-blue-400/20",
    items: [
      "All nominations must be submitted before the official deadline.",
      "Form must be filled completely with accurate and verifiable information.",
      "Each entry should demonstrate excellence, innovation, and impact.",
      "Incomplete, misleading, or false information may result in disqualification.",
      "Once submitted, entries cannot be edited or withdrawn."
    ]
  },
  {
    icon: "👨‍⚖️",
    title: "Evaluation & Judging",
    color: "from-blue-200 via-blue-400 to-medical-secondary",
    bg: "bg-slate-900/20 border-blue-500/20",
    items: [
      "All nominations reviewed by an independent jury panel.",
      "Evaluation based on quality, innovation, and impact.",
      "Jury may request supporting documentation if needed.",
      "Jury’s decision is final and binding."
    ]
  },
  {
    icon: "📑",
    title: "Documentation & Verification",
    color: "from-blue-300 via-blue-500 to-medical-secondary",
    bg: "bg-blue-900/10 border-blue-400/30",
    items: [
      "Requested supporting documents must be valid and authentic.",
      "Information may be independently verified.",
      "Entries failing verification may be rejected."
    ]
  },
  {
    icon: "⚠️",
    title: "Important Notes",
    color: "from-blue-100 via-blue-300 to-emerald-400",
    bg: "bg-slate-900/30 border-emerald-500/20",
    items: [
      "Award management reserves the right to amend guidelines or categories.",
      "Attempting to influence jury will result in disqualification.",
      "Participation implies acceptance of all rules."
    ]
  }
];

// Card: decrease height, increase width, less vertical padding, 2 per row always
function GuidelineCard({ icon, title, items, color, bg }) {
  return (
    <div
      className={`
        shadow-xl rounded-xl border border-blue-400/30
        w-full max-w-2xl min-w-[270px]
        py-4 px-6
        mx-auto
        backdrop-blur-md
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-2xl
        flex flex-col
        justify-between
        min-h-[170px]
      `}
      style={{
        background: "rgba(15, 23, 42, 0.15)",
        boxShadow: "0 4px 24px 0 rgba(37,99,235,0.08)",
      }}
    >
      <h2 className={`
        text-lg sm:text-xl font-bold mb-1
        text-transparent bg-gradient-to-r ${color} bg-clip-text tracking-wide
        flex gap-2 items-center
      `}>
        <span className="inline-block text-xl sm:text-2xl">{icon}</span>
        {title}
      </h2>
      <ul className="space-y-0.5 text-slate-200 leading-normal text-[0.99rem] font-medium ml-0 pl-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-1.5">
            <span className="text-blue-400 font-bold mt-[2px]">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Guidelines() {
  return (
    <section className="relative min-h-screen bg-slate-950 py-10 md:py-14 selection:bg-blue-500/30 isolate flex flex-col justify-start">
      {/* Decorative Blurs */}
      <div className="absolute -top-32 -left-28 w-[410px] h-[410px] rounded-full bg-gradient-to-tr from-blue-600/20 to-transparent blur-[110px] -z-10 pointer-events-none" />
      <div className="absolute top-10 right-0 w-[170px] h-[280px] rounded-full bg-gradient-to-tl from-emerald-500/10 via-blue-900/40 to-transparent blur-[80px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.035)_1px,transparent_1px)] bg-[size:84px_84px] opacity-40 -z-10 pointer-events-none" />
      <div
        className="absolute left-1/2 -top-8 -translate-x-1/2 w-[600px] h-28 opacity-70 blur-[22px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(37,99,235,0.2) 10%, transparent 70%)"
        }}
      />

      {/* Header */}
      <div className="relative z-20 max-w-3xl mx-auto w-full px-4 sm:px-8 pt-14 mb-1 flex flex-col items-center">
        <div className="flex gap-2 items-center justify-center mb-2">
          <span className="h-5 w-1 rounded-lg bg-gradient-to-b from-blue-300 via-blue-500 to-medical-secondary" />
          <h1
            className="text-[2.1rem] sm:text-4xl md:text-[2.4rem] font-extrabold tracking-wider bg-gradient-to-r from-blue-100 via-blue-300 to-medical-secondary bg-clip-text text-transparent drop-shadow-lg"
            style={{ letterSpacing: "1.5px" }}
          >
            Entry Guidelines
          </h1>
          <span className="h-5 w-1 rounded-lg bg-gradient-to-b from-blue-500 to-blue-800" />
        </div>
        <div className="mx-auto w-32 h-1 rounded-full bg-gradient-to-r from-blue-400/0 via-blue-500 to-blue-400/0 opacity-80 my-2" />
        <p className="text-blue-100 text-sm md:text-base max-w-lg mx-auto leading-relaxed font-medium">
          Please read the guidelines before you submit your nomination for the Healthcare Awards.
          <span className="block mt-1 text-blue-300/90 font-semibold text-xs sm:text-sm">
            Adherence is mandatory for successful evaluation.
          </span>
        </p>
      </div>

      {/* Cards grid */}
      <div className="relative z-30 w-full max-w-6xl mx-auto px-1 sm:px-5">
        <div className="
          grid grid-cols-1
          sm:grid-cols-2
          gap-6 md:gap-8 xl:gap-12
          pt-8 pb-12
        ">
          {GUIDELINES.map((g, idx) => (
            <GuidelineCard
              {...g}
              key={g.title}
            />
          ))}
        </div>
      </div>

      {/* Declaration */}
      <div className="relative left-1/2 -translate-x-1/2 bottom-0 w-full max-w-lg px-3 z-40 mt-auto">
        <div className="text-center pt-5 pb-3 md:pt-4 border-t border-blue-500/10 font-medium text-[0.99rem] text-slate-200 italic tracking-wide leading-relaxed w-full bg-slate-900/50 rounded-b-xl shadow-inner">
          <svg className="mx-auto mb-1.5" width={36} height={24} fill="none" viewBox="0 0 41 27">
            <path d="M7.5 10C4.02 15.44 3 20.5 7 23.5C11 26.5 17.09 26.09 20.21 20.77M33.5 10C36.98 15.44 38 20.5 34 23.5C30 26.5 23.91 26.09 20.79 20.77" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
            <circle cx="7" cy="7" r="2.5" fill="#93c5fd" />
            <circle cx="33" cy="7" r="2.5" fill="#93c5fd" />
          </svg>
          By submitting a nomination, you confirm that all information is accurate to the best of your knowledge and you agree to follow the final decision of the jury.
        </div>
      </div>
    </section>
  );
}
