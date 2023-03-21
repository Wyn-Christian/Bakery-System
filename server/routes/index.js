var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  return res.json({
    message: "This is the Bakery System's index router",
  });
});

module.exports = router;
