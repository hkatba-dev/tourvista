'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/home-landing-page' },
  { label: 'Packages', href: '/packages' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Contact', href: '/contact' },
];

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');
  const isHome = pathname === '/home-landing-page' || pathname === '/';
  const isTransparent = isHome && !scrolled;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent py-5' :'bg-white/95 backdrop-blur-md shadow-md py-3'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link href="/home-landing-page" className="flex items-center gap-2.5">
            <AppLogo size={36} />
            <span className={`font-display font-800 text-xl tracking-tight ${isTransparent ? 'text-white' : 'text-primary-500'}`}>
              TourVista
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={`nav-${link.label}`}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  isActive(link.href)
                    ? isTransparent
                      ? 'text-white font-semibold' :'text-primary-500 font-semibold bg-primary-50'
                    : isTransparent
                    ? 'text-white/90 hover:text-white hover:bg-white/10' :'text-gray-700 hover:bg-gray-100 hover:text-primary-500'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-underline"
                    className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full ${isTransparent ? 'bg-accent-400' : 'bg-primary-500'}`}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919876543210"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isTransparent ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-primary-500'
              }`}
            >
              <Phone size={15} />
              +91 98765 43210
            </a>
            <Link
              href="/plan"
              className="btn-accent px-5 py-2.5 rounded-xl text-sm font-semibold"
            >
              Plan My Trip
            </Link>
            <Link
              href="/sign-up-login-screen"
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                isTransparent
                  ? 'border-white/60 text-white hover:bg-white/10' :'border-primary-500 text-primary-500 hover:bg-primary-50'
              }`}
            >
              Admin Login
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-white pt-20"
          >
            <div className="flex flex-col px-6 py-4 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={`mobile-nav-${link.label}`}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-left px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-primary-50 text-primary-500 font-semibold' :'text-gray-700 hover:bg-primary-50 hover:text-primary-500'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/plan"
                  onClick={() => setMobileOpen(false)}
                  className="btn-accent w-full py-3.5 rounded-xl text-base font-semibold text-center"
                >
                  Plan My Trip
                </Link>
                <Link
                  href="/sign-up-login-screen"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-3.5 rounded-xl text-base font-semibold border border-primary-500 text-primary-500 text-center hover:bg-primary-50 transition-colors"
                >
                  Admin Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}