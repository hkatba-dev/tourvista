'use client';
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle2, MessageCircle, User, Phone, MapPin, DollarSign, Clock, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface TripFormData {
  name: string;
  phone: string;
  destination: string;
  budget: string;
  duration: string;
  message: string;
}

const DESTINATIONS_LIST = [
  'Bali, Indonesia', 'Santorini, Greece', 'Maldives', 'Dubai, UAE',
  'Tokyo, Japan', 'Swiss Alps', 'Rajasthan, India', 'Phuket, Thailand',
  'Paris, France', 'Cape Town, South Africa', 'New York, USA', 'Rome, Italy', 'Other',
];

export default function TripBuilderSection() {
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<TripFormData>();

  const onSubmit = async (data: TripFormData) => {
    // Backend integration point: POST /api/leads with form data + save to database
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitted(true);
    toast.success('Trip request sent! We\'ll reach out within 2 hours.');

    // WhatsApp pre-fill
    const msg = encodeURIComponent(
      `Hi TourVista! 🌍\n\nName: ${data.name}\nPhone: ${data.phone}\nDestination: ${data.destination}\nBudget: ${data.budget}\nDuration: ${data.duration} days\n\nMessage: ${data.message || 'Interested in a custom trip!'}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
    }, 800);
  };

  const handleWhatsAppDirect = () => {
    const data = getValues();
    const msg = encodeURIComponent(
      `Hi TourVista! I'd like to plan a custom trip${data.destination ? ` to ${data.destination}` : ''}. Please get in touch!`
    );
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <section id="trip-builder" className="py-20 md:py-28 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=75')` }}
      />
      <div className="absolute inset-0 bg-primary-900/85" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 bg-accent-500/20 text-accent-300 text-sm font-semibold rounded-full mb-5 border border-accent-500/30">
              🛠️ Custom Trip Builder
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-5 leading-tight">
              Can't Find Your Perfect Package?{' '}
              <span className="text-accent-400">We'll Build It.</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Tell us your dream destination, budget, and dates — our travel experts will craft a
              fully personalized itinerary just for you within 2 hours.
            </p>

            <div className="space-y-4">
              {[
                { icon: '⚡', text: 'Response within 2 hours' },
                { icon: '🎯', text: 'Fully personalized itinerary' },
                { icon: '💬', text: 'Direct WhatsApp support throughout' },
                { icon: '🔒', text: 'No commitment required to inquire' },
              ].map((item) => (
                <div key={`feature-${item.text}`} className="flex items-center gap-3 text-white/80">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-base">{item.text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleWhatsAppDirect}
              className="mt-8 flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3.5 rounded-xl font-semibold transition-all hover:shadow-lg active:scale-95"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp Now
            </button>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
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
                  <p className="text-gray-500 text-base mb-6">
                    Our travel expert will call/WhatsApp you within 2 hours with your custom itinerary.
                  </p>
                  <p className="text-sm text-gray-400 mb-6">Also check WhatsApp — we've opened a pre-filled message for you.</p>
                  <button
                    onClick={() => { setSubmitted(false); reset(); }}
                    className="btn-primary px-6 py-3 rounded-xl font-semibold"
                  >
                    Plan Another Trip
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-display font-bold text-gray-900 text-xl mb-6">Tell Us About Your Dream Trip</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    {/* Name + Phone */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'At least 2 characters' } })}
                            placeholder="Your name"
                            className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary-400'}`}
                          />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1.5">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            {...register('phone', { required: 'Phone is required', pattern: { value: /^[+\d\s-]{8,15}$/, message: 'Invalid phone number' } })}
                            placeholder="+91 98765..."
                            className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary-400'}`}
                          />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                    </div>

                    {/* Destination */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">
                        Destination <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                          {...register('destination', { required: 'Please select a destination' })}
                          className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all appearance-none bg-white ${errors.destination ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary-400'}`}
                        >
                          <option value="">Select destination</option>
                          {DESTINATIONS_LIST.map((d) => (
                            <option key={`dest-opt-${d}`} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                      {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination.message}</p>}
                    </div>

                    {/* Budget + Duration */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1.5">
                          Budget (per person) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <DollarSign size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <select
                            {...register('budget', { required: 'Select a budget range' })}
                            className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all appearance-none bg-white ${errors.budget ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary-400'}`}
                          >
                            <option value="">Budget range</option>
                            <option value="Under $500">Under $500</option>
                            <option value="$500–$1,500">$500 – $1,500</option>
                            <option value="$1,500–$3,000">$1,500 – $3,000</option>
                            <option value="$3,000+">$3,000+</option>
                            <option value="Flexible">Flexible</option>
                          </select>
                        </div>
                        {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>}
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1.5">
                          Duration (days) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Clock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="number"
                            min={3}
                            max={30}
                            {...register('duration', { required: 'Duration required', min: { value: 3, message: 'Min 3 days' }, max: { value: 30, message: 'Max 30 days' } })}
                            placeholder="e.g. 7"
                            className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all ${errors.duration ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary-400'}`}
                          />
                        </div>
                        {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1.5">
                        Special Requests / Message
                        <span className="text-gray-400 text-xs font-normal ml-1">(optional)</span>
                      </label>
                      <div className="relative">
                        <MessageSquare size={15} className="absolute left-3 top-3 text-gray-400" />
                        <textarea
                          {...register('message')}
                          rows={3}
                          placeholder="Honeymoon trip, adventure activities, dietary preferences, group size..."
                          className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{ minHeight: '52px' }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending your request...
                        </>
                      ) : (
                        <>
                          <MessageCircle size={18} />
                          Send Trip Request via WhatsApp
                        </>
                      )}
                    </button>

                    <p className="text-center text-gray-400 text-xs">
                      By submitting, you agree to be contacted via WhatsApp & phone. No spam, ever.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}