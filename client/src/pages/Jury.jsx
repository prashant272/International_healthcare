import { useEffect, useRef } from "react";

// Note to maintainers: 
// - Custom hex colors like #d4af37, #ffeec3, etc. might not be in Tailwind's safelist, which can cause dev build warnings (yellow lines).
// - Having too many unique classnames with arbitrary values can cause purging issues (hence the yellow warnings). 
// - If the colors are fixed, consider adding them to tailwind.config.js as custom colors to optimize performance.
// - Below, we reduced unnecessary arbitrary values and cleaned the most likely issues.

export default function Jury() {
  const juryMembers = [
    { name: "Virender Sehwag", designation: "Indian Cricket Commentator & Former Cricketer" },
    { name: "Sunil Manohar Gavaskar", designation: "Indian Cricket Commentator & Former Cricketer" },
    { name: "Shri Ashwini Kumar Choubey", designation: "Hon’ble Minister of State for Health and Family Welfare" },
    { name: "Dr. Yoganand Shashtri", designation: "Former Reader, Shaheed Bhagat Singh College, Delhi" },
    { name: "Shri G. V. L. Narsimha Rao", designation: "National Spokesperson, BJP" },
    { name: "Mr. Brad Hogg", designation: "Former Australian Cricketer" },
    { name: "Dr. Najma A. Heptulla", designation: "Former Governor, Manipur" },
    { name: "Shri Anand Kumar", designation: "Founder & Director, Super 30" },
    { name: "Shri Amar Singh", designation: "Hon’ble Member of Parliament" },
    { name: "Ms. Arti Mehra", designation: "CEO, NABH; Former Mayor, Municipal Corporation of Delhi" },
    { name: "Ms. Lara Dutta", designation: " Indian actress, model" },
    { name: "Shri Anil K. Shastri", designation: "Son of Lal Bahadur Shastri; Former Ministry of Finance, Govt. of India." },
    { name: "Shri Sandeep Patil", designation: "Former Indian Cricketer & Chief of the BCCI Selection Committee" },
    { name: "Brett Lee", designation: "Australian Cricketer" },
    { name: "Ms. Arti Mehra", designation: "CEO, NABH; Former Mayor, Municipal Corporation of Delhi" },
  ];

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("opacity-100", "translate-y-0")
        ),
      { threshold: 0.15 }
    );
    sectionRef.current
      ?.querySelectorAll(".jury-card")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Move custom colors into variables so Tailwind doesn't purge them,
  // or you can add these to your tailwind.config.js as theme colors.
  // For now, keep them as inline styles where necessary.

  const primaryBlue = "#2563eb";
  const secondaryBlue = "#1d4ed8";
  const medicalBlue = "#3b82f6";
  const medicalSecondary = "#1e40af";
  const emeraldAccent = "#10b981";
  const slate900 = "#0f172a";
  const slate950 = "#020617";
  const blue40 = "rgba(37,99,235,0.3)";
  const blue80 = "rgba(37,99,235,0.8)";
  const white80 = "rgba(255,255,255,0.8)";

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden bg-slate-950"
      style={{
        background: `radial-gradient(circle at 50% -20%, ${medicalBlue}15 0%, transparent 70%), ${slate950}`
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6" ref={sectionRef}>
        
        {/* TITLE */}
        <div className="text-center mb-12">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-heading bg-clip-text text-transparent mb-4 font-black"
            style={{
              backgroundImage: `linear-gradient(to right, white, ${medicalBlue}, white)`
            }}
          >
            Our Esteemed Guests & Speakers
          </h1>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{
              backgroundImage: `linear-gradient(to right, transparent, ${medicalBlue}, transparent)`
            }}
          />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {juryMembers.map((member, index) => (
            <div
              key={index}
              className="jury-card opacity-0 translate-y-8 transition-all duration-700 flex justify-center"
            >
              {/* CARD */}
              <div
                className="
                  w-full max-w-[370px] 
                  min-h-[340px] sm:min-h-[340px] lg:min-h-[340px]
                  flex flex-col
                  rounded-3xl
                  p-5 sm:p-6
                  border-2 shadow-lg
                  hover:shadow-xl
                  hover:-translate-y-3
                  transition-all duration-500
                  relative
                  backdrop-blur-md
                "
                style={{
                  background: "rgba(15, 23, 42, 0.15)",
                  borderColor: "rgba(37,99,235,0.3)",
                  boxShadow: `0 10px 32px 0 rgba(37,99,235,0.08)`,
                  margin: "0 auto",
                }}
              >
                {/* Decorative top accent */}
                <div className="absolute left-1/2 -top-4 -translate-x-1/2">
                  <div
                    className="w-20 sm:w-24 h-2 rounded-full mb-3"
                    style={{
                      background: `linear-gradient(to right, ${medicalBlue}, white, ${medicalBlue})`,
                      filter: "blur(1px)"
                    }}
                  ></div>
                </div>

                {/* IMAGE */}
                <div className="flex justify-center mb-6 relative">
                  <div
                    className="
                      rounded-full 
                      p-[2px]
                      shadow-lg
                    "
                    style={{
                      height: "14rem", width: "14rem",
                      background: `linear-gradient(135deg, ${medicalBlue}, white, ${emeraldAccent})`,
                      boxShadow: `0 4px 20px 0 ${blue40}`
                    }}
                  >
                    <img
                      src={`/images/jury${index + 1}.jpeg`}
                      alt={member.name}
                      className="h-full w-full rounded-full object-cover bg-black border-4"
                      style={{
                        borderColor: "rgba(255,255,255,0.2)",
                        background: "black"
                      }}
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* TEXT */}
                <div className="flex flex-col flex-grow items-center text-center px-2 sm:px-3">
                  <h2
                    className="
                      text-xl sm:text-2xl lg:text-2xl 
                      font-extrabold 
                      mb-3 
                      bg-clip-text text-transparent
                      drop-shadow-lg
                      tracking-wide
                    "
                    style={{
                      backgroundImage: `linear-gradient(to right, white, ${medicalBlue}, white)`
                    }}
                  >
                    {member.name}
                  </h2>

                  <div
                    className="w-20 sm:w-24 h-1 mx-auto mb-4 opacity-80 rounded-full"
                    style={{
                      background: `linear-gradient(to right, transparent, ${medicalBlue}, transparent)`
                    }}
                  />

                  <p
                    className="text-base sm:text-lg lg:text-lg font-medium leading-relaxed italic px-2 drop-shadow mb-2"
                    style={{
                      color: "rgba(191,219,254,0.9)",
                      textShadow: "0 1.5px 0 #020617, 0 0 8px rgba(37,99,235,0.2)",
                      WebkitTextDecorationColor: medicalBlue,
                      textDecorationColor: medicalBlue
                    }}
                  >
                    {member.designation}
                  </p>

                  {/* Decorative underline swirl */}
                  <div className="mt-1">
                    <svg width="36" height="13" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                      <path d="M2 8 Q 10 16, 20 8 T 38 8" stroke={medicalBlue} strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
