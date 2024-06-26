const path = require("path");
const fs = require("fs");
const fsPromise = require("fs/promises");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const logEvent = async (message, logFileName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      console.log("here");
      await fsPromise.mkdir(path.join(__dirname, "..", "logs"));
    }

    await fsPromise.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

const logger = (req, res, next) => {
  logEvent(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method}\t${req.path}`);
  next();
};

module.exports = { logger, logEvent };
