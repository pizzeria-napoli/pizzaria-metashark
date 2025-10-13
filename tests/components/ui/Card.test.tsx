// RUTA: tests/components/ui/Card.test.tsx
/**
 * @file Card.test.tsx
 * @description Suite de pruebas de comportamiento para el componente Card y sus subcomponentes.
 *              v2.0.0 (Behavior-Driven): Reescrita para verificar la presencia de clases
 *              semánticas en lugar de estilos computados, haciéndola resiliente y
 *              alineada con el manifiesto de pruebas.
 * @version 2.0.0
 * @author L.I.A. Legacy
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

describe('Component: Card', () => {
  it('debe renderizar con la clase base `.card` y el contenido interno', () => {
    // Arrange
    render(<Card data-testid="card-container">Contenido de la tarjeta</Card>);

    // Act
    const cardElement = screen.getByTestId('card-container');

    // Assert
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveTextContent('Contenido de la tarjeta');
    // Se verifica la presencia de la clase semántica, no el estilo.
    expect(cardElement).toHaveClass('card');
  });

  it('debe renderizar CardHeader con su contenido', () => {
    // Arrange
    render(<CardHeader>Título del Header</CardHeader>);

    // Assert
    expect(screen.getByText('Título del Header')).toBeInTheDocument();
  });

  it('debe renderizar CardTitle con el rol de heading y su contenido', () => {
    // Arrange
    render(<CardTitle>Título Principal</CardTitle>);

    // Act
    const titleElement = screen.getByRole('heading', { name: /Título Principal/i });

    // Assert
    expect(titleElement).toBeInTheDocument();
  });

  it('debe renderizar CardContent con su contenido', () => {
    // Arrange
    render(<CardContent>Contenido principal del cuerpo.</CardContent>);

    // Assert
    expect(screen.getByText('Contenido principal del cuerpo.')).toBeInTheDocument();
  });

  it('debe ensamblar correctamente todos los subcomponentes', () => {
    // Arrange
    render(
      <Card>
        <CardHeader>
          <CardTitle>Ensamblaje Completo</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Este es el cuerpo.</p>
        </CardContent>
      </Card>
    );

    // Assert
    expect(screen.getByRole('heading', { name: /Ensamblaje Completo/i })).toBeInTheDocument();
    expect(screen.getByText('Este es el cuerpo.')).toBeInTheDocument();
  });
});
