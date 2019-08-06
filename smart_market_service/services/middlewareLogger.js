const dateFormat = require('dateformat');

const logger =  function (req, res, next) {
  data =  (req.query) ? req.query : req.body
  console.log(dateFormat(Date.now(), "dd/mm/yyyy HH:MM:ss") + " : request - %j", req.query)
  next()
}

module.exports = logger;
