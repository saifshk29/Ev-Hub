// routes/stations.js
const express = require('express');
const router = express.Router();
const Station = require('../models/station');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// GET all stations (public route)
router.get('/', async (req, res) => {
  try {
    // Add filtering capabilities
    const filter = {};
    
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    if (req.query.connectorType) {
      filter.connectorType = req.query.connectorType;
    }
    
    if (req.query.minPower) {
      filter.powerOutput = { $gte: parseFloat(req.query.minPower) };
    }
    
    const stations = await Station.find(filter);
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET station by ID
router.get('/:id', async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }
    res.json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new station (protected route)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const station = new Station({
      ...req.body,
      owner: req.user.userId // Set the owner to the authenticated user
    });
    
    const newStation = await station.save();
    res.status(201).json(newStation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a station (protected route)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }
    
    // Check if the user is the owner of the station
    if (station.owner && station.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied. You are not the owner of this station.' });
    }
    
    // Update the station
    const updatedStation = await Station.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(updatedStation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a station (protected route)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }
    
    // Check if the user is the owner of the station
    if (station.owner && station.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied. You are not the owner of this station.' });
    }
    
    await Station.findByIdAndDelete(req.params.id);
    res.json({ message: 'Station deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Find nearby stations
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query; // radius in meters
    
    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }
    
    const stations = await Station.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius)
        }
      }
    });
    
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add booking endpoint
router.post('/book', authenticateToken, async (req, res) => {
  try {
    const { stationId, startTime, duration } = req.body;
    
    if (!stationId || !startTime || !duration) {
      return res.status(400).json({ message: 'Station ID, start time, and duration are required' });
    }
    
    const station = await Station.findById(stationId);
    
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }
    
    if (!station.available) {
      return res.status(400).json({ message: 'Station is not available for booking' });
    }
    
    // Update station availability
    station.available = false;
    await station.save();
    
    // Here you would typically create a booking record in a separate collection
    
    res.status(201).json({ 
      message: 'Booking successful',
      booking: {
        stationId,
        userId: req.user.userId,
        startTime,
        duration,
        price: station.price
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;