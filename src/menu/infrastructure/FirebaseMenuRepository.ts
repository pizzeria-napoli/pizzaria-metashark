// RUTA: src/menu/infrastructure/FirebaseMenuRepository.ts
/**
 * @file FirebaseMenuRepository.ts
 * @description Implementación del repositorio de menú utilizando Firestore.
 * @version 2.1.0 (Logger Unification)
 * @author L.I.A. Legacy
 */
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/shared/infrastructure/firebase/firebase';
import { zodConverter } from '@/shared/infrastructure/firebase/firestore.converter';
// --- ALINEAMIENTO ARQUITECTÓNICO ---
// Se importa el logger desde la SSoT canónica.
import { logger } from '@/shared/logging';
import { IMenuRepository } from '../domain/IMenuRepository';
import { MenuItem } from '../domain/entities/MenuItem';
import {
  menuItemEntitySchema,
  MenuItemEntity,
} from '../domain/entities/MenuItem.schema';
import { ProductId } from '@/shared/domain/types';

const MENU_COLLECTION = 'menuItems';

export class FirebaseMenuRepository implements IMenuRepository {
  private readonly collectionRef = collection(db, MENU_COLLECTION).withConverter(
    zodConverter<MenuItemEntity>(menuItemEntitySchema)
  );

  async findAll(): Promise<MenuItem[]> {
    const group = logger.startGroup('FirebaseMenuRepository.findAll');
    return logger.measure(
      'firestore.getDocs',
      async () => {
        try {
          const snapshot = await getDocs(this.collectionRef);
          if (snapshot.empty) {
            logger.warn('La colección de menú está vacía en Firestore.', { collection: MENU_COLLECTION }, group.groupId);
            return [];
          }

          const menuItems = snapshot.docs.map((doc) => {
            const data = doc.data();
            return new MenuItem(
              data.id, data.name, data.description, data.price, data.imageUrl, data.category
            );
          });

          logger.success(`Se recuperaron ${menuItems.length} ítems del menú.`, { count: menuItems.length }, group.groupId);
          return menuItems;
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          logger.error('Error al obtener el menú completo de Firestore.', { collection: MENU_COLLECTION, error: message }, group.groupId);
          return [];
        } finally {
          logger.endGroup(group.groupId);
        }
      },
      { collection: MENU_COLLECTION },
      group.groupId
    );
  }

  async findById(id: ProductId): Promise<MenuItem | null> {
    const group = logger.startGroup('FirebaseMenuRepository.findById', { id });
    return logger.measure(
      'firestore.getDoc',
      async () => {
        try {
          const docRef = doc(this.collectionRef, id);
          const snapshot = await getDoc(docRef);

          if (!snapshot.exists()) {
            logger.warn(`No se encontró el ítem del menú con ID: ${id}`, { collection: MENU_COLLECTION, id }, group.groupId);
            return null;
          }

          const data = snapshot.data();
          const menuItem = new MenuItem(
            data.id, data.name, data.description, data.price, data.imageUrl, data.category
          );

          logger.success(`Se recuperó el ítem del menú con ID: ${id}`, { id }, group.groupId);
          return menuItem;
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          logger.error('Error al obtener ítem por ID de Firestore.', { collection: MENU_COLLECTION, id, error: message }, group.groupId);
          return null;
        } finally {
          logger.endGroup(group.groupId);
        }
      },
      { id, collection: MENU_COLLECTION },
      group.groupId
    );
  }
}
