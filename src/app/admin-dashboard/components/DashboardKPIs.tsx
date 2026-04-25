'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Package, MapPin, DollarSign, MessageCircle, ArrowUpRight, ArrowDownRight, AlertTriangle } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


// Backend integration point: replace with /api/dashboard/kpis fetch
const KPIS = [
  {
    id: 'kpi-total-leads',
    label: 'Total Leads',
    value: '1,847',
    change: '+12.4%',
    direction: 'up',
    period: 'vs last month',
    icon: Users,
    color: 'text-primary-600',
    bg: 'bg-primary-50',
    alert: false,
    sub: '218 this month',
  },
  {
    id: 'kpi-conversion',
    label: 'Conversion Rate',
    value: '28.3%',
    change: '-2.1%',
    direction: 'down',
    period: 'vs last month',
    icon: TrendingUp,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    alert: true,
    sub: 'Target: 32%',
  },
  {
    id: 'kpi-active-packages',
    label: 'Active Packages',
    value: '43',
    change: '+3',
    direction: 'up',
    period: 'new this week',
    icon: Package,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    alert: false,
    sub: '6 featured',
  },
  {
    id: 'kpi-top-destination',
    label: 'Top Destination',
    value: 'Bali',
    change: '86 inquiries',
    direction: 'up',
    period: 'this month',
    icon: MapPin,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    alert: false,
    sub: '#2 Dubai (71)',
  },
  {
    id: 'kpi-pipeline',
    label: 'Revenue Pipeline',
    value: '$284K',
    change: '+18.7%',
    direction: 'up',
    period: 'vs last month',
    icon: DollarSign,
    color: 'text-primary-600',
    bg: 'bg-primary-50',
    alert: false,
    sub: 'Est. from open leads',
  },
  {
    id: 'kpi-whatsapp',
    label: 'WhatsApp Clicks',
    value: '3,241',
    change: '+31.2%',
    direction: 'up',
    period: 'vs last month',
    icon: MessageCircle,
    color: 'text-green-600',
    bg: 'bg-green-50',
    alert: false,
    sub: '67.8% CTR',
  },
];

export default function DashboardKPIs() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
      {KPIS?.map((kpi, i) => {
        const Icon = kpi?.icon;
        return (
          <motion.div
            key={kpi?.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className={`bg-white rounded-2xl p-5 shadow-card border ${kpi?.alert ? 'border-amber-200 bg-amber-50/30' : 'border-gray-100'} hover:shadow-card-hover transition-shadow duration-300`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${kpi?.bg} rounded-xl flex items-center justify-center`}>
                <Icon size={20} className={kpi?.color} />
              </div>
              {kpi?.alert && (
                <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full text-xs font-medium">
                  <AlertTriangle size={11} />
                  Below target
                </div>
              )}
            </div>
            <div className="font-display font-bold text-2xl text-gray-900 tabular-nums mb-0.5">
              {kpi?.value}
            </div>
            <div className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">
              {kpi?.label}
            </div>
            <div className="flex items-center gap-1.5">
              {kpi?.direction === 'up' ? (
                <ArrowUpRight size={14} className="text-emerald-500" />
              ) : (
                <ArrowDownRight size={14} className="text-red-500" />
              )}
              <span className={`text-xs font-semibold ${kpi?.direction === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                {kpi?.change}
              </span>
              <span className="text-gray-400 text-xs">{kpi?.period}</span>
            </div>
            <div className="text-gray-400 text-xs mt-1">{kpi?.sub}</div>
          </motion.div>
        );
      })}
    </div>
  );
}