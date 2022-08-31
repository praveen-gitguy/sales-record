const mongoose = require("mongoose");

const dbConnectionSuccess = () => {
  console.log("Connected to mongodb");
};

const dbConnectionError = (err) => {
  console.error("Failed to connect to DB");
  console.error(err);
};

const connectDB = () => {
  const mongooseConnectionOptions = {};

  mongoose
    .connect(process.env.MONGODB_URI, mongooseConnectionOptions)
    .then(dbConnectionSuccess)
    .catch(dbConnectionError);
};

module.exports = { connectDB };
