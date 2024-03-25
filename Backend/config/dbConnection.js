const mongoose = require("mongoose");

const conectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
  } catch (error) {
    console.log(error);
  }
};

module.exports = conectDB;
