var express = require("express");
var router = express.Router();
const controller = require("../controllers/spare");
const adminMiddleware = require("../middlewares/adminAuthMiddleware");

router.post("/", adminMiddleware, controller.create);
router.post("/edit", adminMiddleware, controller.edit);
router.post("/destroy", adminMiddleware, controller.destroy);
router.get("/", controller.getAll);
router.get("/single", controller.getOne);

router.post("/image", adminMiddleware, controller.createImage);
router.post("/destroy-image", adminMiddleware, controller.destroyImage);

module.exports = router;
