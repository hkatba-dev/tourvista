'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0057B8 0%, #003D84 60%, #001F4A 100%)' }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-accent-500/10 rounded-full" />

          <div className="relative z-10 text-center py-16 px-6 md:px-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 bg-accent-500/20 text-accent-300 text-sm font-semibold rounded-full mb-6 border border-accent-500/30"
            >
              ✈️ Start Your Journey Today
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="font-display font-extrabold text-white text-3xl md:text-5xl mb-5 leading-tight"
            >
              Your Next Adventure Is{' '}
              <span className="text-accent-400">One Click Away</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.45 }}
              className="text-white/70 text-lg max-w-xl mx-auto mb-10"
            >
              Join 12,000+ travelers who trusted TourVista for their most memorable journeys. Limited summer spots available.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/plan"
                className="btn-accent px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
              >
                Plan My Dream Trip <ArrowRight size={20} />
              </Link>
              <a
                href="https://wa.me/919876543210?text=Hi%20TourVista!%20I'd%20like%20to%20explore%20your%20tour%20packages."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-[#25D366] hover:bg-[#20BA5A] text-white transition-all active:scale-95"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}