require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const { logger, logEvent } = require("./middleware/logger");
const errorLogger = require("./middleware/errorLogger");
const corsOption = require("./config/corsOption");
const conectDB = require("./config/dbConnection");

const PORT = process.env.PORT || 3500;

conectDB();

//middleware
//custom middleware
app.use(logger);

//erxpress middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

//3rd party Middleware
app.use(cookieParser());

app.use(cors(corsOption));

app.use("/", require("./routes/root"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    return res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    return res.send({ " message": "404 not Found" });
  } else {
    return res.type(txt).send("404 not found");
  }
});

app.use(errorLogger);

mongoose.connection.once("open", () => {
  console.log("conected to DB ");

  app.listen(PORT, () => {
    console.log("server runnung on port: ", PORT);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvent(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoLog"
  );
});
