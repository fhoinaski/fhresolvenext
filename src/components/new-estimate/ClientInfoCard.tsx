// components/new-estimate/ClientInfoCard.tsx
import { User, Phone, Mail, Home, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { EstimateFormValues } from '@/types/estimate';

interface ClientInfoCardProps {
  register: UseFormRegister<EstimateFormValues>;
  errors: FieldErrors<EstimateFormValues>;
}

export default function ClientInfoCard({ register, errors }: ClientInfoCardProps) {
  return (
    <Card>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-[var(--color-card-text)]">
          <User size={18} className="text-[var(--color-accent)]" />
          Dados do Cliente
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="clientName" className="block text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-1">
              Nome do Cliente
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={16} className="text-[var(--color-secondary)]" />
              </div>
              <input
                id="clientName"
                {...register('clientName')}
                className={`w-full pl-10 px-3 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] ${
                  errors.clientName ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                }`}
              />
            </div>
            {errors.clientName && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <X size={14} /> {errors.clientName.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="clientPhone" className="block text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-1">
              Telefone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone size={16} className="text-[var(--color-secondary)]" />
              </div>
              <input
                id="clientPhone"
                {...register('clientPhone')}
                className={`w-full pl-10 px-3 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] ${
                  errors.clientPhone ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                }`}
              />
            </div>
            {errors.clientPhone && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <X size={14} /> {errors.clientPhone.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="clientEmail" className="block text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-1">
              Email (opcional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={16} className="text-[var(--color-secondary)]" />
              </div>
              <input
                id="clientEmail"
                type="email"
                {...register('clientEmail')}
                className={`w-full pl-10 px-3 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] ${
                  errors.clientEmail ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                }`}
              />
            </div>
            {errors.clientEmail && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <X size={14} /> {errors.clientEmail.message}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-1">
              Endereço (opcional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Home size={16} className="text-[var(--color-secondary)]" />
              </div>
              <input
                id="address"
                {...register('address')}
                className="w-full pl-10 px-3 py-2 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}