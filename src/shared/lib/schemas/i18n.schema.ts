// RUTA: src/shared/lib/schemas/i18n.schema.ts (ACTUALIZADO)
/**
 * @file i18n.schema.ts
 * @description Aparato ensamblador y SSoT para el contrato del diccionario i18n.
 * @version 2.2.0 (Status Metadata Integration): Se integra el schema para la metadata
 *              de las páginas de estado.
 * @author L.I.A. Legacy
 */
import { z } from 'zod';

// Schemas atómicos existentes
const HeaderSchema = z.object({ title: z.string() });
const HomePageSchema = z.object({ title: z.string(), subtitle: z.string(), menuButton: z.string() });
const MenuPageSchema = z.object({ title: z.string() });
const ProductCardSchema = z.object({ addButton: z.string() });
const MenuListSchema = z.object({ loading: z.string(), error: z.string(), empty: z.string() });
const NotFoundPageSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  homeButton: z.string(),
});

// --- NUEVO SCHEMA ATÓMICO ---
const StatusLayoutSchema = z.object({
  metadataTitle: z.string(),
});


// --- SCHEMA ENSAMBLADOR MAESTRO (ACTUALIZADO) ---
export const i18nSchema = z.object({
  Header: HeaderSchema,
  HomePage: HomePageSchema,
  MenuPage: MenuPageSchema,
  ProductCard: ProductCardSchema,
  MenuList: MenuListSchema,
  NotFoundPage: NotFoundPageSchema,
  // Se integra el nuevo schema al contrato principal.
  StatusLayout: StatusLayoutSchema,
});

export type Dictionary = z.infer<typeof i18nSchema>;
