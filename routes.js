const express = require("express");
const authController = require("./controllers/authController");
const authenticate = require("./middlewares/authMiddleware");
const { enqueueRequest } = require("./queues/userQueue");

const router = express.Router();

// Auth routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Queue routes
router.post("/enqueue", authenticate, (req, res) => {
  const { request } = req.body;
  const response = enqueueRequest(req.userId, request);
  res.send(response);
});

module.exports = router;
