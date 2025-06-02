import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '../components/AuthPage.vue'
import Dashboard from '../components/Dashboard.vue'

const routes = [
  { path: '/', component: AuthPage },
  { path: '/dashboard', component: Dashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router