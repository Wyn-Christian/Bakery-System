const CartItem = require("../models/cartitem");

exports.list = (req, res, next) => {
  CartItem.find()
    .populate({
      path: "product_id",
      populate: {
        path: "category_id",
        model: "Category",
      },
    })
    .populate("variant_id", "name price_multiplier")
    .exec(function (err, list_cart_items) {
      if (err) {
        return next(err);
      }

      res.json({ list_cart_items });
    });
};

exports.detail = (req, res, next) => {
  CartItem.findById(req.params.id)
    .populate({
      path: "product_id",
      populate: {
        path: "category_id",
        model: "Category",
      },
    })
    .populate("variant_id", "name price_multiplier")
    .exec((err, cart_item) => {
      if (err) {
        return next(err);
      }
      if (cart_item == null) {
        const err = new Error("Cart Item not found");
        err.status = 404;
        return next(err);
      }

      res.json({ cart_item });
    });
};

exports.create = (req, res, next) => {
  const new_cart_item = new CartItem({
    ...req.body,
  });

  new_cart_item.save(function (err, new_cart_item) {
    new_cart_item
      .populate({
        path: "product_id",
        populate: {
          path: "category_id",
          model: "Category",
        },
      })
      // .populate("variant_id", "name price_multiplier")
      .then(function (new_cart_item) {
        new_cart_item
          .populate("variant_id", "name price_multiplier")
          .then(function (new_cart_item) {
            return res.json({ new_cart_item });
          });
      });
  });
};

exports.update_quantity = (req, res, next) => {
  CartItem.findByIdAndUpdate(
    req.params.id,
    { quantity: req.body.quantity },
    { new: true }
  ).exec((err, updated_cart_item) => {
    if (err) return next(err);

    CartItem.findById(req.params.id)
      .populate({
        path: "product_id",
        populate: {
          path: "category_id",
          model: "Category",
        },
      })
      .populate("variant_id", "name price_multiplier")
      .exec((err, cart_item) => {
        if (err) {
          return next(err);
        }
        if (cart_item == null) {
          const err = new Error("Cart Item not found");
          err.status = 404;
          return next(err);
        }

        res.json(cart_item);
      });
  });
};

exports.update = (req, res, next) => {
  const product = {
    ...req.body,
  };

  CartItem.findByIdAndUpdate(req.params.id, product, { new: true }).exec(
    (err, updated_cart_item) => {
      if (err) return next(err);

      res.json({ updated_cart_item });
    }
  );
};

exports.delete = (req, res, next) => {
  CartItem.findByIdAndDelete(req.params.id, (err, deleted_cart_item) => {
    if (err) return next(err);

    if (!deleted_cart_item) {
      res.json({ status: "Failed" });
      return;
    }

    // Sucess
    res.json({ status: "Success", deleted_cart_item });
    return;
  });
};

exports.checkout_cart = (req, res, next) => {
  CartItem.deleteMany({ user_id: req.params.id }, (err) => {
    if (err) return next(err);

    res.json({ status: "Success" });
  });
  return;
};

exports.user_cart = (req, res, next) => {
  CartItem.find({ user_id: req.params.user_id })
    .populate({
      path: "product_id",
      populate: {
        path: "category_id",
        model: "Category",
      },
    })
    .populate("variant_id", "name price_multiplier")
    .exec((err, cart_items) => {
      if (err) return next(err);

      res.json({ cart_items });
    });
};
