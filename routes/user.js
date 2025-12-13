const express = require("express")

const userController = require("../controllers/userController")
const upload = require("../config/multer")
const {generateUserToken} = require("../middlewares/jwtMiddleware")

const router = express.Router()

router.post("/signup" , upload.single("image") , generateUserToken , userController.userRegister);

router.post("/login" , generateUserToken , userController.userLogin)

module.exports = router;