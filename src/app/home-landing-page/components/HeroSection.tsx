'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, DollarSign, MapPin, ChevronDown, Star } from 'lucide-react';

const DESTINATIONS_AUTOCOMPLETE = [
  'Bali, Indonesia', 'Paris, France', 'Maldives', 'Dubai, UAE',
  'Santorini, Greece', 'Tokyo, Japan', 'New York, USA', 'Rajasthan, India',
  'Swiss Alps', 'Cape Town, South Africa', 'Phuket, Thailand', 'Rome, Italy',
];

const HERO_STATS = [
  { value: '12,000+', label: 'Happy Travelers' },
  { value: '95+', label: 'Destinations' },
  { value: '4.9', label: 'Avg. Rating', icon: <Star size={12} className="fill-accent-400 text-accent-400" /> },
  { value: '15 Yrs', label: 'Experience' },
];

export default function HeroSection() {
  const [destination, setDestination] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [travelDate, setTravelDate] = useState('');
  const [budget, setBudget] = useState('');

  const filtered = DESTINATIONS_AUTOCOMPLETE?.filter((d) =>
    d?.toLowerCase()?.includes(destination?.toLowerCase()) && destination?.length > 0
  );

  const handleSearch = () => {
    const section = document.querySelector('#packages');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85')`,
        }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient" />
      {/* Blue tint overlay */}
      <div className="absolute inset-0 bg-primary-900/20" />
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)]?.map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{ left: `${15 + i * 15}%`, top: `${20 + i * 10}%` }}
            animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 lg:px-10 pt-28 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <span className="glass px-4 py-2 rounded-full text-white/90 text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
            ✈️ Summer 2026 packages are live — limited spots available
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-center font-display font-extrabold text-white leading-tight mb-5"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
        >
          Explore the World with{' '}
          <span className="text-accent-400">TourVista</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body"
        >
          Handcrafted journeys to 95+ destinations. Expert-guided, fully personalized, unforgettable.
        </motion.p>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-2xl p-4 md:p-6 shadow-glass">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Destination */}
              <div className="relative">
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-1.5 ml-1">
                  Destination
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => { setDestination(e?.target?.value); setShowSuggestions(true); }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    placeholder="Where to? (e.g. Bali)"
                    className="w-full pl-9 pr-3 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all"
                  />
                  {showSuggestions && filtered?.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl z-50 overflow-hidden">
                      {filtered?.slice(0, 5)?.map((sug) => (
                        <button
                          key={`sug-${sug}`}
                          onMouseDown={() => { setDestination(sug); setShowSuggestions(false); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors flex items-center gap-2"
                        >
                          <MapPin size={13} className="text-gray-400" />
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Travel Date */}
              <div>
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-1.5 ml-1">
                  Travel Date
                </label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e?.target?.value)}
                    min="2026-04-17"
                    className="w-full pl-9 pr-3 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-1.5 ml-1">
                  Budget (per person)
                </label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e?.target?.value)}
                    className="w-full pl-9 pr-3 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all appearance-none [color-scheme:dark]"
                  >
                    <option value="" className="bg-gray-900">Any budget</option>
                    <option value="economy" className="bg-gray-900">Under $500</option>
                    <option value="mid" className="bg-gray-900">$500 – $1,500</option>
                    <option value="premium" className="bg-gray-900">$1,500 – $3,000</option>
                    <option value="luxury" className="bg-gray-900">$3,000+</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSearch}
                className="btn-primary flex-1 py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2"
              >
                <Search size={18} />
                Search Packages
              </button>
              <button
                onClick={() => document.querySelector('#trip-builder')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-accent sm:w-48 py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2"
              >
                ✈️ Plan Custom Trip
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-6 mt-10"
        >
          {HERO_STATS?.map((stat) => (
            <div key={`stat-${stat?.label}`} className="text-center">
              <div className="flex items-center justify-center gap-1 text-white font-display font-bold text-2xl">
                {stat?.icon}
                {stat?.value}
              </div>
              <div className="text-white/60 text-xs mt-0.5">{stat?.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer"
        onClick={() => document.querySelector('#destinations')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}