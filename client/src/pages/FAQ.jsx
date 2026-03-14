import { Fragment } from "react";

export default function FAQ() {
  const faqs = [
    {
      q: "What is International Global Healthcare Awards 2026?",
      a: "International Global Healthcare Awards 2026 is an international recognition platform that honours hospitals, doctors, clinics, healthcare organisations, and healthtech companies for excellence, innovation, and quality patient care.",
    },
    //hhh
    {
      q: "Who can apply for nomination?",
      a: "Hospitals and multi-specialty healthcare institutions, clinics and diagnostic centres, individual doctors and medical professionals, healthcare startups and healthtech companies, and medical or wellness organisations can apply for nomination.",
    },
    {
      q: "What is the nomination process and deadline?",
      a: "The nomination process is completely online. Applicants need to fill out the nomination form and submit the required details and documents. The current extended deadline is 15 April 2026 (subject to change); latest timelines are always updated on the official website.",
    },
    {
      q: "How are the winners selected?",
      a: "Winners are selected through a structured, multi-level evaluation process that includes research-based assessment, service quality, innovation, patient impact, and ethical practices, as described in the official Selection Process.",
    },
    {
      q: "Who are the judges? Is the evaluation fair?",
      a: "The judging panel includes healthcare experts, industry professionals, analysts, and independent evaluators. The process is designed to remain transparent, unbiased, and independent at every stage.",
    },
    {
      q: "Where and when will the awards be held?",
      a: "International Global Healthcare Awards 2026 will be organised in international editions, including a Dubai Edition (26 April 2026, Dubai, UAE) and a London Edition (9 June 2026, House of Commons, London, UK). Detailed venue and schedule updates are shared on the official website and through formal communication.",
    },
    {
      q: "What are the benefits of participating?",
      a: "Participants gain global recognition and industry credibility, brand visibility and media exposure, enhanced trust among patients and partners, networking opportunities with healthcare leaders, and marketing assets such as certificates and winner logos.",
    },
    {
      q: "What documents are required for nomination?",
      a: "Applicants need to submit basic organisation or individual details along with supporting documents such as certifications, achievements, or relevant records, as per the category guidelines mentioned in the Entry Guidelines.",
    },
    {
      q: "Is self-nomination allowed?",
      a: "Yes, self-nomination is allowed. Eligible organisations and individuals can nominate themselves directly.",
    },
    {
      q: "Can international organisations apply?",
      a: "Yes, organisations and professionals from all countries are welcome to apply for International Global Healthcare Awards 2026.",
    },
    {
      q: "Can I apply for more than one category?",
      a: "Yes, applicants can apply for multiple relevant categories, subject to the specific eligibility guidelines of each category.",
    },
    {
      q: "Is there any nomination fee?",
      a:"Yes, nomination submission is subject to a standard nomination fee. The fee supports the evaluation process, research activities, and operational costs. Fee structure and related terms are clearly communicated before final submission.",
    },
    {
      q: "Is attending the award ceremony mandatory?",
      a: "Physical attendance is strongly recommended but not strictly mandatory. In select cases, virtual or representative attendance may be allowed as per event guidelines.",
    },
    {
      q: "Is the submitted information confidential?",
      a: "Yes, all information and documents submitted during nomination are kept strictly confidential and are used only for evaluation and verification purposes.",
    },
    {
      q: "Can winners use the award logo and title?",
      a: "Yes, winners can use the official award logo, certificate, and title for branding, marketing, and promotional purposes as per the usage and brand guidelines shared with them.",
    },
    {
      q: "Will winners receive media coverage?",
      a: "Yes, selected winners receive official media and promotional coverage through TIME Cyber Media and associated partner channels, as highlighted in the Media section.",
    },
    {
      q: "How will applicants be informed about the results?",
      a: "All official communication, including shortlisting and final results, is shared through the registered email address and/or contact number provided during nomination.",
    },
    {
      q: "How can we apply for sponsorship or partnership?",
      a: "For sponsorship or partnership opportunities, you can connect with the team via the official Contact Us page or the contact details provided on the website.",
    },
    {
      q: "Are International Global Healthcare Awards government-affiliated?",
      a: "No, International Global Healthcare Awards is an independent recognition platform by TIME Cyber Media and is not directly affiliated with any government body.",
    },
    {
      q: "Where can we see previous editions or media coverage?",
      a: "Details of previous editions, award highlights, winners, and media coverage are available under Previous Editions and Media on the official website and social media channels.",
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-slate-950 text-slate-50 font-sans overflow-x-hidden">
      {/* Premium Animated Sparkles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Main blue blurred orbs */}
        <div className="absolute -top-16 right-[-60px] w-72 h-72 bg-gradient-to-br from-blue-400/30 via-blue-600/30 to-transparent rounded-full blur-3xl animate-pulse opacity-70" />
        <div className="absolute bottom-[-60px] left-[-64px] w-80 h-80 bg-gradient-to-tr from-emerald-500/20 via-blue-900/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000 opacity-50" />
        <div className="absolute top-1/3 left-1/2 w-60 h-60 bg-blue-500/15 rounded-full blur-2xl opacity-30 pointer-events-none animate-pulse" />
        {/* Subtle shimmer line backgrounds */}
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent blur-sm opacity-60 animate-shimmer" />
      </div>

      <section className="relative max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20 md:py-24">
        {/* Header block */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <span className="inline-flex animate-pulse text-3xl sm:text-4xl mr-2">✨</span>
            <span className="inline-flex animate-pulse text-3xl sm:text-4xl text-blue-400">🏆</span>
            <span className="inline-flex animate-pulse text-3xl sm:text-4xl ml-2">✨</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading mb-2 tracking-tight bg-gradient-to-r from-white via-blue-200 via-50% to-blue-400 bg-clip-text text-transparent drop-shadow-lg shadow-blue-500/20">
            International Global Healthcare Awards 2026 <span className="block text-lg sm:text-2xl font-[350] text-blue-100 tracking-widest opacity-90 mt-1">Frequently Asked Questions</span>
          </h1>
          <div className="mt-4 w-28 sm:w-40 h-[5px] mx-auto rounded-full bg-gradient-to-r from-transparent via-blue-500 via-60% to-transparent shadow-[0_0_20px_3px_rgba(37,99,235,0.3)]" />
          <p className="mt-6 text-base sm:text-lg md:text-xl text-blue-100 max-w-xl mx-auto font-medium tracking-wide leading-relaxed drop-shadow whitespace-pre-line">
            <span className="bg-gradient-to-br from-white via-blue-100 to-blue-300 bg-clip-text text-transparent font-bold">Everything you need to know about nominations, eligibility, the process and the celebration—</span> all in one place.
          </p>
        </div>

        {/* FAQ GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 md:gap-8">
          {faqs.map((faq, index) => (
            <Fragment key={index}>
              <div className="
                relative group rounded-3xl overflow-hidden
                border border-blue-500/30 hover:border-blue-400/60
                hover:scale-[1.025] shadow-xl hover:shadow-[0_16px_32px_-6px_rgba(37,99,235,0.4)]
                p-6 sm:p-8 flex flex-col min-h-[220px] transition-all duration-400
                cursor-pointer box-border backdrop-blur-md
              "
              style={{ background: "rgba(15, 23, 42, 0.15)" }}>
                {/* Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 via-blue-100 to-medical-secondary opacity-75"></div>
                {/* Decorative Glow */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-400/5 via-transparent to-transparent opacity-90 -z-10 rounded-b-3xl pointer-events-none" />
                {/* Q Number Circle & Icon */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center justify-center bg-gradient-to-r from-blue-50 via-blue-200 to-medical-secondary rounded-full shadow-lg w-9 h-9 text-lg font-bold text-white border-2 border-blue-300/70 group-hover:scale-110 group-hover:rotate-6 transition duration-300">
                    Q{index + 1}
                  </span>
                  <svg className="w-5 h-5 text-blue-400 opacity-70" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" />
                  </svg>
                </div>
                {/* Question */}
                <h3 className="mb-3 text-lg sm:text-xl md:text-2xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent drop-shadow group-hover:translate-x-1 group-hover:scale-105 group-hover:drop-shadow-[0_2px_20px_rgba(37,99,235,0.5)] transition-all duration-300">
                  {faq.q}
                </h3>
                {/* Answer */}
                <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed font-medium drop-shadow-sm mt-auto group-hover:text-white transition-all duration-300">
                  {faq.a}
                </p>
                {/* Bottom Accent */}
                <div className="mt-5 sm:mt-7 h-1 w-12 sm:w-16 mx-auto bg-gradient-to-r from-blue-500 to-transparent opacity-50 rounded-full group-hover:opacity-95 transition-all duration-400"></div>
                {/* Hover Blue Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:via-blue-500/10 group-hover:to-blue-500/20 transition-all duration-700 -z-10"></div>
              </div>
            </Fragment>
          ))}
        </div>

        {/* Footer Quote */}
        <div className="mt-14 mb-2 flex flex-col items-center">
          <span className="inline-flex items-center gap-2 text-blue-200 text-base sm:text-lg font-medium">
            <svg className="w-5 h-5 animate-pulse text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
            <span>Celebrating Excellence, Innovation, and Healthcare Leadership</span>
            <svg className="w-5 h-5 animate-pulse animation-delay-1000 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
          </span>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent mt-3" />
        </div>
      </section>
    </div>
  );
}
