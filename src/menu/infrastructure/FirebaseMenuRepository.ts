// RUTA: src/menu/infrastructure/FirebaseMenuRepository.ts
/**
 * @file FirebaseMenuRepository.ts
 * @description Implementación del repositorio de menú. Utiliza un FirestoreDataConverter
 *              para garantizar un tipado y validación estrictos en la frontera con la base de datos.
 */
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/shared/infrastructure/firebase/firebase';
import { MenuItem } from '../domain/entities/MenuItem';
import { IMenuRepository } from '../domain/IMenuRepository';
import { menuItemEntitySchema, MenuItemEntity } from '../domain/entities/MenuItem.schema';
import { logger } from '@/shared/logging';
import { ProductId } from '@/shared/domain/types';
import { zodConverter } from '@/shared/infrastructure/firebase/firestore.converter';

// Creamos una referencia a la colección con el convertidor.
// A partir de este punto, todas las operaciones (getDoc, getDocs)
// devolverán datos estrictamente tipados como MenuItemEntity.
const menuItemConverter = zodConverter<MenuItemEntity>(menuItemEntitySchema);

export class FirebaseMenuRepository implements IMenuRepository {
  private readonly collectionName = 'products';
  private readonly productsCollectionRef = collection(db, this.collectionName).withConverter(menuItemConverter);

  private toDomain(entity: MenuItemEntity): MenuItem {
    return new MenuItem(entity.id, entity.name, entity.description, entity.price, entity.imageUrl, entity.category);
  }

  async findAll(): Promise<MenuItem[]> {
    try {
      return await logger.measure('Firebase.findAll', async () => {
        const querySnapshot = await getDocs(this.productsCollectionRef);
        // querySnapshot.docs ya contiene objetos MenuItemEntity tipados y validados.
        // ¡No más validación manual en esta capa!
        return querySnapshot.docs.map(doc => this.toDomain(doc.data()));
      }, { collection: this.collectionName });
    } catch (error) {
      // El logger ya ha capturado el error (ya sea de Firestore o de validación Zod).
      // Simplemente devolvemos un estado seguro.
      return [];
    }
  }

  async findById(id: ProductId): Promise<MenuItem | null> {
    try {
      return await logger.measure('Firebase.findById', async () => {
        const docRef = doc(this.productsCollectionRef, id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          return null;
        }

        // docSnap.data() ya está tipado y validado. ¡Cero 'any'!
        return this.toDomain(docSnap.data());
      }, { collection: this.collectionName, documentId: id });
    } catch (error) {
      return null;
    }
  }
}
