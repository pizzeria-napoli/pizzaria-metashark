// RUTA: src/components/ui/Card.tsx
/**
 * @file Card.tsx
 * @description Componente de UI para tarjetas. Consume las clases de componente
 *              definidas en globals.css para mantener una única fuente de verdad.
 * @version 2.0.0 (Component-Layer Aligned)
 */
'use client';
import { twMerge } from 'tailwind-merge';
import React from 'react';

// --- Interfaces para Props ---
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

// --- Componente Principal ---
export function Card({ className, children, ...props }: CardProps) {
  // Consume la clase .card de globals.css y permite extensiones vía twMerge.
  return (
    <div className={twMerge('card', className)} {...props}>
      {children}
    </div>
  );
}

// --- Sub-componentes ---
export function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div className={twMerge('p-6 border-b border-border', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: CardTitleProps) {
  // Los estilos de tipografía base vienen de @layer base, aquí solo ajustamos.
  return (
    <h3 className={twMerge('text-2xl font-semibold leading-none tracking-tight', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children, ...props }: CardProps) {
  // El padding superior se elimina para no duplicar el del header.
  return (
    <div className={twMerge('p-6 pt-0 prose dark:prose-invert', className)} {...props}>
      {children}
    </div>
  );
}
