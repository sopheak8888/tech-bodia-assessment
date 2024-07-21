import { createRouter } from 'vue-router'

const router = createRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    }
  ]
})

export default router
