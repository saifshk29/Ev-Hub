<template>
  <div class="flex min-h-screen">
    <!-- Sidebar Navigation -->
    <SideNav />
    
    <!-- Main Content -->
    <div class="flex-1 p-8">
      <h1 class="text-3xl font-bold mb-6">Charging Stations Map</h1>
      
      <div class="flex justify-between items-center mb-4">
        <div>
          <button 
            @click="getUserLocation" 
            class="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200"
          >
            Use My Location
          </button>
        </div>
        <router-link 
          to="/chargers" 
          class="py-2 px-4 bg-[#509B6F] hover:bg-[#3e7d59] text-white rounded transition duration-200"
        >
          List View
        </router-link>
      </div>
      
      <!-- Map Container -->
      <div class="w-full h-[600px] bg-[#444444] rounded-lg overflow-hidden shadow-lg">
        <div v-if="loading" class="flex items-center justify-center h-full">
          <p class="text-white">Loading map...</p>
        </div>
        <div v-else-if="error" class="flex items-center justify-center h-full">
          <p class="text-red-400">{{ error }}</p>
        </div>
        <div v-else ref="mapContainer" class="w-full h-full"></div>
      </div>
      
      <!-- Legend -->
      <div class="bg-[#444444] p-4 rounded-lg mt-4 flex flex-wrap gap-6">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-blue-500"></div>
          <span class="text-sm">Your Location</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
          <span class="text-sm">Active</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-red-500"></div>
          <span class="text-sm">Inactive</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import SideNav from '@/components/SideNav.vue'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'ChargersMapView',
  components: {
    SideNav
  },
  setup() {
    const store = useStore()
    const mapContainer = ref(null)
    const map = ref(null)
    const userMarker = ref(null)
    const markers = ref([])
    const userLocation = ref({ lat: 12.9716, lng: 77.5946 }) // Default location (Bangalore)
    
    const stations = computed(() => store.getters.getStations)
    const loading = computed(() => store.getters.isLoading)
    const error = computed(() => store.getters.getError)
    
    // Initialize map
    const initMap = () => {
      // Import Leaflet dynamically to avoid SSR issues
      import('leaflet').then((L) => {
        // Create map instance
        map.value = L.map(mapContainer.value).setView(
          [userLocation.value.lat, userLocation.value.lng], 
          13
        )
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map.value)
        
        // Create custom icons
        const createIcon = (color) => {
          return L.icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        }
        
        const icons = {
          user: createIcon('blue'),
          active: createIcon('green'),
          inactive: createIcon('red')
        }
        
        // Add user marker
        userMarker.value = L.marker(
          [userLocation.value.lat, userLocation.value.lng],
          { icon: icons.user }
        )
          .addTo(map.value)
          .bindPopup('Your Location')
        
        // Add station markers
        stations.value.forEach(station => {
          const coordinates = station.location.coordinates
          const lat = coordinates[1]
          const lng = coordinates[0]
          
          const marker = L.marker(
            [lat, lng],
            { icon: station.status === 'Active' ? icons.active : icons.inactive }
          )
            .addTo(map.value)
            .bindPopup(`
              <div class="min-w-[200px] max-w-[300px]">
                <h3 class="font-bold text-lg mb-2">${station.stationName}</h3>
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-3 h-3 rounded-full ${station.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}"></div>
                  <span class="text-sm">${station.status}</span>
                </div>
                <div class="text-sm mb-2">
                  <strong>Connector:</strong> ${station.connectorType}
                </div>
                <div class="text-sm mb-2">
                  <strong>Power:</strong> ${station.powerOutput} kW
                </div>
                <div class="text-sm">
                  <strong>Price:</strong> ₹${station.price}/kWh
                </div>
                <a 
                  href="/booking/${station._id}" 
                  class="block mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  Book Now
                </a>
              </div>
            `)
          
          markers.value.push(marker)
        })
      })
    }
    
    // Get user's location
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            userLocation.value = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            
            // Update map and user marker
            if (map.value && userMarker.value) {
              map.value.setView([userLocation.value.lat, userLocation.value.lng], 13)
              userMarker.value.setLatLng([userLocation.value.lat, userLocation.value.lng])
            }
          },
          (error) => {
            console.error('Error getting location:', error)
            store.commit('SET_ERROR', 'Unable to get your location')
          }
        )
      } else {
        store.commit('SET_ERROR', 'Geolocation is not supported by your browser')
      }
    }
    
    // Fetch stations
    const fetchStations = async () => {
      try {
        await store.dispatch('fetchStations')
      } catch (error) {
        console.error('Error fetching stations:', error)
      }
    }
    
    onMounted(async () => {
      await fetchStations()
      initMap()
    })
    
    onUnmounted(() => {
      if (map.value) {
        map.value.remove()
      }
    })
    
    return {
      mapContainer,
      stations,
      loading,
      error,
      getUserLocation
    }
  }
}
</script>
