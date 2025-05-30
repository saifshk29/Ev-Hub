<template>
  <div class="app">
    <div class="loading-overlay" v-if="isLoading">
      <div class="spinner"></div>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    const isLoading = computed(() => store.getters.isLoading)
    
    return {
      isLoading
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #509B6F;
  --primary-dark: #3e7d59;
  --secondary-color: #2E2E2E;
  --background-color: #1E1E1E;
  --text-color: #ffffff;
  --text-secondary: #B3B3B3;
  --accent-color: #4A90E2;
  --danger-color: #E53935;
  --success-color: #43A047;
  --warning-color: #FFA000;
  --border-radius: 12px;
  --box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

.app {
  width: 100%;
  min-height: 100vh;
}

/* Loading Spinner */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Button Styles */
button, .btn {
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: 'Poppins', sans-serif;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
}

.btn-secondary:hover {
  background-color: #3a3a3a;
}

.btn-danger {
  background-color: var(--danger-color);
  color: white;
}

.btn-danger:hover {
  background-color: #c62828;
}

/* Form Styles */
input, select, textarea {
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius);
  border: 1px solid #444;
  background-color: #2a2a2a;
  color: white;
  font-family: 'Poppins', sans-serif;
  transition: var(--transition);
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(80, 155, 111, 0.2);
}

/* Card Styles */
.card {
  background-color: var(--secondary-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: var(--transition);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}
</style>
