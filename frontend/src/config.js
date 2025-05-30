// API configuration
const config = {
  // Local development API URL
  development: {
    apiUrl: 'http://localhost:5000/api'
  },
  // Production API URL (update this with your Vercel backend URL once deployed)
  production: {
    apiUrl: 'https://ev-hub-backend.vercel.app/api'
  }
};

// Determine current environment
const env = process.env.NODE_ENV || 'development';

// Export the configuration for the current environment
export default config[env];
