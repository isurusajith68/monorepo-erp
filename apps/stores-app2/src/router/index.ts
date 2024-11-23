import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import ItemTable from '@/views/ItemTable.vue'
import UnitTable from '@/views/UnitTable.vue'
import ItemCategories from '@/views/ItemCategories.vue'
import PrSelectedItems from '@/views/PurchaseRequests/PrSelectedItems.vue'
import GrnDetails from '@/views/GrnDetails/GrnDetails.vue'
import PrRequestList from '@/views/PurchaseRequests/PrRequestList.vue'
import PrRequestForm from '@/views/PurchaseRequests/PrRequestForm.vue'
import PrEditForm from '@/views/PurchaseRequests/PrEditForm.vue'
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
      path: '/request',
      name: 'request',
      component: PrRequestList,
    },


 

    
  {
    path: '/items',
    name: 'items',
    component: ItemTable
  },

  {
    path: '/units',
    name: 'units',
    component: UnitTable
  },
  {
    path: '/categories',
    name: 'categories',
    component: ItemCategories
  },
   {
    path: '/grn',
    name: 'grn',
    component: GrnDetails
   },
   {
    path:'/itemquentity',
    name:'itemquentity',
    component:PrSelectedItems
   },
  //  {
  //   path:'/newpequest',
  //   name:'newpequest',
  //   component:PrRequestForm
  //  },
   
   {
    path:'/editrequest/:id',
    name:'editrequest',
    component:PrEditForm,
    props:true
   },
   
  //  {
  //   path:'/editrequest',
  //   name:'editrequest',
  //   component:PrEditForm,
  //   props:true
  //  }
  ]
})

export default router
