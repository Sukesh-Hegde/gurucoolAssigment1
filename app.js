const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const routes = require("./routes");
const winston = require("winston");

// Create a Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logs/queue_system.log" }),
  ],
});

const app = express();
app.use(express.json());

// Connect to the database
connectDB();

// Log all requests
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});

// Use defined routes
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
