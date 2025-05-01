import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

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

// Mount the app
app.mount('#app')

// Initialize animations
document.addEventListener('DOMContentLoaded', observeElements)
