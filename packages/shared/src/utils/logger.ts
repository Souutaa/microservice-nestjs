import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: 'info', // Log các mức độ từ "info" trở lên
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    }),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(), // Thêm màu sắc
        format.timestamp(),
        format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
    }), // Log ra console với màu sắc
    new transports.File({
      filename: 'logs/app.log',
      format: format.combine(
        format.timestamp(),
        format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        }),
      ),
    }),
  ],
});
