const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CheckOutItem = new Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    variant_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Variant",
    },
    quantity: {
      type: Number,
    },
    total_price: {
      type: mongoose.Types.Decimal128,
      get: getValue,
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
  }
);

function getValue(value) {
  if (typeof value !== "undefined") {
    return parseFloat(value.toString());
  }
  return value;
}

// Export model
module.exports = mongoose.model("CheckOutItem", CheckOutItem);
