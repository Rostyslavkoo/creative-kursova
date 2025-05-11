import { ref } from 'vue'

const show = ref(false)
const message = ref('')
const color = ref('error')
const timeout = ref(3000)

export function useSnackbar() {
  const showSnackbar = (msg, clr = 'error', tmt = 3000) => {
    message.value = msg
    color.value = clr
    timeout.value = tmt
    show.value = true
  }

  const hideSnackbar = () => {
    show.value = false
  }

  return {
    show,
    message,
    color,
    timeout,
    showSnackbar,
    hideSnackbar
  }
} 