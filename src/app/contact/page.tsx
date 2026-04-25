'use client';
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, User, MessageSquare, CheckCircle2 } from 'lucide-react';
import LandingNav from '@/app/home-landing-page/components/LandingNav';
import LandingFooter from '@/app/home-landing-page/components/LandingFooter';
import FloatingWhatsApp from '@/app/home-landing-page/components/FloatingWhatsApp';
import Icon from '@/components/ui/AppIcon';


interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const CONTACT_INFO = [
  { icon: MapPin, title: 'Visit Us', lines: ['42 Marine Drive, Mumbai 400001', 'Maharashtra, India'], color: 'text-primary-500', bg: 'bg-primary-50' },
  { icon: Phone, title: 'Call Us', lines: ['+91 98765 43210', '+91 22 4567 8900'], color: 'text-accent-500', bg: 'bg-accent-50' },
  { icon: Mail, title: 'Email Us', lines: ['hello@tourvista.in', 'support@tourvista.in'], color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Clock, title: 'Working Hours', lines: ['Mon–Sat: 9am – 8pm IST', 'WhatsApp: 24/7'], color: 'text-purple-600', bg: 'bg-purple-50' },
];

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const formInView = useInView(formRef, { once: true, margin: '-60px' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Hi TourVista! I'd like to get in touch.\n\nName: ${form.name || 'Not provided'}\nMessage: ${form.message || 'Please contact me.'}`);
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <LandingNav />

      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent-400 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-accent-500/20 text-accent-300 text-sm font-semibold rounded-full mb-4 border border-accent-500/30"
          >
            📬 Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-white text-4xl md:text-5xl mb-4 leading-tight"
          >
            We'd Love to Hear From You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/70 text-lg max-w-xl mx-auto"
          >
            Have a question, need a custom quote, or just want to say hello? Our team responds within 2 hours.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CONTACT_INFO.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-card text-center"
                >
                  <div className={`w-12 h-12 ${info.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon size={22} className={info.color} />
                  </div>
                  <h3 className="font-display font-semibold text-gray-900 text-sm mb-2">{info.title}</h3>
                  {info.lines.map((line) => (
                    <p key={line} className="text-gray-500 text-xs">{line}</p>
                  ))}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-16 bg-white" ref={formRef}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display font-bold text-gray-900 text-2xl mb-2">Send Us a Message</h2>
              <p className="text-gray-500 text-sm mb-6">Fill out the form below and we'll get back to you within 2 hours.</p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 bg-emerald-50 rounded-2xl"
                >
                  <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-4" />
                  <h3 className="font-display font-bold text-gray-900 text-xl mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm mb-4">We'll get back to you within 2 hours.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }} className="btn-primary px-6 py-3 rounded-xl font-semibold text-sm">
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Full Name *</label>
                      <div className="relative">
                        <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">Phone</label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765..." className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">Email *</label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">Subject *</label>
                    <select name="subject" value={form.subject} onChange={handleChange} required className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all bg-white appearance-none">
                      <option value="">Select a subject</option>
                      <option value="package-inquiry">Package Inquiry</option>
                      <option value="custom-trip">Custom Trip Request</option>
                      <option value="booking-support">Booking Support</option>
                      <option value="cancellation">Cancellation / Refund</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">Message *</label>
                    <div className="relative">
                      <MessageSquare size={15} className="absolute left-3 top-3 text-gray-400" />
                      <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Tell us how we can help..." className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all resize-none" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" disabled={loading} className="flex-1 btn-primary py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-70">
                      {loading ? (
                        <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</span>
                      ) : (
                        <><Send size={16} /> Send Message</>
                      )}
                    </button>
                    <button type="button" onClick={handleWhatsApp} className="px-4 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl font-semibold flex items-center gap-2 transition-all">
                      <MessageCircle size={18} />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Map / Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-6"
            >
              <div className="bg-gray-100 rounded-2xl overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.9!2d72.8258!3d18.9322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU1JzU2LjAiTiA3MsKwNDknMzIuOSJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TourVista Office Location"
                />
              </div>

              <div className="bg-primary-50 rounded-2xl p-6">
                <h3 className="font-display font-bold text-primary-900 text-lg mb-3">Prefer to Chat?</h3>
                <p className="text-primary-700 text-sm mb-4 leading-relaxed">
                  Our WhatsApp support is available 24/7. Get instant responses from our travel experts.
                </p>
                <a
                  href="https://wa.me/919876543210?text=Hi%20TourVista!%20I%20have%20a%20question."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all w-fit"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-display font-bold text-gray-900 text-base mb-3">Frequently Asked</h3>
                <div className="space-y-3">
                  {[
                    { q: 'How quickly do you respond?', a: 'Within 2 hours on business days, 4 hours on weekends.' },
                    { q: 'Can I customize a package?', a: 'Absolutely! Visit our Plan My Trip page for a fully custom itinerary.' },
                    { q: 'What payment methods do you accept?', a: 'Bank transfer, UPI, credit/debit cards, and EMI options.' },
                  ].map((faq) => (
                    <div key={faq.q} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                      <div className="font-medium text-gray-900 text-sm mb-1">{faq.q}</div>
                      <div className="text-gray-500 text-xs">{faq.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <LandingFooter />
      <FloatingWhatsApp />
    </main>
  );
}
