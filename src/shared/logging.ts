// RUTA: src/shared/logging.ts
/**
 * @file logging.ts
 * @description Aparato SSoT para el logging, observabilidad y resiliencia del proyecto.
 * @version 2.0.0 (Pizzeria-MetaShark-O&R)
 * @author RaZ Podestá - MetaShark Tech
 *
 * @architecture_notes
 * - **Manifiesto O&R**: Implementa el método `measure` para medir la duración de operaciones críticas.
 * - **Manifiesto de Resiliencia**: El método `measure` encapsula la lógica try/catch,
 *   asegurando que los errores sean registrados y no propagados inesperadamente.
 * - **Isomórfico y Optimizado para Entornos**: Mantiene su comportamiento adaptativo.
 */

// --- Constantes y Tipos del Módulo ---
const isBrowser = typeof window !== 'undefined';

const STYLES = {
  success: 'color: #22c55e; font-weight: bold;',
  info: 'color: #3b82f6; font-weight: bold;',
  warn: 'color: #f59e0b; font-weight: bold;',
  error: 'color: #ef4444; font-weight: bold;',
  trace: 'color: #9ca3af;',
  timestamp: 'color: #64748b; font-weight: normal;',
};

type LogContext = Record<string, unknown>;

/**
 * Define el contrato para el logger de la aplicación, ahora con capacidad de medición.
 */
interface Logger {
  success: (message: string, context?: LogContext) => void;
  info: (message: string, context?: LogContext) => void;
  warn: (message: string, context?: LogContext) => void;
  error: (message: string, context?: LogContext) => void;

  /**
   * Mide la duración de una operación asíncrona, la registra y maneja sus errores.
   * Cumple con los manifiestos de O&R y Resiliencia.
   * @template T El tipo de dato que la operación devuelve en caso de éxito.
   * @param operationName Un nombre descriptivo para la operación (ej. 'Firebase.findAll').
   * @param operationFn La función asíncrona a ejecutar y medir.
   * @param context (Opcional) Datos adicionales para enriquecer todos los logs de esta operación.
   * @returns {Promise<T>} El resultado de la operación. Lanza una excepción si la operación falla.
   */
  measure: <T>(
    operationName: string,
    operationFn: () => Promise<T>,
    context?: LogContext
  ) => Promise<T>;
}

const getTimestamp = (): string => new Date().toLocaleTimeString('en-US', { hour12: false });

const developmentLogger: Logger = {
  success: (message, context) => {
    if (isBrowser) {
      console.log(`%c[${getTimestamp()}] %c✅ SUCCESS: %c${message}`, STYLES.timestamp, STYLES.success, 'color: inherit;', context || '');
    } else {
      console.log(`[${getTimestamp()}] ✅ SUCCESS: ${message}`, context || '');
    }
  },
  info: (message, context) => {
    if (isBrowser) {
      console.info(`%c[${getTimestamp()}] %cℹ️ INFO: %c${message}`, STYLES.timestamp, STYLES.info, 'color: inherit;', context || '');
    } else {
      console.info(`[${getTimestamp()}] ℹ️ INFO: ${message}`, context || '');
    }
  },
  warn: (message, context) => {
    if (isBrowser) {
      console.warn(`%c[${getTimestamp()}] %c⚠️ WARN: %c${message}`, STYLES.timestamp, STYLES.warn, 'color: inherit;', context || '');
    } else {
      console.warn(`[${getTimestamp()}] ⚠️ WARN: ${message}`, context || '');
    }
  },
  error: (message, context) => {
    if (isBrowser) {
      console.error(`%c[${getTimestamp()}] %c❌ ERROR: %c${message}`, STYLES.timestamp, STYLES.error, 'color: inherit;', context || '');
    } else {
      console.error(`[${getTimestamp()}] ❌ ERROR: ${message}`, context || '');
    }
  },
  measure: async <T>(operationName: string, operationFn: () => Promise<T>, context: LogContext = {}): Promise<T> => {
    developmentLogger.info(`[START] ${operationName}`, context);
    const startTime = performance.now();
    try {
      const result = await operationFn();
      const duration = (performance.now() - startTime).toFixed(2);
      developmentLogger.success(`[END] ${operationName}`, { ...context, duration: `${duration}ms` });
      return result;
    } catch (err) {
      const duration = (performance.now() - startTime).toFixed(2);
      // Lanzamos la excepción para que el llamador la maneje según el manifiesto de resiliencia
      // pero no sin antes registrarla.
      developmentLogger.error(`[FAIL] ${operationName}`, { ...context, duration: `${duration}ms`, error: err });
      throw err;
    }
  },
};

const productionLogger: Logger = {
  success: (message, context) => { if (!isBrowser) console.log(`SUCCESS: ${message}`, context); },
  info: (message, context) => { if (!isBrowser) console.info(`INFO: ${message}`, context); },
  warn: (message, context) => console.warn(`WARN: ${message}`, context),
  error: (message, context) => console.error(`ERROR: ${message}`, context),
  measure: async <T>(operationName: string, operationFn: () => Promise<T>, context: LogContext = {}): Promise<T> => {
    const startTime = Date.now();
    try {
      const result = await operationFn();
      const duration = Date.now() - startTime;
      productionLogger.info(`[SUCCESS] ${operationName}`, { ...context, duration });
      return result;
    } catch (err) {
      const duration = Date.now() - startTime;
      productionLogger.error(`[FAIL] ${operationName}`, { ...context, duration, error: err });
      throw err;
    }
  },
};

export const logger = process.env.NODE_ENV === 'development' ? developmentLogger : productionLogger;
