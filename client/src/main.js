import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// Configure axios
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.common['Content-Type'] = 'application/json'

// Add token if it exists
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Animation observer
const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('_active')
      }
    })
  }, {
    threshold: 0.1
  })

  document.querySelectorAll('.c-anim-items').forEach(el => {
    observer.observe(el)
  })
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#FF6B6B',
          secondary: '#4ECDC4',
        }
      }
    }
  }
})

const app = createApp(App)
app.use(vuetify)
app.use(router)

// Mount the app
app.mount('#app')

// Initialize animations
document.addEventListener('DOMContentLoaded', observeElements)
