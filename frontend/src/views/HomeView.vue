<template>
  <div class="flex min-h-screen bg-[#1E1E1E]">
    <!-- Sidebar Navigation -->
    <SideNav />
    
    <!-- Main Content -->
    <div class="flex-1 p-8 overflow-y-auto">
      <div class="max-w-7xl mx-auto">
        <!-- Header Section with Stats -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold mb-2 text-white">Welcome to EV-Hub</h1>
          <p class="text-gray-400 mb-6">Your dashboard for electric vehicle charging management</p>
          
          <!-- Stats Overview -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="bg-gradient-to-br from-[#2E2E2E] to-[#3a3a3a] p-6 rounded-xl shadow-lg">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Total Stations</p>
                  <p class="text-2xl font-bold text-white">{{ stations.length }}</p>
                </div>
                <div class="h-12 w-12 bg-[#509B6F]/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#509B6F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-[#2E2E2E] to-[#3a3a3a] p-6 rounded-xl shadow-lg">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Active Stations</p>
                  <p class="text-2xl font-bold text-white">{{ stations.filter(s => s.status === 'Active').length }}</p>
                </div>
                <div class="h-12 w-12 bg-[#4A90E2]/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#4A90E2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-[#2E2E2E] to-[#3a3a3a] p-6 rounded-xl shadow-lg">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Inactive Stations</p>
                  <p class="text-2xl font-bold text-white">{{ stations.filter(s => s.status === 'Inactive').length }}</p>
                </div>
                <div class="h-12 w-12 bg-[#E53935]/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#E53935]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-[#2E2E2E] to-[#3a3a3a] p-6 rounded-xl shadow-lg">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Avg Power</p>
                  <p class="text-2xl font-bold text-white">{{ avgPower }} kW</p>
                </div>
                <div class="h-12 w-12 bg-[#FFA000]/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#FFA000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Quick Actions Card -->
          <div class="bg-gradient-to-br from-[#2E2E2E] to-[#3a3a3a] p-6 rounded-xl shadow-lg lg:col-span-1">
            <h2 class="text-xl font-semibold mb-4 text-white flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#509B6F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Actions
            </h2>
            <div class="space-y-3">
              <router-link 
                to="/chargers" 
                class="flex items-center gap-3 w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#509B6F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Find Charging Stations
              </router-link>
              <router-link 
                to="/chargers/map" 
                class="flex items-center gap-3 w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#4A90E2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                View Map
              </router-link>
              <router-link 
                to="/chargers/manage" 
                class="flex items-center gap-3 w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#FFA000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Manage Stations
              </router-link>
            </div>
          </div>
          
          <!-- Recent Stations Section -->
          <div class="bg-gradient-to-br from-[#2E2E2E] to-[#3a3a3a] p-6 rounded-xl shadow-lg lg:col-span-2">
            <h2 class="text-xl font-semibold mb-4 text-white flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#4A90E2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Charging Stations
            </h2>
            <div v-if="loading" class="flex justify-center items-center py-12">
              <div class="w-12 h-12 border-4 border-[#509B6F] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div v-else-if="error" class="text-red-400 text-center py-8 bg-red-500/10 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{{ error }}</p>
            </div>
            <div v-else-if="stations.length === 0" class="text-center py-8 bg-gray-500/10 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-gray-400">No charging stations found</p>
            </div>
            <div v-else>
              <div class="space-y-3">
                <div v-for="station in stations.slice(0, 3)" :key="station._id" 
                  class="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all duration-200">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="h-10 w-10 rounded-full flex items-center justify-center" 
                        :class="station.status === 'Active' ? 'bg-[#509B6F]/20' : 'bg-[#E53935]/20'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" 
                          :class="station.status === 'Active' ? 'text-[#509B6F]' : 'text-[#E53935]'"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 class="font-medium text-white">{{ station.stationName }}</h3>
                        <div class="flex items-center gap-2 text-sm">
                          <span class="text-gray-400">{{ station.connectorType }}</span>
                          <span class="text-gray-600">•</span>
                          <span class="text-gray-400">{{ station.powerOutput }} kW</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span class="px-2 py-1 text-xs rounded-full" 
                        :class="station.status === 'Active' ? 'bg-[#509B6F]/20 text-[#509B6F]' : 'bg-[#E53935]/20 text-[#E53935]'">
                        {{ station.status }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4 text-center">
                <router-link to="/chargers" class="text-[#509B6F] hover:text-[#3e7d59] text-sm font-medium inline-flex items-center gap-1">
                  View all stations
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        
        <!-- User Info Card -->
        <div class="mt-6 bg-gradient-to-br from-[#2E2E2E] to-[#3a3a3a] p-6 rounded-xl shadow-lg">
          <h2 class="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#FFA000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Your Account
          </h2>
          <div v-if="user" class="bg-white/5 p-4 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-gray-400 text-sm mb-1">Name</p>
                <p class="text-white">{{ user.name }}</p>
              </div>
              <div>
                <p class="text-gray-400 text-sm mb-1">Email</p>
                <p class="text-white">{{ user.email }}</p>
              </div>
            </div>
            <button 
              @click="logout" 
              class="mt-4 py-2 px-4 bg-[#E53935]/20 hover:bg-[#E53935]/30 text-[#E53935] rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import SideNav from '@/components/SideNav.vue'

export default {
  name: 'HomeView',
  components: {
    SideNav
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const user = computed(() => store.state.user)
    const stations = computed(() => store.state.stations)
    const loading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)
    const avgPower = computed(() => {
      if (stations.value.length === 0) return 0
      const totalPower = stations.value.reduce((sum, station) => sum + station.powerOutput, 0)
      return Math.round((totalPower / stations.value.length) * 10) / 10
    })
    
    onMounted(async () => {
      try {
        await store.dispatch('fetchStations')
      } catch (error) {
        console.error('Error fetching stations:', error)
      }
    })
    
    const logout = () => {
      store.dispatch('logout')
      router.push('/login')
    }
    
    return {
      user,
      stations,
      loading,
      error,
      logout,
      avgPower
    }
  }
}
</script>
