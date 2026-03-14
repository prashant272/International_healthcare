import { Link } from "react-router-dom";
const medicalBlue = "#2563eb";
const blueGrad = `linear-gradient(90deg, #0f172a 0%, #2563eb 40%, #60a5fa 70%, #2563eb 100%)`;
const borderBlue = "rgba(37, 99, 235, 0.3)";
const bgGrad = "linear-gradient(120deg, #020617 0%, #0f172a 63%, #1e293b 100%)";

export default function Footer() {
  return (
    <footer
      className="mt-0"
      style={{
        background: bgGrad,
        color: "#e2e8f0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Glow/Blurred Gradient Shape */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2 blur-[80px] opacity-40 hidden lg:block"
        style={{
          width: 600,
          height: 180,
          background: "radial-gradient(circle at 50% 10%, #2563eb50 0%, transparent 90%)"
        }}
      ></div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16 md:py-20">
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-4 
          lg:grid-cols-5
          gap-y-12 gap-x-8
        ">

          {/* ==== ABOUT/BRAND ==== */}
          <div className="flex flex-col h-full">
            <div className="flex items-center space-x-3 mb-3">
              <img
                src="/images/logo.png"
                alt="GHA Logo"
                className="w-20 h-20 rounded-full shadow-md ring-2 ring-medical-secondary/50 bg-white object-contain p-1"
                loading="lazy"
              />
              <span
                className="font-heading text-xl sm:text-2xl font-extrabold bg-clip-text text-transparent"
                style={{ backgroundImage: blueGrad }}>
                International Global Healthcare Awards 2026
              </span>
            </div>
            <div
              className="mt-3 rounded-full h-1 w-24 bg-gradient-to-r from-transparent via-medical-secondary to-transparent mb-4"
            />
            <p className="text-sm lg:text-base font-medium leading-relaxed opacity-80">
              Recognising outstanding leadership, innovation & excellence in global healthcare – celebrating visionary organisations and individuals shaping tomorrow.
            </p>
          </div>

          {/* ==== QUICK LINKS ==== */}
          <div>
            <h3
              className="font-semibold mb-5 text-lg text-[#f8fafc] tracking-wide 
                border-l-4 pl-3 border-medical-secondary/40"
            >
              Quick Links
            </h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link to="/" className="hover:text-blue-400 hover:pl-2 transition-all duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-blue-400 hover:pl-2 transition-all duration-200">
                  Award Categories
                </Link>
              </li>
              <li>
                <Link to="/jury" className="hover:text-blue-400 hover:pl-2 transition-all duration-200">
                  Guest
                </Link>
              </li>
              <li>
                <Link to="/media" className="hover:text-blue-400 hover:pl-2 transition-all duration-200">
                  Media
                </Link>
              </li>
              <li>
                <Link 
                  to="/previous-editions" 
                  onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 hover:pl-2 transition-all duration-200"
                >
                  Previous Editions
                </Link>
              </li>
            </ul>
          </div>

          {/* ==== INFORMATION ==== */}
          <div>
            <h3
              className="font-semibold mb-5 text-lg text-[#f8fafc] tracking-wide
                border-l-4 pl-3 border-medical-secondary/40"
            >
              Information
            </h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link to="/guidelines" className="hover:text-blue-400 hover:pl-2 transition-all duration-200">
                  Entry Guidelines
                </Link>
              </li>
              <li>
                <Link to="/judging" className="hover:text-blue-400 hover:pl-2 transition-all duration-200">
                  Selection Process
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-400 hover:pl-2 transition-all duration-200">
                  T&C
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 hover:pl-2 transition-all duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* ==== OTHER SERVICES ==== */}
          <div>
            <h3
              className="font-semibold mb-5 text-lg text-[#f8fafc] tracking-wide
                border-l-4 pl-3 border-medical-secondary/40"
            >
              Other Services
            </h3>
            <ul className="space-y-3 text-base">
              <li>
                <a
                  href="https://primetimemedia.in/market-research/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 hover:pl-2 transition-all duration-200"
                >
                  Market Research
                </a>
              </li>
              <li>
                <a
                  href="https://primetimemedia.in/digital-marketing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 hover:pl-2 transition-all duration-200"
                >
                  Digital Marketing
                </a>
              </li>
              <li>
                <a
                  href="https://primetimemedia.in/brand-reputation-management/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 hover:pl-2 transition-all duration-200"
                >
                  Brand Reputation Management
                </a>
              </li>
              <li>
                <a
                  href="https://primetimemedia.in/business-consultancy-services/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 hover:pl-2 transition-all duration-200"
                >
                  Business Consultancy
                </a>
              </li>
              <li>
                <a
                  href="https://primetimemedia.in/public-relation-management/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 hover:pl-2 transition-all duration-200"
                >
                  Public Relation Management
                </a>
              </li>
              <li>
                <a
                  href="https://primetimemedia.in/social-media-management/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 hover:pl-2 transition-all duration-200"
                >
                  Social Media Management
                </a>
              </li>
              <li>
                <a
                  href="https://primetimemedia.in/web-development/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 hover:pl-2 transition-all duration-200"
                >
                  Web Development
                </a>
              </li>
            </ul>
          </div>

          {/* ==== REACH US ==== */}
          <div>
            <h3
              className="font-semibold mb-5 text-lg text-[#f8fafc] tracking-wide
                border-l-4 pl-3 border-medical-secondary/40"
            >
              Reach Us
            </h3>
            <div className="space-y-3 text-base">
              <div className="flex items-start gap-2">
                <span className="inline-block w-5 mt-0.5 text-medical-secondary">🏢</span>
                <span className="text-sm leading-snug">
                  <strong>Office:</strong> TIME Cyber Media Pvt Ltd, C-31, Nawada Housing Complex, New Delhi-59
                </span>
              </div>
              <div className="grid grid-cols-1 gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-5 text-[#25D366]">📞</span>
                  <a href="tel:+919810882769" className="hover:text-medical-secondary transition-all text-sm font-semibold">
                    +91 9810 88 2769 <span className="text-[10px] opacity-60 font-normal uppercase ml-1">(Nominations)</span>
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-5 text-medical-secondary">📞</span>
                  <a href="tel:+919971002984" className="hover:text-medical-secondary transition-all text-sm font-semibold">
                    +91 9971 00 2984 <span className="text-[10px] opacity-60 font-normal uppercase ml-1">(Sponsorship)</span>
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-5 text-medical-secondary">📞</span>
                  <a href="tel:+919810910686" className="hover:text-medical-secondary transition-all text-sm font-semibold">
                    +91 9810 91 0686 <span className="text-[10px] opacity-60 font-normal uppercase ml-1">(Helpline)</span>
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-5 text-medical-secondary">☎️</span>
                  <a href="tel:+911169268754" className="hover:text-medical-secondary transition-all text-sm font-semibold">
                    +91 11-69268754
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <a
                  href="https://www.google.com/maps?..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-400/40 hover:bg-blue-500/20 hover:border-blue-400 text-blue-400 font-semibold transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 2.71 1.99 6.42 6.21 11.54a1 1 0 0 0 1.58 0C17.01 15.42 19 11.71 19 9c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
                      fill="currentColor"
                    />
                  </svg>
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blue gradient border line */}
      <div
        className="w-full h-1"
        style={{
          background: blueGrad,
          opacity: "0.4"
        }}
      />

      {/* BOTTOM BAR */}
      <div
        className="text-center text-xs md:text-sm py-6 px-3 border-t border-white/5"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        <span
          className="font-semibold text-base sm:text-lg"
          style={{
            background: blueGrad,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          International Global Healthcare Awards
        </span>

        {" "} &bull; © {new Date().getFullYear()} All Rights Reserved
        {" "} | Operated by{" "}
        <span className="text-blue-300 font-bold">
          TIME Cyber Media Pvt Ltd
        </span>
      </div>

      {/* Developer Credit Badge */}
      <div className="gap-2 mt-4 flex justify-center pb-6">
        <a
          href="https://primeimpact.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-18 py-6 rounded-full border border-medical-secondary/30 bg-medical-secondary/5 hover:border-medical-secondary/80 hover:bg-medical-secondary/10 transition-all duration-300 shadow-lg shadow-medical-secondary/5"
        >
          <span className="text-[11px] text-slate-400 tracking-wider font-medium">
            ✦ Designed &amp; Developed by
          </span>
          <span className="text-[13px] font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-medical-secondary to-blue-400">
            Prime Impact IT Solutions
          </span>
        </a>
      </div>

    </footer>
  );
}
