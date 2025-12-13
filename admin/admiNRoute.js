const adminController = require("./adminController")
const express = require("express")

const router = express.Router()

const {generateAdminToken} = require("../middlewares/jwtMiddleware")

router.post("/login" , generateAdminToken , adminController.adminLogin)