const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateUserToken(user) {
  return jwt.sign(
    { _id: user._id, email: user.email , role : "user" },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "24h" }
  );
}

function generateAdminToken() {
  return jwt.sign(
    { email: process.env.ADMIN_TOKEN , role : "admin"},
    process.env.JWT_SECRET_KEY,
    { expiresIn: "24h" }
  );
}

function verifyUserToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (!token) {
    return resp.status(404).json({ message: "Provide a token" });
  }

  token = jwt.verify(token, process.env.JWT_SECRET_KEY, (err, valid) => {
    if (err) {
      return resp.status(400).json({ message: "Failed to verify token" });
    }
    req.user = valid;
    next();
  });
}

function verifyAdminToken(req , resp , next){
    let token = req.headers["authorization"]
    if(!token){
        return resp.status(404).json({ message: "Provide a token" });
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)
    
    if(decoded.email !== process.env.ADMIN_EMAIL && decoded.role !== "admin"){
        return resp.status(403).json({message : "You are not authenticated"})
    }

    req.user = { email: decoded.email, role: "admin" };

    next();
}

module.exports = {generateUserToken , generateAdminToken , verifyUserToken , verifyAdminToken}
