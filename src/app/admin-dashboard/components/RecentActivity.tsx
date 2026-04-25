'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Package, MapPin, TrendingUp } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


// Backend integration point: replace with /api/activity/recent fetch
const ACTIVITIES = [
  {
    id: 'act-001',
    type: 'lead',
    icon: Users,
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-600',
    title: 'New lead from Priya Sharma',
    sub: 'Bali, Indonesia · $1,000–$1,500',
    time: '4 min ago',
  },
  {
    id: 'act-002',
    type: 'whatsapp',
    icon: MessageCircle,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    title: 'WhatsApp inquiry received',
    sub: 'Maldives package · Luxury budget',
    time: '18 min ago',
  },
  {
    id: 'act-003',
    type: 'converted',
    icon: TrendingUp,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    title: 'Lead converted — Meera Nair',
    sub: 'Maldives Overwater Escape · $2,799',
    time: '1 hr ago',
  },
  {
    id: 'act-004',
    type: 'package',
    icon: Package,
    iconBg: 'bg-accent-50',
    iconColor: 'text-accent-600',
    title: 'Package updated',
    sub: 'Bali Bliss — price adjusted to $1,199',
    time: '2 hrs ago',
  },
  {
    id: 'act-005',
    type: 'destination',
    icon: MapPin,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    title: 'New destination added',
    sub: 'Cape Town, South Africa · from $1,099',
    time: '5 hrs ago',
  },
  {
    id: 'act-006',
    type: 'lead',
    icon: Users,
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-600',
    title: 'Lead contacted — Rohan Gupta',
    sub: 'Tokyo, Japan · follow-up scheduled',
    time: '6 hrs ago',
  },
  {
    id: 'act-007',
    type: 'whatsapp',
    icon: MessageCircle,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    title: '7 WhatsApp clicks today',
    sub: 'Greek Island Hopper is trending',
    time: '8 hrs ago',
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 h-full">
      <div className="mb-5">
        <h3 className="font-display font-bold text-gray-900 text-base">Recent Activity</h3>
        <p className="text-gray-400 text-xs mt-0.5">Live updates · Apr 16, 2026</p>
      </div>
      <div className="space-y-1">
        {ACTIVITIES?.map((act, i) => {
          const Icon = act?.icon;
          return (
            <motion.div
              key={act?.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group cursor-default"
            >
              <div className={`w-8 h-8 ${act?.iconBg} rounded-lg flex items-center justify-center shrink-0 mt-0.5`}>
                <Icon size={15} className={act?.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-800 leading-snug truncate">{act?.title}</div>
                <div className="text-gray-400 text-xs mt-0.5 truncate">{act?.sub}</div>
              </div>
              <div className="text-gray-300 text-xs shrink-0 mt-0.5 whitespace-nowrap">{act?.time}</div>
            </motion.div>
          );
        })}
      </div>
      <button className="w-full mt-4 py-2.5 text-sm text-primary-500 font-semibold hover:bg-primary-50 rounded-xl transition-colors">
        View all activity →
      </button>
    </div>
  );
}