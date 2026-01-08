import winston from 'winston';
import path from 'path';

const logLevel = process.env.LOG_LEVEL || 'info';
const logFilePath = process.env.LOG_FILE_PATH || './logs/app.log';

// Custom format for structured JSON logging
const structuredFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Pretty format for development console
const devFormat = winston.format.combine(
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.colorize(),
  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
    return `${timestamp} [${level}]: ${message} ${metaStr}`;
  })
);

// Create transports based on environment
const transports: winston.transport[] = [];

// Always log to console
transports.push(
  new winston.transports.Console({
    format: process.env.NODE_ENV === 'production' ? structuredFormat : devFormat,
  })
);

// In production, also log to file
if (process.env.NODE_ENV === 'production') {
  // Ensure logs directory exists (handled by deployment)
  transports.push(
    new winston.transports.File({
      filename: path.join(process.cwd(), logFilePath),
      format: structuredFormat,
      maxsize: 10 * 1024 * 1024, // 10MB
      maxFiles: 5,
      tailable: true,
    })
  );

  // Separate error log file
  transports.push(
    new winston.transports.File({
      filename: path.join(process.cwd(), './logs/error.log'),
      level: 'error',
      format: structuredFormat,
      maxsize: 10 * 1024 * 1024,
      maxFiles: 3,
    })
  );
}

// Create the logger instance
export const logger = winston.createLogger({
  level: logLevel,
  defaultMeta: {
    service: 'telfera-kz',
    env: process.env.NODE_ENV,
  },
  transports,
});

// Helper types for structured logging
export interface LogContext {
  userId?: string;
  action?: string;
  entity?: string;
  entityId?: string;
  ip?: string;
  userAgent?: string;
  duration?: number;
  [key: string]: unknown;
}

// Convenience methods for common logging patterns
export const log = {
  info: (message: string, context?: LogContext) => {
    logger.info(message, context);
  },

  warn: (message: string, context?: LogContext) => {
    logger.warn(message, context);
  },

  error: (message: string, error?: Error | unknown, context?: LogContext) => {
    const errorInfo = error instanceof Error 
      ? { errorMessage: error.message, stack: error.stack }
      : { errorMessage: String(error) };
    
    logger.error(message, { ...errorInfo, ...context });
  },

  debug: (message: string, context?: LogContext) => {
    logger.debug(message, context);
  },

  // Audit logging for security-critical actions
  audit: (action: string, context: LogContext) => {
    logger.info(`AUDIT: ${action}`, {
      ...context,
      audit: true,
      timestamp: new Date().toISOString(),
    });
  },

  // Performance logging
  perf: (operation: string, durationMs: number, context?: LogContext) => {
    logger.info(`PERF: ${operation}`, {
      ...context,
      duration: durationMs,
      performance: true,
    });
  },

  // Request logging helper
  request: (method: string, path: string, statusCode: number, durationMs: number, context?: LogContext) => {
    const level = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';
    logger[level](`${method} ${path} ${statusCode}`, {
      ...context,
      method,
      path,
      statusCode,
      duration: durationMs,
      type: 'request',
    });
  },
};

export default logger;
