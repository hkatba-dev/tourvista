import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
  </svg>
);

const TwitterIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FOOTER_LINKS = {
  destinations: [
    { label: 'Bali, Indonesia', href: '/packages/bali-cultural-immersion' },
    { label: 'Santorini, Greece', href: '/packages/greek-island-hopper' },
    { label: 'Maldives', href: '/packages/maldives-overwater-escape' },
    { label: 'Tokyo, Japan', href: '/packages/tokyo-kyoto-explorer' },
    { label: 'Dubai, UAE', href: '/packages/dubai-desert-city-glam' },
    { label: 'Swiss Alps', href: '/packages/swiss-alps-winter-wonderland' },
  ],
  company: [
    { label: 'About TourVista', href: '/why-us' },
    { label: 'Why Choose Us', href: '/why-us' },
    { label: 'All Packages', href: '/packages' },
    { label: 'Plan My Trip', href: '/plan' },
    { label: 'Contact Us', href: '/contact' },
  ],
  support: [
    { label: 'Help Center', href: '/contact' },
    { label: 'Booking Policy', href: '/contact' },
    { label: 'Cancellation Policy', href: '/contact' },
    { label: 'Travel Insurance', href: '/contact' },
    { label: 'WhatsApp Support', href: 'https://wa.me/919876543210' },
  ],
};

const SOCIALS = [
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
  { icon: YoutubeIcon, href: '#', label: 'YouTube' },
  { icon: TwitterIcon, href: '#', label: 'Twitter/X' },
];

export default function LandingFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 pt-16 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/home-landing-page" className="flex items-center gap-2.5 mb-5">
              <AppLogo size={36} />
              <span className="font-display font-bold text-xl text-white">TourVista</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Handcrafting unforgettable journeys since 2011. Expert-guided tours to 95+ destinations with 12,000+ happy travelers.
            </p>
            <div className="space-y-2.5 text-sm text-gray-400">
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-accent-400 shrink-0" />
                <span>42 Marine Drive, Mumbai 400001, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-accent-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-accent-400 shrink-0" />
                <a href="mailto:hello@tourvista.in" className="hover:text-white transition-colors">hello@tourvista.in</a>
              </div>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">Top Destinations</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS?.destinations?.map((link) => (
                <li key={`footer-dest-${link?.label}`}>
                  <Link href={link?.href} className="text-gray-400 text-sm hover:text-accent-400 transition-colors">
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS?.company?.map((link) => (
                <li key={`footer-co-${link?.label}`}>
                  <Link href={link?.href} className="text-gray-400 text-sm hover:text-accent-400 transition-colors">
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS?.support?.map((link) => (
                <li key={`footer-sup-${link?.label}`}>
                  <Link href={link?.href} className="text-gray-400 text-sm hover:text-accent-400 transition-colors">
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 TourVista Travel Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS?.map((s) => {
              const SocialIcon = s?.icon;
              return (
                <a
                  key={`social-${s?.label}`}
                  href={s?.href}
                  aria-label={s?.label}
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-accent-500 hover:text-white transition-all"
                >
                  <SocialIcon size={16} />
                </a>
              );
            })}
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-xs">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <Link href="/admin-dashboard" className="hover:text-gray-300 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}