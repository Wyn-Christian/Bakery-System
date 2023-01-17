const Product = require("../models/product");

exports.update_product = (req, res, next) => {
  const product = {
    name: req.body.name,
    category_id: req.body.category_id,
    variant_set_id: req.body.variant_set_id,
    description: req.body.description,
    img_name: req.body.img_name,
    price: req.body.price,
  };

  Product.findByIdAndUpdate(req.params.id, product, { new: true }).exec(
    (err, update_product) => {
      if (err) return next(err);

      res.json({ update_product });
    }
  );
};
