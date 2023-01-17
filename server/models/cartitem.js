const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartItemSchema = new Schema(
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
      default: 1,
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
  }
);

// Export model
module.exports = mongoose.model("CartItem", CartItemSchema);
