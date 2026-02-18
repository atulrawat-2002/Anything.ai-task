const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded contains { id: userId }

    // Optional: fetch user from DB if needed
    req.userDetails = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
