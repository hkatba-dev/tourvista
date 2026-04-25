'use client';
import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Clock, Star, Users, ChevronRight, Heart, Share2, Tag } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import { PACKAGES, CATEGORIES } from '@/data/packages';

export default function PackagesSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [saved, setSaved] = useState<Set<string>>(new Set(['pkg-003']));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const filtered = activeCategory === 'all' ?
  PACKAGES :
  PACKAGES.filter((p) => p.category === activeCategory);

  const toggleSave = (id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleWhatsApp = (pkg: typeof PACKAGES[0]) => {
    const msg = encodeURIComponent(
      `Hi TourVista! I'm interested in the "${pkg.title}" package (${pkg.duration}) for $${pkg.price}/person. Please share more details.`
    );
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <section id="packages" className="py-20 md:py-28 bg-gray-50" ref={ref}>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10">
          
          <span className="inline-block px-4 py-1.5 bg-accent-50 text-accent-600 text-sm font-semibold rounded-full mb-4">
            ✈️ Tour Packages
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Curated Journeys for Every Traveler
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            All-inclusive packages with expert guides, luxury stays, and zero hassle.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10">
          
          {CATEGORIES.map((cat) =>
          <button
            key={`cat-${cat.id}`}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-250 flex items-center gap-2 ${
            activeCategory === cat.id ?
            'bg-primary-500 text-white shadow-primary scale-105' :
            'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600'}`
            }>
            
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          )}
        </motion.div>

        {/* Package Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
            
            {filtered.map((pkg, i) =>
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group"
              whileHover={{ y: -5 }}>

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <AppImage
                  src={pkg.image}
                  alt={pkg.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                
                  {/* Badge */}
                  <span className={`absolute top-3 left-3 ${pkg.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                    {pkg.badge}
                  </span>
                  {/* Actions */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                    onClick={() => toggleSave(pkg.id)}
                    className={`w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all ${
                    saved.has(pkg.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`
                    }
                    aria-label={saved.has(pkg.id) ? 'Remove from wishlist' : 'Add to wishlist'}>
                    
                      <Heart size={14} className={saved.has(pkg.id) ? 'fill-current' : ''} />
                    </button>
                    <button
                    className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-primary-500 transition-colors"
                    aria-label="Share package">
                    
                      <Share2 size={14} />
                    </button>
                  </div>
                  {/* Duration */}
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <Clock size={11} />
                      {pkg.duration}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1.5">
                    <h3 className="font-display font-bold text-gray-900 text-base leading-snug flex-1 pr-2">
                      {pkg.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-xs mb-2.5 flex items-center gap-1">
                    <Tag size={11} />
                    {pkg.destination}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {pkg.highlights.slice(0, 2).map((h) =>
                  <span key={`hl-${pkg.id}-${h}`} className="bg-primary-50 text-primary-700 text-xs px-2 py-0.5 rounded-md">
                        {h}
                      </span>
                  )}
                    {pkg.highlights.length > 2 &&
                  <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-md">
                        +{pkg.highlights.length - 2} more
                      </span>
                  }
                  </div>

                  {/* Rating + Group */}
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

                  {/* Price + CTA */}
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
                    className="btn-accent px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5">
                    
                      View Details <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 &&
        <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No packages found in this category.</p>
            <button onClick={() => setActiveCategory('all')} className="mt-4 text-primary-500 font-semibold">
              View all packages
            </button>
          </div>
        }

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-primary-500 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-colors">
            View All Packages <ChevronRight size={17} />
          </Link>
        </motion.div>
      </div>
    </section>);

}