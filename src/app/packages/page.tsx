'use client';
import React, { useState, useRef, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Clock, Star, Users, ChevronRight, Heart, Tag, SlidersHorizontal, X, Search } from 'lucide-react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import LandingNav from '@/app/home-landing-page/components/LandingNav';
import LandingFooter from '@/app/home-landing-page/components/LandingFooter';
import FloatingWhatsApp from '@/app/home-landing-page/components/FloatingWhatsApp';
import { PACKAGES, CATEGORIES, DESTINATIONS_LIST } from '@/data/packages';

const PRICE_RANGES = [
  { id: 'all', label: 'Any Price' },
  { id: 'budget', label: 'Under $1,000', min: 0, max: 999 },
  { id: 'mid', label: '$1,000 – $2,000', min: 1000, max: 2000 },
  { id: 'premium', label: '$2,000+', min: 2000, max: Infinity },
];

export default function PackagesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDestination, setActiveDestination] = useState('All Destinations');
  const [activePriceRange, setActivePriceRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [saved, setSaved] = useState<Set<string>>(new Set(['pkg-003']));
  const [showFilters, setShowFilters] = useState(false);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });

  const filtered = useMemo(() => {
    return PACKAGES.filter((pkg) => {
      const catMatch = activeCategory === 'all' || pkg.category === activeCategory;
      const destMatch = activeDestination === 'All Destinations' || pkg.destination === activeDestination;
      const priceRange = PRICE_RANGES.find((r) => r.id === activePriceRange);
      const priceMatch = !priceRange || activePriceRange === 'all' || (pkg.price >= (priceRange.min ?? 0) && pkg.price <= (priceRange.max ?? Infinity));
      const searchMatch = !searchQuery || pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || pkg.destination.toLowerCase().includes(searchQuery.toLowerCase());
      return catMatch && destMatch && priceMatch && searchMatch;
    });
  }, [activeCategory, activeDestination, activePriceRange, searchQuery]);

  const toggleSave = (id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const clearFilters = () => {
    setActiveCategory('all');
    setActiveDestination('All Destinations');
    setActivePriceRange('all');
    setSearchQuery('');
  };

  const hasActiveFilters = activeCategory !== 'all' || activeDestination !== 'All Destinations' || activePriceRange !== 'all' || searchQuery !== '';

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <LandingNav />

      {/* Page Hero */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent-400 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 text-center" ref={headerRef}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-accent-500/20 text-accent-300 text-sm font-semibold rounded-full mb-4 border border-accent-500/30"
          >
            ✈️ {PACKAGES.length} Curated Packages
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-white text-4xl md:text-5xl mb-4 leading-tight"
          >
            Find Your Perfect Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/70 text-lg max-w-xl mx-auto"
          >
            All-inclusive packages with expert guides, luxury stays, and zero hassle.
          </motion.p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-4">
          {/* Search + Filter Toggle */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search packages or destinations..."
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${showFilters ? 'bg-primary-500 text-white border-primary-500' : 'border-gray-200 text-gray-600 hover:border-primary-300'}`}
            >
              <SlidersHorizontal size={15} />
              Filters
              {hasActiveFilters && <span className="w-2 h-2 bg-accent-500 rounded-full" />}
            </button>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors">
                <X size={14} /> Clear all
              </button>
            )}
            <span className="ml-auto text-sm text-gray-500 hidden md:block">
              <span className="font-semibold text-gray-900">{filtered.length}</span> packages found
            </span>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={`cat-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-primary-500 text-white shadow-primary scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Extended Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Destination</label>
                    <div className="flex flex-wrap gap-2">
                      {DESTINATIONS_LIST.map((dest) => (
                        <button
                          key={`dest-${dest}`}
                          onClick={() => setActiveDestination(dest)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            activeDestination === dest
                              ? 'bg-primary-500 text-white' :'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                          }`}
                        >
                          {dest}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Price Range</label>
                    <div className="flex flex-wrap gap-2">
                      {PRICE_RANGES.map((range) => (
                        <button
                          key={`price-${range.id}`}
                          onClick={() => setActivePriceRange(range.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            activePriceRange === range.id
                              ? 'bg-accent-500 text-white' :'bg-gray-100 text-gray-600 hover:bg-accent-50 hover:text-accent-600'
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-12 bg-gray-50" ref={gridRef}>
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-display font-bold text-gray-900 text-xl mb-2">No packages found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search query.</p>
                <button onClick={clearFilters} className="btn-primary px-6 py-3 rounded-xl font-semibold">
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`${activeCategory}-${activeDestination}-${activePriceRange}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filtered.map((pkg, i) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={gridInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <AppImage
                        src={pkg.image}
                        alt={pkg.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <span className={`absolute top-3 left-3 ${pkg.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                        {pkg.badge}
                      </span>
                      <button
                        onClick={() => toggleSave(pkg.id)}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all ${saved.has(pkg.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
                        aria-label={saved.has(pkg.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <Heart size={14} className={saved.has(pkg.id) ? 'fill-current' : ''} />
                      </button>
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">
                          <Clock size={11} />
                          {pkg.duration}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-display font-bold text-gray-900 text-base leading-snug mb-1.5">{pkg.title}</h3>
                      <p className="text-gray-500 text-xs mb-2.5 flex items-center gap-1">
                        <Tag size={11} />
                        {pkg.destination}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {pkg.highlights.slice(0, 2).map((h) => (
                          <span key={`hl-${pkg.id}-${h}`} className="bg-primary-50 text-primary-700 text-xs px-2 py-0.5 rounded-md">
                            {h}
                          </span>
                        ))}
                        {pkg.highlights.length > 2 && (
                          <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-md">
                            +{pkg.highlights.length - 2} more
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Star size={12} className="fill-amber-400 text-amber-400" />
                          <span className="font-semibold text-gray-700">{pkg.rating}</span>
                          ({pkg.reviews})
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={12} />
                          Max {pkg.maxGroup}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display font-bold text-gray-900 text-lg tabular-nums">
                              ${pkg.price.toLocaleString()}
                            </span>
                            <span className="text-gray-400 text-sm line-through tabular-nums">
                              ${pkg.originalPrice.toLocaleString()}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">per person</span>
                        </div>
                        <Link
                          href={`/packages/${pkg.slug}`}
                          className="btn-accent px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5"
                        >
                          View Details <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <LandingFooter />
      <FloatingWhatsApp />
    </main>
  );
}
