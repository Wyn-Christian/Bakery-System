const Variant = require("../models/variant");

exports.list = (req, res, next) => {
  Variant.find().exec(function (err, list_variants) {
    if (err) {
      return next(err);
    }

    res.json({ list_variants });
  });
};

exports.detail = (req, res, next) => {
  Variant.findById(req.params.id).exec((err, variant) => {
    if (err) {
      return next(err);
    }
    if (variant == null) {
      const err = new Error("Variant not found");
      err.status = 404;
      return next(err);
    }

    res.json({ variant });
  });
};

exports.create = (req, res, next) => {
  const new_variant = new Variant({
    name: req.body.name,
    price_multiplier: req.body.price_multiplier,
    variant_set_id: req.body.variant_set_id,
  });

  new_variant.save((err) => {
    if (err) {
      return next(err);
    }

    res.json({ new_variant });
  });
};

exports.update = (req, res, next) => {
  const variant = {
    name: req.body.name,
    price_multiplier: req.body.price_multiplier,
    variant_set_id: req.body.variant_set_id,
  };

  Variant.findByIdAndUpdate(req.params.id, variant, { new: true }).exec(
    (err, updated_variant) => {
      if (err) return next(err);

      res.json({ updated_variant });
    }
  );
};
