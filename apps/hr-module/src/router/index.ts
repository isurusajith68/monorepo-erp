import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layouts/Layout.vue'
import AttendanceAdd from '../views/attendance/AttendanceAdd.vue'
import AttendanceList from '../views/attendance/AttendanceList.vue'
import DashBoard from '@/views/DashBoard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // component: HomeView,
          component: DashBoard,
        },
        {
          path: '/attendance/add',
          name: 'attendance/add',
          component: AttendanceAdd,
        },
        {
          path: '/attendance/list',
          name: 'attendance/list',
          component: AttendanceList,
        },
      ],
    },
  ],
})

export default router
