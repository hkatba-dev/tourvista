'use client';
import React, { useState } from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, BarChart, Bar, Legend
} from 'recharts';

// Backend integration point: replace with /api/analytics/leads-over-time fetch
const MONTHLY_DATA = [
  { month: 'Nov 25', leads: 112, converted: 28, whatsapp: 198 },
  { month: 'Dec 25', leads: 147, converted: 41, whatsapp: 267 },
  { month: 'Jan 26', leads: 134, converted: 35, whatsapp: 241 },
  { month: 'Feb 26', leads: 189, converted: 52, whatsapp: 318 },
  { month: 'Mar 26', leads: 203, converted: 61, whatsapp: 389 },
  { month: 'Apr 26', leads: 218, converted: 58, whatsapp: 412 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-glass p-3 text-sm">
      <p className="font-semibold text-gray-900 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={`tt-${entry.name}`} className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-500 capitalize">{entry.name}:</span>
          <span className="font-semibold text-gray-800 tabular-nums">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

const TABS = [
  { id: 'tab-area', label: 'Lead Trend' },
  { id: 'tab-bar', label: 'Leads vs Converted' },
];

export default function LeadsChart() {
  const [activeTab, setActiveTab] = useState('tab-area');

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-display font-bold text-gray-900 text-base">Lead Volume & Conversions</h3>
          <p className="text-gray-400 text-xs mt-0.5">Nov 2025 – Apr 2026 · Monthly breakdown</p>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'tab-area' ? (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={MONTHLY_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gradLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0057B8" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#0057B8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradWhatsapp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#25D366" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#25D366" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => <span style={{ color: '#6b7280', fontSize: 12 }}>{value}</span>}
            />
            <Area
              type="monotone"
              dataKey="leads"
              name="Leads"
              stroke="#0057B8"
              strokeWidth={2.5}
              fill="url(#gradLeads)"
              dot={{ fill: '#0057B8', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
            <Area
              type="monotone"
              dataKey="whatsapp"
              name="WhatsApp Clicks"
              stroke="#25D366"
              strokeWidth={2}
              fill="url(#gradWhatsapp)"
              dot={{ fill: '#25D366', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={MONTHLY_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }} barGap={4}>
            <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => <span style={{ color: '#6b7280', fontSize: 12 }}>{value}</span>}
            />
            <Bar dataKey="leads" name="Total Leads" fill="#0057B8" radius={[6, 6, 0, 0]} maxBarSize={36} />
            <Bar dataKey="converted" name="Converted" fill="#F97316" radius={[6, 6, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}