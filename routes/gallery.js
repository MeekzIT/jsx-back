var express = require("express");
var router = express.Router();
const controller = require("../controllers/gallery");
const adminMiddleware = require("../middlewares/adminAuthMiddleware");

router.post("/destroy", adminMiddleware, controller.destroy);
router.post("/edit", adminMiddleware, controller.edit);
router.post("/", adminMiddleware, controller.create);
router.get("/", controller.getAll);
router.put("/reorder", controller.updateOrder);

module.exports = router;
