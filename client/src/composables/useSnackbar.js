import { ref } from 'vue'

const show = ref(false)
const message = ref('')
const color = ref('success')

function notify(msg, type = 'success', timeout = 4000) {
  message.value = msg
  color.value = type === 'error' ? 'error' : 'success'
  show.value = true
}

export function useSnackbar() {
  return {
    show,
    message,
    color,
    notify
  }
} 