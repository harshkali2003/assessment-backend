const Product = require("../models/products")

// increase and decrease stock (products)
exports.increaseStock = async ( req , resp) => {
    try{
        const {productId} = req.params;
        const {quantity} = req.body;

        if(!quantity){
            return resp.status(400).json({message : "Product quantity is required"})
        }

        const product = await Product.findById(productId);
        if(!product){
            return resp.status(404).json({message : "Product not found"})
        }

        product.quantity += quantity;
        await product.save();

        return resp.status(200).json({message : "Stock has been filled"})
    } catch(err){
        console.log(err);
        resp.status(500).json({message : "Internal server error"})
    }
}

exports.decreaseStock = async (req , resp) => {
    try{
        const {productId} = req.params;
        const {quantity} = req.body;

        if(!quantity){
            return resp.status(400).json({message : "Product quantity is required"})
        }

        const product = await Product.findById(productId);
        if(!product){
            return resp.status(404).json({message : "Product not found"})
        }

        if(product.quantity < quantity){
            return resp.status(400).json({message : "Required stock is less than given quantity"})
        }

        product.quantity -= quantity;
        await product.save();

        return resp.status(200).json({message : "Stock quantity has been decreased"})
    } catch(err){
        console.log(err);
        resp.status(500).json({message : "Internal server error"})
    }
}