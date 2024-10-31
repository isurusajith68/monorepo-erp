import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Navbar from '@/layouts/Navbar.vue'
import Sidebar from '@/layouts/Sidebar.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/s',
    //   name: 'def',
    //   component: Navbar,
    //   children: [
    //     {
    //       path: 'home',
    //       name: 'home',
    //       component: HomeView,
    //     },
    //   ],
    // },

    {
      path: '/',
      name: 'def',
      component: Navbar,
      children: [
        {
          path: 'home',
          name: 'home',
          // component: HomeView,
          component: Sidebar,
        },
      ],
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
