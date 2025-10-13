// RUTA: src/shared/domain/types.ts
/**
 * @file types.ts
 * @description Define los tipos y esquemas Zod base compartidos a través de todo el dominio.
 *              Esta es la Única Fuente de Verdad para los tipos primitivos de dominio,
 *              implementando Branded Types para una seguridad de tipos máxima.
 * @version 2.0.0 (Branded Types Implementation)
 * @author L.I.A. Legacy
 */
import { z } from 'zod';

// --- ESQUEMAS BASE PARA IDENTIFICADORES (SSoT con Branding) ---

/**
 * El esquema Zod para un ProductId. La única fuente de verdad para este tipo.
 * El `.brand('ProductId')` añade una "marca" a nivel de tipo que lo diferencia de un string normal.
 */
export const ProductIdSchema = z.string().brand('ProductId');

/** El esquema Zod para un OrderId. */
export const OrderIdSchema = z.string().brand('OrderId');

/** El esquema Zod para un UserId. */
export const UserIdSchema = z.string().brand('UserId');


// --- TIPOS PRIMITIVOS DE DOMINIO (INFERIDOS Y "BRANDED") ---

/** Identificador único para un producto. Inferido directamente de su esquema. */
export type ProductId = z.infer<typeof ProductIdSchema>;

/** Identificador único para un pedido. */
export type OrderId = z.infer<typeof OrderIdSchema>;

/** Identificador único para un usuario. */
export type UserId = z.infer<typeof UserIdSchema>;


// --- ENUMS PARA ESTADOS CONTROLADOS (Sin cambios) ---

/** Define los posibles estados de un pedido en su ciclo de vida. */
export enum OrderStatus {
  Pending = 'PENDING',
  Confirmed = 'CONFIRMED',
  Preparing = 'PREPARING',
  OnTheWay = 'ON_THE_WAY',
  Delivered = 'DELIVERED',
  Cancelled = 'CANCELLED',
}
