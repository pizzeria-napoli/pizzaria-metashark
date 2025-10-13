// RUTA: src/app/layout.tsx
/**
 * @file layout.tsx
 * @description Layout raíz NO localizado. Única Fuente de Verdad para las etiquetas <html> y <body>.
 *              Este aparato está instrumentado con un trazador de ciclo de vida para
 *              garantizar la observabilidad completa del renderizado en el servidor.
 * @version 6.0.0 (Holistic Observability & Full Compliance)
 * @author RaZ Podestá - MetaShark Tech & L.I.A. Legacy
 */
import type { Metadata } from 'next';
import { Roboto, Dancing_Script } from 'next/font/google';
import './globals.css';
import { twMerge } from 'tailwind-merge';
import { defaultLocale } from '../i18n.config';
import { LifecycleTracer } from '@/components/containers/LifecycleTracer';

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
    <LifecycleTracer componentName="RootLayout" context={{ lang: defaultLocale }}>
      <html lang={defaultLocale} className="dark">
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
    </LifecycleTracer>
  );
}
