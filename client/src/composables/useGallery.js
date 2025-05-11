import { ref } from 'vue'
import axios from 'axios'

export function useGallery() {
  const images = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchImages = async () => {
    loading.value = true
    try {
      const response = await axios.get('/api/gallery')
      images.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addImage = async (formData) => {
    loading.value = true
    try {
      const response = await axios.post('/api/gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      images.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateImage = async (id, formData) => {
    loading.value = true
    try {
      const response = await axios.put(`/api/gallery/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      const index = images.value.findIndex(img => img.id === id)
      if (index !== -1) {
        images.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteImage = async (id) => {
    loading.value = true
    try {
      await axios.delete(`/api/gallery/${id}`)
      images.value = images.value.filter(img => img.id !== id)
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    images,
    loading,
    error,
    fetchImages,
    addImage,
    updateImage,
    deleteImage
  }
} 