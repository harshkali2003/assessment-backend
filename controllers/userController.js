const { generateUserToken } = require("../middlewares/jwtMiddleware");
const User = require("../models/user")
const bcrypt = require("bcrypt")

exports.userRegister = async (req , resp) => {
    try{
        const {username , email , phone_no , password} = req.body;

        if(!username || !email || !phone_no || !password){
            return resp.status(400).json({message : "All fields are required"})
        }

        if(!req.file){
            return resp.status(400).json({message : "All fields are required"})
        }

        const existing = await User.find({
            $or : [{email : email } , {phone_no : phone_no}]
        })
        if(existing){
            return resp.status(403).json({message : "Already registered with given email or phone"})
        }

        const filename = req.file.filename;
        const filedata = `/users/${filename}`

        const hashedPassword = await bcrypt.hash(password , 10)

        const data = await User.create({
            username,
            email,
            phone_no,
            password : hashedPassword,
            image : filedata
        })

        if(!data){
            return resp.status(400).json({message : "something went wrong"})
        }

        const token = generateUserToken(data);
        const result = data.toObject()
        delete result.password

        resp.status(201).json({message : "success" , result , token})
    } catch(err){
        console.log(err);
        resp.status(500).json({message : "Internal server error"})
    }
}

exports.userLogin = async (req , resp) => {
    try{
        const {email , password} = req.body;
        if(!email || !password){
            return resp.status(400).json({message : "All fields are required"})
        }

        const isValid = await User.findOne({email : email})
        if(!isValid){
            return resp.status(404).json({message : "user not found with given email"})
        }

        const match = await bcrypt.compare(isValid.password , password)
        if(!match){
            return resp.status(404).json({message : "given password is wrong"})
        }

        const token = generateUserToken(isValid)
        const result = isValid.toObject()
        delete result.password

        resp.status(200).json({message : "success" , result , token})
    } catch(err){
        console.log(err);
        resp.status(500).json({message : "Internal server error"})
    }
}