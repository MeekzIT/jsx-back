var express = require("express");
var router = express.Router();
const controller = require("../controllers/aboutUs");
const adminMiddleware = require("../middlewares/adminAuthMiddleware");

router.post("/edit", adminMiddleware, controller.edit);
router.get("/", controller.getOne);

module.exports = router;
