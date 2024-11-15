<template>
  <aside class="fixed left-0 top-15 w-64 bg-gray-800 text-white h-screen flex flex-col">
    <nav class="flex-1 mt-4 overflow-y-auto">
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
import { 
  Archive, 
  List, 
  Package, 
  Layers 
} from 'lucide-vue-next';

const menuItems = [
  { icon: Archive, label: 'Request', path: '/request' },
  { icon: List, label: 'Items', path: '/items' },
  { icon: Package, label: 'Units', path: '/units' },
  { icon: Layers, label: 'Categories', path: '/categories' },
  { icon: Layers, label: 'GrnDetails', path: '/grn' },
];
</script>

<style scoped>
/* Optional: Add any additional styling */
</style>
