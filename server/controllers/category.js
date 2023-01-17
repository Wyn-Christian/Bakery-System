const Category = require("../models/Category");

exports.list = (req, res, next) => {
  Category.find().exec(function (err, list_categories) {
    if (err) {
      return next(err);
    }

    res.json({ list_categories });
  });
};

exports.detail = (req, res, next) => {
  Category.findById(req.params.id).exec((err, category) => {
    if (err) {
      return next(err);
    }
    if (category == null) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }

    res.json({ category });
  });
};

exports.create = (req, res, next) => {
  const new_category = new Category({
    name: req.body.name,
    description: req.body.description,
  });

  new_category.save((err) => {
    if (err) {
      return next(err);
    }

    res.json({ new_category });
  });
};

exports.update = (req, res, next) => {
  const category = {
    name: req.body.name,
    description: req.body.description,
  };

  Category.findByIdAndUpdate(req.params.id, category, { new: true }).exec(
    (err, updated_category) => {
      if (err) return next(err);

      res.json({ updated_category });
    }
  );
};
