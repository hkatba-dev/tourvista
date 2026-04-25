'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

// Backend integration point: replace with /api/testimonials fetch
const TESTIMONIALS = [
{
  id: 'test-001',
  name: 'Priya Sharma',
  location: 'Mumbai, India',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ecb4aca8-1763296537332.png",
  avatarAlt: 'Indian woman with dark hair smiling in professional headshot',
  rating: 5,
  package: 'Bali Bliss — Cultural Immersion',
  review: 'TourVista turned our honeymoon into an absolute dream. The Bali package was flawlessly planned — every hotel, transfer, and activity exceeded our expectations. The local guide was incredibly knowledgeable.',
  date: 'March 2026'
},
{
  id: 'test-002',
  name: 'Marcus Weber',
  location: 'Berlin, Germany',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1eae3cbea-1775768911576.png",
  avatarAlt: 'European man with beard smiling casual outdoor photo',
  rating: 5,
  package: 'Swiss Alps Winter Wonderland',
  review: 'I was skeptical about a group tour, but TourVista completely changed my mind. The small group size meant we got genuine personal attention. Jungfraujoch at sunrise was a once-in-a-lifetime moment.',
  date: 'January 2026'
},
{
  id: 'test-003',
  name: 'Aisha Al-Rashid',
  location: 'Dubai, UAE',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_126514f17-1763294797191.png",
  avatarAlt: 'Middle Eastern woman with hijab smiling professional portrait',
  rating: 5,
  package: 'Maldives Overwater Escape',
  review: 'The Maldives package was worth every penny. From the seaplane transfer to the private sandbank dinner, everything was magical. TourVista\'s attention to detail is unmatched — I\'ve already booked Greece!',
  date: 'February 2026'
},
{
  id: 'test-004',
  name: 'James & Sarah Okonkwo',
  location: 'Lagos, Nigeria',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15a1e9e15-1773922015129.png",
  avatarAlt: 'African man with glasses smiling in business casual attire',
  rating: 4,
  package: 'Tokyo & Kyoto Explorer',
  review: 'Japan was on our bucket list for years and TourVista made it perfect. The mix of modern Tokyo and ancient Kyoto was brilliantly balanced. Minor hiccup with one hotel room, but the team resolved it instantly.',
  date: 'April 2026'
},
{
  id: 'test-005',
  name: 'Natalia Kozlov',
  location: 'Moscow, Russia',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19861ace4-1773075171581.png",
  avatarAlt: 'Eastern European woman with blonde hair smiling outdoors',
  rating: 5,
  package: 'Greek Island Hopper',
  review: 'Santorini was even more breathtaking than the photos. TourVista arranged a private yacht day for our group — that was the highlight. The WhatsApp support throughout the trip gave us so much peace of mind.',
  date: 'March 2026'
}];


export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  // Auto-scroll
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % TESTIMONIALS?.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS?.length) % TESTIMONIALS?.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS?.length);

  const t = TESTIMONIALS?.[current];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-gray-50" ref={ref}>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14">
          
          <span className="inline-block px-4 py-1.5 bg-accent-50 text-accent-600 text-sm font-semibold rounded-full mb-4">
            ❤️ Traveler Stories
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Real Journeys, Real Smiles
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Don't take our word for it — here's what 12,000+ travelers say about TourVista.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="max-w-4xl mx-auto">
          
          <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-glass">
            {/* Quote icon */}
            <div className="absolute top-6 right-8 text-primary-100">
              <Quote size={64} className="fill-current" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`testimonial-${t?.id}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}>
                
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)]?.map((_, si) =>
                  <Star
                    key={`star-${t?.id}-${si}`}
                    size={18}
                    className={si < t?.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />

                  )}
                </div>

                {/* Review */}
                <blockquote className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 font-body relative z-10">
                  "{t?.review}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary-100 shrink-0">
                    <AppImage
                      src={t?.avatar}
                      alt={t?.avatarAlt}
                      fill
                      className="object-cover"
                      sizes="56px" />
                    
                  </div>
                  <div>
                    <div className="font-display font-bold text-gray-900">{t?.name}</div>
                    <div className="text-gray-500 text-sm">{t?.location}</div>
                    <div className="text-primary-500 text-xs font-medium mt-0.5">{t?.package}</div>
                  </div>
                  <div className="ml-auto text-gray-400 text-sm hidden md:block">{t?.date}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <div className="flex gap-2">
                {TESTIMONIALS?.map((_, i) =>
                <button
                  key={`dot-${i}`}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 h-2.5 bg-primary-500' : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300'}`
                  }
                  aria-label={`Go to testimonial ${i + 1}`} />

                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all"
                  aria-label="Previous testimonial">
                  
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all"
                  aria-label="Next testimonial">
                  
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mini cards row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8 max-w-4xl mx-auto">
          {TESTIMONIALS?.map((t2, i) =>
          <button
            key={t2?.id}
            onClick={() => setCurrent(i)}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-250 ${
            i === current ?
            'bg-primary-500 text-white shadow-primary' :
            'bg-white text-gray-600 hover:bg-primary-50 border border-gray-100'}`
            }>
            
              <div className="relative w-10 h-10 rounded-full overflow-hidden mb-2 ring-2 ring-white/30">
                <AppImage src={t2?.avatar} alt={t2?.avatarAlt} fill className="object-cover" sizes="40px" />
              </div>
              <span className={`text-xs font-semibold text-center leading-tight ${i === current ? 'text-white' : 'text-gray-700'}`}>
                {t2?.name?.split(' ')?.[0]}
              </span>
            </button>
          )}
        </div>
      </div>
    </section>);


}