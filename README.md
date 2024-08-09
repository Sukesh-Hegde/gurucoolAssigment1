# Queue System Backend

## Overview
This project is a backend system designed to efficiently manage requests from multiple users using a queue structure. Each connected client has its own queue where all requests are processed sequentially. The system is robust and scalable, ensuring that all requests are processed, and the queue is emptied once users disconnect. The system includes user authentication, request queueing, concurrency management, and logging.

## Features
User Authentication: Secure user registration and login using JWT.

Request Queueing: Each user has a dedicated queue where requests are processed in a First-In-First-Out (FIFO) manner.

Concurrency Management: The system can handle multiple users and their respective queues concurrently.

Scalability: The backend is designed to scale with an increasing number of users and requests.

Robustness: Error handling and recovery mechanisms are in place to manage failures without data loss.

Logging and Monitoring: All request handling and system performance metrics are logged for monitoring purposes.

## Technologies Used
Node.js: Server-side JavaScript runtime.
Express.js: Web framework for handling routing and middleware.
MongoDB: NoSQL database for storing user credentials.
Redis: In-memory data structure store used by Bull for queue management.
Bull: A Redis-based queue system for Node.js.
JWT: JSON Web Token for secure user authentication.
Winston: Logging library for Node.js.

## Project Structure

queue-system/
├── config/
│   └── db.js
├── controllers/
│   └── authController.js
├── models/
│   └── user.js
├── queues/
│   └── userQueue.js
├── middlewares/
│   └── authMiddleware.js
├── logs/
│   └── queue_system.log
├── app.js
├── routes.js
└── package.json


## API Endpoints
## 1. Register a User
Endpoint: /api/register
Method: POST
Description: Registers a new user.
Body:
json
Copy code
{
  "username": "user1",
  "password": "pass123"
}
Response:
201: User registered successfully.
400: Error in registering the user.

## 2. Login a User
Endpoint: /api/login
Method: POST
Description: Authenticates a user and returns a JWT.
Body:
json
Copy code
{
  "username": "user1",
  "password": "pass123"
}
Response:
200: Returns a JWT token.
400: Invalid credentials or error in logging in.

## 3. Enqueue a Request
Endpoint: /api/enqueue
Method: POST
Description: Enqueues a request for processing.
Headers:
Authorization: Bearer <token>
Body:
json
Copy code
{
  "request": "some task"
}
Response:
200: Request enqueued successfully.
401: Unauthorized (if token is missing or invalid).

## Logging and Monitoring
Logs are stored in the logs/queue_system.log file.
Request processing events and errors are logged using Winston.
Scalability and Concurrency
The system can process multiple jobs in parallel (up to 5 jobs by default) per user queue.
Adjust the concurrency by modifying the userQueue.process(5, processRequest) line in the userQueue.js file.
Error Handling
The system is equipped with error-handling mechanisms that ensure robustness. In case of any failure, jobs are reattempted, and errors are logged.
