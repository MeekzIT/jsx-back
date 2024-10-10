var express = require("express");
var router = express.Router();
const serviceController = require("../controllers/module");

router.post("/", serviceController.create);
router.post("/edit", serviceController.edit);
router.post("/destroy", serviceController.destroy);
router.get("/", serviceController.getAll);
router.get("/single", serviceController.getOne);

router.post("/image", serviceController.createImage);
router.post("/destroy-image", serviceController.destroyImage);

module.exports = router;
