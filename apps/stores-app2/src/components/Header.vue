<template>
    <header class="bg-slate-700 text-white py-4 px-6 flex items-center justify-between">
      <!-- Logo Section -->
      <div class="flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/40"
          alt="Logo"
          class="h-10 w-10 rounded-md"
        />
        <h1 class="text-xl font-bold">Inventory App</h1>
      </div>
  
      <!-- Search Section -->
      <div class="relative flex-1 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search...."
          class="w-full rounded-lg py-2 px-4 text-black"
        />
        <button class="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13z"
            />
          </svg>
        </button>
      </div>
  
      <!-- Icons Section -->
      <div class="flex items-center space-x-6">
        <button class="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.5V11a6 6 0 10-12 0v3.5c0 .428-.152.837-.405 1.095L4 17h5m4 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span
            class="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center"
          >
            2
          </span>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A4.992 4.992 0 015 15.5C5 13.567 6.567 12 8.5 12H12m0-4h8m0 0l-8 8m8-8l-8-8"
            />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </button>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  </script>
  
  <style scoped>
  /* Optional: Adjust if needed */
  </style>
  