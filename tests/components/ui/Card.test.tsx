/**
 * @file Card.test.tsx
 * @description Pruebas unitarias para validar estilos de Tailwind definidos en globals.css
 *              aplicados a componentes como Card y botones con clases personalizadas.
 * @version 1.0.1
 * @author RaZ Podestá - MetaShark Tech
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import '@testing-library/jest-dom';

// Mock para Next.js dynamic imports
vi.mock('next/dynamic', () => ({
  default: vi.fn((cb: () => unknown) => cb()),
}));

// Mock para Next.js Image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: any }) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Componente de prueba para validar estilos
const TestComponent = () => (
  <div>
    <Card className="card fade-in" data-testid="test-card">
      <CardHeader>
        <CardTitle>Test Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card content</p>
        <button className="btn-primary" data-testid="test-button">
          Test Button
        </button>
      </CardContent>
    </Card>
  </div>
);

describe('Tailwind CSS Styles from globals.css', () => {
  beforeEach(() => {
    // Limpiar clases de html antes de cada prueba
    document.documentElement.classList.remove('dark');
  });

  it('applies card styles correctly in light mode', () => {
    render(<TestComponent />);
    const card = screen.getByTestId('test-card');

    // Validar estilos de .card (definidos en @layer components)
    expect(card).toHaveStyle({
      backgroundColor: 'oklch(20% 0.006 286.3)', // --color-card
      color: 'oklch(98.5% 0 0)', // --color-card-foreground
      borderRadius: '0.5rem', // --radius-lg
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // --shadow-md
    });

    // Validar animación fade-in
    expect(card).toHaveStyle({
      animation: 'fade-in 300ms ease-in-out', // --animate-fade-in
    });
  });

  it('applies btn-primary styles correctly in light mode', () => {
    render(<TestComponent />);
    const button = screen.getByTestId('test-button');

    // Validar estilos de .btn-primary
    expect(button).toHaveStyle({
      backgroundColor: 'oklch(70.5% 0.213 47.604)', // --color-primary
      color: 'oklch(20.8% 0.042 265.755)', // --color-primary-foreground
      borderRadius: '0.375rem', // --radius-md
      padding: '0.5rem 1rem', // --spacing-2, --spacing-4
      fontWeight: '700', // bold
    });
  });

  it('applies dark mode styles correctly to card', () => {
    // Activar dark mode
    document.documentElement.classList.add('dark');
    render(<TestComponent />);
    const card = screen.getByTestId('test-card');

    // Validar estilos de .card en dark mode
    expect(card).toHaveStyle({
      backgroundColor: 'oklch(15% 0.006 286.3)', // --color-card en .dark
      color: 'oklch(98.5% 0 0)', // --color-card-foreground (sin cambio)
      borderRadius: '0.5rem', // --radius-lg (sin cambio)
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // --shadow-md
    });
  });

  it('applies dark mode styles correctly to btn-primary', () => {
    document.documentElement.classList.add('dark');
    render(<TestComponent />);
    const button = screen.getByTestId('test-button');

    // Validar estilos de .btn-primary en dark mode
    expect(button).toHaveStyle({
      backgroundColor: 'oklch(75% 0.213 47.604)', // --color-primary en .dark
      color: 'oklch(20.8% 0.042 265.755)', // --color-primary-foreground
      borderRadius: '0.375rem', // --radius-md
    });
  });

  it('applies text-gradient utility correctly', () => {
    render(<span className="text-gradient" data-testid="test-gradient">Gradient</span>);
    const gradient = screen.getByTestId('test-gradient');

    // Validar estilo de gradiente
    expect(gradient).toHaveStyle({
      background: 'linear-gradient(to right, oklch(70.5% 0.213 47.604), oklch(65% 0.15 140))',
      '-webkit-background-clip': 'text',
      'background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    });
  });
});
