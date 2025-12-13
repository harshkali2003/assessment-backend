const mongoose = require("mongoose")
const productModel = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    quantity : {
        type : Number,
        required : true,
        default : 1
    },
    image : {
        type : String,
        required : true
    }
} , {timestamps : true})

module.exports = mongoose.model("Products" , productModel);