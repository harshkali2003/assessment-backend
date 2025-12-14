const express = require("express")

const userController = require("../controllers/userController")
const upload = require("../config/multer")

const router = express.Router()

router.post("/signup" , upload.single("image") , userController.userRegister);

router.post("/login" , userController.login)

module.exports = router;