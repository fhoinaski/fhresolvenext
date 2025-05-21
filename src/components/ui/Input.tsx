import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'w-full rounded-lg border border-[var(--color-neutral)]/30 bg-white px-4 py-2 text-[var(--color-text)] shadow-sm transition-colors placeholder:text-[var(--color-text)]/50 focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 text-sm',
        md: 'h-10 text-base',
        lg: 'h-12 text-lg',
      },
      error: {
        true: 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, error, errorMessage, label, helperText, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-[var(--color-text)]">
            {label}
          </label>
        )}
        <input
          className={cn(inputVariants({ size, error, className }))}
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