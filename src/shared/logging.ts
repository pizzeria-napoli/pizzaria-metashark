// RUTA: src/shared/logging.ts
/**
 * @file logging.ts
 * @description Aparato SSoT para el logging, observabilidad y resiliencia del proyecto.
 *              v4.0.0 (Edge Runtime Hardening): Se refactoriza la generación de UUIDs para
 *              utilizar la API web estándar `crypto.randomUUID()`, eliminando la
 *              dependencia del módulo 'crypto' de Node.js y garantizando la
 *              compatibilidad con el Edge Runtime.
 * @version 4.0.0 (Restaurado desde Snapshot)
 * @author L.I.A. Legacy
 */

const isBrowser = typeof window !== 'undefined';

const STYLES = {
  success: 'color: #22c55e; font-weight: bold;',
  info: 'color: #3b82f6; font-weight: bold;',
  warn: 'color: #f59e0b; font-weight: bold;',
  error: 'color: #ef4444; font-weight: bold;',
  trace: 'color: #9ca3af;',
  timestamp: 'color: #64748b; font-weight: normal;',
  group: 'color: #a78bfa; font-weight: bold;',
};

type LogContext = Record<string, unknown>;
type Group = { name: string; groupId: string };

/**
 * Define el contrato del logger de la aplicación, ahora con capacidades 'Heimdall'.
 */
interface Logger {
  info: (message: string, context?: LogContext, groupId?: string) => void;
  warn: (message: string, context?: LogContext, groupId?: string) => void;
  error: (message: string, context?: LogContext, groupId?: string) => void;
  success: (message: string, context?: LogContext, groupId?: string) => void;
  measure: <T>(
    operationName: string,
    operationFn: () => Promise<T>,
    context?: LogContext,
    groupId?: string
  ) => Promise<T>;
  startGroup: (name: string, context?: LogContext) => Group;
  endGroup: (groupId: string) => void;
}

const getTimestamp = (): string => new Date().toLocaleTimeString('en-US', { hour12: false });

const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `fallback-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

// ============================================================================
// LOGGER DE DESARROLLO (DX de Élite)
// ============================================================================
const developmentLogger: Logger = {
  info: (message, context, groupId) => {
    const groupPrefix = groupId ? `[${groupId.substring(0, 4)}] ` : '';
    if (isBrowser) {
      console.info(
        `%c[${getTimestamp()}] %cℹ️ ${groupPrefix}INFO: %c${message}`,
        STYLES.timestamp, STYLES.info, 'color: inherit;', context || ''
      );
    } else {
      console.info(`[${getTimestamp()}] ℹ️ ${groupPrefix}INFO: ${message}`, context || '');
    }
  },

  warn: (message, context, groupId) => {
    const groupPrefix = groupId ? `[${groupId.substring(0, 4)}] ` : '';
    if (isBrowser) {
      console.warn(
        `%c[${getTimestamp()}] %c⚠️ ${groupPrefix}WARN: %c${message}`,
        STYLES.timestamp, STYLES.warn, 'color: inherit;', context || ''
      );
    } else {
      console.warn(`[${getTimestamp()}] ⚠️ ${groupPrefix}WARN: ${message}`, context || '');
    }
  },

  error: (message, context, groupId) => {
    const groupPrefix = groupId ? `[${groupId.substring(0, 4)}] ` : '';
    if (isBrowser) {
      console.error(
        `%c[${getTimestamp()}] %c❌ ${groupPrefix}ERROR: %c${message}`,
        STYLES.timestamp, STYLES.error, 'color: inherit;', context || ''
      );
    } else {
      console.error(`[${getTimestamp()}] ❌ ${groupPrefix}ERROR: ${message}`, context || '');
    }
  },

  success: (message, context, groupId) => {
    const groupPrefix = groupId ? `[${groupId.substring(0, 4)}] ` : '';
    if (isBrowser) {
      console.log(
        `%c[${getTimestamp()}] %c✅ ${groupPrefix}SUCCESS: %c${message}`,
        STYLES.timestamp, STYLES.success, 'color: inherit;', context || ''
      );
    } else {
      console.log(`[${getTimestamp()}] ✅ ${groupPrefix}SUCCESS: ${message}`, context || '');
    }
  },

  measure: async <T>(operationName: string, operationFn: () => Promise<T>, context: LogContext = {}, groupId?: string): Promise<T> => {
    developmentLogger.info(`[START] ${operationName}`, context, groupId);
    const startTime = performance.now();
    try {
      const result = await operationFn();
      const duration = (performance.now() - startTime).toFixed(2);
      developmentLogger.success(`[END] ${operationName}`, { ...context, duration: `${duration}ms` }, groupId);
      return result;
    } catch (err) {
      const duration = (performance.now() - startTime).toFixed(2);
      developmentLogger.error(`[FAIL] ${operationName}`, { ...context, duration: `${duration}ms`, error: err }, groupId);
      throw err;
    }
  },

  startGroup: (name, context = {}) => {
    const groupId = generateUUID();
    const groupPrefix = `[${groupId.substring(0, 4)}]`;
    if(isBrowser) {
        console.groupCollapsed(`%c${groupPrefix} START GROUP: ${name}`, STYLES.group, { timestamp: getTimestamp(), ...context });
    } else {
        console.log(`START GROUP: ${name}`, { groupId, timestamp: getTimestamp(), ...context });
    }
    return { name, groupId };
  },

  endGroup: (groupId) => {
    const groupPrefix = `[${groupId.substring(0, 4)}]`;
    if(isBrowser) {
        console.log(`%c${groupPrefix} END GROUP`, STYLES.group, { timestamp: getTimestamp() });
        console.groupEnd();
    } else {
        console.log(`END GROUP`, { groupId, timestamp: getTimestamp() });
    }
  },
};

// ============================================================================
// LOGGER DE PRODUCCIÓN (Optimizado para Performance y Parsing)
// ============================================================================
const productionLogger: Logger = {
  info: (message, context, groupId) => {
    if (!isBrowser) console.info(JSON.stringify({ level: 'INFO', message, context, groupId, timestamp: new Date().toISOString() }));
  },
  warn: (message, context, groupId) => {
    console.warn(JSON.stringify({ level: 'WARN', message, context, groupId, timestamp: new Date().toISOString() }));
  },
  error: (message, context, groupId) => {
    console.error(JSON.stringify({ level: 'ERROR', message, context, groupId, timestamp: new Date().toISOString() }));
  },
  success: (message, context, groupId) => {
    if (!isBrowser) console.log(JSON.stringify({ level: 'SUCCESS', message, context, groupId, timestamp: new Date().toISOString() }));
  },

  measure: async <T>(operationName: string, operationFn: () => Promise<T>, context: LogContext = {}, groupId?: string): Promise<T> => {
    const startTime = Date.now();
    productionLogger.info(`[START] ${operationName}`, context, groupId);
    try {
      const result = await operationFn();
      const duration = Date.now() - startTime;
      productionLogger.success(`[END] ${operationName}`, { ...context, duration }, groupId);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      const duration = Date.now() - startTime;
      productionLogger.error(`[FAIL] ${operationName}`, { ...context, duration, error: errorMessage }, groupId);
      throw err;
    }
  },

  startGroup: (name, context = {}) => {
    const groupId = generateUUID();
    productionLogger.info(`START GROUP: ${name}`, { ...context, groupId });
    return { name, groupId };
  },

  endGroup: (groupId) => {
    productionLogger.info(`END GROUP`, { groupId });
  },
};

export const logger = process.env.NODE_ENV === 'development' ? developmentLogger : productionLogger;
