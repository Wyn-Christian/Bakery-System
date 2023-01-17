const Checkout = require("../models/checkout");
const CheckoutItem = require("../models/checkoutitem");
const CartItem = require("../models/cartitem");

exports.checkout_items_list = (req, res, next) => {
  CheckoutItem.find()
    .populate("product_id", "name")
    .populate("variant_id", "name")
    .exec((err, list_checkout_items) => {
      if (err) return next(err);

      res.json(list_checkout_items);
      return;
    });
};

exports.create = (req, res, next) => {
  const new_checkout = new Checkout({
    user_id: req.params.user_id,
    name: req.body.name,
    contact_number: req.body.contact_number,
    address: req.body.address,
    payment_method: req.body.payment_method,
    total_quantity: req.body.total_quantity,
    total_price: req.body.total_price,
    credit_card_number: req.body.credit_card_number,
    credit_card_cvv: req.body.credit_card_cvv,
    credit_card_expiry: req.body.credit_card_expiry,
    gcash_name: req.body.gcash_name,
    gcash_number: req.body.gcash_number,
    checkout_items: req.body.checkout_items,
  });

  new_checkout.save(async (err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    let result = await CheckoutItem.insertMany(req.body.checkout_items);
    console.log(`${result.length} checkout items documents were inserted`);

    result = await CartItem.deleteMany({ user_id: req.params.user_id });
    console.log(`Deleted ${result.deletedCount} documents`);

    res.json({ new_checkout });
  });
};
