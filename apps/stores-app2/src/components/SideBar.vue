<template>
    <aside class="w-64 bg-gray-800 text-white h-screen flex flex-col">
      
  
      <nav class="flex-1 mt-4">
        <ul class="space-y-2">
          <li v-for="item in menuItems" :key="item.label">
            <router-link
              :to="item.path"
              class="flex items-center space-x-4 px-6 py-3 hover:bg-gray-700 rounded-lg cursor-pointer"
            >
              <component :is="item.icon" class="w-5 h-5" />
              <span class="text-sm">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script setup>
  import { Home, Archive, Shuffle, Inbox, Box, ShoppingBag, Tag, Paperclip, BarChart2, FilePlus } from 'lucide-vue-next'
  
  
  const menuItems = [
    { icon: Home, label: 'RequestForm', path: '/form' },
    { icon: Archive, label: 'RequestTable', path: '/table' },
    { icon: Archive, label: 'Items', path: '/items' },
    { icon: Archive, label: 'Units', path: '/units' },
    // { icon: Shuffle, label: 'Transaction', path: '/transaction' },
    // { icon: Inbox, label: 'Requests', path: '/requests' },
    // { icon: Box, label: 'Inventory', path: '/inventory' },
    // { icon: ShoppingBag, label: 'Consumables', path: '/consumables' },
    // { icon: Tag, label: 'Categories', path: '/categories' },
    // { icon: Paperclip, label: 'Attachments', path: '/attachments' },
    // { icon: BarChart2, label: 'Reports', path: '/reports' },
    // { icon: FilePlus, label: 'Form', path: '/form' },  
  ]
  </script>
  
  <style scoped>
 
  </style>
  