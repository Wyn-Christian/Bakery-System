const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CheckOut = new Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
    },
    contact_number: {
      type: String,
    },
    address: {
      type: String,
    },
    payment_method: {
      type: String,
    },
    shipping_fee: {
      type: Number,
      default: 50,
    },
    total_quantity: {
      type: Number,
    },
    total_price: {
      type: mongoose.Types.Decimal128,
      get: getValue,
    },
    credit_card_cvv: {
      type: String,
    },
    credit_card_expiry: {
      type: String,
    },
    credit_card_number: {
      type: String,
    },
    gcash_name: {
      type: String,
    },
    gcash_number: {
      type: String,
    },
    checkout_items: [
      {
        type: mongoose.Types.ObjectId,
        ref: "CheckOutItem",
      },
    ],
  },
  {
    timestamps: true,
    id: true,
  }
);

function getValue(value) {
  if (typeof value !== "undefined") {
    return parseFloat(value.toString());
  }
  return value;
}

// Export model
module.exports = mongoose.model("CheckOut", CheckOut);
