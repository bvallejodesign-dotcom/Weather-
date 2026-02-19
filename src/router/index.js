import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
import DetalleLugar from '../components/DetalleLugar.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lugar/:id',
    name: 'DetalleLugar',
    component: DetalleLugar,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
