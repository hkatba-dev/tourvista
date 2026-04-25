'use client';
import React from 'react';


// Backend integration point: replace with /api/analytics/destination-performance fetch
const DESTINATION_DATA = [
  { id: 'dp-bali', name: 'Bali', leads: 86, fill: '#0057B8', pct: 86 },
  { id: 'dp-dubai', name: 'Dubai', leads: 71, fill: '#F97316', pct: 71 },
  { id: 'dp-maldives', name: 'Maldives', leads: 58, fill: '#8B5CF6', pct: 58 },
  { id: 'dp-santorini', name: 'Santorini', leads: 47, fill: '#10B981', pct: 47 },
  { id: 'dp-tokyo', name: 'Tokyo', leads: 39, fill: '#F59E0B', pct: 39 },
  { id: 'dp-swiss', name: 'Swiss Alps', leads: 31, fill: '#EF4444', pct: 31 },
];

export default function DestinationPerformance() {
  const max = DESTINATION_DATA?.[0]?.leads;

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 h-full">
      <div className="mb-5">
        <h3 className="font-display font-bold text-gray-900 text-base">Leads by Destination</h3>
        <p className="text-gray-400 text-xs mt-0.5">April 2026 · Top performing destinations</p>
      </div>
      <div className="space-y-3">
        {DESTINATION_DATA?.map((d) => (
          <div key={d?.id} className="flex items-center gap-3">
            <div className="w-16 text-xs font-medium text-gray-600 shrink-0 truncate">{d?.name}</div>
            <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${(d?.leads / max) * 100}%`, backgroundColor: d?.fill }}
              />
            </div>
            <div className="w-8 text-xs font-bold text-gray-700 tabular-nums text-right shrink-0">{d?.leads}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-5 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-primary-50 rounded-xl p-3 text-center">
            <div className="font-display font-bold text-primary-700 text-lg tabular-nums">332</div>
            <div className="text-primary-500 text-xs mt-0.5">Total this month</div>
          </div>
          <div className="bg-accent-50 rounded-xl p-3 text-center">
            <div className="font-display font-bold text-accent-700 text-lg tabular-nums">+14.2%</div>
            <div className="text-accent-500 text-xs mt-0.5">vs last month</div>
          </div>
        </div>
      </div>
    </div>
  );
}