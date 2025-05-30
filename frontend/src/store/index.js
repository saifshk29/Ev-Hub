import { createStore } from 'vuex'
import axios from 'axios'
import config from '../config'  // Import the configuration

// API base URL from config
const API_URL = config.apiUrl

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    stations: [],
    selectedStation: null,
    loading: false,
    error: null
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getUser: state => state.user,
    getStations: state => state.stations,
    getSelectedStation: state => state.selectedStation,
    isLoading: state => state.loading,
    getError: state => state.error
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    CLEAR_AUTH(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
    SET_STATIONS(state, stations) {
      state.stations = stations
    },
    SET_SELECTED_STATION(state, station) {
      state.selectedStation = station
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    ADD_STATION(state, station) {
      state.stations.push(station)
    },
    UPDATE_STATION(state, updatedStation) {
      const index = state.stations.findIndex(s => s._id === updatedStation._id)
      if (index !== -1) {
        state.stations.splice(index, 1, updatedStation)
      }
    },
    DELETE_STATION(state, stationId) {
      state.stations = state.stations.filter(s => s._id !== stationId)
    }
  },
  actions: {
    // Auth actions
    async register({ commit }, credentials) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.post(`${API_URL}/auth/register`, credentials)
        commit('SET_USER', response.data.user)
        commit('SET_TOKEN', response.data.token)
        commit('SET_ERROR', null)
        return response
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Registration failed')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async login({ commit }, credentials) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials)
        commit('SET_USER', response.data.user)
        commit('SET_TOKEN', response.data.token)
        commit('SET_ERROR', null)
        return response
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Login failed')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    logout({ commit }) {
      commit('CLEAR_AUTH')
    },

    // Station actions
    async fetchStations({ commit }, filters = {}) {
      commit('SET_LOADING', true)
      try {
        // Build query string from filters
        const queryParams = new URLSearchParams()
        if (filters.status) queryParams.append('status', filters.status)
        if (filters.connectorType) queryParams.append('connectorType', filters.connectorType)
        if (filters.minPower) queryParams.append('minPower', filters.minPower)
        
        const queryString = queryParams.toString()
        const url = queryString ? `${API_URL}/stations?${queryString}` : `${API_URL}/stations`
        
        const response = await axios.get(url)
        commit('SET_STATIONS', response.data)
        commit('SET_ERROR', null)
        return response.data
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch stations')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async fetchStationById({ commit }, stationId) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`${API_URL}/stations/${stationId}`)
        commit('SET_SELECTED_STATION', response.data)
        commit('SET_ERROR', null)
        return response.data
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch station')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async createStation({ commit, state }, stationData) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.post(
          `${API_URL}/stations`, 
          stationData,
          {
            headers: { Authorization: `Bearer ${state.token}` }
          }
        )
        commit('ADD_STATION', response.data)
        commit('SET_ERROR', null)
        return response.data
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to create station')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async updateStation({ commit, state }, { stationId, stationData }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.put(
          `${API_URL}/stations/${stationId}`, 
          stationData,
          {
            headers: { Authorization: `Bearer ${state.token}` }
          }
        )
        commit('UPDATE_STATION', response.data)
        commit('SET_ERROR', null)
        return response.data
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to update station')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async deleteStation({ commit, state }, stationId) {
      commit('SET_LOADING', true)
      try {
        await axios.delete(
          `${API_URL}/stations/${stationId}`,
          {
            headers: { Authorization: `Bearer ${state.token}` }
          }
        )
        commit('DELETE_STATION', stationId)
        commit('SET_ERROR', null)
        return true
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to delete station')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async bookStation({ commit, state }, bookingData) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.post(
          `${API_URL}/stations/book`, 
          bookingData,
          {
            headers: { Authorization: `Bearer ${state.token}` }
          }
        )
        commit('SET_ERROR', null)
        return response.data
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to book station')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
})
