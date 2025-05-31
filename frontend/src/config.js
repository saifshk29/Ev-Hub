// API configuration
const config = {
  // Local development API URL
  development: {
    apiUrl: 'http://localhost:5000/api'
  },
  // Production API URL (updated to use Render backend)
  production: {
    apiUrl: 'https://ev-hub-backend.onrender.com/api'
  }
};

// Determine current environment
const env = process.env.NODE_ENV || 'development';

// Export the configuration for the current environment
export default config[env];
