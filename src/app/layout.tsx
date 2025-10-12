// src/app/layout.tsx
import type { Metadata } from 'next';
import { Roboto, Dancing_Script } from 'next/font/google';
import './globals.css';
import { twMerge } from 'tailwind-merge';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dancing-script',
});

export const metadata: Metadata = {
  title: 'Pizzeria MetaShark - El Sabor del Futuro',
  description: 'La mejor pizza, entregada con la mejor tecnología.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Asegúrate de que no haya espacios ni saltos de línea entre <html> y <body>
    <html lang="es" className="dark">
      <body
        className={twMerge(
          'min-h-screen bg-background font-sans antialiased',
          roboto.variable,
          dancingScript.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
