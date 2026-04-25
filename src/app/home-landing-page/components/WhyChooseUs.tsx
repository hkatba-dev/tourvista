'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Headphones, MapPin, Award, CreditCard, Users } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const REASONS = [
  {
    id: 'reason-01',
    icon: Shield,
    title: 'Safe & Verified Packages',
    description: 'Every itinerary is vetted by our travel experts with on-ground local partners.',
    color: 'text-primary-500',
    bg: 'bg-primary-50',
  },
  {
    id: 'reason-02',
    icon: Headphones,
    title: '24/7 Travel Support',
    description: 'Our team is reachable via WhatsApp, call, or email — anytime, anywhere.',
    color: 'text-accent-500',
    bg: 'bg-accent-50',
  },
  {
    id: 'reason-03',
    icon: MapPin,
    title: 'Handcrafted Itineraries',
    description: 'No cookie-cutter tours. Every trip is tailored to your interests and pace.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    id: 'reason-04',
    icon: Award,
    title: '15+ Years of Excellence',
    description: 'Trusted by 12,000+ travelers globally with a 4.9-star average rating.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    id: 'reason-05',
    icon: CreditCard,
    title: 'Transparent Pricing',
    description: 'No hidden costs. What you see is exactly what you pay — guaranteed.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    id: 'reason-06',
    icon: Users,
    title: 'Small Group Sizes',
    description: 'Intimate groups of 4–16 mean personalized attention and authentic experiences.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="why-us" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 text-sm font-semibold rounded-full mb-5">
              🏆 Why TourVista
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-6 leading-tight">
              We Don't Just Plan Trips —{' '}
              <span className="text-gradient">We Create Memories</span>
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              With 15 years of crafting immersive travel experiences, TourVista combines
              deep local knowledge, premium logistics, and genuine care for every traveler.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '12K+', label: 'Happy Travelers' },
                { value: '95+', label: 'Destinations' },
                { value: '4.9★', label: 'Avg Rating' },
              ]?.map((s) => (
                <div key={`why-stat-${s?.label}`} className="bg-gray-50 rounded-2xl p-4 text-center">
                  <div className="font-display font-bold text-2xl text-primary-600 tabular-nums">{s?.value}</div>
                  <div className="text-gray-500 text-xs mt-1">{s?.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REASONS?.map((reason, i) => {
              const Icon = reason?.icon;
              return (
                <motion.div
                  key={reason?.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white border border-gray-100 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-default"
                >
                  <div className={`w-11 h-11 ${reason?.bg} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon size={22} className={reason?.color} />
                  </div>
                  <h3 className="font-display font-semibold text-gray-900 text-sm mb-1.5">
                    {reason?.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {reason?.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}