// RUTA: src/components/layout/Header.tsx
/**
 * @file Header.tsx
 * @description Cabecera principal de la aplicación.
 * @version 6.0.0 (Sovereign Navigation Aligned)
 * @author L.I.A. Legacy
 */
'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
// --- ALINEAMIENTO ARQUITECTÓNICO ---
// Se importa 'Link' desde nuestra capa de abstracción `navigation`.
import { Link } from '@/navigation';
import { LanguageSwitcher } from '../business/LanguageSwitcher';
import { Button } from '../ui/button';
import { Icon } from '../ui/Icon';

export function Header() {
  const t = useTranslations('Header');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : systemTheme;
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold font-serif text-gradient">
          {t('title')}
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button onClick={toggleTheme} variant="outline" size="icon">
            <Icon name="Sun" className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Icon name="Moon" className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}
