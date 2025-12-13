const Product = require("../models/products")

exports.addProduct = async (req , resp) => {
    try{
        const {name , category , price , quantity} = req.body;

        if(!name || !category || !price || !quantity){
            return resp.status(400).json({message : "All fields are required"})
        }
        
        if(!req.file){
            return resp.status(400).json({message : "All fields are required"})
        }

        const filename = req.file.filename;
        const filedata = `products/${filename}`

        const data = await Product.create({
            name,
            category,
            price,
            quantity,
            image : filedata
        })

        if(!data){
            return resp.status(400).json({message : "Error while saving data"})
        }

        resp.status(201).json({message : "success" , data})
    } catch(err){
        console.log(err);
        resp.status(500).json({message : "Internal server error"})
    }
}

exports.getProduct = async (req , resp) => {
    try{
        const data = await Product.find();

        if(!data || data.length === 0){
            return resp.status(404).json({message : "No product found"})
        }

        resp.status(200).json({message : "success" , data})
    } catch(err){
        console.log(err);
        resp.status(500).json({message : "Internal server error"})
    }
}

exports.searchProduct = async (req , resp) => {
    try{
        const {name , category , minPrice , maxPrice} = req.query;

        const filter = {}

        if(name){
            filter.name = { $regex : name , $options : "i" }
        }

        if(category){
            filter.category = { $regex : category , $options : "i" }
        }

        if(minPrice || maxPrice){
            filter.price = {}
            if(minPrice) filter.price.$gte = Number(minPrice)
            if(maxPrice) filter.price.$lte = Number(maxPrice)
        }

        const data = await Product.find(filter)

        if(!data){
            return resp.status(404).json({message : "Nothing match to given query"})
        }

        resp.status(200).json({message : "success" , data})
    } catch(err){
        console.log(err);
        resp.status(500).json({message : "Internal server error"})
    }
}

exports.getProductById = async (req , resp) => {
    try{
        const {id} = req.params;

        const data = await Product.findById(id)

        if(!data){
            return resp.status(404).json({message : "No product found"})
        }

        resp.status(200).json({message : "success" , data})
    } catch(err){
        console.log(err);
        resp.status(500).json({message : "Internal server error"})
    }
}

exports.editProduct = async (req , resp) => {
    try{
        const {id} = req.params;

        const { name , category , price } = req.body;

        if(!name || !category || !price){
            return resp.status(400).json({message : "All fields are required"})
        }

        const updatedData = {name , category , price}

        if(req.file){
            updatedData.image = `/products/${req.file.filename}`
        }

        const data = await Product.findByIdAndUpdate(
            id,
            {$set : updatedData},
            {new : true}
        )

        if(!data){
            return resp.status(404).json({message : "No product found by the given id"})
        }

        resp.status(200).json({message : "success" , data})
    } catch(err){
        console.log(err);
        resp.status(500).json({message : "Internal server error"})
    }
}

exports.deleteProduct = async (req , resp) => {
    try{
        const {id} = req.params;

        const data = await Product.findByIdAndDelete(id)

        if(!data){
            return resp.status(404).json({message : "No product found by the given id"})
        }

        resp.status(200).json({message : "success" , data})
    } catch(err){
        console.log(err);
        resp.status(500).json({message : "Internal server error"})
    }
}