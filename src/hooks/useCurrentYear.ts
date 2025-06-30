'use client';

import { useEffect, useState } from 'react';

/**
 * Hook para obter o ano atual de forma segura para SSR
 * Evita problemas de hidratação ao renderizar datas no servidor vs cliente
 */
export function useCurrentYear(): number {
  const [year, setYear] = useState<number>(2025); // Valor padrão fixo

  useEffect(() => {
    // Só atualiza o ano no cliente
    setYear(new Date().getFullYear());
  }, []);

  return year;
}
