<template>
  <v-app-bar app color="white" elevation="2">
    <v-btn icon class="mr-2" @click="toggleDrawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-toolbar-title class="text-grey-darken-3">Адмін-панель</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar size="32">
            <img :src="userAvatar" alt="User" />
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>{{ userName }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>Вийти</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
const props = defineProps({
  toggleDrawer: Function
})
const userName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : 'Адмін';
const userAvatar = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userName);

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
}
</script> 