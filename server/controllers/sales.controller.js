const { validationResult } = require("express-validator");
const Sales = require("../models/sales.model");
const { sendResponse } = require("../utils");
const catchAsync = require("../utils/catchAsync");

module.exports = {
  createSale: catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, quantity, amount } = req.body;

    const newSale = await Sales.create({
      name,
      quantity,
      amount,
      user: req.user,
    });

    sendResponse(res, { sale: newSale });
  }),

  topFiveSellingProducts: catchAsync(async (req, res, next) => {
    const aggregate = [
      {
        $match: {
          user: req.user._id,
        },
      },
      {
        $group: {
          _id: "$name",
          quantity: { $sum: "$quantity" },
          amount: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          totalQuantity: "$quantity",
          totalAmount: "$amount",
        },
      },
      {
        $sort: {
          totalQuantity: -1,
        },
      },
      { $limit: 5 },
    ];

    const sales = await Sales.aggregate(aggregate).allowDiskUse(true);
    sendResponse(res, { sales });
  }),

  revenueOfTheDay: catchAsync(async (req, res, next) => {
    const dayStartDateTime = new Date(
      new Date(new Date(new Date().setHours(0)).setMinutes(0)).setSeconds(0)
    );

    const dayEndDateTime = new Date(
      new Date(new Date(new Date().setHours(23)).setMinutes(59)).setSeconds(59)
    );

    const aggregate = [
      {
        $match: {
          user: req.user._id,
        },
      },
      {
        $match: {
          createdAt: {
            $gte: dayStartDateTime,
            $lte: dayEndDateTime,
          },
        },
      },

      {
        $group: {
          _id: "$name",
          amount: { $sum: "$amount" },
        },
      },

      {
        $project: {
          _id: 0,
          name: "$_id",
          amount: "$amount",
          keyForRevenue: "keyForRevenue",
        },
      },

      {
        $group: {
          _id: "$keyForRevenue",
          amount: { $sum: "$amount" },
        },
      },
    ];

    const salesRevenue = await Sales.aggregate(aggregate).allowDiskUse(true);

    let revenue = 0;
    if (salesRevenue.length) revenue = salesRevenue[0].amount;

    sendResponse(res, {
      revenue,
      currency: "INR",
    });
  }),
};
