var express = require("express");
var router = express.Router();
const serviceController = require("../controllers/self-wash");
const adminMiddleware = require("../middlewares/adminAuthMiddleware");

router.post("/", adminMiddleware, serviceController.create);
router.post("/edit", adminMiddleware, serviceController.edit);
router.post("/destroy", adminMiddleware, serviceController.destroy);
router.get("/", serviceController.getAll);
router.get("/single", serviceController.getOne);

router.post("/image", adminMiddleware, serviceController.createImage);
router.post("/destroy-image", adminMiddleware, serviceController.destroyImage);

module.exports = router;
