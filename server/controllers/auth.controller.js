const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: true,
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;

  sendResponse(
    res,
    {
      token,
      user,
    },
    statusCode
  );
};

module.exports = {
  signup: catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return next(
        new AppError(`User with email "${email}" already exists`, 409)
      );

    const newUser = await User.create({
      email,
      password,
    });

    createSendToken(newUser, 201, res);
  }),

  signin: catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }
    createSendToken(user, 200, res);
  }),

  signout: (req, res, next) => {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    sendResponse(res, {}, 200);
  },

  profile: (req, res, next) => {
    sendResponse(res, { user: req.user });
  },
};
