import React from 'react';
import { motion } from 'framer-motion';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  delay?: number;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange, delay = 0 }) => {
  return (
    <motion.div 
      className="flex items-center space-x-2 mb-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[80px]">{label}:</label>
      <div className="flex items-center space-x-2">
        <motion.div
          className="relative w-10 h-10 rounded-md overflow-hidden border border-gray-300 dark:border-gray-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
          />
          <div 
            className="w-full h-full" 
            style={{ backgroundColor: value }}
          />
        </motion.div>
        <motion.input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white text-sm"
          whileFocus={{ scale: 1.03, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' }}
        />
      </div>
    </motion.div>
  );
};