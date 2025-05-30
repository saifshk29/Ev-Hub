const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const stationRoutes = require('./routes/stations');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
// Set up CORS to allow all origins temporarily to debug the issue
app.use(cors({
  origin: '*', // Allow all origins temporarily
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add a pre-flight OPTIONS handler for all routes
app.options('*', cors());

// Add custom headers as a backup method
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
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