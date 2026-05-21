// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({ token, user });
//   } catch (error) {
//     res.status(500).json({ message: "Login failed" });
//   }
// };

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { name, email, phone, password } = req.body;

    // 🔥 check duplicate email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    // 🔐 hash password
    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phone,
      password: hash
    });

    await user.save();

    res.json({ message: "Registered successfully" });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;

    // 🔍 find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 🔐 compare password
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 🔑 generate token
    const token = jwt.sign(
      { id: user._id },
      "secretkey", // 👉 simple for now
      { expiresIn: "1d" }
    );

   res.json({

  token,

  user: {

    _id: user._id,

    name: user.name,

    email: user.email

  }

});

  } catch (error) {
    console.log("LOGIN ERROR:", error); // 🔥 THIS WILL SHOW REAL ISSUE
    res.status(500).json({ message: "Login error" });
  }
};