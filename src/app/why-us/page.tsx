'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Headphones, MapPin, Award, CreditCard, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import LandingNav from '@/app/home-landing-page/components/LandingNav';
import LandingFooter from '@/app/home-landing-page/components/LandingFooter';
import FloatingWhatsApp from '@/app/home-landing-page/components/FloatingWhatsApp';
import Icon from '@/components/ui/AppIcon';


const REASONS = [
{ id: 'r1', icon: Shield, title: 'Safe & Verified Packages', description: 'Every itinerary is vetted by our travel experts with on-ground local partners ensuring your safety and satisfaction.', color: 'text-primary-500', bg: 'bg-primary-50', stat: '100%', statLabel: 'Safety Record' },
{ id: 'r2', icon: Headphones, title: '24/7 Travel Support', description: 'Our team is reachable via WhatsApp, call, or email — anytime, anywhere in the world, throughout your journey.', color: 'text-accent-500', bg: 'bg-accent-50', stat: '<2hr', statLabel: 'Response Time' },
{ id: 'r3', icon: MapPin, title: 'Handcrafted Itineraries', description: 'No cookie-cutter tours. Every trip is tailored to your interests, pace, and budget with local insider knowledge.', color: 'text-emerald-600', bg: 'bg-emerald-50', stat: '95+', statLabel: 'Destinations' },
{ id: 'r4', icon: Award, title: '15+ Years of Excellence', description: 'Trusted by 12,000+ travelers globally with a 4.9-star average rating and multiple industry awards.', color: 'text-amber-600', bg: 'bg-amber-50', stat: '4.9★', statLabel: 'Avg Rating' },
{ id: 'r5', icon: CreditCard, title: 'Transparent Pricing', description: 'No hidden costs. What you see is exactly what you pay — guaranteed. Full itemized breakdown on every package.', color: 'text-purple-600', bg: 'bg-purple-50', stat: '$0', statLabel: 'Hidden Fees' },
{ id: 'r6', icon: Users, title: 'Small Group Sizes', description: 'Intimate groups of 4–16 mean personalized attention, authentic experiences, and genuine connections with fellow travelers.', color: 'text-rose-600', bg: 'bg-rose-50', stat: '4-16', statLabel: 'Group Size' }];


const MILESTONES = [
{ year: '2011', event: 'TourVista founded in Mumbai with a team of 3 passionate travelers' },
{ year: '2014', event: 'Expanded to 25 destinations across Asia and Europe' },
{ year: '2017', event: 'Reached 5,000 happy travelers milestone' },
{ year: '2020', event: 'Launched WhatsApp-first customer support — industry first' },
{ year: '2023', event: 'Crossed 10,000 travelers; expanded to 80+ destinations' },
{ year: '2026', event: '12,000+ travelers, 95+ destinations, 4.9★ average rating' }];


const TEAM = [
{ name: 'Rahul Mehta', role: 'Founder & CEO', image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ecb4aca8-1763296537332.png', alt: 'Rahul Mehta founder of TourVista smiling professional headshot', bio: '15 years in travel. Visited 60+ countries. Passionate about authentic experiences.' },
{ name: 'Priya Sharma', role: 'Head of Experiences', image: 'https://img.rocket.new/generatedImages/rocket_gen_img_126514f17-1763294797191.png', alt: 'Priya Sharma head of experiences at TourVista professional portrait', bio: 'Former luxury hotel manager. Curates every itinerary with obsessive attention to detail.' },
{ name: 'Arjun Nair', role: 'Lead Travel Expert', image: 'https://img.rocket.new/generatedImages/rocket_gen_img_15a1e9e15-1773922015129.png', alt: 'Arjun Nair travel expert at TourVista smiling outdoors', bio: 'Specialist in Southeast Asia and Japan. Speaks 4 languages. 8 years guiding experience.' }];


export default function WhyUsPage() {
  const heroRef = useRef(null);
  const reasonsRef = useRef(null);
  const storyRef = useRef(null);
  const teamRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const reasonsInView = useInView(reasonsRef, { once: true, margin: '-60px' });
  const storyInView = useInView(storyRef, { once: true, margin: '-60px' });
  const teamInView = useInView(teamRef, { once: true, margin: '-60px' });

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <LandingNav />
      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent-400 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-accent-500/20 text-accent-300 text-sm font-semibold rounded-full mb-4 border border-accent-500/30">
            
            🏆 Why TourVista
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-white text-4xl md:text-5xl mb-5 leading-tight">
            
            We Don't Just Plan Trips —<br />
            <span className="text-accent-400">We Create Memories</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            
            With 15 years of crafting immersive travel experiences, TourVista combines deep local knowledge, premium logistics, and genuine care for every traveler.
          </motion.p>
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8">
            
            {[
            { value: '12,000+', label: 'Happy Travelers' },
            { value: '95+', label: 'Destinations' },
            { value: '4.9★', label: 'Average Rating' },
            { value: '15 Yrs', label: 'Experience' }]?.
            map((s) =>
            <div key={`hero-stat-${s?.label}`} className="text-center">
                <div className="font-display font-extrabold text-white text-3xl">{s?.value}</div>
                <div className="text-white/60 text-sm mt-1">{s?.label}</div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
      {/* Why Choose Us Grid */}
      <section className="py-20 md:py-28 bg-white" ref={reasonsRef}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={reasonsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14">
            
            <h2 className="font-display font-bold text-gray-900 text-3xl md:text-4xl mb-4">6 Reasons Travelers Choose Us</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Every detail is designed to give you the best travel experience possible.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REASONS?.map((reason, i) => {
              const Icon = reason?.icon;
              return (
                <motion.div
                  key={reason?.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={reasonsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all cursor-default">
                  
                  <div className={`w-12 h-12 ${reason?.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon size={24} className={reason?.color} />
                  </div>
                  <h3 className="font-display font-bold text-gray-900 text-lg mb-2">{reason?.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{reason?.description}</p>
                  <div className="pt-4 border-t border-gray-100 flex items-center gap-2">
                    <span className={`font-display font-extrabold text-xl ${reason?.color}`}>{reason?.stat}</span>
                    <span className="text-gray-400 text-xs">{reason?.statLabel}</span>
                  </div>
                </motion.div>);

            })}
          </div>
        </div>
      </section>
      {/* Our Story */}
      <section className="py-20 bg-gray-50" ref={storyRef}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}>
              
              <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 text-sm font-semibold rounded-full mb-5">
                📖 Our Story
              </span>
              <h2 className="font-display font-bold text-gray-900 text-3xl md:text-4xl mb-6 leading-tight">
                From a Tiny Office in Mumbai to <span className="text-gradient">95+ Destinations</span>
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                TourVista was born in 2011 from a simple belief: travel should be transformative, not transactional. Our founder Rahul Mehta, after years of frustrating cookie-cutter tour experiences, decided to build something different — a travel company that genuinely cared about the journey, not just the destination.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                Today, we're a team of 45 passionate travel experts, local guides, and logistics specialists who collectively speak 12 languages and have visited over 200 countries. Every package we offer has been personally experienced and vetted by our team.
              </p>
              <div className="flex flex-wrap gap-3">
                {['ISO Certified', 'IATA Member', 'TripAdvisor Award 2025', 'Best Travel Agency 2024']?.map((badge) =>
                <span key={badge} className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <CheckCircle2 size={12} className="text-emerald-500" />
                    {badge}
                  </span>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}>
              
              <h3 className="font-display font-semibold text-gray-900 text-lg mb-6">Our Journey</h3>
              <div className="space-y-4">
                {MILESTONES?.map((m, i) =>
                <motion.div
                  key={m?.year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={storyInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex gap-4">
                  
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-primary-500 text-white rounded-xl flex items-center justify-center text-xs font-bold shrink-0">
                        {m?.year?.slice(2)}
                      </div>
                      {i < MILESTONES?.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-2" />}
                    </div>
                    <div className="pb-4">
                      <div className="font-display font-semibold text-primary-600 text-sm">{m?.year}</div>
                      <div className="text-gray-600 text-sm mt-0.5">{m?.event}</div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Team */}
      <section className="py-20 bg-white" ref={teamRef}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12">
            
            <h2 className="font-display font-bold text-gray-900 text-3xl md:text-4xl mb-4">Meet the Team</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">The passionate people behind every unforgettable journey.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {TEAM?.map((member, i) =>
            <motion.div
              key={member?.name}
              initial={{ opacity: 0, y: 30 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="text-center">
              
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-4 ring-4 ring-primary-100">
                  <img src={member?.image} alt={member?.alt} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-display font-bold text-gray-900 text-base">{member?.name}</h3>
                <p className="text-primary-500 text-sm font-medium mb-2">{member?.role}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{member?.bio}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-display font-bold text-gray-900 text-3xl mb-4">Ready to Travel with TourVista?</h2>
          <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">Browse our curated packages or plan a fully custom trip with our experts.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/packages" className="btn-primary px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2">
              Browse Packages <ArrowRight size={18} />
            </Link>
            <Link href="/plan" className="btn-accent px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2">
              Plan Custom Trip
            </Link>
          </div>
        </div>
      </section>
      <LandingFooter />
      <FloatingWhatsApp />
    </main>);

}