'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, Package, MapPin, MessageCircle, Settings, LogOut, ChevronLeft, ChevronRight, Bell, Search, Menu, TrendingUp, Globe } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';


const NAV_ITEMS = [
  { id: 'nav-dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin-dashboard', badge: null },
  { id: 'nav-leads', label: 'Leads', icon: Users, href: '/admin-dashboard', badge: '24' },
  { id: 'nav-packages', label: 'Packages', icon: Package, href: '/admin-dashboard', badge: null },
  { id: 'nav-destinations', label: 'Destinations', icon: MapPin, href: '/admin-dashboard', badge: null },
  { id: 'nav-analytics', label: 'Analytics', icon: TrendingUp, href: '/admin-dashboard', badge: null },
  { id: 'nav-whatsapp', label: 'WhatsApp Logs', icon: MessageCircle, href: '/admin-dashboard', badge: '7' },
  { id: 'nav-site', label: 'Live Site', icon: Globe, href: '/home-landing-page', badge: null },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-2.5 px-4 py-5 border-b border-gray-100 ${collapsed ? 'justify-center' : ''}`}>
        <AppLogo size={32} />
        {!collapsed && (
          <span className="font-display font-bold text-primary-600 text-lg">TourVista</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href && item.id === 'nav-dashboard';
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                active
                  ? 'bg-primary-50 text-primary-600' :'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={19} className={active ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-700'} />
              {!collapsed && (
                <>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="bg-accent-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[22px] text-center">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && item.badge && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-accent-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-gray-100 space-y-1">
        <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-all ${collapsed ? 'justify-center' : ''}`}>
          <Settings size={19} className="text-gray-500" />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </button>
        <Link
          href="/sign-up-login-screen"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={19} className="text-gray-500" />
          {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
        </Link>

        {/* User */}
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-3 mt-2 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm shrink-0">
              R
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm truncate">Rahul Mehta</div>
              <div className="text-gray-400 text-xs truncate">Admin</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col bg-white border-r border-gray-100 fixed left-0 top-0 bottom-0 z-30 overflow-hidden"
      >
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3.5 top-20 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-primary-600 hover:border-primary-300 transition-all shadow-sm z-10"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </motion.aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-white z-50 lg:hidden overflow-hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <motion.div
        animate={{ marginLeft: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex-1 flex flex-col min-h-screen lg:ml-0"
        style={{ marginLeft: 0 }}
      >
        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-100 px-6 py-3.5 flex items-center gap-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads, packages, destinations..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors" aria-label="Notifications">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm cursor-pointer">
              R
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-screen-2xl w-full mx-auto">
          {children}
        </main>
      </motion.div>
    </div>
  );
}