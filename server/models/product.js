const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    variant_set_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "VariantSet",
    },
    description: {
      type: String,
    },
    img_name: {
      type: String,
    },
    price: {
      type: mongoose.Types.Decimal128,
      get: getValue,
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

function getValue(value) {
  if (typeof value !== "undefined") {
    return parseFloat(value.toString());
  }
  return value;
}

// Export model
module.exports = mongoose.model("Product", ProductSchema);
