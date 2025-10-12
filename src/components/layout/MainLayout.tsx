// RUTA: src/components/layout/MainLayout.tsx
'use client';

import { Header } from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background fade-in">
        {children}
      </main>
    </>
  );
}
