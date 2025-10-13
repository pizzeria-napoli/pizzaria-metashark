// RUTA: src/components/layout/MainLayout.tsx
/**
 * @file MainLayout.tsx
 * @description Layout principal que provee el Header y la estructura base.
 * @version 2.1.0 (Nivelación de Flexibilidad)
 * @author L.I.A. Legacy
 */
'use client';

import { Header } from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    // Se utiliza un fragmento y se añade flexbox al body para un control total del layout.
    // Esto permite que páginas como la Home puedan usar `flex-grow` para centrar contenido verticalmente.
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col flex-grow bg-background fade-in">
        {children}
      </main>
    </div>
  );
}
