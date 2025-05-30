<template>
  <div class="flex min-h-screen">
    <!-- Sidebar Navigation -->
    <SideNav />
    
    <!-- Main Content -->
    <div class="flex-1 p-8">
      <div v-if="loading" class="flex items-center justify-center h-full">
        <p class="text-white">Loading...</p>
      </div>
      <div v-else-if="error" class="flex items-center justify-center h-full">
        <p class="text-red-400">{{ error }}</p>
      </div>
      <div v-else-if="!station" class="flex items-center justify-center h-full">
        <p class="text-white">Station not found</p>
      </div>
      <div v-else class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Book Charging Station</h1>
        
        <!-- Station Info Card -->
        <div class="bg-[#444444] p-6 rounded-lg shadow-lg mb-8">
          <!-- Station Header -->
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 rounded-full bg-blue-500 mr-4 flex items-center justify-center text-white text-xl font-bold">
              {{ station.stationName.charAt(0) }}
            </div>
            <div>
              <h2 class="text-white text-xl font-bold">
                {{ station.stationName }}
              </h2>
              <p class="text-gray-400">
                {{ station.provider_info?.name || 'Provider information not available' }}
              </p>
            </div>
          </div>
          
          <!-- Station Details -->
          <div class="space-y-3 mb-6">
            <p class="text-gray-300">
              <span class="font-semibold">Address:</span> 
              {{ formatAddress(station) }}
            </p>
            
            <p class="text-gray-300">
              <span class="font-semibold">Connector Type:</span> 
              {{ station.connectorType }}
            </p>
            
            <p class="text-gray-300">
              <span class="font-semibold">Power Output:</span> 
              {{ station.powerOutput }} kW
            </p>
            
            <p class="text-white text-xl">
              <span class="font-semibold">Price:</span> 
              ₹{{ station.price }}/kWh
            </p>
            
            <div class="flex items-center">
              <div :class="`w-3 h-3 rounded-full ${station.status === 'Active' ? 'bg-green-500' : 'bg-red-500'} mr-2`"></div>
              <span :class="`text-sm ${station.status === 'Active' ? 'text-green-400' : 'text-red-400'}`">
                {{ station.status }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Booking Form -->
        <div class="bg-[#444444] p-6 rounded-lg shadow-lg">
          <h3 class="text-2xl font-bold mb-6">BOOKING SLOTS</h3>
          
          <!-- Date Selector -->
          <div class="mb-6">
            <label class="block text-gray-300 mb-2">Select Date</label>
            <input 
              type="date" 
              v-model="bookingDate"
              class="w-full p-3 bg-[#333333] text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              :min="minDate"
            />
          </div>
          
          <!-- Time Slots -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold mb-3">Available Time Slots</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <button
                v-for="slot in timeSlots"
                :key="slot.id"
                :class="`p-3 rounded border transition-colors ${
                  slot.available
                    ? selectedSlot === slot.id
                      ? 'border-emerald-500 text-emerald-500'
                      : 'border-white text-white hover:border-emerald-500 hover:text-emerald-500'
                    : 'border-gray-600 text-gray-600 cursor-not-allowed'
                }`"
                @click="slot.available && selectSlot(slot.id)"
                :disabled="!slot.available"
              >
                {{ slot.time }}
              </button>
            </div>
          </div>
          
          <!-- Duration Selector -->
          <div class="mb-6">
            <label class="block text-gray-300 mb-2">Duration (hours)</label>
            <input 
              type="number" 
              v-model="duration"
              min="1"
              max="8"
              step="1"
              class="w-full p-3 bg-[#333333] text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <!-- Estimated Cost -->
          <div class="mb-6 p-4 bg-[#333333] rounded-lg">
            <h4 class="text-lg font-semibold mb-2">Estimated Cost</h4>
            <div class="grid grid-cols-2 gap-2">
              <div class="text-gray-400">Price per kWh:</div>
              <div class="text-right">₹{{ station.price }}</div>
              
              <div class="text-gray-400">Duration:</div>
              <div class="text-right">{{ duration }} hour(s)</div>
              
              <div class="text-gray-400">Estimated Energy:</div>
              <div class="text-right">{{ estimatedEnergy }} kWh</div>
              
              <div class="text-white text-lg font-semibold">Total:</div>
              <div class="text-right text-white text-lg font-semibold">₹{{ estimatedCost }}</div>
            </div>
          </div>
          
          <!-- Book Button -->
          <button 
            @click="bookStation" 
            class="w-full py-3 rounded-md font-bold transition-colors bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
            :disabled="!canBook || bookingInProgress"
          >
            {{ bookingInProgress ? 'Processing...' : 'Proceed to Payment' }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Booking Confirmation Modal -->
    <div v-if="showConfirmation" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-[#444444] p-6 rounded-lg w-full max-w-md">
        <div class="text-center">
          <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold mb-2">Booking Confirmed!</h2>
          <p class="mb-6">Your charging session has been successfully booked.</p>
          
          <div class="bg-[#333333] p-4 rounded-lg mb-6 text-left">
            <div class="grid grid-cols-2 gap-2">
              <div class="text-gray-400">Station:</div>
              <div>{{ station.stationName }}</div>
              
              <div class="text-gray-400">Date:</div>
              <div>{{ formatDate(bookingDate) }}</div>
              
              <div class="text-gray-400">Time:</div>
              <div>{{ getSlotTime(selectedSlot) }}</div>
              
              <div class="text-gray-400">Duration:</div>
              <div>{{ duration }} hour(s)</div>
              
              <div class="text-gray-400">Total Cost:</div>
              <div>₹{{ estimatedCost }}</div>
            </div>
          </div>
          
          <div class="flex justify-center space-x-3">
            <router-link 
              to="/chargers" 
              class="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded transition duration-200"
            >
              Find More Stations
            </router-link>
            <router-link 
              to="/" 
              class="py-2 px-4 bg-[#509B6F] hover:bg-[#3e7d59] text-white rounded transition duration-200"
            >
              Go to Dashboard
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import SideNav from '@/components/SideNav.vue'

export default {
  name: 'BookingView',
  components: {
    SideNav
  },
  props: {
    stationId: {
      type: String,
      required: false
    }
  },
  setup(props) {
    const store = useStore()
    const route = useRoute()
    
    // Get station ID from props or route params
    const id = computed(() => props.stationId || route.params.stationId)
    
    // State
    const bookingDate = ref(new Date().toISOString().split('T')[0]) // Today's date in YYYY-MM-DD format
    const selectedSlot = ref(null)
    const duration = ref(1)
    const bookingInProgress = ref(false)
    const showConfirmation = ref(false)
    
    // Computed
    const station = computed(() => store.getters.getSelectedStation)
    const loading = computed(() => store.getters.isLoading)
    const error = computed(() => store.getters.getError)
    
    const minDate = computed(() => {
      const today = new Date()
      return today.toISOString().split('T')[0] // YYYY-MM-DD format
    })
    
    const estimatedEnergy = computed(() => {
      return (station.value?.powerOutput || 0) * duration.value
    })
    
    const estimatedCost = computed(() => {
      return ((station.value?.price || 0) * estimatedEnergy.value).toFixed(2)
    })
    
    const canBook = computed(() => {
      return selectedSlot.value !== null && 
             duration.value >= 1 && 
             station.value?.status === 'Active'
    })
    
    // Time slots (mock data)
    const timeSlots = ref([
      { id: 1, time: "9:00 am - 10:00 am", available: true },
      { id: 2, time: "10:00 am - 11:00 am", available: true },
      { id: 3, time: "11:00 am - 12:00 pm", available: true },
      { id: 4, time: "12:00 pm - 1:00 pm", available: false },
      { id: 5, time: "1:00 pm - 2:00 pm", available: true },
      { id: 6, time: "2:00 pm - 3:00 pm", available: true },
      { id: 7, time: "3:00 pm - 4:00 pm", available: true },
      { id: 8, time: "4:00 pm - 5:00 pm", available: true },
      { id: 9, time: "5:00 pm - 6:00 pm", available: false }
    ])
    
    // Methods
    const fetchStation = async () => {
      try {
        await store.dispatch('fetchStationById', id.value)
      } catch (error) {
        console.error('Error fetching station:', error)
      }
    }
    
    const selectSlot = (slotId) => {
      selectedSlot.value = slotId
    }
    
    const formatAddress = (station) => {
      if (!station.address) return 'Address not available'
      
      const parts = [
        station.address.street,
        station.address.city,
        station.address.state,
        station.address.zipCode
      ].filter(Boolean)
      
      return parts.join(', ')
    }
    
    const formatDate = (dateString) => {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }
    
    const getSlotTime = (slotId) => {
      const slot = timeSlots.value.find(s => s.id === slotId)
      return slot ? slot.time : ''
    }
    
    const bookStation = async () => {
      if (!canBook.value) return
      
      bookingInProgress.value = true
      
      try {
        const slot = timeSlots.value.find(s => s.id === selectedSlot.value)
        
        const bookingData = {
          stationId: id.value,
          startTime: `${bookingDate.value}T${slot.time.split(' - ')[0].replace('am', 'AM').replace('pm', 'PM')}`,
          duration: duration.value
        }
        
        await store.dispatch('bookStation', bookingData)
        showConfirmation.value = true
      } catch (error) {
        console.error('Error booking station:', error)
      } finally {
        bookingInProgress.value = false
      }
    }
    
    onMounted(fetchStation)
    
    return {
      station,
      loading,
      error,
      bookingDate,
      selectedSlot,
      duration,
      timeSlots,
      minDate,
      estimatedEnergy,
      estimatedCost,
      canBook,
      bookingInProgress,
      showConfirmation,
      selectSlot,
      formatAddress,
      formatDate,
      getSlotTime,
      bookStation
    }
  }
}
</script>
