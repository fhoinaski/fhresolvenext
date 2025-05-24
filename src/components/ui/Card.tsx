import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Card({ title, description, footer, children, className = '' }: CardProps) {
  return (
    <div className={`bg-card-bg text-card-text dark:bg-gray-800 dark:text-text-light rounded-lg border border-neutral/30 dark:border-gray-700 shadow-custom-sm overflow-hidden ${className}`}>
      {(title || description) && (
        <div className="px-6 py-4 border-b border-neutral/30 dark:border-gray-700">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && <p className="mt-1 text-sm opacity-80">{description}</p>}
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && <div className="px-6 py-3 bg-gray-custom/20 dark:bg-gray-900 border-t border-neutral/30 dark:border-gray-700">{footer}</div>}
    </div>
  );
}
