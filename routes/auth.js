var express = require("express");
var router = express.Router();
const serviceController = require("../controllers/auth");
const adminMiddleware = require("../middlewares/adminAuthMiddleware");

router.post("/sign-in", adminMiddleware, serviceController.login);
router.post("/sign-out", adminMiddleware, serviceController.logout);

module.exports = router;
