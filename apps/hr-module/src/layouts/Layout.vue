<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div>
    <div class="relative min-h-screen w-full">
    <Sidebar></Sidebar>
    <div class="flex flex-col md:ml-[220px] lg:ml-[260px]">
    <Navbar></Navbar>
    <div class="flex-1 overflow-y-auto p-4">
    <RouterView />
    </div>
    </div>
    </div>
  </div>
</template>
