'use client';
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  User, Phone, MapPin, DollarSign, Clock, MessageSquare,
  MessageCircle, CheckCircle2, Loader2, Calendar, Users
} from 'lucide-react';
import LandingNav from '@/app/home-landing-page/components/LandingNav';
import LandingFooter from '@/app/home-landing-page/components/LandingFooter';
import FloatingWhatsApp from '@/app/home-landing-page/components/FloatingWhatsApp';

const DESTINATIONS_LIST = [
  'Bali, Indonesia', 'Santorini, Greece', 'Maldives', 'Dubai, UAE',
  'Tokyo, Japan', 'Swiss Alps', 'Rajasthan, India', 'Phuket, Thailand',
  'Paris, France', 'Cape Town, South Africa', 'New York, USA', 'Rome, Italy', 'Other',
];

const TRIP_TYPES = [
  { id: 'honeymoon', label: '💑 Honeymoon', emoji: '💑' },
  { id: 'family', label: '👨‍👩‍👧‍👦 Family', emoji: '👨‍👩‍👧‍👦' },
  { id: 'adventure', label: '🏔️ Adventure', emoji: '🏔️' },
  { id: 'cultural', label: '🏛️ Cultural', emoji: '🏛️' },
  { id: 'beach', label: '🏖️ Beach', emoji: '🏖️' },
  { id: 'luxury', label: '💎 Luxury', emoji: '💎' },
  { id: 'solo', label: '🧳 Solo', emoji: '🧳' },
  { id: 'group', label: '👥 Group', emoji: '👥' },
];

interface PlanForm {
  name: string;
  phone: string;
  email: string;
  destination: string;
  tripType: string;
  travelDate: string;
  duration: string;
  groupSize: string;
  budget: string;
  message: string;
}

export default function PlanPage() {
  const [form, setForm] = useState<PlanForm>({
    name: '', phone: '', email: '', destination: '', tripType: '',
    travelDate: '', duration: '', groupSize: '', budget: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const formInView = useInView(formRef, { once: true, margin: '-60px' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTripType = (id: string) => {
    setForm((prev) => ({ ...prev, tripType: id }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);

    const msg = encodeURIComponent(
      `Hi TourVista! 🌍 I'd like to plan a custom trip.\n\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n📍 Destination: ${form.destination}\n🎯 Trip Type: ${form.tripType}\n📅 Travel Date: ${form.travelDate}\n⏱ Duration: ${form.duration} days\n👥 Group Size: ${form.groupSize}\n💰 Budget: ${form.budget}\n\n💬 ${form.message || 'Please contact me with a custom itinerary!'}`
    );
    setTimeout(() => window.open(`https://wa.me/919876543210?text=${msg}`, '_blank'), 800);
  };

  const handleWhatsAppDirect = () => {
    const msg = encodeURIComponent(
      `Hi TourVista! I'd like to plan a custom trip${form.destination ? ` to ${form.destination}` : ''}. Please get in touch!`
    );
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <LandingNav />

      {/* Hero */}
      <section
        className="relative pt-28 pb-20 overflow-hidden"
        ref={heroRef}
        style={{ background: 'linear-gradient(135deg, #0057B8 0%, #003D84 60%, #001F4A 100%)' }}
      >
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=75')` }} />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-accent-500/10 rounded-full" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-1.5 bg-accent-500/20 text-accent-300 text-sm font-semibold rounded-full mb-5 border border-accent-500/30">
                🛠️ Custom Trip Builder
              </span>
              <h1 className="font-display font-extrabold text-white text-4xl md:text-5xl mb-5 leading-tight">
                Can't Find Your Perfect Package?{' '}
                <span className="text-accent-400">We'll Build It.</span>
              </h1>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Tell us your dream destination, budget, and dates — our travel experts will craft a fully personalized itinerary just for you within 2 hours.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: '⚡', text: 'Response within 2 hours' },
                  { icon: '🎯', text: 'Fully personalized itinerary' },
                  { icon: '💬', text: 'Direct WhatsApp support throughout' },
                  { icon: '🔒', text: 'No commitment required to inquire' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-white/80">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-base">{item.text}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={handleWhatsAppDirect}
                className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3.5 rounded-xl font-semibold transition-all hover:shadow-lg active:scale-95"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp Now
              </button>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-glass">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 size={40} className="text-emerald-500" />
                    </div>
                    <h3 className="font-display font-bold text-gray-900 text-2xl mb-3">Trip Request Sent!</h3>
                    <p className="text-gray-500 text-base mb-6">Our travel expert will call/WhatsApp you within 2 hours with your custom itinerary.</p>
                    <p className="text-sm text-gray-400 mb-6">Also check WhatsApp — we've opened a pre-filled message for you.</p>
                    <button onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', destination: '', tripType: '', travelDate: '', duration: '', groupSize: '', budget: '', message: '' }); }} className="btn-primary px-6 py-3 rounded-xl font-semibold">
                      Plan Another Trip
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="font-display font-bold text-gray-900 text-xl mb-5">Tell Us About Your Dream Trip</h3>
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                      {/* Name + Phone */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-700 text-xs font-medium mb-1.5">Full Name *</label>
                          <div className="relative">
                            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-700 text-xs font-medium mb-1.5">Phone *</label>
                          <div className="relative">
                            <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 98765..." className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all" />
                          </div>
                        </div>
                      </div>

                      {/* Destination */}
                      <div>
                        <label className="block text-gray-700 text-xs font-medium mb-1.5">Destination *</label>
                        <div className="relative">
                          <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <select name="destination" value={form.destination} onChange={handleChange} required className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all appearance-none bg-white">
                            <option value="">Select destination</option>
                            {DESTINATIONS_LIST.map((d) => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* Trip Type */}
                      <div>
                        <label className="block text-gray-700 text-xs font-medium mb-2">Trip Type</label>
                        <div className="flex flex-wrap gap-2">
                          {TRIP_TYPES.map((type) => (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => handleTripType(type.id)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${form.tripType === type.id ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'}`}
                            >
                              {type.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Date + Duration + Group */}
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-gray-700 text-xs font-medium mb-1.5">Travel Date</label>
                          <div className="relative">
                            <Calendar size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="date" name="travelDate" value={form.travelDate} onChange={handleChange} min="2026-04-17" className="w-full pl-8 pr-2 py-2.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-700 text-xs font-medium mb-1.5">Days *</label>
                          <div className="relative">
                            <Clock size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="number" name="duration" value={form.duration} onChange={handleChange} required min={3} max={30} placeholder="7" className="w-full pl-8 pr-2 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-700 text-xs font-medium mb-1.5">People</label>
                          <div className="relative">
                            <Users size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="number" name="groupSize" value={form.groupSize} onChange={handleChange} min={1} max={50} placeholder="2" className="w-full pl-8 pr-2 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all" />
                          </div>
                        </div>
                      </div>

                      {/* Budget */}
                      <div>
                        <label className="block text-gray-700 text-xs font-medium mb-1.5">Budget (per person) *</label>
                        <div className="relative">
                          <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <select name="budget" value={form.budget} onChange={handleChange} required className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all appearance-none bg-white">
                            <option value="">Select budget range</option>
                            <option value="Under $500">Under $500</option>
                            <option value="$500–$1,500">$500 – $1,500</option>
                            <option value="$1,500–$3,000">$1,500 – $3,000</option>
                            <option value="$3,000+">$3,000+</option>
                            <option value="Flexible">Flexible</option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-gray-700 text-xs font-medium mb-1.5">Special Requests <span className="text-gray-400 font-normal">(optional)</span></label>
                        <div className="relative">
                          <MessageSquare size={14} className="absolute left-3 top-3 text-gray-400" />
                          <textarea name="message" value={form.message} onChange={handleChange} rows={2} placeholder="Honeymoon, dietary preferences, accessibility needs..." className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all resize-none" />
                        </div>
                      </div>

                      <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 disabled:opacity-70">
                        {loading ? (
                          <><Loader2 size={18} className="animate-spin" /> Building Your Trip...</>
                        ) : (
                          <>✈️ Get My Custom Itinerary</>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white" ref={formRef}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-gray-900 text-3xl mb-4">How Custom Trip Planning Works</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">From your first message to your dream vacation in 4 simple steps.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Share Your Dream', desc: 'Fill out the form with your destination, dates, budget, and preferences.', icon: '📝', color: 'bg-primary-50 text-primary-600' },
              { step: '02', title: 'Expert Review', desc: 'Our travel expert reviews your request and crafts a personalized itinerary.', icon: '🔍', color: 'bg-accent-50 text-accent-600' },
              { step: '03', title: 'Itinerary Delivery', desc: 'Receive your custom itinerary via WhatsApp within 2 hours — completely free.', icon: '📋', color: 'bg-emerald-50 text-emerald-600' },
              { step: '04', title: 'Book & Travel', desc: 'Confirm your booking, make payment, and get ready for your dream trip!', icon: '✈️', color: 'bg-purple-50 text-purple-600' },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4`}>
                  {step.icon}
                </div>
                <div className="font-display font-extrabold text-gray-200 text-4xl mb-2">{step.step}</div>
                <h3 className="font-display font-bold text-gray-900 text-base mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
      <FloatingWhatsApp />
    </main>
  );
}
