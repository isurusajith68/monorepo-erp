<template>
  <div>
    <Header />
    <SideBar />

    <div class="router-view-container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import SideBar from './components/SideBar.vue';
import Header from './components/Header.vue';
import RequestForm from './views/RequestForm.vue';
</script>

<style scoped>

.router-view-container {
  margin-left: 380px;
  margin-top: 50px; 
  width:1000px;
}
</style>
