const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
}

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (!token) {
    return resp.status(404).json({ message: "Provide a token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return resp.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
