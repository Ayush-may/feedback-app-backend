const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/User");
const { nanoid } = require('nanoid');

async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.query('email').using('email-index').eq(email.toLowerCase()).exec()
    if (user.length === 0) return res.status(400).json({ message: "Invalid email or password" })

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user[0]._id }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function registerHandler(req, res) {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.query("email").using("email-index").eq(email.toLowerCase()).exec()
    if (existingUser.length > 0) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      _id: nanoid(),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function validateHandler(req, res) {
  const token = req.body.token
  if (!token) return res.status(401).json({ message: "Token invalid or expired" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ message: "Token is verified" });
  } catch {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
}

async function forgetPasswordHandler(req, res) {
  try {
    const { email, password, newPassword } = req.body;

    const existingUser = await User.query("email").using("email-index").eq(email.toLowerCase()).exec()
    if (existingUser.length === 0) return res.status(404).json({ message: "User not found." });

    const user = existingUser[0]

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Current password is incorrect." });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Forget password error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
}
module.exports = {
  loginHandler,
  registerHandler,
  validateHandler,
  forgetPasswordHandler,
}