var express = require("express");
var router = express.Router();
const serviceController = require("../controllers/services");
const adminMiddleware = require("../middlewares/adminAuthMiddleware");

router.post("/", adminMiddleware, serviceController.create);
router.post("/edit", adminMiddleware, serviceController.edit);
router.post("/destroy", adminMiddleware, serviceController.destroy);
router.get("/", serviceController.getAll);
router.get("/single", serviceController.getOne);

module.exports = router;
