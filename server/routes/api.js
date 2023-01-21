var express = require("express");
var router = express.Router();

const api_controller = require("../controllers/api");

// update products
router.post("/:id/update_product", api_controller.update_product);
router.post("/create", api_controller.create);

module.exports = router;
