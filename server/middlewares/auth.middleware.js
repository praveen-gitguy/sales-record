const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user.model");

module.exports = {
  isSignedIn: catchAsync(async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! Please login to get access", 401)
      );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError("The user belong to the token doesn't exist", 401)
      );
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError("User recently changed password! Please login again.", 401)
      );
    }

    req.user = currentUser;
    next();
  }),
};
