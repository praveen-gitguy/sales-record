require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { serverConnection } = require("./utils");
const salesRoutes = require("./routes/sales.routes");
const authRoutes = require("./routes/auth.routes");
const globalErrorHandler = require("./controllers/error.controller");
const AppError = require("./utils/appError");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/sales", salesRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(process.env.PORT, serverConnection);
