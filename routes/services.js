var express = require("express");
var router = express.Router();
const serviceController = require("../controllers/services");

router.post("/", serviceController.create);
router.post("/edit", serviceController.edit);
router.post("/destroy", serviceController.destroy);
router.get("/", serviceController.getAll);
router.get("/single", serviceController.getOne);

module.exports = router;
