<template>
  <div class="bg-white rounded-xl shadow-lg p-4">
    <div class="flex flex-col gap-2">
      <h3 class="text-lg font-semibold text-gray-800">{{ station.stationName }}</h3>
      
      <div v-if="station.provider_info">
        <p class="text-gray-600 text-sm">
          {{ station.provider_info.name && station.provider_info.charger_type 
            ? `${station.provider_info.name}, ${station.provider_info.charger_type}`
            : 'Provider information not available' }}
        </p>
      </div>
      
      <div v-if="station.address">
        <p class="text-gray-600 text-sm">
          {{ formatAddress(station) }}
        </p>
      </div>
      
      <div class="flex items-center gap-2 mt-1">
        <div :class="`w-3 h-3 rounded-full ${station.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`"></div>
        <span class="text-sm" :class="station.status === 'Active' ? 'text-green-700' : 'text-red-700'">
          {{ station.status }}
        </span>
      </div>
      
      <div class="flex justify-between items-center mt-2">
        <div>
          <span class="text-green-600 font-medium">
            ₹{{ station.price }}/kWh
          </span>
          <div class="text-gray-600 text-xs">
            {{ station.powerOutput }} kW | {{ station.connectorType }}
          </div>
        </div>
        
        <span :class="`px-2 py-1 rounded-full text-xs ${
          station.available
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`">
          {{ station.available ? 'Available' : 'Occupied' }}
        </span>
      </div>

      <router-link
        :to="`/booking/${station._id}`"
        class="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
      >
        Book Now
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StationCard',
  props: {
    station: {
      type: Object,
      required: true
    }
  },
  setup() {
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
    
    return {
      formatAddress
    }
  }
}
</script>
