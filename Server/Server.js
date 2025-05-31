const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const stationRoutes = require('./routes/stations');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
const corsOptions = {
  origin: 'https://ev-hub-1.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // If your frontend sends credentials (e.g., cookies, Authorization header)
  optionsSuccessStatus: 200 // For compatibility with older browsers/devices
};

app.use(cors(corsOptions)); // Apply CORS middleware globally with specific options

// IMPORTANT: All other app.use() and route definitions must come AFTER app.use(cors(corsOptions))
app.use(express.json());

// Routes
app.use('/api/stations', stationRoutes);
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});