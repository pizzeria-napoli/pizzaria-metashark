// RUTA: src/navigation.ts
/**
 * @file navigation.ts
 * @description Capa de Abstracción y SSoT para utilidades de navegación ISOMÓRFICAS.
 *              Este aparato exporta miembros seguros para Servidor y Cliente, importando
 *              directamente desde la API nativa de Next.js, que es la única SSoT validada.
 * @version 8.0.0 (Forensic Truth Aligned)
 * @author L.I.A. Legacy
 */
import Link from 'next/link';
import { redirect } from 'next/navigation';

export { Link, redirect };
