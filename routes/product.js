const express = require("express")

const productController = require("../controllers/productController")

const router = express.Router()

router.post("/add" , productController.addProduct)

router.get("/" , productController.getProduct)

router.get("/search/:query" , productController.searchProduct)

router.put("/edit/:productId" , productController.editProduct)

router.delete("/delete/:productId" , productController.deleteProduct)

router.post("/stock/increase/:productId" , productController.increaseStock)

router.post("/stock/decrease/:productId" , productController.decreaseStock)

module.exports = router;