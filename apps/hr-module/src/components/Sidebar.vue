<script setup lang="ts">
import {
  CircleGauge,
  Landmark,
Hotel,
  FileSpreadsheet,
  TentTree,
  Users,
  Files,
} from 'lucide-vue-next'


const links = [
  { text: 'Dashboard', to: '/', icon: CircleGauge },
  { text: 'Departments', to: '/departments', icon: Landmark },
  { text: 'Employees', to: '/employees', icon: Users },
  { text: 'Attendance', to: '/attendance', icon: FileSpreadsheet },
  { text: 'Leaves', to: '/leaves', icon: TentTree },
  { text: 'Report', to: '/report', icon: Files },
]
</script>

<template>
  <div
    class="hidden md:block bg-muted/40 fixed top-0 left-0 h-full w-[220px] lg:w-[260px]"
  >
    <div class="flex h-full flex-col">
      <!-- Header -->
      <div
        class="flex h-14 items-center px-4 lg:h-[60px] lg:px-6 bg-purple-800/30 border-r border-b"
      >
        <router-link to="/" class="flex items-center gap-2 font-semibold">
          <Hotel  class="w-6 h-6" />
          <span>HR Module</span>
        </router-link>
      </div>

      <!-- Navigation Links -->
      <div class="flex-1 bg-purple-100/55 pt-4 flex flex-col">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          <router-link
            v-for="link in links"
            :key="link.text"
            :to="link.to"
            class="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary"
          >
            <component :is="link.icon" class="h-5 w-5" />
            {{ link.text }}
          </router-link>
        </nav>
      </div>
    </div>
  </div>
</template>


