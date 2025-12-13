const express = require("express")

const productController = require("../controllers/productController")
const businessLogic = require("../services/businessLogic")
const upload = require("../config/multer")
const {verifyAdminToken} = require("../middlewares/jwtMiddleware")

const router = express.Router()

router.post("/add" , upload.single("image") , verifyAdminToken , productController.addProduct)

router.get("/" , productController.getProduct)

router.get("/search/:query" , productController.searchProduct)

router.put("/edit/:productId" , upload.single("image") , verifyAdminToken , productController.editProduct)

router.delete("/delete/:productId" , verifyAdminToken , productController.deleteProduct)

router.post("/stock/increase/:productId" , verifyAdminToken , businessLogic.increaseStock)

router.post("/stock/decrease/:productId" , verifyAdminToken , businessLogic.decreaseStock)

module.exports = router;