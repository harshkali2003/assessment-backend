const express = require("express")

const userController = require("../controllers/userController")

const router = express.Router()

router.post("/signup" , userController.userRegister);

router.post("/login" , userController.userLogin)

module.exports = router;