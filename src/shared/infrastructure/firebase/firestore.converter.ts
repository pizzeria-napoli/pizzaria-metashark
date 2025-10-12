// RUTA: src/shared/infrastructure/firebase/firestore.converter.ts
/**
 * @file firestore.converter.ts
 * @description Define un convertidor de datos genérico para Firestore que integra Zod
 *              para un tipado y validación robustos en la frontera de la base de datos.
 */
import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentData,
} from 'firebase/firestore';
import { z } from 'zod';

/**
 * Crea un convertidor de Firestore que valida los datos entrantes con un esquema Zod.
 * @template T El tipo de la entidad inferido desde el esquema Zod.
 * @param schema El esquema Zod utilizado para la validación.
 * @returns Un objeto FirestoreDataConverter para ser usado con `.withConverter()`.
 */
export const zodConverter = <T>(
  schema: z.ZodType<T>
): FirestoreDataConverter<T> => ({
  /**
   * Serializa la entidad de dominio a un objeto plano para Firestore.
   * @param data La instancia de la entidad tipada.
   * @returns Un objeto DocumentData listo para ser escrito.
   */
  toFirestore: (data: T): DocumentData => {
    // Por ahora, asumimos que el objeto ya es compatible.
    // En el futuro, podríamos necesitar una validación de salida o una transformación.
    return data as DocumentData;
  },

  /**
   * Deserializa los datos de Firestore a nuestra entidad de dominio, validándolos en el proceso.
   * Esta es la barrera de seguridad principal.
   * @param snapshot El snapshot del documento de Firestore.
   * @param options Opciones del snapshot.
   * @returns Una instancia de la entidad tipada.
   * @throws {ZodError} Si los datos del snapshot no cumplen con el esquema.
   */
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): T => {
    // Obtenemos los datos crudos, incluyendo el ID del documento
    const rawData = { id: snapshot.id, ...snapshot.data(options) };

    // Manifiesto de Tipado: Blindaje en la frontera.
    // `parse` lanzará un error si la validación falla, previniendo
    // que data corrupta ingrese a nuestra aplicación.
    return schema.parse(rawData);
  },
});
