const authController = require("../controllers/auth.controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

const router = require("express").Router();

router
  .route("/signup")
  .post(
    body("email").isEmail().withMessage("Enter a vaild email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Enter a password with atleast 6 character in it."),
    authController.signup
  );

router
  .route("/signin")
  .post(
    body("email").isEmail().withMessage("Enter a vaild email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Enter a password with atleast 6 character in it."),
    authController.signin
  );

router.route("/signout").get(authController.signout);

router.route("/profile").get(authMiddleware.isSignedIn, authController.profile);

module.exports = router;
