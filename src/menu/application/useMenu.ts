// RUTA: src/menu/application/useMenu.ts
/**
 * @file useMenu.ts
 * @description Hook de aplicación que provee el menú del restaurante a la UI.
 *              v3.0.0 (Server Action Aligned): Llama a la Server Action para obtener
 *              los datos, respetando la frontera cliente-servidor.
 * @version 3.0.0
 * @author L.I.A. Legacy
 */
import { useQuery } from '@tanstack/react-query';
import { MenuItem } from '../domain/entities/MenuItem';
import { getFullMenuAction } from './get-full-menu.action';
import { MenuItemEntity } from '../domain/entities/MenuItem.schema';

/**
 * Hook personalizado para obtener el menú completo con caché optimizado.
 * Utiliza React Query para invocar la Server Action y gestionar el estado.
 *
 * @returns La API de React Query, donde `data` es un array de instancias de la clase `MenuItem`.
 */
export const useMenu = () => {
  return useQuery<MenuItem[], Error>({
    queryKey: ['menu'],
    queryFn: async () => {
      const menuData: MenuItemEntity[] = await getFullMenuAction();
      return menuData.map(
        (data) =>
          new MenuItem(
            data.id,
            data.name,
            data.description,
            data.price,
            data.imageUrl,
            data.category
          )
      );
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
