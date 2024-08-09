const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Register a new user
exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered");
  } catch (err) {
    res.status(400).send("Error registering user");
  }
};

// Login a user and return a JWT
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ userId: user._id }, process.env.SECTRET_KEY, {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (err) {
    res.status(400).send("Error logging in");
  }
};
