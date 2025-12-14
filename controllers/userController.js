const { generateToken } = require("../middlewares/jwtMiddleware");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.userRegister = async (req, resp) => {
  try {
    const { username, email, phone_no, password } = req.body;

    if (!username || !email || !phone_no || !password) {
      return resp.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return resp.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({
      $or: [{ email: email }, { phone_no: phone_no }],
    });
    if (existing) {
      return resp
        .status(403)
        .json({ message: "Already registered with given email or phone" });
    }

    const filename = req.file.filename;

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = await User.create({
      username,
      email,
      phone_no,
      password: hashedPassword,
      image: filename,
    });

    if (!data) {
      return resp.status(400).json({ message: "something went wrong" });
    }

    const token = generateToken({
      id : data._id,
      email : data.email,
    });
    const result = data.toObject();
    delete result.password;

    resp.status(201).json({ message: "success", result, token });
  } catch (err) {
    console.log(err);
    resp.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = null;
    let role = "user";

    // ---------------- ADMIN LOGIN ----------------
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      role = "admin";

      const token = generateToken({
        email,
        role,
      });

      return res.status(200).json({
        message: "Admin login successful",
        token,
        user: {
          email,
          role,
        },
      });
    }

    // ---------------- USER LOGIN ----------------
    user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      role: "user",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: "user",
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};