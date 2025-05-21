// components/estimate-view/NotesSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Estimate } from '@/types/estimate';

interface NotesSectionProps {
  estimate: Estimate;
}

export default function NotesSection({ estimate }: NotesSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Observações */}
      {estimate.notes && (
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-medium mb-4 border-b pb-2 text-gray-800">Observações</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-line">{estimate.notes}</p>
          </div>
        </motion.div>
      )}
      
      {/* Termos e Condições */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-medium mb-4 border-b pb-2 text-gray-800">Termos e Condições</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-3 text-gray-700">
            <p>1. A aceitação deste orçamento implica na concordância com os termos e valores apresentados.</p>
            <p>2. O prazo de validade deste orçamento está especificado acima. Após este prazo, os valores podem sofrer alterações.</p>
            <p>3. Valores de materiais podem sofrer alterações conforme disponibilidade e preços de mercado.</p>
            <p>4. Quaisquer alterações no escopo dos serviços podem implicar em revisão dos valores e prazos.</p>
            <p>5. As condições de pagamento estão descritas neste orçamento e devem ser seguidas conforme acordo.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}