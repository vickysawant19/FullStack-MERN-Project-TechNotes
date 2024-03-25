const allowedOrigins = require("./allowedOrigin");

const corsOption = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by origin"), false);
    }
  },
  Credential: true,
  optionSuccessStatus: 200,
};

module.exports = corsOption;
