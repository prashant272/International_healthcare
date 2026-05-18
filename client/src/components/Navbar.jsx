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
                International Global Healthcare Awards – Internal Panel
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
                <div className="relative w-43 h-18 flex items-center justify-center bg-white">
                  <a href="https://www.timecybermedia.com/" target="_blank" rel="noopener noreferrer">
                    <img
                      src="/images/logo.png"
                      alt="time cyber media logo"
                      className="absolute top-[-10px] left-[-3px] h-[100px] w-auto max-w-none object-contain z-50 drop-shadow-md cursor-pointer"
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
            <div className="max-w-7xl mx-auto px-6 h-full flex justify-center items-center gap-6 text-sm">
              {menuLinks("white", undefined, headerRef, isUser, false, editions)}
            </div>
          </nav>
        </header>

        <div
          className={`fixed top-4 left-0 w-full z-[150] flex justify-center px-4 transition-all duration-500 ${showPill ? "opacity-100 translate-y-0 scale-100" : "opacity-0 pointer-events-none -translate-y-4 scale-95"
            }`}
        >
          <div className="
               relative
               bg-slate-950/80 backdrop-blur-2xl text-white 
               rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(16,185,129,0.2)] 
               border border-emerald-500/30 
               px-8 py-2.5 flex items-center gap-10 text-sm
               group
             ">
            {/* Liquid Refractive Element */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10 opacity-50" />
            <div className="absolute -top-full -left-full w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)] animate-pulse" />

            <div className="flex items-center gap-4">
              <a href="https://www.timecybermedia.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="h-8 w-auto object-contain cursor-pointer brightness-110"
                />
              </a>
              <div className="h-6 w-px bg-white/10 mx-1"></div>
            </div>
            <div className="relative flex gap-6 items-center z-10">
              {menuLinks("white", undefined, headerRef, isUser, false, editions)}
            </div>
          </div>
        </div>
      </div>

      <div className="block md:hidden">
        <header
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex items-center h-16 sm:h-20 px-4 justify-between ${showPill
            ? "bg-slate-900/80 backdrop-blur-lg border-b border-white/10 shadow-xl"
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

const menuLinks = (color, onClick, headerRef, isUser, showDashboard = true, editions = []) => {
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
      <NavItem to="/" icon={<FaHome />} label="Home" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/categories" icon={<FaListAlt />} label="Category" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/jury" icon={<FaUsers />} label="Guest" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/guidelines" icon={<FaBook />} label="Entry Guidelines" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/judging" icon={<FaGavel />} label="Selection Process" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/terms" icon={<FaFileContract />} label="T&C" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/contact" icon={<FaEnvelope />} label="Contact Us" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/media" icon={<FaTrophy />} label="Media" color={color} onClick={createNavHandler(onClick)} />
      <NavDropdown icon={<FaHistory />} label="Previous Editions" color={color} options={editions} onClick={createNavHandler(onClick)} />
      <NavItem to="/faq" icon={<FaQuestionCircle />} label="FAQ" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/nominate" icon={<FaRegEdit />} label="Nominate Now" color={color} onClick={createNavHandler(onClick)} />
      {isUser && showDashboard && (
        <NavItem
          to="/dashboard"
          icon={<FaRegClone />}
          label="My Nominations"
          color={color}
          onClick={createNavHandler(onClick)}
        />
      )}
    </>
  );
};

function NavItem({ to, icon, label, color, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-1 ${isActive
          ? `font-semibold border-b-2 ${color === "white" ? "border-white" : "border-black"
          }`
          : color === "white"
            ? "opacity-80 hover:opacity-100"
            : "text-gray-700 hover:text-black"
        }`
      }
    >
      <span className="text-[11px]">{icon}</span>
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
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[120] w-[85%] max-w-xs h-full bg-[#0b1120] text-white shadow-2xl flex flex-col overflow-hidden rounded-4xl justify-between"
          >
            {/* Liquid Background Accents */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
              <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-6 h-20 border-b border-white/5 bg-slate-900/40 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                />
                <div className="flex flex-col leading-none">
                  <span className="font-black text-[10px] uppercase tracking-tighter">TIME Cyber Media <br /> Pvt Ltd.</span>
                </div>
              </div>
              <button
                aria-label="Close Menu"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all"
                onClick={onClose}
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
                  {menuLinks("white", onClose, headerRef, isUser, true, editions)}
                </motion.div>
              </nav>

              {/* Bottom Section */}
              <div className="mt-12 space-y-6">
                {user && (
                  <div className="px-2 py-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-center">
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-1">Authenticated Session</p>
                    <p className="text-sm font-black text-white">{user.name}</p>
                  </div>
                )}

                <button
                  onClick={() => {
                    handleLoginClick();
                    onClose();
                  }}
                  className="w-full relative overflow-hidden group/btn rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black py-4 text-xs uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span className="relative z-10">{isAuthenticated ? "Sign Out" : "Secure Login"}</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                </button>

                <p className="text-[10px] text-center text-slate-500 font-medium">
                  &copy; 2026 TIME Cyber Media Pvt Ltd. <br /> All Rights Reserved.
                </p>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function NavDropdown({ icon, label, color, options, onClick }) {
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
          e.preventDefault();
          setOpen(!open);
          if (onClick) onClick();
        }}
        className={`flex items-center gap-1 transition-colors ${color === "white"
          ? (isActiveGroup ? "text-emerald-400 font-semibold" : "opacity-80 hover:opacity-100 text-white")
          : (isActiveGroup ? "text-emerald-600 font-semibold" : "text-gray-700 hover:text-black")
          }`}
      >
        <span className="text-[11px]">{icon}</span>
        <span>{label}</span>
      </NavLink>

      <div
        className={`md:absolute top-[100%] left-0 pt-2 z-50 transition-all duration-200 ${open ? "md:opacity-100 md:visible md:translate-y-0 flex" : "md:opacity-0 md:invisible hidden"
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
                className={`px-5 py-2.5 text-sm transition-colors ${isAct ? 'bg-emerald-600/20 font-bold border-l-4 border-emerald-400 text-white' : 'text-emerald-100 hover:bg-white/10 hover:text-white border-l-4 border-transparent'}`}
              >
                {opt.title} ({opt.year})
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
