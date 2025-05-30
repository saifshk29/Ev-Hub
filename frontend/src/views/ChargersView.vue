<template>
  <div class="flex min-h-screen bg-[#1E1E1E]">
    <!-- Sidebar Navigation -->
    <SideNav />
    
    <!-- Main Content -->
    <div class="flex-1 p-8 overflow-y-auto">
      <div class="max-w-7xl mx-auto">
        <!-- Header with search -->
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 class="text-3xl font-bold text-white mb-2">Charging Stations</h1>
            <p class="text-gray-400">Find and filter available charging stations</p>
          </div>
          <div class="mt-4 md:mt-0">
            <div class="relative">
              <input 
                type="text" 
                placeholder="Search stations..." 
                class="w-full md:w-64 pl-10 pr-4 py-2 bg-[#2a2a2a] text-white border border-gray-700 rounded-xl focus:outline-none focus:border-[#509B6F] focus:ring-1 focus:ring-[#509B6F]"
              />
              <div class="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Filters Section -->
        <div class="bg-gradient-to-br from-[#2E2E2E] to-[#3a3a3a] p-6 rounded-xl shadow-lg mb-6">
          <h2 class="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#4A90E2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter Stations
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Status Filter -->
            <div>
              <label class="block text-gray-300 text-sm font-medium mb-2">Status</label>
              <div class="relative">
                <select 
                  v-model="filters.status" 
                  class="w-full p-3 pl-4 pr-10 bg-[#2a2a2a] text-white border border-gray-700 rounded-xl appearance-none focus:outline-none focus:border-[#509B6F] focus:ring-1 focus:ring-[#509B6F]"
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- Connector Type Filter -->
            <div>
              <label class="block text-gray-300 text-sm font-medium mb-2">Connector Type</label>
              <div class="relative">
                <select 
                  v-model="filters.connectorType" 
                  class="w-full p-3 pl-4 pr-10 bg-[#2a2a2a] text-white border border-gray-700 rounded-xl appearance-none focus:outline-none focus:border-[#509B6F] focus:ring-1 focus:ring-[#509B6F]"
                >
                  <option value="">All Connector Types</option>
                  <option value="Type 1">Type 1</option>
                  <option value="Type 2">Type 2</option>
                  <option value="CCS">CCS</option>
                  <option value="CHAdeMO">CHAdeMO</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- Min Power Filter -->
            <div>
              <label class="block text-gray-300 text-sm font-medium mb-2">Min Power (kW)</label>
              <div class="relative">
                <input 
                  type="number" 
                  v-model="filters.minPower" 
                  class="w-full p-3 pl-4 pr-10 bg-[#2a2a2a] text-white border border-gray-700 rounded-xl focus:outline-none focus:border-[#509B6F] focus:ring-1 focus:ring-[#509B6F]"
                  min="0"
                  step="1"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Filter Buttons -->
          <div class="flex justify-end mt-6 space-x-3">
            <button 
              @click="resetFilters" 
              class="py-2.5 px-5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
            <button 
              @click="applyFilters" 
              class="py-2.5 px-5 bg-[#509B6F] hover:bg-[#3e7d59] text-white rounded-xl transition-all duration-200 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              Apply Filters
            </button>
          </div>
        </div>
        
        <!-- Stations List -->
        <div>
          <div v-if="loading" class="flex justify-center items-center py-16">
            <div class="w-16 h-16 border-4 border-[#509B6F] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div v-else-if="error" class="text-center py-16 bg-red-500/10 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-red-400 text-lg">{{ error }}</p>
          </div>
          <div v-else-if="stations.length === 0" class="text-center py-16 bg-gray-500/10 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-gray-400 text-lg">No charging stations found</p>
            <p class="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
          <div v-else>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="station in stations" :key="station._id" 
                class="bg-gradient-to-br from-[#2E2E2E] to-[#3a3a3a] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
                <div class="p-6">
                  <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center gap-3">
                      <div class="h-12 w-12 rounded-full flex items-center justify-center" 
                        :class="station.status === 'Active' ? 'bg-[#509B6F]/20' : 'bg-[#E53935]/20'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" 
                          :class="station.status === 'Active' ? 'text-[#509B6F]' : 'text-[#E53935]'"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 class="text-xl font-semibold text-white">{{ station.stationName }}</h3>
                        <div class="flex items-center gap-2 text-sm">
                          <span class="text-gray-400">{{ station.connectorType }}</span>
                          <span class="text-gray-600">•</span>
                          <span class="text-gray-400">{{ station.powerOutput }} kW</span>
                        </div>
                      </div>
                    </div>
                    <span class="px-3 py-1 text-xs rounded-full" 
                      :class="station.status === 'Active' ? 'bg-[#509B6F]/20 text-[#509B6F]' : 'bg-[#E53935]/20 text-[#E53935]'">
                      {{ station.status }}
                    </span>
                  </div>
                  
                  <div class="mt-6 flex justify-between items-center">
                    <button class="py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 text-sm">
                      View Details
                    </button>
                    <button class="py-2 px-4 bg-[#509B6F]/20 hover:bg-[#509B6F]/30 text-[#509B6F] rounded-lg transition-all duration-200 text-sm">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import SideNav from '@/components/SideNav.vue'

export default {
  name: 'ChargersView',
  components: {
    SideNav
  },
  setup() {
    const store = useStore()
    
    const filters = ref({
      status: '',
      connectorType: '',
      minPower: ''
    })
    
    const stations = computed(() => store.getters.getStations)
    const loading = computed(() => store.getters.isLoading)
    const error = computed(() => store.getters.getError)
    
    const fetchStations = async () => {
      try {
        await store.dispatch('fetchStations', {
          status: filters.value.status,
          connectorType: filters.value.connectorType,
          minPower: filters.value.minPower
        })
      } catch (error) {
        console.error('Error fetching stations:', error)
      }
    }
    
    onMounted(fetchStations)
    
    const applyFilters = () => {
      fetchStations()
    }
    
    const resetFilters = () => {
      filters.value = {
        status: '',
        connectorType: '',
        minPower: ''
      }
      fetchStations()
    }
    
    return {
      filters,
      stations,
      loading,
      error,
      applyFilters,
      resetFilters
    }
  }
}
</script>
