import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Heroes from '../views/Heroes.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: Heroes
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
