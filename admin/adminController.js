const { generateAdminToken } = require("../middlewares/jwtMiddleware");

require("dotenv").config();

exports.adminLogin = async (req , resp) => {
    try{
        const {email , password} = req.body;

        if(!email || !password){
            return resp.status(400).json({message : "All fields are required"})
        }

        if(email !== process.env.ADMIN_EMAIL && password !== process.env.ADMIN_PASSWORD){
            return resp.status(403).json({message : "invalid credentials"})
        }

        const token = generateAdminToken({email})

        resp.status(200).json({message : "success" , token})
    } catch(err){
        console.log(err);
        resp.status(500).json({message : "Internal server error"})
    }
}