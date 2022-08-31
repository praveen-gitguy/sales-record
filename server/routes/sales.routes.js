const router = require("express").Router();
const { body } = require("express-validator");
const salesController = require("../controllers/sales.controller");
const authMiddleWare = require("../middlewares/auth.middleware");

router
  .route("/")
  .post(
    authMiddleWare.isSignedIn,
    body("name").isLength({ min: 1 }),
    body("quantity").isNumeric(),
    body("amount").isNumeric(),
    salesController.createSale
  );
router.get(
  "/top-five",
  authMiddleWare.isSignedIn,
  salesController.topFiveSellingProducts
);
router.get(
  "/revenue-of-the-day",
  authMiddleWare.isSignedIn,
  salesController.revenueOfTheDay
);

module.exports = router;
