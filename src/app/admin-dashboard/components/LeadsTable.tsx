'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronUp, ChevronDown, MessageCircle, Phone, Eye, Trash2, ChevronLeft, ChevronRight, CheckSquare, Square, Download } from 'lucide-react';
import { toast } from 'sonner';

// Backend integration point: replace with /api/leads fetch with pagination + filters
const LEADS_DATA = [
  {
    id: 'lead-001',
    name: 'Priya Sharma',
    phone: '+91 98234 56710',
    destination: 'Bali, Indonesia',
    budget: '$1,000–$1,500',
    duration: '7 days',
    status: 'new',
    source: 'WhatsApp',
    date: 'Apr 16, 2026',
    message: 'Looking for a honeymoon package with private villa stay.',
  },
  {
    id: 'lead-002',
    name: 'Arjun Kapoor',
    phone: '+91 77654 32109',
    destination: 'Dubai, UAE',
    budget: '$500–$1,000',
    duration: '6 days',
    status: 'contacted',
    source: 'Website Form',
    date: 'Apr 16, 2026',
    message: 'Family trip for 4 adults, interested in desert safari.',
  },
  {
    id: 'lead-003',
    name: 'Meera Nair',
    phone: '+91 99001 23456',
    destination: 'Maldives',
    budget: '$3,000+',
    duration: '5 days',
    status: 'converted',
    source: 'WhatsApp',
    date: 'Apr 15, 2026',
    message: 'Luxury overwater villa for anniversary.',
  },
  {
    id: 'lead-004',
    name: 'Rohan Gupta',
    phone: '+91 88123 45678',
    destination: 'Tokyo, Japan',
    budget: '$1,500–$3,000',
    duration: '10 days',
    status: 'contacted',
    source: 'Website Form',
    date: 'Apr 15, 2026',
    message: 'Solo traveler, interested in cultural immersion.',
  },
  {
    id: 'lead-005',
    name: 'Sunita Patel',
    phone: '+91 70011 98765',
    destination: 'Santorini, Greece',
    budget: '$2,000–$3,000',
    duration: '8 days',
    status: 'new',
    source: 'WhatsApp',
    date: 'Apr 14, 2026',
    message: 'Couple trip, want sunset views and wine tours.',
  },
  {
    id: 'lead-006',
    name: 'Vikram Singh',
    phone: '+91 93456 78901',
    destination: 'Swiss Alps',
    budget: '$3,000+',
    duration: '7 days',
    status: 'closed',
    source: 'Website Form',
    date: 'Apr 14, 2026',
    message: 'Group of 6, skiing and snowboarding.',
  },
  {
    id: 'lead-007',
    name: 'Ananya Iyer',
    phone: '+91 86543 21098',
    destination: 'Rajasthan, India',
    budget: 'Under $500',
    duration: '9 days',
    status: 'converted',
    source: 'WhatsApp',
    date: 'Apr 13, 2026',
    message: 'Heritage tour with family, 2 kids.',
  },
  {
    id: 'lead-008',
    name: 'Kabir Malhotra',
    phone: '+91 91234 56789',
    destination: 'Phuket, Thailand',
    budget: '$500–$1,000',
    duration: '6 days',
    status: 'new',
    source: 'Website Form',
    date: 'Apr 13, 2026',
    message: 'Beach holiday, looking for budget options.',
  },
  {
    id: 'lead-009',
    name: 'Divya Menon',
    phone: '+91 79876 54321',
    destination: 'Paris, France',
    budget: '$1,500–$3,000',
    duration: '7 days',
    status: 'contacted',
    source: 'WhatsApp',
    date: 'Apr 12, 2026',
    message: 'Romantic trip for two, interested in art & cuisine.',
  },
  {
    id: 'lead-010',
    name: 'Nikhil Desai',
    phone: '+91 82345 67890',
    destination: 'Bali, Indonesia',
    budget: '$1,000–$1,500',
    duration: '7 days',
    status: 'closed',
    source: 'Website Form',
    date: 'Apr 11, 2026',
    message: 'Group of 10, company retreat.',
  },
];

const STATUS_CONFIG: Record<string, { label: string; classes: string }> = {
  new: { label: 'New', classes: 'bg-primary-50 text-primary-700 border border-primary-200' },
  contacted: { label: 'Contacted', classes: 'bg-amber-50 text-amber-700 border border-amber-200' },
  converted: { label: 'Converted', classes: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  closed: { label: 'Closed', classes: 'bg-gray-100 text-gray-500 border border-gray-200' },
};

const STATUS_CYCLE: Record<string, string> = {
  new: 'contacted',
  contacted: 'converted',
  converted: 'closed',
  closed: 'new',
};

type SortDir = 'asc' | 'desc';

export default function LeadsTable() {
  const [leads, setLeads] = useState(LEADS_DATA);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortKey, setSortKey] = useState<string>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [openStatusDropdown, setOpenStatusDropdown] = useState<string | null>(null);
  const perPage = 8;

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = leads
    .filter((l) => {
      const q = search.toLowerCase();
      return (
        (statusFilter === 'all' || l.status === statusFilter) &&
        (l.name.toLowerCase().includes(q) || l.destination.toLowerCase().includes(q) || l.phone.includes(q))
      );
    })
    .sort((a, b) => {
      const mul = sortDir === 'asc' ? 1 : -1;
      if (sortKey === 'name') return mul * a.name.localeCompare(b.name);
      if (sortKey === 'destination') return mul * a.destination.localeCompare(b.destination);
      if (sortKey === 'status') return mul * a.status.localeCompare(b.status);
      return mul * (b.id > a.id ? 1 : -1);
    });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === paginated.length) setSelected(new Set());
    else setSelected(new Set(paginated.map((l) => l.id)));
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status: newStatus } : l));
    setOpenStatusDropdown(null);
    toast.success(`Lead status updated to "${STATUS_CONFIG[newStatus].label}"`);
  };

  const handleBulkDelete = () => {
    setLeads((prev) => prev.filter((l) => !selected.has(l.id)));
    toast.success(`${selected.size} lead${selected.size > 1 ? 's' : ''} deleted`);
    setSelected(new Set());
  };

  const handleWhatsApp = (lead: typeof LEADS_DATA[0]) => {
    // Backend integration point: log WhatsApp outreach click
    const msg = encodeURIComponent(
      `Hi ${lead.name}! This is TourVista. You recently enquired about a trip to ${lead.destination}. I'd love to help plan your perfect journey! When would be a good time to chat?`
    );
    window.open(`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=${msg}`, '_blank');
  };

  const SortIcon = ({ col }: { col: string }) => (
    <span className="ml-1 inline-flex flex-col">
      <ChevronUp size={10} className={sortKey === col && sortDir === 'asc' ? 'text-primary-600' : 'text-gray-300'} />
      <ChevronDown size={10} className={sortKey === col && sortDir === 'desc' ? 'text-primary-600' : 'text-gray-300'} />
    </span>
  );

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3">
        <div>
          <h3 className="font-display font-bold text-gray-900 text-base">Lead Management</h3>
          <p className="text-gray-400 text-xs mt-0.5">{filtered.length} total leads</p>
        </div>
        <div className="sm:ml-auto flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search leads..."
              className="pl-8 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition-all w-44"
            />
          </div>
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-200 bg-white"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      {/* Bulk action bar */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-primary-50 border-b border-primary-100 px-6 py-3 flex items-center gap-4 overflow-hidden"
          >
            <span className="text-primary-700 text-sm font-semibold">{selected.size} selected</span>
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-1.5 text-sm text-red-600 font-medium hover:text-red-700 transition-colors"
            >
              <Trash2 size={14} />
              Delete selected
            </button>
            <button
              onClick={() => setSelected(new Set())}
              className="ml-auto text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Clear selection
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className="px-4 py-3 w-10">
                <button onClick={toggleAll} className="text-gray-400 hover:text-primary-600 transition-colors">
                  {selected.size === paginated.length && paginated.length > 0
                    ? <CheckSquare size={16} className="text-primary-600" />
                    : <Square size={16} />}
                </button>
              </th>
              {[
                { key: 'name', label: 'Lead' },
                { key: 'destination', label: 'Destination' },
                { key: 'budget', label: 'Budget' },
                { key: 'duration', label: 'Duration' },
                { key: 'status', label: 'Status' },
                { key: 'source', label: 'Source' },
                { key: 'date', label: 'Date' },
              ].map((col) => (
                <th
                  key={`th-${col.key}`}
                  onClick={() => handleSort(col.key)}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-800 select-none whitespace-nowrap"
                >
                  <span className="flex items-center">
                    {col.label}
                    <SortIcon col={col.key} />
                  </span>
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-16 text-center">
                  <div className="text-gray-400 text-sm">No leads match your search.</div>
                  <button onClick={() => { setSearch(''); setStatusFilter('all'); }} className="mt-2 text-primary-500 text-sm font-medium">
                    Clear filters
                  </button>
                </td>
              </tr>
            ) : (
              paginated.map((lead, i) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className={`border-b border-gray-50 hover:bg-gray-50/70 transition-colors group ${selected.has(lead.id) ? 'bg-primary-50/40' : ''}`}
                >
                  <td className="px-4 py-3.5">
                    <button onClick={() => toggleSelect(lead.id)} className="text-gray-300 hover:text-primary-500 transition-colors">
                      {selected.has(lead.id)
                        ? <CheckSquare size={15} className="text-primary-600" />
                        : <Square size={15} />}
                    </button>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xs shrink-0">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm whitespace-nowrap">{lead.name}</div>
                        <div className="text-gray-400 text-xs">{lead.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-700 whitespace-nowrap">{lead.destination}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600 whitespace-nowrap tabular-nums">{lead.budget}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600 whitespace-nowrap">{lead.duration}</td>
                  <td className="px-4 py-3.5">
                    <div className="relative">
                      <button
                        onClick={() => setOpenStatusDropdown(openStatusDropdown === lead.id ? null : lead.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all hover:opacity-80 ${STATUS_CONFIG[lead.status].classes}`}
                      >
                        {STATUS_CONFIG[lead.status].label}
                        <ChevronDown size={10} />
                      </button>
                      <AnimatePresence>
                        {openStatusDropdown === lead.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-glass border border-gray-100 z-20 min-w-[140px] overflow-hidden"
                          >
                            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                              <button
                                key={`status-opt-${lead.id}-${key}`}
                                onClick={() => handleStatusChange(lead.id, key)}
                                className={`w-full text-left px-3.5 py-2 text-xs font-medium transition-colors hover:bg-gray-50 ${lead.status === key ? 'text-primary-600 bg-primary-50/50' : 'text-gray-700'}`}
                              >
                                {cfg.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${lead.source === 'WhatsApp' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-400 whitespace-nowrap">{lead.date}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleWhatsApp(lead)}
                        title="Send WhatsApp message"
                        className="w-7 h-7 rounded-lg bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors"
                      >
                        <MessageCircle size={13} />
                      </button>
                      <button
                        title="Call lead"
                        className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                      >
                        <Phone size={13} />
                      </button>
                      <button
                        title="View lead details"
                        className="w-7 h-7 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        title="Delete lead — this cannot be undone"
                        onClick={() => {
                          setLeads((prev) => prev.filter((l) => l.id !== lead.id));
                          toast.success('Lead deleted');
                        }}
                        className="w-7 h-7 rounded-lg bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-gray-400 text-sm">
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length} leads
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={15} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={`page-${i + 1}`}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  page === i + 1
                    ? 'bg-primary-500 text-white' :'border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}