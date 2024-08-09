const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.SECTRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};

module.exports = authenticate;
