const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VariantSetSchema = new Schema(
  {
    variants_id: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Variant",
      },
    ],
  },
  {
    timestamps: true,
    id: true,
  }
);

// Export model
module.exports = mongoose.model("VariantSet", VariantSetSchema);
