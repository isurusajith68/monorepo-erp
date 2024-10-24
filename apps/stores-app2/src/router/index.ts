import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RequestForm from '@/views/RequestForm.vue'
import RequestTable  from '@/views/RequestTable.vue'
import ItemTable from '@/views/ItemTable.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },

   {
      path: '/form',
      name: 'form',
      component: RequestForm
    },

    
   {
    path: '/table',
    name: 'table',
    component: RequestTable
  },

    
  {
    path: '/items',
    name: 'items',
    component: ItemTable
  }
  
  ]
})

export default router
