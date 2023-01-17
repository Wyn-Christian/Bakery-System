const User = require("../models/user");

exports.list = (req, res, next) => {
  User.find().exec(function (err, list_users) {
    if (err) {
      return next(err);
    }

    res.json({ list_users });
  });
};

exports.detail = (req, res, next) => {
  User.findById(req.params.id).exec((err, user) => {
    if (err) {
      return next(err);
    }
    if (user == null) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }

    res.json({ user });
  });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email, password: req.body.password }).exec(
    (err, user) => {
      if (err) return next(err);

      res.json({ user });
    }
  );
};

exports.create = (req, res, next) => {
  const new_user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  new_user.save((err) => {
    if (err) {
      return next(err);
    }

    res.json({ new_user });
  });
};

exports.update = (req, res, next) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  User.findByIdAndUpdate(req.params.id, user, { new: true }).exec(
    (err, updated_user) => {
      if (err) return next(err);

      res.json({ updated_user });
    }
  );
};
