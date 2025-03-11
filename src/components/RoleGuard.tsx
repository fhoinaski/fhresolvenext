// src/components/RoleGuard.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallbackUrl?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  allowedRoles, 
  fallbackUrl = '/dashboard' 
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (status === 'authenticated') {
      const hasRequiredRole = session?.user?.role && allowedRoles.includes(session.user.role);
      setIsAuthorized(hasRequiredRole);
      
      if (!hasRequiredRole) {
        router.push(fallbackUrl);
      }
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session, status, router, allowedRoles, fallbackUrl]);

  if (status === 'loading' || isAuthorized === null) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-10 w-10 animate-spin text-[var(--color-accent)]" />
          <p className="text-[var(--color-text)]/70 text-sm">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  if (isAuthorized) {
    return <>{children}</>;
  }

  return null;
};