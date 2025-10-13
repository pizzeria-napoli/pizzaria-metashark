// RUTA: src/components/ui/dropdown-menu.tsx
/**
 * @file dropdown-menu.tsx
 * @description Componente de UI primitivo para menús desplegables.
 *              Naturalizado para alinearse con la arquitectura del proyecto,
 *              con higiene de código y documentación de élite.
 * @version 2.0.0 (Holistic Alignment)
 * @author Shadcn UI & L.I.A. Legacy
 */
'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
// --- PILAR DE HIGIENE: Se eliminan importaciones de iconos no utilizados ---
// import { Check, ChevronRight, Circle } from 'lucide-react';

// --- PILAR DE ARQUITECTURA: Se corrige la ruta de importación a la SSoT ---
import { cn } from '@/shared/lib/utils';

/** Contenedor raíz para todos los componentes del menú desplegable. */
const DropdownMenu = DropdownMenuPrimitive.Root;

/** Botón o elemento que activa la apertura del menú desplegable. */
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

/** Utilizado para agrupar secciones lógicas de ítems dentro del menú. */
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

/** Portal que renderiza el contenido del menú en el nivel superior del DOM. */
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

/** Contenedor para sub-menús anidados. */
const DropdownMenuSub = DropdownMenuPrimitive.Sub;

/** Agrupa un conjunto de DropdownMenuRadioItem. */
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

/**
 * El contenido flotante del menú. Aplica nuestro theming (popover, border)
 * y animaciones de entrada/salida.
 */
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

/**
 * Un ítem accionable dentro del menú.
 */
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

/**
 * Un título no interactivo para una sección del menú.
 */
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

/**
 * Un separador visual entre grupos de ítems.
 */
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

/**
 * Muestra un atajo de teclado a la derecha del ítem.
 */
const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
};
