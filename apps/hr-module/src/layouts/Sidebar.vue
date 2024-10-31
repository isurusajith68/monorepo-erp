

<template>
  <div
    class="hidden md:block bg-muted/40 fixed top-0 left-0 h-full w-[220px] lg:w-[260px]"
  >
    <div class="flex h-full flex-col">
      <!-- Header -->
      <div class="flex h-14 items-center px-4 lg:h-[60px] lg:px-6 bg-blue-400 border-r border-b">
        <router-link to="/" class="flex items-center gap-2 font-semibold">
          <RiHotelLine class="w-8 h-8" />
          <span>ERP Entry</span>
        </router-link>
      </div>

      <!-- Navigation Links -->
      <div class="flex-1 bg-blue-50 pt-4 flex flex-col">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          <router-link
            v-for="link in links"
            :key="link.text"
            :to="link.to"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <component :is="link.icon" class="h-5 w-5" />
            {{ link.text }}
          </router-link>
        </nav>

        <!-- Logout Button -->
        <div class="ml-10 mt-auto mb-6">
          <router-link
            to="/logout"
            class="flex items-center justify-center gap-3 text-center rounded-lg bg-red-600 text-white py-2 px-4 hover:bg-red-500 transition w-[60%]"
          >
            <LogOut class="h-5 w-5" />
            Logout
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LogOut, Home, ShoppingCart, LineChart, Users } from 'lucide-vue-next';
//  import { RiHotelLine } from 'lucide-vue-next'; // assuming ShadCN has RiHotelLine

const links = [
  { text: 'Dashboard', to: '/', icon: Home },
  { text: 'Orders', to: '/orders', icon: ShoppingCart },
  { text: 'Analytics', to: '/analytics', icon: LineChart },
  { text: 'Customers', to: '/customers', icon: Users },
];
</script>

