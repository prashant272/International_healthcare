import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  FaHome,
  FaListAlt,
  FaUsers,
  FaBook,
  FaGavel,
  FaFileContract,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaTrophy,
  FaHistory,
  FaRegClone,
  FaRegEdit,
  FaQuestionCircle,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { fetchPreviousEditions } from "../services/api.js";

export default function Navbar() {
  const [editions, setEditions] = useState([]);
  const [showPill, setShowPill] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isNominateRoute = location.pathname.startsWith("/nominate");
  const isHomePage = location.pathname === "/";
  const isUser = user?.role === "user";
  const isAdminUser = user?.role === "admin";

  const headerRef = useRef();

  useEffect(() => {
    fetchPreviousEditions().then(res => setEditions(res.data || [])).catch(console.error);
  }, []);

  useEffect(() => {
    if (!isAdminRoute && !isNominateRoute) {
      if (window.innerWidth < 768 && headerRef.current) {
        const y = window.scrollY;
        if (y > 80) {
          window.scrollTo({ top: headerRef.current.offsetHeight + 2, behavior: "smooth" });
        }
      }
    }
  }, [location.pathname, isAdminRoute, isNominateRoute]);

  useEffect(() => {
    if (isAdminRoute) return;

    const onScroll = () => {
      if (window.scrollY > 100) {
        setShowPill(true);
      } else {
        setShowPill(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isAdminRoute]);

  const handleLoginClick = () => {
    if (isAdminRoute) {
      if (isAdminUser) {
        logout();
      } else {
        navigate("/admin/login");
      }
    } else {
      if (isAuthenticated) {
        logout();
      } else {
        navigate("/login");
      }
    }
  };

  if (isAdminRoute) {
    return (
      <header className="fixed top-0 w-full z-50 bg-[#020617] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <a href="https://www.primetimemedia.in/" target="_blank" rel="noopener noreferrer">
              <img
                src="/images/logo.png"
                alt="Time Cyber media logo"
                className="h-8 w-auto object-contain cursor-pointer"
              />
            </a>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-white">Admin Dashboard</span>
              <span className="text-[11px] text-gray-300">
                International Healthcare Awards – Internal Panel
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isAdminUser && user ? (
              <span className="hidden md:inline text-xs text-gray-200">
                Welcome, <span className="font-semibold">{user.name}</span>
              </span>
            ) : null}
            {isAdminUser && (
              <button
                onClick={handleLoginClick}
                className="border border-white px-4 py-1 rounded-full text-xs hover:bg-white hover:text-black transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <div className="hidden md:block">
        <header
          className={`fixed top-0 w-full z-50 text-white transition-all duration-500 ${showPill ? "opacity-0 pointer-events-none -translate-y-10" : "opacity-100 translate-y-0"
            }`}
          ref={headerRef}
        >
          <div className="bg-transparent h-14">
            <div className="max-w-7xl mx-auto px-3 h-full flex items-center text-sm">
              <div className="flex items-center gap-3">
                <div className="relative w-43 h-18 flex items-center justify-center">
                  <a href="https://www.timecybermedia.com/" target="_blank" rel="noopener noreferrer">
                    <img
                      src="/images/logo.png"
                      alt="time cyber media logo"
                      className="absolute top-[-0.5px] left-[-3px] h-[70px] rounded-md w-auto max-w-none object-contain z-50 drop-shadow-md cursor-pointer"
                    />
                  </a>
                </div>
                <div className="flex gap-2 font-semibold whitespace-nowrap ml-4">
                  <span>TIME Cyber Media </span>
                  <span>Pvt Ltd.</span>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-3">
                {isUser && user ? (
                  <>
                    <span className="hidden md:inline text-xs text-gray-100">
                      Welcome, <span className="font-semibold">{user.name}</span>
                    </span>
                    {user.role === "user" && (
                      <button
                        onClick={() => navigate("/dashboard")}
                        className="border border-emerald-400 px-4 py-1 rounded-full text-xs text-emerald-400 hover:bg-emerald-500 hover:text-white transition"
                      >
                        My Nominations
                      </button>
                    )}
                  </>
                ) : null}
                <button
                  onClick={handleLoginClick}
                  className="border border-white px-4 py-1 rounded-full text-xs hover:bg-white hover:text-black transition"
                >
                  {isAuthenticated ? "Logout" : "Login"}
                </button>
              </div>
            </div>
          </div>
          <nav className="bg-transparent h-12">
            <div className="max-w-7xl mx-auto px-6 h-full flex justify-center items-center gap-0">
              {menuLinks(undefined, headerRef, isUser, false, editions, false)}
            </div>
          </nav>
        </header>

        <div
          className={`fixed top-4 left-0 w-full z-[150] flex justify-center px-4 transition-all duration-500 ${showPill ? "opacity-100 translate-y-0 scale-100" : "opacity-0 pointer-events-none -translate-y-4 scale-95"
            }`}
        >
          <div className="
               relative
               bg-slate-950/85 backdrop-blur-lg text-white 
               rounded-full shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(16,185,129,0.25)] 
               border border-emerald-500/30 
               px-6 py-2 flex items-center gap-5
               group
             "
            style={{
              background: "linear-gradient(135deg, rgba(8, 17, 36, 0.85) 0%, rgba(3, 8, 20, 0.95) 100%)",
            }}
          >
            {/* Liquid Refractive Element */}
            <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10 opacity-50" />
              <div className="absolute -top-full -left-full w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)] animate-pulse" />
            </div>

            <div className="flex items-center gap-3 z-10">
              <a href="https://www.timecybermedia.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="h-8 w-auto object-contain cursor-pointer brightness-110"
                />
              </a>
              <div className="h-5 w-px bg-white/10 mx-1"></div>
            </div>
            <div className="relative flex gap-0 items-center z-10">
              {menuLinks(undefined, headerRef, isUser, false, editions, false)}
            </div>
          </div>
        </div>
      </div>

      <div className="block md:hidden">
        <header
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex items-center h-16 sm:h-20 px-4 justify-between ${showPill
            ? "bg-slate-950/90 backdrop-blur-lg border-b border-emerald-500/20 shadow-xl"
            : "bg-transparent"
            }`}
          ref={headerRef}
        >
          <div className="flex items-center gap-2">
            <a href="https://www.timecybermedia.com/" target="_blank" rel="noopener noreferrer">
              <img
                src="/images/logo.png"
                alt="PrimeTime Logo"
                className="h-9 w-auto object-contain"
                style={{ maxWidth: 40 }}
              />
            </a>
            <span className="text-[13px] font-semibold whitespace-nowrap text-white">TIME Cyber Media Pvt Ltd.</span>
          </div>
          <div className="flex items-center gap-1">
            {isAuthenticated ? (
              <button
                onClick={handleLoginClick}
                className="border border-white text-white px-3 py-1 rounded-full text-xs hover:bg-white hover:text-black transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLoginClick}
                className="border border-white text-white px-3 py-1 rounded-full text-xs hover:bg-white hover:text-black transition"
              >
                Login
              </button>
            )}
            <button
              aria-label="Open Menu"
              onClick={() => setMobileMenuOpen(true)}
              className="ml-2 text-white text-xl flex items-center justify-center"
            >
              <FaBars />
            </button>
          </div>
        </header>

        <MobileMenuDrawer
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          user={user}
          isAuthenticated={isAuthenticated}
          handleLoginClick={handleLoginClick}
          headerRef={headerRef}
          isUser={isUser}
          editions={editions}
        />
      </div>
    </>
  );
}

const menuLinks = (onClick, headerRef, isUser, showDashboard = true, editions = [], isMobile = false) => {
  const createNavHandler = (routeHandler) => (e) => {
    if (onClick) onClick();
    setTimeout(() => {
      if (window.innerWidth < 768 && headerRef && headerRef.current) {
        window.scrollTo({ top: headerRef.current.offsetHeight + 2, behavior: "smooth" });
      }
    }, 0);
    if (routeHandler && typeof routeHandler === 'function') routeHandler(e);
  };
  return (
    <>
      <NavItem to="/" icon={<FaHome />} label="Home" onClick={createNavHandler(onClick)} />
      <NavItem to="/categories" icon={<FaListAlt />} label="Category" onClick={createNavHandler(onClick)} />
      <NavItem to="/jury" icon={<FaUsers />} label="Guest" onClick={createNavHandler(onClick)} />
      <NavItem to="/guidelines" icon={<FaBook />} label="Entry Guidelines" className={isMobile ? "" : "hidden xl:flex"} onClick={createNavHandler(onClick)} />
      <NavItem to="/judging" icon={<FaGavel />} label="Selection Process" className={isMobile ? "" : "hidden xl:flex"} onClick={createNavHandler(onClick)} />
      <NavItem to="/terms" icon={<FaFileContract />} label="T&C" className={isMobile ? "" : "hidden xl:flex"} onClick={createNavHandler(onClick)} />
      <NavItem to="/contact" icon={<FaEnvelope />} label="Contact Us" onClick={createNavHandler(onClick)} />
      <NavItem to="/media" icon={<FaTrophy />} label="Media" onClick={createNavHandler(onClick)} />
      <NavDropdown icon={<FaHistory />} label="Previous Editions" options={editions} onClick={createNavHandler(onClick)} isMobile={isMobile} />
      <NavItem to="/faq" icon={<FaQuestionCircle />} label="FAQ" className={isMobile ? "" : "hidden xl:flex"} onClick={createNavHandler(onClick)} />
      <NavItem to="/nominate" icon={<FaRegEdit />} label="Nominate Now" onClick={createNavHandler(onClick)} />
      {isUser && showDashboard && (
        <NavItem
          to="/dashboard"
          icon={<FaRegClone />}
          label="My Nominations"
          onClick={createNavHandler(onClick)}
        />
      )}
    </>
  );
};

function NavItem({ to, icon, label, onClick, className = "" }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 select-none ${
          isActive
            ? "bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            : "text-gray-300 hover:text-white hover:bg-white/5"
        } ${className}`
      }
    >
      <span className="text-[12px]">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}

function MobileMenuDrawer({
  open,
  onClose,
  user,
  isAuthenticated,
  handleLoginClick,
  headerRef,
  isUser,
  editions
}) {
  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[200] block md:hidden"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-slate-950/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-[250] flex flex-col block md:hidden"
          >
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/10">
              <a href="https://www.timecybermedia.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="h-9 w-auto object-contain brightness-110"
                />
              </a>
              <button
                onClick={onClose}
                className="text-white hover:text-emerald-400 text-2xl transition"
              >
                <FaTimes />
              </button>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-between overflow-y-auto medical-scrollbar px-4 py-8">
              <nav className="flex flex-col gap-2">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05
                      }
                    }
                  }}
                  className="flex flex-col gap-3"
                >
                  {menuLinks(onClose, headerRef, isUser, true, editions, true)}
                </motion.div>
              </nav>

              {/* Bottom Actions */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4">
                {isAuthenticated && user && (
                  <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40 text-emerald-400 font-bold">
                      {user.name ? user.name[0].toUpperCase() : "U"}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-white text-sm font-bold truncate max-w-[150px]">{user.name}</span>
                      <span className="text-gray-400 text-xs truncate max-w-[150px]">{user.email}</span>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => {
                    onClose();
                    handleLoginClick();
                  }}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 rounded-xl transition shadow-lg"
                >
                  {isAuthenticated ? "Logout" : "Login / Register"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function NavDropdown({ icon, label, options, onClick, isMobile = false }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActiveGroup = options.some(opt => {
    const formattedTitle = opt.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return location.pathname === `/${opt.year}/${formattedTitle}`;
  }) || location.pathname === "/previous-editions";

  return (
    <div
      className="relative group"
      ref={dropdownRef}
      onMouseEnter={() => window.innerWidth >= 768 && setOpen(true)}
      onMouseLeave={() => window.innerWidth >= 768 && setOpen(false)}
    >
      <NavLink
        to="/previous-editions"
        onClick={(e) => {
          if (window.innerWidth >= 768) {
            // On desktop, hover opens/closes dropdown, so click should navigate to /previous-editions
            setOpen(false);
            if (onClick) onClick();
          } else {
            // On mobile, click toggles dropdown
            e.preventDefault();
            setOpen(!open);
            if (onClick) onClick();
          }
        }}
        className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 select-none ${
          isActiveGroup
            ? "bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            : "text-gray-300 hover:text-white hover:bg-white/5"
        }`}
      >
        <span className="text-[12px]">{icon}</span>
        <span>{label}</span>
      </NavLink>

      <div
        className={`md:absolute top-[100%] left-0 pt-2 z-50 transition-all duration-200 ${
          open ? "md:opacity-100 md:visible md:translate-y-0 flex" : "md:opacity-0 md:invisible hidden"
        } ${window.innerWidth < 768 && !open ? 'hidden' : ''}`}
      >
        <div className="min-w-[240px] max-h-[70vh] overflow-y-auto medical-scrollbar bg-slate-900 border border-emerald-400/30 rounded-xl shadow-2xl py-3 flex flex-col">
          {options.map((opt) => {
            const formattedTitle = opt.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            const isAct = location.pathname === `/${opt.year}/${formattedTitle}`;
            return (
              <NavLink
                key={`${opt.year}-${opt.title}`}
                to={`/${opt.year}/${formattedTitle}`}
                onClick={() => { setOpen(false); if (onClick) onClick(); }}
                className={`px-5 py-2.5 text-sm transition-colors ${
                  isAct 
                    ? 'bg-emerald-600/20 font-bold border-l-4 border-emerald-400 text-white' 
                    : 'text-emerald-100 hover:bg-white/10 hover:text-white border-l-4 border-transparent'
                }`}
              >
                {opt.title} ({opt.year})
              </NavLink>
            );
          })}
          <NavLink
            to="/previous-editions"
            onClick={() => { setOpen(false); if (onClick) onClick(); }}
            className={`px-5 py-2.5 text-sm font-bold text-emerald-400 hover:bg-white/10 hover:text-emerald-300 transition-colors ${
              options.length > 0 ? "border-t border-white/5 mt-1" : ""
            }`}
          >
            {options.length > 0 ? "View All Editions" : "Browse Editions Archive"}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
