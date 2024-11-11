import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewUplode from '@/views/NewUplode.vue'
import EditFile from '@/views/EditFile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/uplode',
      name:'fromItem',
      component: NewUplode

    },
    {
      path:'/edit/:id',
      name:'EditFile',
      component: EditFile

    },


  ]
})

export default router
