const express = require("express");

const productController = require("../controllers/productController");
const businessLogic = require("../services/businessLogic");
const upload = require("../config/multer");
const { verifyToken } = require("../middlewares/jwtMiddleware");

const router = express.Router();

router.post(
  "/add",
   verifyToken,
  upload.single("image"),
  productController.addProduct
);

router.patch(
  "/purchase/:productId",
  verifyToken,
  productController.purchaseProduct
);

router.get("/", productController.getProduct);

router.get("/item/:id" , verifyToken , productController.getProductById)

router.get("/search", productController.searchProduct);

router.put(
  "/edit/:productId",
  verifyToken,
  upload.single("image"),
  productController.editProduct
);

router.delete(
  "/delete/:productId",
  verifyToken,
  productController.deleteProduct
);

router.post(
  "/stock/increase/:productId",
  verifyToken,
  businessLogic.increaseStock
);

router.post(
  "/stock/decrease/:productId",
  verifyToken,
  businessLogic.decreaseStock
);

module.exports = router;