'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, ArrowRight, TrendingUp } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

// Backend integration point: replace with /api/destinations fetch
const DESTINATIONS = [
{
  id: 'dest-001',
  name: 'Bali, Indonesia',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f8695959-1772429916684.png",
  alt: 'Terraced rice fields in Bali with lush green vegetation and traditional temple',
  starting_price: 899,
  short_description: 'Temples, rice terraces & pristine beaches',
  trending: true,
  packageCount: 14,
  tag: 'Most Popular',
  tagColor: 'bg-accent-500'
},
{
  id: 'dest-002',
  name: 'Santorini, Greece',
  image: "https://images.unsplash.com/photo-1662121783914-9ee843f21504",
  alt: 'White-washed buildings with blue domes overlooking the Aegean Sea in Santorini',
  starting_price: 1299,
  short_description: 'Clifftop villages, sunsets & volcanic beaches',
  trending: false,
  packageCount: 9,
  tag: 'Romantic',
  tagColor: 'bg-pink-500'
},
{
  id: 'dest-003',
  name: 'Maldives',
  image: "https://images.unsplash.com/photo-1683650904081-78afc08950cb",
  alt: 'Overwater bungalows in the Maldives above turquoise crystal clear lagoon',
  starting_price: 1799,
  short_description: 'Overwater villas & crystal lagoons',
  trending: true,
  packageCount: 11,
  tag: 'Luxury',
  tagColor: 'bg-amber-500'
},
{
  id: 'dest-004',
  name: 'Tokyo, Japan',
  image: "https://images.unsplash.com/photo-1705056132012-246a7b5cb4b7",
  alt: 'Tokyo cityscape at night with Mount Fuji visible in the background',
  starting_price: 1099,
  short_description: 'Neon lights, cherry blossoms & ancient culture',
  trending: false,
  packageCount: 8,
  tag: 'Cultural',
  tagColor: 'bg-red-500'
},
{
  id: 'dest-005',
  name: 'Dubai, UAE',
  image: "https://images.unsplash.com/photo-1702109768051-473fa42beeb4",
  alt: 'Dubai skyline at sunset with Burj Khalifa and modern skyscrapers reflecting in water',
  starting_price: 799,
  short_description: 'Skyscrapers, desert safaris & world records',
  trending: true,
  packageCount: 16,
  tag: 'Trending',
  tagColor: 'bg-primary-500'
},
{
  id: 'dest-006',
  name: 'Swiss Alps',
  image: "https://images.unsplash.com/photo-1636668170940-f00a766b8303",
  alt: 'Snow-capped Swiss Alps mountain peaks with green valleys and clear blue sky',
  starting_price: 1599,
  short_description: 'Glaciers, ski resorts & alpine meadows',
  trending: false,
  packageCount: 7,
  tag: 'Adventure',
  tagColor: 'bg-emerald-500'
}];


const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' }
  })
};

export default function DestinationsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="destinations" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14">
          
          <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 text-sm font-semibold rounded-full mb-4 tracking-wide">
            🌍 Top Destinations
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Discover Where You Want to Go
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            From tropical escapes to mountain adventures — find your perfect destination.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest, i) =>
          <motion.div
            key={dest.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
            className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-shadow duration-300"
            style={{ minHeight: '340px' }}>
            
              {/* Image */}
              <AppImage
              src={dest.image}
              alt={dest.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            
              {/* Gradient */}
              <div className="absolute inset-0 bg-card-gradient" />

              {/* Tags */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`${dest.tagColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                  {dest.tag}
                </span>
                {dest.trending &&
              <span className="bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp size={11} />
                    Trending
                  </span>
              }
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-display font-bold text-white text-xl leading-tight">
                      {dest.name}
                    </h3>
                    <p className="text-white/75 text-sm mt-1 flex items-center gap-1">
                      <MapPin size={12} />
                      {dest.short_description}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <div className="text-white/60 text-xs">from</div>
                    <div className="text-accent-300 font-display font-bold text-xl tabular-nums">
                      ${dest.starting_price.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-white/60 text-xs">{dest.packageCount} packages available</span>
                  <motion.button
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-1.5 text-white text-sm font-semibold group-hover:text-accent-300 transition-colors"
                  onClick={() => document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' })}>
                  
                    Explore <ArrowRight size={15} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10">
          
          <button
            onClick={() => document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-primary-500 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-colors">
            
            View All Destinations <ArrowRight size={17} />
          </button>
        </motion.div>
      </div>
    </section>);

}