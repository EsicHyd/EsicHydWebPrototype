var winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const { promisify } = require('util');

const myMsg = printf(info => {
  return `[${info.timestamp}] ${info.level}: ${info.message}`;
});
module.exports = {
  getIp:function getIp(req) {
  var ip = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  if (ip.substr(0, 7) == "::ffff:") {
    ip = ip.substr(7);
  }
  return ip;
}
}
module.exports = {
logg:function logg(msg, ip, method, route, level) {
  if (level == null) {
    level = "info";
  }
  var message = "";
  if (ip != null && ip != "") {
    message = ` ip= ${ip} `;
  }
  if (method != null && method != "") {
    message += ` method= ${method} `;
  }
  if (route != null && route != "") {
    message += ` route= ${route} `;
  }
  message += msg;
  logger.log(level, message);
}
}
const myCustomLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    verbose: 'blue',
    debug: 'cyan',
    silly: 'white'
  }
};
winston.addColors(myCustomLevels.colors);

const logger = createLogger({
  levels: myCustomLevels.levels,
  format: format.combine(
    timestamp(),
    myMsg
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'server.log' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ]
});
