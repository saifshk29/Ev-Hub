import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ChargersView from '../views/ChargersView.vue'
import ChargersMapView from '../views/ChargersMapView.vue'
import ChargersManageView from '../views/ChargersManageView.vue'
import BookingView from '../views/BookingView.vue'

// Auth guard
const requireAuth = (to, from, next) => {
  const token = localStorage.getItem('token')
  if (!token) {
    next('/login')
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/chargers',
    name: 'chargers',
    component: ChargersView,
    beforeEnter: requireAuth
  },
  {
    path: '/chargers/map',
    name: 'chargers-map',
    component: ChargersMapView,
    beforeEnter: requireAuth
  },
  {
    path: '/chargers/manage',
    name: 'chargers-manage',
    component: ChargersManageView,
    beforeEnter: requireAuth
  },
  {
    path: '/booking/:stationId',
    name: 'booking',
    component: BookingView,
    beforeEnter: requireAuth,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
