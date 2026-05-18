import { Mail, Phone, Globe, MapPin, Facebook, Instagram, Youtube, Linkedin, MessageCircle, Clock, ArrowRight } from "lucide-react";
import { PageHero, FadeUp, StaggerContainer, StaggerItem, SlideIn, AuroraBackground } from "../components/Motion.jsx";
import { motion } from "framer-motion";

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/primetimeresearch", label: "Facebook", color: "from-blue-600 to-blue-500" },
  { icon: Instagram, href: "https://www.instagram.com/primetimeresearchmedia/", label: "Instagram", color: "from-pink-600 to-purple-600" },
  { icon: Youtube, href: "https://www.youtube.com/@primetimermedia", label: "YouTube", color: "from-red-600 to-red-500" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/primetimeresearch-media/", label: "LinkedIn", color: "from-blue-700 to-blue-600" },
  { icon: MessageCircle, href: "https://wa.me/919810882769", label: "WhatsApp", color: "from-green-600 to-green-500" },
];

const phones = [
  { tel: "+911169268754", label: "Board Line 1", display: "+91 11 69268754", icon: "📞" },
  { tel: "+911135773024", label: "Board Line 2", display: "+91-11-35773024", icon: "📞" },
  { tel: "+919810910686", label: "Helpline", display: "+91 9810 91 0686", icon: "🆘" },
  { tel: "+919971002984", label: "Sponsorship", display: "+91 9971 00 2984", icon: "🤝" },
  { tel: "+919810882769", label: "Nominations", display: "+91 9810 88 2769", icon: "🏆" },
];

function ContactItem({ href, icon: Icon, label, value, target }) {
  return (
    <motion.a
      href={href}
      target={target}
      rel={target ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 p-4 glass-card border border-emerald-500/15 hover:border-emerald-400/40 transition-all duration-300 group"
      whileHover={{ x: 4 }}
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
        <Icon size={18} className="text-white" />
      </div>
      <div>
        <div className="text-[11px] text-emerald-300/60 font-semibold uppercase tracking-widest mb-0.5">{label}</div>
        <div className="text-sm md:text-base font-bold text-white group-hover:text-emerald-100 transition-colors">{value}</div>
      </div>
      <ArrowRight size={14} className="ml-auto text-emerald-400/40 group-hover:text-emerald-400 transition-colors" />
    </motion.a>
  );
}

export default function Contact() {
  return (
    <AuroraBackground>
      <PageHero
        badge="Get in Touch"
        icon="✉️"
        title="Contact Us"
        subtitle="We'd love to connect. Reach out for inquiries about nominations, partnerships, media coverage, or sponsorships."
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Left – Contact Details */}
            <SlideIn from="left">
              <div className="space-y-5">
                <h2 className="text-xl font-black text-gradient-emerald font-serif mb-6">Contact Information</h2>

                {/* Email */}
                <ContactItem
                  href="mailto:info@globalhealthcareawards.com"
                  icon={Mail}
                  label="Email"
                  value="info@globalhealthcareawards.com"
                />

                {/* Website */}
                <ContactItem
                  href="https://globalhealthcareawards.com"
                  icon={Globe}
                  label="Website"
                  value="www.globalhealthcareawards.com"
                  target="_blank"
                />

                {/* Location */}
                <ContactItem
                  href="https://maps.app.goo.gl/A9eWn25eF8uXr3pF9"
                  icon={MapPin}
                  label="Location"
                  value="Delhi, India"
                  target="_blank"
                />

                {/* Phones */}
                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-300/60 mb-3">Phone Numbers</h3>
                  {phones.map((phone, i) => (
                    <ContactItem
                      key={i}
                      href={`tel:${phone.tel}`}
                      icon={Phone}
                      label={phone.label}
                      value={phone.display}
                    />
                  ))}
                </div>
              </div>
            </SlideIn>

            {/* Right – Social + Office info */}
            <SlideIn from="right" delay={0.1}>
              <div className="space-y-6">
                {/* Social Media */}
                <div className="glass-card border border-emerald-500/15 p-6">
                  <h3 className="text-lg font-black text-gradient-emerald font-serif mb-2">Follow Us</h3>
                  <p className="text-emerald-100/60 text-sm mb-5">Stay updated with the latest news, announcements, and highlights.</p>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <motion.a
                          key={i}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}
                          whileHover={{ scale: 1.15, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Icon size={20} className="text-white" />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>

                {/* Office hours */}
                <div className="glass-card border border-emerald-500/15 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md">
                      <Clock size={16} className="text-white" />
                    </div>
                    <h3 className="font-black text-white">Office Hours</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-emerald-200/70">Working Days</span>
                      <span className="text-white font-semibold">Mon – Sat</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-200/70">Timing</span>
                      <span className="text-white font-semibold">10:00 AM – 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-200/70">Response Time</span>
                      <span className="text-emerald-300 font-semibold">Within 1 business day</span>
                    </div>
                  </div>
                </div>

                {/* Quick enquiry nudge */}
                <div className="glass-card border border-emerald-400/20 p-6 bg-emerald-900/10 animate-border-glow">
                  <p className="text-emerald-100/80 text-sm leading-relaxed mb-4">
                    For <strong className="text-white">nominations</strong>, <strong className="text-white">sponsorships</strong>, or <strong className="text-white">media partnerships</strong> — reach out directly via the contact details above or WhatsApp.
                  </p>
                  <a
                    href="https://wa.me/919810882769"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm w-full justify-center"
                  >
                    💬 Chat on WhatsApp
                  </a>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </PageHero>

      {/* Bottom gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
    </AuroraBackground>
  );
}
