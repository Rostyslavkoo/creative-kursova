<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="handleLogin" ref="form">
              <v-text-field
                v-model="username"
                label="Username"
                name="username"
                prepend-icon="mdi-account"
                type="text"
                :rules="[v => !!v || 'Username is required']"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                :rules="[v => !!v || 'Password is required']"
                required
              ></v-text-field>

              <v-alert
                v-if="error"
                type="error"
                class="mt-3"
              >
                {{ error }}
              </v-alert>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="handleLogin">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useSnackbar } from '../composables/useSnackbar'

const router = useRouter()
const username = ref('')
const password = ref('')
const form = ref(null)
const error = ref('')
const { notify } = useSnackbar()

const handleLogin = async () => {
  error.value = ''
  const { valid } = await form.value.validate()
  
  if (!valid) return

  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      username: username.value,
      password: password.value
    })

    const { token, user } = response.data
    
    // Store token and user info
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    
    // Set default authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
    // Redirect to admin panel if user is admin
    if (user.isAdmin) {
      router.push('/admin')
    } else {
      router.push('/')
    }
  } catch (error) {
    console.error('Login error:', error)
    const msg = error.response?.data?.message || 'Login failed. Please try again.'
    error.value = msg
    notify(msg, 'error')
  }
}
</script>

<style scoped>
.v-card {
  margin-top: 2rem;
}
</style> 