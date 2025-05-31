<template>
  <div class="flex min-h-screen">
    <!-- Sidebar Navigation -->
    <SideNav />
    
    <!-- Main Content -->
    <div class="flex-1 p-8">
      <h1 class="text-3xl font-bold mb-6">Manage Charging Stations</h1>
      
      <!-- Add New Station Button -->
      <div class="mb-6">
        <button 
          @click="showAddModal = true" 
          class="py-2 px-4 bg-[#509B6F] hover:bg-[#3e7d59] text-white rounded transition duration-200"
        >
          Add New Station
        </button>
      </div>
      
      <!-- Stations Table -->
      <div class="bg-[#444444] rounded-lg overflow-hidden shadow-lg">
        <div v-if="loading" class="text-center py-8">Loading stations...</div>
        <div v-else-if="error" class="text-red-400 text-center py-8">{{ error }}</div>
        <div v-else-if="stations.length === 0" class="text-center py-8">No charging stations found</div>
        <table v-else class="w-full">
          <thead class="bg-[#333333]">
            <tr>
              <th class="px-4 py-3 text-left">Name</th>
              <th class="px-4 py-3 text-left">Status</th>
              <th class="px-4 py-3 text-left">Connector Type</th>
              <th class="px-4 py-3 text-left">Power (kW)</th>
              <th class="px-4 py-3 text-left">Price (₹/kWh)</th>
              <th class="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr v-for="station in stations" :key="station._id" class="hover:bg-[#3a3a3a]">
              <td class="px-4 py-3">{{ station.stationName }}</td>
              <td class="px-4 py-3">
                <span 
                  :class="{
                    'px-2 py-1 rounded-full text-xs': true,
                    'bg-green-100 text-green-800': station.status === 'Active',
                    'bg-red-100 text-red-800': station.status === 'Inactive'
                  }"
                >
                  {{ station.status }}
                </span>
              </td>
              <td class="px-4 py-3">{{ station.connectorType }}</td>
              <td class="px-4 py-3">{{ station.powerOutput }}</td>
              <td class="px-4 py-3">{{ station.price }}</td>
              <td class="px-4 py-3">
                <div class="flex space-x-2">
                  <button 
                    @click="editStation(station)" 
                    class="p-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200"
                  >
                    Edit
                  </button>
                  <button 
                    @click="confirmDelete(station)" 
                    class="p-1 bg-red-600 hover:bg-red-700 text-white rounded transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Add/Edit Station Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-[#444444] p-6 rounded-lg w-full max-w-lg">
        <h2 class="text-2xl font-bold mb-4">{{ showEditModal ? 'Edit' : 'Add' }} Charging Station</h2>
        
        <form @submit.prevent="submitForm" class="space-y-4">
          <!-- Station Name -->
          <div>
            <label class="block text-gray-300 mb-2">Station Name</label>
            <input
              type="text"
              v-model="stationForm.stationName"
              class="w-full p-3 bg-[#333333] text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <!-- Location -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-300 mb-2">Latitude</label>
              <input
                type="number"
                v-model="stationForm.latitude"
                step="0.000001"
                class="w-full p-3 bg-[#333333] text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-gray-300 mb-2">Longitude</label>
              <input
                type="number"
                v-model="stationForm.longitude"
                step="0.000001"
                class="w-full p-3 bg-[#333333] text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
          
          <!-- Address -->
          <div>
            <label class="block text-gray-300 mb-2">Street Address</label>
            <input
              type="text"
              v-model="stationForm.address.street"
              class="w-full p-3 bg-[#333333] text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-gray-300 mb-2">City</label>
              <input
                type="text"
                v-model="stationForm.address.city"
                class="w-full p-3 bg-[#333333] text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-gray-300 mb-2">State</label>
              <input
                type="text"
                v-model="stationForm.address.state"
                class="w-full p-3 bg-[#333333] text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-gray-300 mb-2">Zip Code</label>
              <input
                type="text"
                v-model="stationForm.address.zipCode"
                class="w-full p-3 bg-[#333333] text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
          
          <!-- Station Details -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-300 mb-2">Status</label>
              <select 
                v-model="stationForm.status" 
                class="w-full p-3 bg-[#333333] text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label class="block text-gray-300 mb-2">Connector Type</label>
              <select 
                v-model="stationForm.connectorType" 
                class="w-full p-3 bg-[#333333] text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                required
              >
                <option value="Type 1">Type 1</option>
                <option value="Type 2">Type 2</option>
                <option value="CCS">CCS</option>
                <option value="CHAdeMO">CHAdeMO</option>
              </select>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-300 mb-2">Power Output (kW)</label>
              <input
                type="number"
                v-model="stationForm.powerOutput"
                min="0"
                step="0.1"
                class="w-full p-3 bg-[#333333] text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-gray-300 mb-2">Price (₹/kWh)</label>
              <input
                type="number"
                v-model="stationForm.price"
                min="0"
                step="0.01"
                class="w-full p-3 bg-[#333333] text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
          
          <!-- Provider Info -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-300 mb-2">Provider Name</label>
              <input
                type="text"
                v-model="stationForm.provider_info.name"
                class="w-full p-3 bg-[#333333] text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-gray-300 mb-2">Charger Type</label>
              <input
                type="text"
                v-model="stationForm.provider_info.charger_type"
                class="w-full p-3 bg-[#333333] text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
          
          <!-- Form Buttons -->
          <div class="flex justify-end space-x-3 mt-6">
            <button 
              type="button"
              @click="closeModal" 
              class="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded transition duration-200"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="py-2 px-4 bg-[#509B6F] hover:bg-[#3e7d59] text-white rounded transition duration-200"
              :disabled="loading"
            >
              {{ loading ? 'Saving...' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-[#444444] p-6 rounded-lg w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">Confirm Delete</h2>
        <p class="mb-6">Are you sure you want to delete the station "{{ stationToDelete?.stationName }}"? This action cannot be undone.</p>
        
        <div class="flex justify-end space-x-3">
          <button 
            @click="showDeleteModal = false" 
            class="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded transition duration-200"
          >
            Cancel
          </button>
          <button 
            @click="deleteStation" 
            class="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded transition duration-200"
            :disabled="loading"
          >
            {{ loading ? 'Deleting...' : 'Delete' }}
          </button>
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
  name: 'ChargersManageView',
  components: {
    SideNav
  },
  setup() {
    const store = useStore()
    
    // State
    const showAddModal = ref(false)
    const showEditModal = ref(false)
    const showDeleteModal = ref(false)
    const stationToDelete = ref(null)
    const stationForm = ref({
      stationName: '',
      latitude: '',
      longitude: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      status: 'Active',
      connectorType: 'Type 2',
      powerOutput: 0,
      price: 0,
      provider_info: {
        name: '',
        charger_type: ''
      }
    })
    
    // Computed
    const stations = computed(() => store.getters.getStations)
    const loading = computed(() => store.getters.isLoading)
    const error = computed(() => store.getters.getError)
    
    // Methods
    const fetchStations = async () => {
      try {
        await store.dispatch('fetchStations')
      } catch (error) {
        console.error('Error fetching stations:', error)
      }
    }
    
    const resetForm = () => {
      stationForm.value = {
        stationName: '',
        latitude: '',
        longitude: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: ''
        },
        status: 'Active',
        connectorType: 'Type 2',
        powerOutput: 0,
        price: 0,
        provider_info: {
          name: '',
          charger_type: ''
        }
      }
    }
    
    const closeModal = () => {
      showAddModal.value = false
      showEditModal.value = false
      resetForm()
    }
    
    const editStation = (station) => {
      stationForm.value = {
        _id: station._id,
        stationName: station.stationName,
        latitude: station.location.coordinates[1],
        longitude: station.location.coordinates[0],
        address: {
          street: station.address?.street || '',
          city: station.address?.city || '',
          state: station.address?.state || '',
          zipCode: station.address?.zipCode || ''
        },
        status: station.status,
        connectorType: station.connectorType,
        powerOutput: station.powerOutput,
        price: station.price,
        provider_info: {
          name: station.provider_info?.name || '',
          charger_type: station.provider_info?.charger_type || ''
        }
      }
      showEditModal.value = true
    }
    
    const confirmDelete = (station) => {
      stationToDelete.value = station
      showDeleteModal.value = true
    }
    
    const deleteStation = async () => {
      try {
        await store.dispatch('deleteStation', stationToDelete.value._id)
        showDeleteModal.value = false
        stationToDelete.value = null
      } catch (error) {
        console.error('Error deleting station:', error)
      }
    }
    
    const submitForm = async () => {
      try {
        // Prepare station data
        const stationData = {
          stationName: stationForm.value.stationName,
          location: {
            type: 'Point',
            coordinates: [
              parseFloat(stationForm.value.longitude),
              parseFloat(stationForm.value.latitude)
            ]
          },
          address: stationForm.value.address,
          status: stationForm.value.status,
          connectorType: stationForm.value.connectorType,
          powerOutput: parseFloat(stationForm.value.powerOutput),
          price: parseFloat(stationForm.value.price),
          provider_info: stationForm.value.provider_info
        }
        
        if (showEditModal.value) {
          // Update existing station
          await store.dispatch('updateStation', {
            stationId: stationForm.value._id,
            stationData
          })
        } else {
          // Create new station
          await store.dispatch('createStation', stationData)
        }
        
        closeModal()
      } catch (error) {
        console.error('Error saving station:', error)
      }
    }
    
    onMounted(fetchStations)
    
    return {
      stations,
      loading,
      error,
      showAddModal,
      showEditModal,
      showDeleteModal,
      stationForm,
      stationToDelete,
      editStation,
      confirmDelete,
      deleteStation,
      submitForm,
      closeModal
    }
  }
}
</script>
