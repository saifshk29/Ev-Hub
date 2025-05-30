<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-6 bg-[#444444] rounded-lg shadow-xl">
      <h2 class="text-2xl font-bold mb-6 text-white">Register</h2>
      <div v-if="error" class="text-red-400 mb-4">{{ error }}</div>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-gray-300 mb-2">Name</label>
          <input
            type="text"
            v-model="formData.name"
            class="w-full p-3 bg-[#333333] text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label class="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            v-model="formData.email"
            class="w-full p-3 bg-[#333333] text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label class="block text-gray-300 mb-2">Password</label>
          <input
            type="password"
            v-model="formData.password"
            class="w-full p-3 bg-[#333333] text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button 
          type="submit"
          class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200"
          :disabled="loading"
        >
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
        <p class="text-gray-400 text-center mt-4">
          Already have an account?
          <router-link to="/login" class="text-blue-400 cursor-pointer hover:underline">
            Login
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'RegisterView',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const formData = ref({
      name: '',
      email: '',
      password: ''
    })
    
    const loading = computed(() => store.getters.isLoading)
    const error = computed(() => store.getters.getError)
    
    const handleSubmit = async () => {
      try {
        await store.dispatch('register', formData.value)
        router.push('/')
      } catch (error) {
        console.error('Registration error:', error)
      }
    }
    
    return {
      formData,
      loading,
      error,
      handleSubmit
    }
  }
}
</script>
