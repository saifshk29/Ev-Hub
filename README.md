# EV-Hub: Electric Vehicle Charging Station Management System

## Overview

EV-Hub is a full-stack application for managing electric vehicle charging stations. It allows users to find, filter, and book charging stations, as well as view them on a map. The application includes user authentication, station management, and a responsive UI.

## Features

- **User Authentication**
  - Secure registration and login with JWT
  - Protected routes for station management

- **Charging Station Management**
  - Create, read, update, and delete charging stations
  - Filter stations by status, connector type, and power output
  - View stations on an interactive map
  - Book charging stations

- **Responsive UI**
  - Modern, mobile-friendly interface
  - Dark theme with intuitive navigation
  - Interactive map view

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Mongoose** - MongoDB object modeling

### Frontend
- **Vue.js** - JavaScript framework
- **Vuex** - State management
- **Vue Router** - Routing
- **Tailwind CSS** - Utility-first CSS framework
- **Leaflet** - Interactive maps
- **Axios** - HTTP client



## API Documentation

### Authentication Endpoints

#### Register a new user
- **URL**: `/api/users/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token"
  }
  ```

#### Login
- **URL**: `/api/users/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token"
  }
  ```

### Charging Station Endpoints

#### Get all stations
- **URL**: `/api/stations`
- **Method**: `GET`
- **Query Parameters**:
  - `status` (optional): Filter by status (`Active` or `Inactive`)
  - `connectorType` (optional): Filter by connector type
  - `minPower` (optional): Filter by minimum power output
- **Success Response**: `200 OK`
  ```json
  [
    {
      "_id": "station_id",
      "stationName": "Station 1",
      "location": {
        "type": "Point",
        "coordinates": [longitude, latitude]
      },
      "status": "Active",
      "powerOutput": 50,
      "connectorType": "Type 2"
    }
  ]
  ```

#### Get station by ID
- **URL**: `/api/stations/:id`
- **Method**: `GET`
- **Success Response**: `200 OK`
  ```json
  {
    "_id": "station_id",
    "stationName": "Station 1",
    "location": {
      "type": "Point",
      "coordinates": [longitude, latitude]
    },
    "status": "Active",
    "powerOutput": 50,
    "connectorType": "Type 2"
  }
  ```

#### Create a new station
- **URL**: `/api/stations`
- **Method**: `POST`
- **Authentication**: Required (JWT Token)
- **Headers**: `Authorization: Bearer jwt_token`
- **Body**:
  ```json
  {
    "stationName": "New Station",
    "location": {
      "coordinates": [longitude, latitude]
    },
    "status": "Active",
    "powerOutput": 50,
    "connectorType": "Type 2"
  }
  ```
- **Success Response**: `201 Created`

#### Update a station
- **URL**: `/api/stations/:id`
- **Method**: `PUT`
- **Authentication**: Required (JWT Token)
- **Headers**: `Authorization: Bearer jwt_token`
- **Body**: (fields to update)
  ```json
  {
    "stationName": "Updated Station",
    "status": "Inactive"
  }
  ```
- **Success Response**: `200 OK`

#### Delete a station
- **URL**: `/api/stations/:id`
- **Method**: `DELETE`
- **Authentication**: Required (JWT Token)
- **Headers**: `Authorization: Bearer jwt_token`
- **Success Response**: `200 OK`


