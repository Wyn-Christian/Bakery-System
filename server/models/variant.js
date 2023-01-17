const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VariantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price_multiplier: {
      type: mongoose.Types.Decimal128,
      get: getValue,
    },
    variant_set_id: {
      type: mongoose.Types.ObjectId,
      ref: "VariantSet",
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
module.exports = mongoose.model("Variant", VariantSchema);
