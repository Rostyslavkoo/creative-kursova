<template>
  <v-app>
    <AdminHeader :toggleDrawer="toggleDrawer" />
    <v-navigation-drawer v-model="drawer" app>
      <AdminSidebar />
    </v-navigation-drawer>
    <v-main>
      <v-container fluid class="ma-2 fill-height">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import AdminHeader from './Header.vue'
import AdminSidebar from './Sidebar.vue'

const drawer = ref(true)
const toggleDrawer = () => { drawer.value = !drawer.value }
</script>

<style scoped>
.v-main {
  background: #f5f5f5;
  margin-left: 256px; 
  transition: margin-left 0.3s;
}

.v-main:deep(.v-navigation-drawer--rail) {
  margin-left: 64px;
}

:deep(.admin-content-card) {
  height: calc(100vh - 154px);
  margin: 0;
  border-radius: 0;
  background: #fff;
  overflow-y: auto;
  width: 100%;
  margin-top: 64px;
}

:deep(.admin-content-card h2) {
  margin-top: 0;
  padding: 24px 32px;
  border-bottom: 1px solid #e0e0e0;
}

:deep(.admin-content-card p) {
  padding: 0 32px;
}

@media (max-width: 600px) {
  .v-main {
    margin-left: 0;
  }

  :deep(.admin-content-card) {
    height: calc(100vh - 56px);
  }
  
  :deep(.admin-content-card h2) {
    padding: 16px;
  }
  
  :deep(.admin-content-card p) {
    padding: 0 16px;
  }
}
</style> 