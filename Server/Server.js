const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const stationRoutes = require('./routes/stations');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://ev-hub-frontend-j88xhvcq7-saif-shaikhs-projects-50542679.vercel.app',
    'http://localhost:8080' // For local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
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