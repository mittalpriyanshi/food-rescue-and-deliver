const express = require('express');
const http = require('http'); // Import Node's built-in HTTP module
const { Server } = require("socket.io"); // Import Server from socket.io
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express(); //creates application using express
const server = http.createServer(app); // Create an HTTP server from the Express app
const io = new Server(server, { // Attach socket.io to the HTTP server
  cors: {
    origin: "*", // Allow all origins for simplicity, you can restrict this later
    methods: ["GET", "POST"]
  }
});

// Body parser middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Middleware to attach io to each request
app.use((req, res, next) => {
  req.io = io;
  next();
});
// Socket.io connection logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/listings', require('./routes/listings'));

// A simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Listen on the http server, not the Express app
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));