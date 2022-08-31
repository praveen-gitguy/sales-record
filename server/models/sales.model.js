const { Schema, model } = require("mongoose");

const SalesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to an an user"],
    },
  },
  { timestamps: true }
);

const Sales = model("sales", SalesSchema);

module.exports = Sales;
