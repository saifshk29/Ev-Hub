<template>
  <div class="h-screen w-[280px] bg-gradient-to-b from-[#3e7d59] to-[#509B6F] flex flex-col justify-between shadow-xl">
    <div class="flex flex-col">
      <!-- LOGO -->
      <div class="w-full h-24 flex gap-3 justify-center items-center border-b border-[#3e7d59]/30">
        <div class="h-14 w-14 bg-white rounded-full flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 text-[#509B6F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 class="text-white font-bold text-2xl tracking-wide">EV-Hub</h1>
      </div>

      <!-- LINKS -->
      <div class="px-4 py-6">
        <p class="text-white/70 text-xs font-semibold uppercase tracking-wider mb-4 px-4">Main Menu</p>
        <ul class="flex flex-col gap-2">
          <li>
            <router-link 
              to="/" 
              class="flex items-center gap-3 px-4 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:bg-white/10"
              :class="{ 'bg-white/20 shadow-lg': $route.path === '/' }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link 
              to="/chargers" 
              class="flex items-center gap-3 px-4 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:bg-white/10"
              :class="{ 'bg-white/20 shadow-lg': $route.path === '/chargers' }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Charging Stations</span>
            </router-link>
          </li>
          <li>
            <router-link 
              to="/chargers/map" 
              class="flex items-center gap-3 px-4 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:bg-white/10"
              :class="{ 'bg-white/20 shadow-lg': $route.path === '/chargers/map' }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span>Map View</span>
            </router-link>
          </li>
          <li>
            <router-link 
              to="/chargers/manage" 
              class="flex items-center gap-3 px-4 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:bg-white/10"
              :class="{ 'bg-white/20 shadow-lg': $route.path === '/chargers/manage' }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Manage Stations</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- USER INFO -->
    <div class="mx-4 mb-4 bg-white/10 rounded-xl overflow-hidden">
      <div class="p-4 flex items-center gap-3">
        <div class="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="text-white font-semibold">{{ user?.name || 'Guest' }}</h3>
          <p class="text-white/70 text-sm truncate">{{ user?.email || 'Not logged in' }}</p>
        </div>
      </div>
      
      <!-- Logout Button -->
      <button 
        @click="logout" 
        class="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 border-t border-white/10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'SideNav',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const user = computed(() => store.getters.getUser)
    
    const logout = () => {
      store.dispatch('logout')
      router.push('/login')
    }
    
    return {
      user,
      logout
    }
  }
}
</script>
