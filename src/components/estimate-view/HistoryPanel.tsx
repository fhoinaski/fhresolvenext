// components/estimate-view/HistoryPanel.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, ChevronUp, ChevronDown, X } from 'lucide-react';
import { HistoryEntry } from '@/types/estimate';
import { formatDateTime } from '@/app/utils/formatters';


interface HistoryPanelProps {
  showHistory: boolean;
  history?: HistoryEntry[];
  historyExpanded: boolean;
  setHistoryExpanded: (expanded: boolean) => void;
  setShowHistory: (show: boolean) => void;
}

export default function HistoryPanel({
  showHistory,
  history = [],
  historyExpanded,
  setHistoryExpanded,
  setShowHistory
}: HistoryPanelProps) {
  return (
    <AnimatePresence>
      {showHistory && (
        <motion.div 
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="bg-blue-50 border-l-4 border-blue-500 rounded-md shadow-sm overflow-hidden"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
          >
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex">
                  <PenTool className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Histórico de modificações</h3>
                    <div className="mt-2 text-sm text-blue-700 space-y-1">
                      {(historyExpanded ? history : history?.slice(0, 2))?.map((entry, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <span className="inline-block w-3 h-3 bg-blue-200 rounded-full mr-2 mt-1.5"></span>
                          <div>
                            <p className="text-blue-800">{entry.action}</p>
                            <p className="text-xs text-blue-600">{formatDateTime(entry.date)} - {entry.by}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    {history.length > 2 && (
                      <button 
                        onClick={() => setHistoryExpanded(!historyExpanded)}
                        className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        {historyExpanded ? (
                          <>Mostrar menos <ChevronUp size={14} className="ml-1" /></>
                        ) : (
                          <>Ver histórico completo <ChevronDown size={14} className="ml-1" /></>
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => setShowHistory(false)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}