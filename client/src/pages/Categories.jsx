
// =============================
export default function Categories() {
  const categories = [
    // Category array unchanged, just above for brevity
    {
      category: "Healthcare Institution",
      title: "Excellence in AI-Driven Hospital Transformation",
      desc: "Recognizes hospitals that have strategically adopted Artificial Intelligence across clinical care, diagnostics, operations, and patient engagement to improve outcomes, efficiency, and innovation.",
    },
    {
      category: "Healthcare Institution",
      title: "Outstanding Future-Ready Healthcare Institution",
      desc: "Honors healthcare institutions demonstrating visionary leadership in digital transformation, smart infrastructure, sustainability, and technology-enabled patient-centric care.",
    },
    {
      category: "Healthcare Institution",
      title: "Excellence in Digital & Smart Hospital Infrastructure",
      desc: "Recognizes hospitals implementing advanced digital infrastructure such as HIS, EMR/EHR, IoT-enabled facilities, smart ICUs, and automated clinical workflows.",
    },
    {
      category: "Healthcare Institution",
      title: "Excellence in Telemedicine & Virtual Care",
      desc: "Celebrates healthcare providers delivering high-quality care through teleconsultation platforms, remote monitoring, virtual diagnostics, and digital health ecosystems.",
    },
    {
      category: "Healthcare Institution",
      title: "Excellence in Digital Diagnostics & Imaging Innovation",
      desc: "Recognizes healthcare institutions leveraging AI-powered diagnostics, advanced imaging systems, and data-driven clinical decision support.",
    },
    {
      category: "Healthcare Institution",
      title: "Excellence in Patient Experience & Engagement Innovation",
      desc: "Honors hospitals enhancing patient experience through digital platforms, AI chatbots, mobile health apps, and personalized care journeys.",
    },
    {
      category: "Healthcare Institution",
      title: "Outstanding Technology-Driven Medical Education & Training Institute",
      desc: "Honors medical colleges and healthcare training institutes using simulation labs, virtual learning, AI-assisted diagnostics training, and immersive education technologies.",
    },

    // ========== LEADERSHIP ==========
    {
      category: "Leadership",
      title: "Visionary Healthcare Leader in Digital Transformation",
      desc: "Honors healthcare leaders driving large-scale digital transformation, innovation, and technology-led healthcare excellence.",
    },
    {
      category: "Leadership",
      title: "Transformative Hospital CEO of the Year",
      desc: "Recognizes hospital CEOs leading technology-driven growth, operational excellence, and patient-centric innovation.",
    },
    {
      category: "Leadership",
      title: "Pioneering Medical Director in Clinical Innovation",
      desc: "Honors medical directors advancing clinical excellence through AI-driven diagnostics, digital treatment models, and innovation-led care delivery.",
    },
    {
      category: "Leadership",
      title: "Outstanding Doctor in Technology-Enabled Patient Care",
      desc: "Recognizes doctors leveraging digital tools, telemedicine, AI, and advanced technologies to deliver superior patient outcomes.",
    },
    {
      category: "Leadership",
      title: "Emerging Healthcare Leader in Digital Innovation",
      desc: "Recognizes rising healthcare leaders demonstrating early impact through innovation, technology adoption, and digital healthcare initiatives.",
    },

    // ========== HEALTHTECH / MEDTECH ==========
    {
      category: "HealthTech / MedTech",
      title: "Excellence in AI-Powered Healthcare Solutions",
      desc: "Recognizes companies delivering AI-driven platforms for diagnostics, clinical decision support, and healthcare automation.",
    },
    {
      category: "HealthTech / MedTech",
      title: "Excellence in Digital Health & Telemedicine Innovation",
      desc: "Honors organizations redefining healthcare delivery through telehealth platforms, virtual care, and remote monitoring technologies.",
    },
    {
      category: "HealthTech / MedTech",
      title: "Excellence in Medical Devices & Smart Health Technologies",
      desc: "Recognizes MedTech companies innovating in connected devices, smart diagnostics, wearables, and medical hardware solutions.",
    },
    {
      category: "HealthTech / MedTech",
      title: "Excellence in Healthcare Data Analytics & Intelligence Platforms",
      desc: "Honors companies leveraging healthcare data, predictive analytics, and AI to drive better outcomes and operational efficiency.",
    },
    {
      category: "HealthTech / MedTech",
      title: "Excellence in Digital Mental Health & Wellness Technology",
      desc: "Honors platforms delivering digital mental health services, therapy solutions, wellbeing apps, and emotional support technologies.",
    },
    {
      category: "HealthTech / MedTech",
      title: "Rising Star HealthTech / MedTech Company",
      desc: "Celebrates emerging healthcare technology companies demonstrating strong innovation, scalability, and market impact.",
    },
    {
      category: "HealthTech / MedTech",
      title: "Outstanding HealthTech / MedTech Company of the Year",
      desc: "Recognizes an organization demonstrating exceptional leadership, innovation, and impact in healthcare technology.",
    },
    //PATIENT CARE & CLINICAL EXCELLENCE
    {
      category: "Patient Care & Clinical Excellence",
      title: "Excellence in Patient-Centric Care Model",
      desc: "Recognizes healthcare institutions delivering holistic, personalized, and outcome-driven patient care through integrated clinical and digital approaches.",
    },
    {
      category: "Patient Care & Clinical Excellence",
      title: "Excellence in Clinical Outcomes & Quality Care",
      desc: "Honors hospitals achieving superior clinical outcomes, patient safety, and quality benchmarks through evidence-based and technology-supported practices.",
    },
    {
      category: "Patient Care & Clinical Excellence",
      title: "Excellence in Multispecialty Care Delivery",
      desc: "Recognizes institutions providing comprehensive multispecialty healthcare with seamless coordination, advanced treatment protocols, and patient-focused services.",
    },
    // PUBLIC HEALTH & SOCIAL IMPACT
    {
      category: "Public Health & Social Impact",
      title: "Excellence in Community Healthcare Outreach",
      desc: "Honors organizations improving healthcare access through community programs, rural health initiatives, and preventive care outreach.",
    },
    {
      category: "Public Health & Social Impact",
      title: "Excellence in Preventive & Population Health Management",
      desc: "Recognizes initiatives focused on preventive healthcare, population health analytics, and proactive disease management strategies.",
    },
    {
      category: "Public Health & Social Impact",
      title: "Outstanding Contribution to Public Health Innovation",
      desc: "Celebrates organizations driving impactful public health solutions through policy innovation, technology, and large-scale health programs.",
    },
    //NURSING & ALLIED HEALTHCARE PROFESSIONALS
    {
      category: "Nursing & Allied Healthcare Professionals",
      title: "Excellence in Nursing Leadership & Care",
      desc: "Honors nursing leaders and teams demonstrating exceptional patient care, clinical excellence, and compassionate healthcare delivery.",
    },
    {
      category: "Nursing & Allied Healthcare Professionals",
      title: "Outstanding Allied Healthcare Professional of the Year",
      desc: "Recognizes allied healthcare professionals contributing significantly to diagnostics, therapy, rehabilitation, and patient support services.",
    },
    //PHARMA & LIFE SCIENCES
    {
      category: "Pharma & Life Sciences",
      title: "Excellence in Pharmaceutical Innovation",
      desc: "Recognizes pharmaceutical companies driving innovation in drug development, research, and advanced therapeutic solutions.",
    },
    {
      category: "Pharma & Life Sciences",
      title: "Excellence in Clinical Research & Trials",
      desc: "Honors organizations advancing healthcare through ethical, technology-enabled clinical research and trials.",
    },
    {
      category: "Pharma & Life Sciences",
      title: "Excellence in Biotechnology & Life Sciences",
      desc: "Recognizes companies innovating in biotechnology, genomics, and life sciences to improve healthcare outcomes.",
    },
    //DIGITAL SECURITY & COMPLIANCE
    {
      category: "Digital Security & Compliance",
      title: "Excellence in Healthcare Cybersecurity",
      desc: "Recognizes organizations ensuring robust cybersecurity, patient data protection, and compliance with healthcare data regulations.",
    },
    {
      category: "Digital Security & Compliance",
      title: "Excellence in Healthcare Data Privacy & Compliance",
      desc: "Honors institutions maintaining high standards of data privacy, regulatory compliance, and ethical digital healthcare practices.",
    },
    //SPECIALTY HEALTHCARE
    {
      category: "Specialty Healthcare",
      title: "Excellence in Oncology Care & Innovation",
      desc: "Recognizes healthcare providers delivering advanced cancer care through precision medicine, technology, and patient-centered approaches.",
    },
    {
      category: "Specialty Healthcare",
      title: "Excellence in Cardiac Care & Innovation",
      desc: "Honors institutions achieving excellence in cardiac treatment, digital diagnostics, and interventional cardiology.",
    },
    {
      category: "Specialty Healthcare",
      title: "Excellence in Women & Child Healthcare",
      desc: "Recognizes organizations delivering comprehensive, technology-enabled care for women’s health and pediatric services.",
    },
  ];

  return (
    <section className="relative bg-slate-950 py-20 sm:py-28 md:py- overflow-hidden">
      {/* BACKGROUND GLOW, LIGHTS & LUX EFFECTS */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Medical Blue Glow */}
        <div className="absolute -top-16 -left-20 w-96 h-96 bg-blue-600/30 rounded-full blur-[105px] opacity-40 animate-pulse" />
        {/* Emerald Accent Glow */}
        <div className="absolute bottom-[10%] right-0 w-80 h-72 bg-emerald-500/20 rounded-full blur-[95px] opacity-20 animate-pulse" />
        {/* Subtle Deep Blue Shine */}
        <div className="absolute left-1/2 -translate-x-1/2 top-8 w-[78vw] h-16 bg-gradient-to-r from-blue-400/20 via-blue-600/30 to-blue-400/20 blur-lg opacity-60" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.18)_0%,rgba(2,6,23,0.92)_100%)] pointer-events-none" />
        {/* Shimmer sparkles */}
        <div className="hidden md:block absolute w-full h-full pointer-events-none animate-pulse opacity-20">
          <div className="absolute left-1/4 top-40 w-2 h-2 bg-blue-400 rounded-full shadow-md"></div>
          <div className="absolute left-2/3 top-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow"></div>
          <div className="absolute left-1/5 top-3/4 w-1.5 h-1.5 bg-blue-500 rounded-full shadow"></div>
          <div className="absolute right-32 bottom-32 w-1 h-1 bg-blue-300 rounded-full"></div>
          <div className="absolute left-16 bottom-24 w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 ">
        <div className="absolute left-3 right-3 -top-3 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-90 rounded-full blur-sm pointer-events-none" />
        {/* Heading Section */}
        <div className="text-center mb-16 sm:mb-20">
          <h1 className="relative inline-block text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-transparent bg-gradient-to-br from-white via-blue-400 to-medical-secondary bg-clip-text drop-shadow-[0_5px_28px_rgba(37,99,235,0.4)] mb-5 sm:mb-6 tracking-tight">
            Healthcare Award{" "}
            <span className="inline-block animate-shine bg-gradient-to-br from-blue-300 via-blue-500 to-medical-secondary bg-[length:310%_100%] bg-clip-text text-transparent drop-shadow-[0_2px_9px_rgba(37,99,235,0.6)]">
              Categories
              <span className="inline-block absolute -top-2 -right-8 animate-pulse text-3xl sm:text-4xl text-blue-300 drop-shadow-xl">✨</span>
            </span>
          </h1>
          <div className="w-52 h-[4px] sm:w-80 bg-gradient-to-r from-transparent via-blue-500/90 to-transparent mx-auto rounded-full shadow-xl shadow-blue-500/20" />
          <p className="max-w-2xl mx-auto text-blue-100 text-lg xs:text-xl font-medium mt-5 px-1 text-shadow-glow">
            Recognizing <span className="text-blue-300 font-bold">global excellence</span> and <span className="text-emerald-400 font-bold">innovation</span> across healthcare, leadership and technology.
          </p>
        </div>
        {/* Responsive Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full rounded-3xl pb-2 mb-4">
          {categories.map((item, index) => (
            <div
              key={index}
              className={`
                group relative rounded-3xl border border-blue-500/30 overflow-hidden shadow-[0_10px_30px_-10px_rgba(37,99,235,0.2),0_0.5px_0_rgba(255,255,255,0.1)_inset]
                hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 backdrop-blur-md
              `}
              style={{
                background: "rgba(15, 23, 42, 0.15)",
                boxShadow: "0 2px 14px -2px rgba(37,99,235,0.2), 0 1px 0 rgba(255,255,255,0.05) inset",
              }}
            >
              {/* Animated Ribbon */}
              <div className="absolute -top-2 left-4">
                <span className="px-2 py-0.5 rounded-xl bg-gradient-to-tr from-blue-500 to-medical-secondary text-xs font-bold text-white shadow shadow-blue-500/30 tracking-wider animate-shine">
                  {item.category}
                </span>
              </div>
              {/* Star Icon Top Right */}
              <div className="absolute top-3 right-4 text-blue-300 text-lg opacity-30 group-hover:opacity-70 transition-all select-none">✦</div>
              {/* Card Content */}
              <div className="flex flex-col gap-2 items-start px-6 pt-10 pb-7 min-h-[238px]">
                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-bounce text-blue-400">🏅</span>
                  <span className="text-lg font-extrabold text-transparent bg-gradient-to-r from-blue-50 via-blue-200 to-medical-secondary bg-clip-text drop-shadow-[0_2px_10px_rgba(37,99,235,0.2)]">
                    {item.title}
                  </span>
                </div>
                <div className="flex items-start gap-2 mt-2">
                  <span className="text-lg animate-spin-slow text-emerald-400">📝</span>
                  <span className="text-base text-slate-200 group-hover:text-white font-medium leading-relaxed transition duration-200">
                    {item.desc}
                  </span>
                </div>
              </div>
              {/* Glow on Hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-35 transition-all duration-300 bg-gradient-to-tr from-blue-500/20 via-medical-secondary/10 to-transparent rounded-3xl" />
            </div>
          ))}
        </div>
        {/* Info Footer */}
        <div className="text-center mt-12 sm:mt-20 text-blue-100 text-sm sm:text-lg font-medium px-1 italic drop-shadow-[0_2px_15px_rgba(37,99,235,0.1)] hover:drop-shadow-[0_5px_28px_rgba(37,99,235,0.2)] transition">
          <span className="inline-flex items-center gap-1">
            <span className="text-blue-400 text-lg">⚜️</span>
            All award categories are subject to jury review.
            <span className="mx-2 text-blue-400">|</span>
            For queries, <span className="underline decoration-blue-500/70 hover:text-white cursor-pointer transition">contact us</span>.
          </span>
        </div>
      </div>
      {/* Extra fancy floating animated shining points */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <span className="hidden sm:block absolute left-[14%] top-[35%] w-2 h-2 bg-blue-400 rounded-full blur-[2px] opacity-70 animate-shine" />
        <span className="hidden md:block absolute left-[70%] top-[70%] w-1.5 h-1.5 bg-emerald-400 rounded-full blur-[1px] opacity-60 animate-pulse" />
        <span className="hidden md:block absolute left-[83%] top-[29%] w-2.5 h-2.5 bg-blue-300 rounded-full opacity-90 animate-shine" />
      </div>
      {/* Animate keyframes for shine and slow-spin */}
      <style>
        {`
        @keyframes shine {
          0% { filter: brightness(1.07) }
          20% { filter: brightness(1.23) }
          50% { filter: brightness(1.41) }
          75% { filter: brightness(1.18) }
          100% { filter: brightness(1.07) }
        }
        .animate-shine {
          animation: shine 3.2s cubic-bezier(.4,0,.6,1) infinite alternate;
        }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        `}
      </style>
    </section>
  );
}

