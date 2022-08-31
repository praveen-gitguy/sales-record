const { connectDB } = require("./db");

const serverConnection = () => {
  console.log(`Server started on PORT ${process.env.PORT}`);
  connectDB();
};

const sendResponse = (res, body, statusCode = res.statusCode) => {
  res.status(statusCode).json({
    status: "success",
    body,
  });
};

module.exports = { serverConnection, sendResponse };
