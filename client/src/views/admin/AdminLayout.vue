<template>
  <v-app>
    <AdminHeader :toggleDrawer="toggleDrawer" />
    <v-navigation-drawer v-model="drawer" app>
      <AdminSidebar />
    </v-navigation-drawer>
    <v-main>
      <div
        class="admin-main-content fill-height"
        :class="{ 'sidebar-collapsed': !drawer }"
      >
        <router-view />
      </div>
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
  transition: margin-left 0.3s;
}

:deep(.admin-content-card) {
  height: calc(100vh - 94px);
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

.admin-main-content {
  position: relative;
  width: calc(100vw - 256px);
  max-width: calc(100vw - 256px);
  min-width: 0;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  left: 256px;
  transition: left 0.3s, width 0.3s, max-width 0.3s;
  padding: 10px;
}

.admin-main-content.sidebar-collapsed {
  width: 100vw;
  max-width: 100vw;
  left: 0;
}
</style> 