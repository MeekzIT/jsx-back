var express = require("express");
var router = express.Router();
const controller = require("../controllers/question");
const adminMiddleware = require("../middlewares/adminAuthMiddleware");

router.post("/", controller.create);
router.post("/edit", adminMiddleware, controller.edit);
router.post("/destroy", adminMiddleware, controller.destroy);
router.get("/", controller.getAll);

module.exports = router;
