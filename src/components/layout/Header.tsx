// RUTA: src/components/layout/Header.tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Header() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    const initialDark = storedTheme ? storedTheme === 'dark' : prefersDark;
    setIsDark(initialDark);
    document.documentElement.classList.toggle('dark', initialDark);
  }, []);

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  return (
    <header className="bg-background shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={`/${locale}`} className="text-3xl font-bold text-primary font-serif text-gradient">
          {t('title')}
        </Link>
        <button onClick={toggleDarkMode} className="btn-primary fade-in">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>
    </header>
  );
}
