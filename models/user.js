const mongoose = require("mongoose")
const userModel = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone_no : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["user" , "admin"],
        default : "user"
    },
    image : {
        type : String,
        required : true
    }
} , {timestamps : true})

module.exports = mongoose.model("User" , userModel);