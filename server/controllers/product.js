const Product = require("../models/product");

exports.list = (req, res, next) => {
  Product.find()
    .populate("category_id", "id name")
    .populate({
      path: "variant_set_id",
      populate: {
        path: "variants_id",
        model: "Variant",
        select: "id name price_multiplier",
      },
    })
    .exec(function (err, list_products) {
      if (err) {
        return next(err);
      }

      res.json({ list_products });
    });
};

exports.detail = (req, res, next) => {
  Product.findById(req.params.id)
    .populate("category_id", "id name")
    .populate({
      path: "variant_set_id",
      populate: {
        path: "variants_id",
        model: "Variant",
        select: "id name price_multiplier",
      },
    })
    .exec((err, product) => {
      if (err) {
        return next(err);
      }
      if (product == null) {
        const err = new Error("Variant not found");
        err.status = 404;
        return next(err);
      }

      res.json({ product });
    });
};

exports.create = (req, res, next) => {
  const new_product = new Product({
    name: req.body.name,
    category_id: req.body.category_id,
    variant_set_id: req.body.variant_set_id,
    description: req.body.description,
    img_name: req.body.img_name,
    price: req.body.price,
  });

  new_product.save((err) => {
    if (err) {
      return next(err);
    }

    res.json({ new_product });
  });
};

exports.update = (req, res, next) => {
  const product = {
    name: req.body.name,
    category_id: req.body.category_id,
    variant_set_id: req.body.variant_set_id,
    description: req.body.description,
    img_name: req.body.img_name,
    price: req.body.price,
  };

  Product.findByIdAndUpdate(req.params.id, product, { new: true }).exec(
    (err, updated_variant) => {
      if (err) return next(err);

      res.json({ updated_variant });
    }
  );
};
