const { createLogger, transports, format } = require('winston')

const logger = createLogger({
  format: format.printf((info) => `[${info.level.toUpperCase()}] ${info.message}`),
  transports: [
    new transports.File({
      filename: './logs/server.log',
      json: false,
      maxsize: 5242880,
      maxFiles: 5
    }),
    new transports.Console()
  ]
})

module.exports = logger
