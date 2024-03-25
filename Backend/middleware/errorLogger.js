const { logEvent } = require("./logger");

const errorLogger = (err, req, res, next) => {
  logEvent(
    `${err.name}\t${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errorLog.log"
  );
  console.log(`${err.message}`);
  res.status(500);
  res.json({ message: err.message });
  next();
};

module.exports = errorLogger;
