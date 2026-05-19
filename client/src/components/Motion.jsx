import { useEffect, useRef, useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/* useReveal                                                            */
/* ------------------------------------------------------------------ */
export function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ------------------------------------------------------------------ */
/* Base animation components                                            */
/* ------------------------------------------------------------------ */
export const FadeUp = memo(function FadeUp({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
});

export const FadeIn = memo(function FadeIn({ children, delay = 0, className = "" }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay }}
    >
      {children}
    </motion.div>
  );
});

export const ScaleIn = memo(function ScaleIn({ children, delay = 0, className = "" }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {children}
    </motion.div>
  );
});

export const SlideIn = memo(function SlideIn({ children, from = "left", delay = 0, className = "" }) {
  const x = from === "left" ? -48 : 48;
  return (
    <motion.div className={className}
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
});

/* ------------------------------------------------------------------ */
/* Stagger                                                              */
/* ------------------------------------------------------------------ */
export const StaggerContainer = memo(function StaggerContainer({ children, className = "", staggerDelay = 0.1 }) {
  return (
    <motion.div className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: staggerDelay } } }}
    >
      {children}
    </motion.div>
  );
});

export const StaggerItem = memo(function StaggerItem({ children, className = "text-left" }) {
  return (
    <motion.div className={className}
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.96 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
});

/* ------------------------------------------------------------------ */
/* AuroraBackground — shared ambient behind every page                 */
/* ------------------------------------------------------------------ */
export const AuroraBackground = memo(function AuroraBackground({ children, orbs = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!orbs || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Orb definitions
    const orbColors = [
      'rgba(16, 185, 129, 0.15)', // emerald
      'rgba(6, 182, 212, 0.12)',  // cyan
      'rgba(168, 85, 247, 0.12)', // purple
      'rgba(212, 175, 55, 0.15)', // gold
      'rgba(236, 72, 153, 0.12)', // pink
      'rgba(59, 130, 246, 0.12)'  // blue
    ];

    // Particle definitions
    let particles = Array.from({ length: 15 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5 - 0.2, // slight upward drift
      color: ['#34d399', '#06b6d4', '#a855f7', '#ffd700', '#ec4899'][Math.floor(Math.random() * 5)]
    }));
    
    const render = () => {
      time += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const w = canvas.width;
      const h = canvas.height;
      const minDimension = Math.min(w, h);
      
      // Draw Orbs
      const drawOrb = (cx, cy, r, color) => {
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      };

      drawOrb(w * 0.2 + Math.sin(time) * 150, h * 0.3 + Math.cos(time * 0.8) * 150, minDimension * 0.6, orbColors[0]);
      drawOrb(w * 0.8 + Math.cos(time * 1.2) * 150, h * 0.2 + Math.sin(time * 0.9) * 150, minDimension * 0.5, orbColors[1]);
      drawOrb(w * 0.3 + Math.sin(time * 0.7) * 150, h * 0.8 + Math.cos(time * 1.1) * 150, minDimension * 0.55, orbColors[2]);
      drawOrb(w * 0.7 + Math.cos(time * 0.9) * 150, h * 0.7 + Math.sin(time * 1.3) * 150, minDimension * 0.5, orbColors[3]);
      drawOrb(w * 0.5 + Math.sin(time * 1.1) * 200, h * 0.9 + Math.cos(time * 0.7) * 100, minDimension * 0.6, orbColors[4]);
      drawOrb(w * 0.9 + Math.cos(time * 0.8) * 150, h * 0.9 + Math.sin(time * 1.2) * 150, minDimension * 0.45, orbColors[5]);

      // Draw Particles
      ctx.globalAlpha = 0.35; // Reduce intensity of floating particles
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0; // Reset shadow/alpha
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [orbs]);

  return (
    <div className="relative min-h-screen bg-[var(--base-bg)] overflow-x-hidden">
      {/* Native Canvas Aurora - replaces heavy DOM/CSS blur */}
      {orbs && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          {/* Grid overlay */}
          <div className="bg-cross-pattern absolute inset-0 opacity-100" />
        </div>
      )}
      {/* Ensure children content stays above the canvas layer */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </div>
  );
});

export const AmbientBackground = memo(function AmbientBackground({ children, className = "" }) {
  return (
    <div className={`min-h-screen ${className || "bg-[var(--base-bg)]"} text-white overflow-x-hidden relative`}>
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(5, 150, 105, 0.1) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(20, 184, 166, 0.05) 0%, transparent 70%)' }} />
        <div className="bg-grid-pattern absolute inset-0 opacity-20" />
      </div>
      {children}
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* PageHero — UNIFORM vibrant background  for every page                    */
/* ------------------------------------------------------------------ */
/**
 * ⚡ PERFORMANCE OPTIMIZATION BEST PRACTICES:
 * 1. Wrapped in React.memo() to stop re-renders of complex background vectors when unrelated states trigger updates.
 * 2. Replaced over 50 individual JS-driven framer-motion tickers (orbs, jewels, sparkles, light streaks, shifting mesh)
 *    with browser-native, compositor-level CSS animations.
 * 3. Random parameters (durations, delays, X/Y translation offsets) are computed in JS and piped directly to CSS Keyframes
 *    using custom '--var' properties, yielding ultra-high performance and fluid visual aesthetics.
 */
export const PageHero = memo(function PageHero({ title, subtitle, icon, badge, colorScheme = "emerald", compact = false, className = "", children }) {
  const schemes = {
    emerald: {
      badge: "rgba(16,185,129,0.15)",
      badgeBorder: "rgba(52,211,153,0.4)",
      badgeText: "#34d399",
      glow1: "rgba(16,185,129,0.3)",
      glow2: "rgba(6,182,212,0.2)",
      glow3: "rgba(99,102,241,0.15)",
    },
    gold: {
      badge: "rgba(212,175,55,0.15)",
      badgeBorder: "rgba(255,215,0,0.4)",
      badgeText: "#ffd700",
      glow1: "rgba(212,175,55,0.3)",
      glow2: "rgba(249,115,22,0.2)",
      glow3: "rgba(236,72,153,0.15)",
    },
    purple: {
      badge: "rgba(168,85,247,0.15)",
      badgeBorder: "rgba(196,132,252,0.4)",
      badgeText: "#c084fc",
      glow1: "rgba(168,85,247,0.3)",
      glow2: "rgba(99,102,241,0.2)",
      glow3: "rgba(6,182,212,0.15)",
    },
    cyan: {
      badge: "rgba(6,182,212,0.15)",
      badgeBorder: "rgba(34,211,238,0.4)",
      badgeText: "#22d3ee",
      glow1: "rgba(6,182,212,0.3)",
      glow2: "rgba(59,130,246,0.2)",
      glow3: "rgba(16,185,129,0.15)",
    },
  };

  const sc = schemes[colorScheme] || schemes.emerald;

  return (
    <div className={`page-hero bg-cross-pattern ${compact ? '!pt-15' : ''} ${children ? '!pb-0' : ''} ${className}`}>
      {/* Content */}
      <motion.div
        className={`relative z-10 max-w-4xl mx-auto px-4 ${compact ? 'scale-90' : ''}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {badge && (
          <motion.span
            className="page-hero-badge"
            style={{ background: sc.badge, borderColor: sc.badgeBorder, color: sc.badgeText }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {icon && <span className="text-base">{icon}</span>}
            {badge}
          </motion.span>
        )}

        {title && <h1 className={`page-hero-title ${compact ? '!text-4xl' : 'pb-1'}`}>{title}</h1>}
        {title && !compact && <div className="page-hero-divider" />}
        {subtitle && <p className={`page-hero-subtitle ${compact ? 'text-sm mt-2' : ''}`}>{subtitle}</p>}
      </motion.div>

      {/* Render children outside the centered motion div but inside the hero background */}
      {children && (
        <div className={`relative z-10 ${compact ? 'mt-0 pb-0' : 'mt-5 pb-8'}`}>
          {children}
        </div>
      )}
    </div>
  );
});

export const NeonCard = memo(function NeonCard({ children, className = "", color = "emerald", hover = true }) {
  const colors = {
    emerald: "rgba(16,185,129,0.5)",
    cyan: "rgba(6,182,212,0.5)",
    purple: "rgba(168,85,247,0.5)",
    gold: "rgba(212,175,55,0.6)",
    pink: "rgba(236,72,153,0.5)",
    blue: "rgba(59,130,246,0.5)",
  };

  return (
    <div className="neon-card-wrapper w-full h-full">
      {/* Fog Mist — outside the card, radiates outward on hover */}
      {hover && <div className="fog-mist" />}

      <div
        className={`
          glass-card group relative w-full h-full
          border-white/10 hover:border-${color === 'gold' ? 'gold' : color + '-500'}/40
          ${hover ? "glass-card-hover-active" : ""}
          ${className}
        `}
      >
        {/* Intense Multi-layered Background Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]">
          <div className={`absolute -inset-[100%] opacity-0 group-hover:opacity-30 bg-[radial-gradient(circle_at_50%_50%,${colors[color]}_0%,transparent_70%)] transition-opacity duration-500`} />
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-transparent via-${color === 'gold' ? '[#d4af37]' : color}-500/20 to-transparent`} />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 h-full overflow-visible">
          {children}
        </div>

        {/* Secondary Sparkling Glint */}
        <div className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-60 overflow-hidden">
          <div className="absolute top-0 left-0 w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15)_0%,transparent_10%)] animate-pulse" style={{ animationDuration: '4s' }} />
        </div>

        {/* Outer Glow Aura */}
        <div className={`absolute -inset-2 opacity-0 group-hover:opacity-10 transition-opacity duration-700 -z-10 bg-${color === 'gold' ? '[#d4af37]' : color}-500/20 rounded-[inherit]`} />
      </div>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* RainbowCard — animated gradient border card                         */
/* ------------------------------------------------------------------ */
export const RainbowCard = memo(function RainbowCard({ children, className = "" }) {
  return (
    <div className={`card-rainbow ${className}`}>
      <div className="card-rainbow-inner p-6 h-full">{children}</div>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* SectionHeading — uniform colored section titles                     */
/* ------------------------------------------------------------------ */
export const SectionHeading = memo(function SectionHeading({ badge, title, subtitle, center = true, gradient = "text-gradient-emerald" }) {
  const align = center ? "text-center items-center" : "text-left items-start";
  return (
    <FadeUp className={`flex flex-col ${align} mb-14`}>
      {badge && (
        <span className="section-label mb-4">{badge}</span>
      )}
      <h2 className={`text-headline ${gradient}`}>{title}</h2>
      <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 rounded-full mt-5 animate-gradient-x" style={{ backgroundSize: "200% 100%" }} />
      {subtitle && (
        <p className="mt-5 text-emerald-100/70 text-lg font-medium max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </FadeUp>
  );
});

/* ------------------------------------------------------------------ */
/* StatCard — animated stat display                                     */
/* ------------------------------------------------------------------ */
export const StatCard = memo(function StatCard({ value, label, icon, gradient = "text-gradient-gold" }) {
  return (
    <ScaleIn>
      <div className="stat-card group cursor-default">
        {icon && <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{icon}</div>}
        <div className={`stat-value ${gradient}`}>{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </ScaleIn>
  );
});

/* ------------------------------------------------------------------ */
/* FloatingBadge — animated colorful badge                             */
/* ------------------------------------------------------------------ */
export const FloatingBadge = memo(function FloatingBadge({ children, color = "#34d399", bg = "rgba(16,185,129,0.12)" }) {
  return (
    <motion.span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
      style={{ background: bg, border: `1px solid ${color}44`, color }}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
});

/* ------------------------------------------------------------------ */
/* GlassCard   */
/* ------------------------------------------------------------------ */
export const GlassCard = memo(function GlassCard({ children, className = "", hover = true, style = {} }) {
  return (
    <NeonCard className={className} hover={hover} style={style}>
      {children}
    </NeonCard>
  );
});

/* ------------------------------------------------------------------ */
/* NumberStat (backwards compat)                                        */
/* ------------------------------------------------------------------ */
export const NumberStat = memo(function NumberStat({ value, label, icon }) {
  return <StatCard value={value} label={label} icon={icon} />;
});

