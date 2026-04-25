import React from 'react';
import AdminLayout from './components/AdminLayout';
import DashboardKPIs from './components/DashboardKPIs';
import LeadsTable from './components/LeadsTable';
import LeadsChart from './components/LeadsChart';
import DestinationPerformance from './components/DestinationPerformance';
import RecentActivity from './components/RecentActivity';

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back, Rahul. Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-400">Last updated:</span>
            <span className="font-medium text-gray-700">Apr 16, 2026 · 8:19 PM</span>
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        </div>

        <DashboardKPIs />

        <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <LeadsChart />
          </div>
          <div>
            <DestinationPerformance />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <LeadsTable />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}