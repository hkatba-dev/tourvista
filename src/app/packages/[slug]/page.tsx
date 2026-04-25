'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Clock, Star, Users, MapPin, ChevronDown, CheckCircle2, XCircle, MessageCircle, ArrowLeft, Share2, Heart, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AppImage from '@/components/ui/AppImage';
import LandingNav from '@/app/home-landing-page/components/LandingNav';
import LandingFooter from '@/app/home-landing-page/components/LandingFooter';
import FloatingWhatsApp from '@/app/home-landing-page/components/FloatingWhatsApp';
import { PACKAGES, getPackageBySlug } from '@/data/packages';

interface PageProps {
  params: { slug: string };
}

function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () => setActiveIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIdx((i) => (i + 1) % images.length);

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative h-[420px] md:h-[520px] rounded-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0"
          >
            <AppImage
              src={images[activeIdx]}
              alt={`${title} - image ${activeIdx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority={activeIdx === 0}
            />
          </motion.div>
        </AnimatePresence>
        {/* Nav arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/60 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/60 transition-all"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>
        {/* Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
          {activeIdx + 1} / {images.length}
        </div>
      </div>
      {/* Thumbnails */}
      <div className="flex gap-2 mt-3">
        {images.map((img, i) => (
          <button
            key={`thumb-${i}`}
            onClick={() => setActiveIdx(i)}
            className={`relative h-16 flex-1 rounded-xl overflow-hidden transition-all ${i === activeIdx ? 'ring-2 ring-primary-500 ring-offset-2' : 'opacity-60 hover:opacity-90'}`}
          >
            <AppImage src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ItineraryAccordion({ itinerary }: { itinerary: ReturnType<typeof getPackageBySlug>['itinerary'] }) {
  const [openDay, setOpenDay] = useState<number | null>(1);

  if (!itinerary) return null;

  return (
    <div className="space-y-3">
      {itinerary.map((day) => (
        <motion.div
          key={`day-${day.day}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: day.day * 0.05 }}
          className="border border-gray-200 rounded-2xl overflow-hidden"
        >
          <button
            onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
            className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${openDay === day.day ? 'bg-primary-50' : 'bg-white hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-sm shrink-0 ${openDay === day.day ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                D{day.day}
              </div>
              <div>
                <div className="font-display font-semibold text-gray-900 text-sm">{day.title}</div>
                <div className="text-gray-500 text-xs mt-0.5">{day.meals}</div>
              </div>
            </div>
            <motion.div animate={{ rotate: openDay === day.day ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={18} className="text-gray-400" />
            </motion.div>
          </button>

          <AnimatePresence>
            {openDay === day.day && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 pt-2 bg-white border-t border-gray-100">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{day.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {day.activities.map((activity) => (
                      <div key={`act-${activity}`} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full shrink-0" />
                        {activity}
                      </div>
                    ))}
                  </div>
                  {day.accommodation !== 'N/A' && (
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                      <MapPin size={12} className="text-primary-500" />
                      <span>Stay: <span className="font-medium text-gray-700">{day.accommodation}</span></span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

export default function PackageDetailPage({ params }: PageProps) {
  const pkg = getPackageBySlug(params.slug);
  const [saved, setSaved] = useState(false);
  const overviewRef = useRef(null);
  const overviewInView = useInView(overviewRef, { once: true, margin: '-60px' });

  if (!pkg) {
    notFound();
  }

  const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi TourVista! 🌍\n\nI'm interested in the *${pkg.title}* package.\n\n📍 Destination: ${pkg.destination}\n⏱ Duration: ${pkg.duration}\n💰 Price: $${pkg.price}/person\n\nPlease share more details and availability.`
    );
    window.open(`https://wa.me/${pkg.whatsappNumber}?text=${msg}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: pkg.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <LandingNav />

      {/* Breadcrumb */}
      <div className="pt-20 pb-0 bg-gray-50 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/home-landing-page" className="hover:text-primary-500 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/packages" className="hover:text-primary-500 transition-colors">Packages</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{pkg.title}</span>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-10">
        {/* Back Button */}
        <Link
          href="/packages"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-500 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Packages
        </Link>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Hero Gallery */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <ImageGallery images={pkg.images} title={pkg.title} />
            </motion.div>

            {/* Title + Quick Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className={`inline-block ${pkg.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full mb-3`}>
                    {pkg.badge}
                  </span>
                  <h1 className="font-display font-extrabold text-gray-900 text-3xl md:text-4xl leading-tight mb-2">
                    {pkg.title}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin size={14} className="text-primary-500" />
                    {pkg.destination}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setSaved(!saved)}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${saved ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400'}`}
                    aria-label="Save package"
                  >
                    <Heart size={18} className={saved ? 'fill-current' : ''} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-10 h-10 rounded-xl border border-gray-200 text-gray-400 flex items-center justify-center hover:border-primary-300 hover:text-primary-500 transition-all"
                    aria-label="Share package"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Clock, label: 'Duration', value: pkg.duration },
                  { icon: Star, label: 'Rating', value: `${pkg.rating} (${pkg.reviews} reviews)` },
                  { icon: Users, label: 'Group Size', value: `Max ${pkg.maxGroup} people` },
                  { icon: MapPin, label: 'Destination', value: pkg.destination },
                ].map((stat) => {
                  const StatIcon = stat.icon;
                  return (
                    <div key={`stat-${stat.label}`} className="bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <StatIcon size={14} className="text-primary-500" />
                        <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
                      </div>
                      <div className="font-display font-semibold text-gray-900 text-sm">{stat.value}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Overview */}
            <motion.div
              ref={overviewRef}
              initial={{ opacity: 0, y: 24 }}
              animate={overviewInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-bold text-gray-900 text-2xl mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed text-base">{pkg.overview}</p>
              {/* Highlights */}
              <div className="mt-5 flex flex-wrap gap-2">
                {pkg.highlights.map((h) => (
                  <span key={`hl-${h}`} className="bg-primary-50 text-primary-700 text-sm px-3 py-1.5 rounded-lg font-medium">
                    ✓ {h}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Itinerary */}
            <div>
              <h2 className="font-display font-bold text-gray-900 text-2xl mb-5">Day-by-Day Itinerary</h2>
              <ItineraryAccordion itinerary={pkg.itinerary} />
            </div>

            {/* Inclusions & Exclusions */}
            <div>
              <h2 className="font-display font-bold text-gray-900 text-2xl mb-5">What's Included</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 rounded-2xl p-5">
                  <h3 className="font-display font-semibold text-emerald-800 text-base mb-4 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    Inclusions
                  </h3>
                  <ul className="space-y-2.5">
                    {pkg.inclusions.map((item) => (
                      <li key={`inc-${item}`} className="flex items-start gap-2.5 text-sm text-emerald-800">
                        <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 rounded-2xl p-5">
                  <h3 className="font-display font-semibold text-red-800 text-base mb-4 flex items-center gap-2">
                    <XCircle size={18} className="text-red-500" />
                    Exclusions
                  </h3>
                  <ul className="space-y-2.5">
                    {pkg.exclusions.map((item) => (
                      <li key={`exc-${item}`} className="flex items-start gap-2.5 text-sm text-red-800">
                        <XCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Rules & Regulations */}
            <div>
              <h2 className="font-display font-bold text-gray-900 text-2xl mb-5">Rules & Regulations</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle size={18} className="text-amber-600" />
                  <span className="font-display font-semibold text-amber-800 text-sm">Please read before booking</span>
                </div>
                <ul className="space-y-3">
                  {pkg.rules.map((rule, i) => (
                    <li key={`rule-${i}`} className="flex items-start gap-3 text-sm text-amber-900">
                      <span className="w-5 h-5 bg-amber-200 text-amber-800 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Sidebar — Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Price Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-card"
              >
                <div className="flex items-end gap-3 mb-1">
                  <span className="font-display font-extrabold text-gray-900 text-3xl tabular-nums">
                    ${pkg.price.toLocaleString()}
                  </span>
                  <span className="text-gray-400 text-lg line-through tabular-nums mb-0.5">
                    ${pkg.originalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-gray-500 text-sm">per person</span>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {discount}% OFF
                  </span>
                </div>

                <div className="space-y-3 mb-5 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium text-gray-900">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Group Size</span>
                    <span className="font-medium text-gray-900">Max {pkg.maxGroup} people</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-500">Rating</span>
                    <span className="font-medium text-gray-900 flex items-center gap-1">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      {pkg.rating} ({pkg.reviews})
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-lg mb-3"
                >
                  <MessageCircle size={20} />
                  Book via WhatsApp
                </motion.button>

                <Link
                  href="/plan"
                  className="w-full btn-primary py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 text-center"
                >
                  Plan Custom Trip
                </Link>

                <p className="text-center text-gray-400 text-xs mt-4">
                  Free cancellation · No hidden fees · 24/7 support
                </p>
              </motion.div>

              {/* Need Help Card */}
              <div className="bg-primary-50 rounded-2xl p-5">
                <h4 className="font-display font-semibold text-primary-900 text-sm mb-2">Need help deciding?</h4>
                <p className="text-primary-700 text-xs mb-3 leading-relaxed">
                  Our travel experts are available 24/7 to answer your questions and customize this package for you.
                </p>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 text-primary-600 font-semibold text-sm hover:text-primary-800 transition-colors"
                >
                  📞 +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Packages */}
        <div className="mt-16 pt-10 border-t border-gray-100">
          <h2 className="font-display font-bold text-gray-900 text-2xl mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PACKAGES.filter((p) => p.id !== pkg.id && p.category === pkg.category)
              .slice(0, 3)
              .map((related, i) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
                >
                  <div className="relative h-40 overflow-hidden">
                    <AppImage src={related.image} alt={related.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="33vw" />
                    <span className={`absolute top-3 left-3 ${related.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                      {related.badge}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-gray-900 text-sm mb-1">{related.title}</h3>
                    <p className="text-gray-500 text-xs mb-3">{related.duration} · {related.destination}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-primary-600">${related.price.toLocaleString()}</span>
                      <Link href={`/packages/${related.slug}`} className="text-xs text-primary-500 font-semibold hover:underline">
                        View Details →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      <LandingFooter />
      <FloatingWhatsApp />
    </main>
  );
}
