<template>
  <v-list nav dense density="compact">
    <v-list-item
      
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      exact
      class="sidebar-item"
    >
    <v-list-item :prepend-icon="item.icon" :title="item.title"></v-list-item>
    </v-list-item>
  </v-list>
</template>

<script setup>
const items = [
  { to: '/admin', icon: 'mdi-view-dashboard-outline', title: 'Головна' },
  { to: '/admin/programs', icon: 'mdi-book-outline', title: 'Програми' },
  { to: '/admin/gallery', icon: 'mdi-image-outline', title: 'Галерея' },
  { to: '/admin/reviews', icon: 'mdi-comment-outline', title: 'Відгуки' },
  { to: '/admin/applications', icon: 'mdi-file-document-outline', title: 'Заявки' },
  { to: '/admin/students', icon: 'mdi-account-group-outline', title: 'Учні' },
  { to: '/admin/users', icon: 'mdi-account-cog-outline', title: 'Користувачі' },
  { to: '/admin/profile', icon: 'mdi-account-circle-outline', title: 'Кабінет' },
]
</script>

<style scoped>
.sidebar-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 8px;
}
.sidebar-icon {
  min-width: 32px;
}
.sidebar-title {
  margin-left: 12px;
  font-weight: 500;
  font-size: 1rem;
}
</style> 