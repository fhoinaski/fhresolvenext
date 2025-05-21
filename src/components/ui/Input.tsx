import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'w-full rounded-lg border border-[var(--color-neutral)]/30 bg-white px-4 py-2 text-[var(--color-text)] shadow-sm transition-colors placeholder:text-[var(--color-text)]/50 focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      inputSize: {  // Renomeado para evitar conflito com a propriedade nativa size
        sm: 'h-8 text-sm',
        md: 'h-10 text-base',
        lg: 'h-12 text-lg',
      },
      error: {
        true: 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20',
      },
    },
    defaultVariants: {
      inputSize: 'md',
    },
  }
);

// Omit a propriedade size do VariantProps e adicione inputSize explicitamente
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: 'sm' | 'md' | 'lg';
  error?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
  size?: number; // Mantém a propriedade nativa size, mas opcional
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize, error, errorMessage, label, helperText, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-[var(--color-text)]">
            {label}
          </label>
        )}
        <input
          className={cn(inputVariants({ inputSize, error, className }))}
          ref={ref}
          {...props}
        />
        {(error && errorMessage) || helperText ? (
          <p
            className={cn(
              'text-sm',
              error
                ? 'text-[var(--color-error)]'
                : 'text-[var(--color-text)]/70'
            )}
          >
            {error ? errorMessage : helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };