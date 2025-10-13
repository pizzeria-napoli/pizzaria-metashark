// RUTA: src/menu/application/get-full-menu.action.ts
/**
 * @file get-full-menu.action.ts
 * @description Server Action para obtener el menú completo.
 *              Actúa como la única frontera segura entre el cliente y el caso de uso.
 * @version 1.2.0 (Logger Unification)
 * @author L.I.A. Legacy
 */
'use server';

import 'server-only';
import { GetFullMenu } from './get-full-menu';
import { FirebaseMenuRepository } from '../infrastructure/FirebaseMenuRepository';
import { MenuItemEntity } from '../domain/entities/MenuItem.schema';
// --- ALINEAMIENTO ARQUITECTÓNICO ---
// Se importa el logger desde la SSoT canónica.
import { logger } from '@/shared/logging';
import { MenuItem } from '../domain/entities/MenuItem';

/**
 * Ejecuta el caso de uso GetFullMenu en el servidor y devuelve los datos
 * como un objeto plano y serializable, seguro para ser enviado al cliente.
 *
 * @returns Una promesa que resuelve a un array de datos de MenuItem.
 */
export async function getFullMenuAction(): Promise<MenuItemEntity[]> {
  const group = logger.startGroup('getFullMenuAction');
  return logger.measure(
    'getFullMenuAction.execute',
    async () => {
      const menuRepository = new FirebaseMenuRepository();
      const getFullMenuUseCase = new GetFullMenu(menuRepository);
      const menuItems = await getFullMenuUseCase.execute();

      const result = menuItems.map((item: MenuItem): MenuItemEntity => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
        category: item.category,
      }));

      logger.endGroup(group.groupId);
      return result;
    },
    {},
    group.groupId
  );
}
