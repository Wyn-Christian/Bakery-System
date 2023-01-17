var express = require("express");
var router = express.Router();

const user_controller = require("../controllers/user");

/* GET users listing. */
router.post("/login", user_controller.login);
router.post("/create", user_controller.create);
router.get("/:id", user_controller.detail);
router.get("/", user_controller.list);

module.exports = router;
