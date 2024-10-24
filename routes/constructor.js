var express = require("express");
var router = express.Router();
const controller = require("../controllers/constuctor");
const adminMiddleware = require("../middlewares/adminAuthMiddleware");

router.post("/", adminMiddleware, controller.create);
router.post("/edit", adminMiddleware, controller.edit);
router.post("/destroy", adminMiddleware, controller.destroy);
router.post("/price", controller.getPrice);
router.get("/", controller.getAll);
router.get("/single", controller.getOne);

// -------------------- item --------------------
router.post("/item", adminMiddleware, controller.createItem);
router.post("/drag", adminMiddleware, controller.updateConstuctorItemsOrder);
router.post("/item/edit", adminMiddleware, controller.editItem);
router.post("/item/destroy", adminMiddleware, controller.destroyItem);

// -------------------- option --------------------
router.post("/option", adminMiddleware, controller.createOption);
router.post("/option/edit", adminMiddleware, controller.editOption);
router.post("/option/destroy", adminMiddleware, controller.destroyOption);
router.get("/option", controller.getOptionItems);

// -------------------- option item --------------------
router.post("/option/item", adminMiddleware, controller.createOptionItem);
router.post(
  "/option/item/drag",
  adminMiddleware,
  controller.updateConstuctorOptionItemsOrder
);
router.post("/option/item/edit", adminMiddleware, controller.editOptionItem);
router.post(
  "/option/item/destroy",
  adminMiddleware,
  controller.destroyOptionItem
);
router.get("/option/item", controller.getOptionItem);

// -------------------- itrm option --------------------
router.post("/item/option", adminMiddleware, controller.createOptionOption);
router.post("/item/option/edit", adminMiddleware, controller.editOptionOption);
router.post(
  "/item/option/destroy",
  adminMiddleware,
  controller.destroyOptionOption
);

//------------------ order ------------------

router.post("/order", controller.createOrder);
router.post("/order/edit", adminMiddleware, controller.editOrder);
router.post("/order/destroy", adminMiddleware, controller.deleteOrder);
router.get("/order", adminMiddleware, controller.getAllOrders);

module.exports = router;
