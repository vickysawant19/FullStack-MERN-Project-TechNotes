const rateLimit = require("express-rate-limit");
const { logEvent } = require("./logger");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1min
  max: 5, //each ip 5 login per minutes
  message: {
    message: "Too many login attampts from this IP,Please try after 60 sec",
  },
  handler: (req, res, next, options) => {
    logEvent(
      `Too many request: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "errLog.log"
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
