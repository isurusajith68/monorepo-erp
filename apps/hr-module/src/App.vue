<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Button } from '@/components/ui/button'
</script>

<template>
  <header>
   

    <div class="wrapper">

      <nav>
        <RouterLink to="home">Home</RouterLink>
        <RouterLink to="about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  <!-- <Button>Click me</Button> -->
</template>

