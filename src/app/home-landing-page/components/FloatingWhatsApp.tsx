'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);

  const QUICK_MESSAGES = [
    { label: '🌍 Explore Packages', msg: "Hi TourVista! I\'d like to explore your tour packages." },
    { label: '✏️ Plan a Custom Trip', msg: "Hi TourVista! I want to plan a custom trip. Can you help?" },
    { label: '💰 Get a Quote', msg: "Hi TourVista! Can I get a price quote for a trip?" },
    { label: '📞 Request a Callback', msg: "Hi TourVista! Please call me back at your earliest convenience." },
  ];

  const openWhatsApp = (msg: string) => {
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-white rounded-2xl shadow-glass w-72 overflow-hidden"
          >
            <div className="bg-[#075E54] px-4 py-3 flex items-center justify-between">
              <div>
                <div className="text-white font-semibold text-sm">TourVista Support</div>
                <div className="text-green-200 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-300 rounded-full" />
                  Typically replies in 10 mins
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="p-3 space-y-2">
              <p className="text-gray-500 text-xs px-1 mb-3">Choose a quick message to start chatting:</p>
              {QUICK_MESSAGES.map((qm) => (
                <button
                  key={`qm-${qm.label}`}
                  onClick={() => openWhatsApp(qm.msg)}
                  className="w-full text-left px-4 py-2.5 rounded-xl bg-gray-50 hover:bg-[#dcf8c6] text-gray-700 text-sm font-medium transition-colors border border-gray-100"
                >
                  {qm.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg pulse-ring"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open WhatsApp chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
              <MessageCircle size={26} className="text-white fill-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}