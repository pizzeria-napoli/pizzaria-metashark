// RUTA: src/menu/application/useMenu.ts
'use client';
/**
 * @file useMenu.ts
 * @description Hook de React Query para obtener los datos del menú.
 *              Este es el puente entre la UI y la capa de aplicación.
 */
import { useQuery } from '@tanstack/react-query';
import { GetFullMenu } from './get-full-menu';
import { FirebaseMenuRepository } from '../infrastructure/FirebaseMenuRepository';
import { MenuItem } from '../domain/entities/MenuItem';
import { logger } from '@/shared/logging';

// Instanciamos fuera del hook para no recrearlo en cada render.
// En una app más grande, esto se haría a través de un contenedor de inyección de dependencias.
const menuRepository = new FirebaseMenuRepository();
const getFullMenu = new GetFullMenu(menuRepository);

export const MENU_QUERY_KEY = 'menu';

/**
 * Hook para obtener el menú completo.
 * Encapsula la llamada al caso de uso con React Query para caching,
 * estados de carga y manejo de errores.
 */
export const useMenu = () => {
  return useQuery<MenuItem[], Error>({
    queryKey: [MENU_QUERY_KEY],
    queryFn: async () => {
      logger.info('Fetching full menu via useMenu hook...');
      // El hook llama al caso de uso, respetando nuestra arquitectura DDD.
      const menu = await getFullMenu.execute();
      return menu;
    },
  });
};
