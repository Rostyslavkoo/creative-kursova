import { ref } from 'vue'

const snackbar = ref({
  show: false,
  text: '',
  color: 'success',
  timeout: 3000
})

export function useSnackbar() {
  const showSnackbar = (text, color = 'success', timeout = 3000) => {
    snackbar.value = {
      show: true,
      text,
      color,
      timeout
    }
  }

  const showError = (text, timeout = 3000) => {
    showSnackbar(text, 'error', timeout)
  }

  const showSuccess = (text, timeout = 3000) => {
    showSnackbar(text, 'success', timeout)
  }

  const hideSnackbar = () => {
    snackbar.value.show = false
  }

  return {
    snackbar,
    showSnackbar,
    showError,
    showSuccess,
    hideSnackbar
  }
} 