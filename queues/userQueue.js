const Queue = require("bull");
const userQueues = new Map();

// Function to process requests
const processRequest = async (job) => {
  const { userId, request } = job.data;
  console.log(`Processing request for user ${userId}: ${request}`);
  return `Request processed for user ${userId}`;
};

exports.enqueueRequest = (userId, request) => {
  let userQueue = userQueues.get(userId);

  if (!userQueue) {
    userQueue = new Queue(userId, "redis://127.0.0.1:6379");
    userQueue.process(5, processRequest); // Process up to 5 jobs in parallel
    userQueues.set(userId, userQueue);
  }

  userQueue.add({ userId, request });
  return "Request enqueued";
};

// Handle queue events (logging can be added here)
userQueues.forEach((queue, userId) => {
  queue.on("completed", (job) => {
    console.log(`Job completed for user ${job.data.userId}`);
  });

  queue.on("failed", (job, err) => {
    console.error(`Job failed for user ${job.data.userId}: ${err.message}`);
  });
});
