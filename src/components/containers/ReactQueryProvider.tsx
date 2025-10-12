// RUTA: src/components/containers/ReactQueryProvider.tsx
'use client';
/**
 * @file ReactQueryProvider.tsx
 * @description Proveedor de contexto para TanStack Query (React Query).
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  // Usamos useState para asegurar que el QueryClient solo se cree una vez por render.
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutos
            refetchOnWindowFocus: process.env.NODE_ENV === 'production',
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
