<template>
  <div class="inventory-app">
    <Header />

    <div class="main-layout">
      <SideBar />

      <div class="content-container">
       
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import SideBar from './components/SideBar.vue';
import Header from './components/Header.vue';
</script>

<style scoped>
/* Main Container */
.inventory-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Layout Sections */
.main-layout {
  display: flex;
  flex: 1;
  margin-top: 80px;
}

.content-container {
  flex: 1;
  padding: 20px;
  margin-left: 260px; /* Adjust to match sidebar width */
  background-color: #f3f3f3;
  
}

/* Header and Filters */
.current-stock-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

}

.filters select,
.add-item-btn {
  margin-right: 10px;
}

.add-item-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.add-item-btn:hover {
  background-color: #0056b3;
}
</style>
