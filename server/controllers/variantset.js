const VariantSet = require("../models/variantset");

exports.list = (req, res, next) => {
  VariantSet.find()
    .populate("variants_id")
    .exec(function (err, list_variant_sets) {
      if (err) {
        return next(err);
      }

      res.json({ list_variant_sets });
    });
};

exports.detail = (req, res, next) => {
  VariantSet.findById(req.params.id)
    .populate("variants")
    .exec((err, variant_set) => {
      if (err) {
        return next(err);
      }
      if (variant_set == null) {
        const err = new Error("Variant not found");
        err.status = 404;
        return next(err);
      }

      res.json({ variant_set });
    });
};

exports.create = (req, res, next) => {
  const new_variant_set = new VariantSet({
    variants_id:
      typeof req.body.variants_id === "undefined" ? [] : req.body.variants_id,
  });

  new_variant_set.save((err) => {
    if (err) {
      return next(err);
    }

    res.json({ new_variant_set });
  });
};

exports.update = (req, res, next) => {
  const variant_set = {
    variants_id:
      typeof req.body.variants_id === "undefined" ? [] : req.body.variants_id,
  };

  VariantSet.findByIdAndUpdate(req.params.id, variant_set, {
    new: true,
  }).exec((err, updated_variant_set) => {
    if (err) return next(err);

    res.json({ updated_variant_set });
  });
};
