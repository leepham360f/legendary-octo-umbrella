const winston = require('winston');
function logger() {
  const LEVEL = Symbol.for('level');
  function filterOnly(level) {
    return winston.format((info) => {
      if (info[LEVEL] === level) {
        return info;
      }
    })();
  }
  const logger = winston.createLogger({
    level: 'error',
    transports: [
      new winston.transports.File({
        timestamp: true,
        filename: `../logs/test.log`,
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
          filterOnly('info')
        )
      })
    ]
  });

  return logger;
}

module.exports = logger;