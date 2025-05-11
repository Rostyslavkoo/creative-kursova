<template>
  <v-card class="admin-content-card" elevation="2">
    <v-card-title class="d-flex justify-space-between align-center">
      <h2>Галерея</h2>
      <v-btn color="primary" @click="showAddDialog = true">
        Додати зображення
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-row v-if="loading">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-col>
      </v-row>

      <v-row v-else-if="images.length === 0">
        <v-col cols="12" class="text-center">
          <p class="text-h6">Немає зображень у галереї</p>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col
          v-for="image in images"
          :key="image.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card>
            <v-img
              :src="getImageUrl(image.url)"
              height="200"
              cover
            ></v-img>
            <v-card-actions>
              <v-btn
                color="primary"
                variant="text"
                @click="editImage(image)"
              >
                Редагувати
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                variant="text"
                @click="confirmDelete(image)"
              >
                Видалити
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="showAddDialog" max-width="500px">
      <v-card>
        <v-card-title>
          {{ editingImage ? 'Редагувати зображення' : 'Додати зображення' }}
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleSubmit" ref="form">
            <v-file-input
              v-model="selectedFile"
              label="Виберіть зображення"
              accept="image/*"
              :rules="[v => !!v || 'Оберіть файл']"
            ></v-file-input>
            <v-text-field
              v-model="imageTitle"
              label="Назва зображення"
              :rules="[v => !!v || 'Введіть назву']"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="closeDialog">Скасувати</v-btn>
          <v-btn color="primary" @click="handleSubmit" :loading="loading">
            Зберегти
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="showDeleteDialog" max-width="400px">
      <v-card>
        <v-card-title>Підтвердження видалення</v-card-title>
        <v-card-text>
          Ви впевнені, що хочете видалити це зображення?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showDeleteDialog = false">Скасувати</v-btn>
          <v-btn color="error" @click="handleDelete" :loading="loading">
            Видалити
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGallery } from '@/composables/useGallery'
import { useSnackbar } from '@/composables/useSnackbar'

const {
  images,
  loading,
  error,
  fetchImages,
  addImage,
  updateImage,
  deleteImage
} = useGallery()

const { showSnackbar } = useSnackbar()
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UPLOADS_URL = `${API_BASE_URL}`;

const showAddDialog = ref(false)
const showDeleteDialog = ref(false)
const selectedFile = ref(null)
const imageTitle = ref('')
const editingImage = ref(null)
const imageToDelete = ref(null)
const form = ref(null)

onMounted(() => {
  fetchImages()
})

const editImage = (image) => {
  editingImage.value = image
  imageTitle.value = image.title
  showAddDialog.value = true
}

const confirmDelete = (image) => {
  imageToDelete.value = image
  showDeleteDialog.value = true
}

const closeDialog = () => {
  showAddDialog.value = false
  resetForm()
}

const resetForm = () => {
  selectedFile.value = null
  imageTitle.value = ''
  editingImage.value = null
  if (form.value) {
    form.value.reset()
  }
}

const handleSubmit = async () => {
  if (!form.value) return
  
  const { valid } = await form.value.validate()
  if (!valid) return

  if (!selectedFile.value && !editingImage.value) {
    showSnackbar('Будь ласка, виберіть файл', 'error')
    return
  }

  const formData = new FormData()
  if (selectedFile.value) {
    formData.append('image', selectedFile.value)
  }
  formData.append('title', imageTitle.value)

  try {
    if (editingImage.value) {
      await updateImage(editingImage.value._id, formData)
      showSnackbar('Зображення успішно оновлено', 'success')
    } else {
      await addImage(formData)
      showSnackbar('Зображення успішно додано', 'success')
    }
    closeDialog()
  } catch (err) {
    showSnackbar(err.response?.data?.message || 'Помилка при збереженні зображення', 'error')
  }
}
function getImageUrl(image) {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return `${UPLOADS_URL}${image}`;
}

const handleDelete = async () => {
  if (!imageToDelete.value) return

  try {
    await deleteImage(imageToDelete.value._id)
    showSnackbar('Зображення успішно видалено', 'success')
    showDeleteDialog.value = false
    fetchImages()
    imageToDelete.value = null
  } catch (err) {
    showSnackbar(err.response?.data?.message || 'Помилка при видаленні зображення', 'error')
  }
}
</script>

<style scoped>
.admin-content-card {
  padding: 20px;
}
</style>
