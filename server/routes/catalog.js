var express = require("express");
var router = express.Router();

const category_controller = require("../controllers/category");
const variant_controller = require("../controllers/variant");
const variant_set_controller = require("../controllers/variantset");
const product_controller = require("../controllers/product");
const cart_item_controller = require("../controllers/cartitem");
const checkout_contoller = require("../controllers/checkout");

router.post("/categories/create", category_controller.create);
router.post("/categories/:id/update", category_controller.update);
router.get("/categories/:id", category_controller.detail);
router.get("/categories", category_controller.list);

router.post("/variants/create", variant_controller.create);
router.post("/variants/:id/update", variant_controller.update);
router.get("/variants/:id", variant_controller.detail);
router.get("/variants", variant_controller.list);

router.post("/variant-sets/create", variant_set_controller.create);
router.post("/variant-sets/:id/update", variant_set_controller.update);
router.get("/variant-sets/:id", variant_set_controller.detail);
router.get("/variant-sets", variant_set_controller.list);

router.post("/products/create", product_controller.create);
router.post("/products/:id/update", product_controller.update);
router.get("/products/:id", product_controller.detail);
router.get("/products", product_controller.list);

router.post("/cart-items/create", cart_item_controller.create);
router.post(
  "/cart-items/:id/update-quantity",
  cart_item_controller.update_quantity
);
router.post("/cart-items/:id/update", cart_item_controller.update);
router.post("/cart-items/:id/delete", cart_item_controller.delete);
router.get("/cart-items/user/:user_id", cart_item_controller.user_cart);
router.get("/cart-items/:id", cart_item_controller.detail);
router.get("/cart-items/", cart_item_controller.list);

router.post("/checkout/:user_id/create", checkout_contoller.create);
router.get("/checkout-items", checkout_contoller.checkout_items_list);

module.exports = router;
