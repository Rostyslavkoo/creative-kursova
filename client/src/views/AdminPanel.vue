<template>
  <v-container class="admin-panel-wrapper">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Панель адміністратора</h1>
        
        <!-- Programs Management -->
        <v-card class="mb-6" style="display: flex; flex-direction: column; height: 80vh; min-height: 0;">
          <v-card-title>Управління програмами</v-card-title>
          <v-card-text style="flex: 1 1 0; min-height: 0; display: flex; flex-direction: column;">
            <v-data-table
              :headers="headers"
              :items="programs"
              :loading="loading"
              class="elevation-1 full-height-table"
              class="elevation-1"
              height="500px"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Програми</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="openDialog()">
                    Додати нову програму
                  </v-btn>
                </v-toolbar>
              </template>

              <template v-slot:item.image="{ item }">
                <v-img
                  v-if="item.image"
                  :src="`http://localhost:3000/uploads/${item.image}`"
                  max-width="100"
                  max-height="100"
                  contain
                  class="my-2"
                ></v-img>
                <span v-else>Немає зображення</span>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Edit Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.title"
                  label="Назва"
                  :rules="[v => !!v || 'Назва обов\'язкова']"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="editedItem.description"
                  label="Опис"
                  :rules="[v => !!v || 'Опис обов\'язковий']"
                  required
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="editedItem.image"
                  label="Зображення"
                  accept="image/*"
                  prepend-icon="mdi-camera"
                  :preview="editedItem.image"
                ></v-file-input>
                <v-img
                  v-if="editedItem.image && typeof editedItem.image === 'string'"
                  :src="`http://localhost:3000/uploads/${editedItem.image}`"
                  max-width="200"
                  max-height="200"
                  contain
                  class="mt-2"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">
            Скасувати
          </v-btn>
          <v-btn color="blue darken-1" text @click="save">
            Зберегти
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useSnackbar } from '../composables/useSnackbar'

const programs = ref([])
const loading = ref(false)
const dialog = ref(false)
const editedIndex = ref(-1)
const editedItem = ref({
  title: '',
  description: '',
  image: null
})
const defaultItem = {
  title: '',
  description: '',
  image: null
}

const headers = [
  { text: 'Зображення', value: 'image', sortable: false },
  { text: 'Назва', value: 'title' },
  { text: 'Опис', value: 'description' },
  { text: 'Дії', value: 'actions', sortable: false }
]

const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'Нова програма' : 'Редагувати програму'
})

const { notify } = useSnackbar()

const getErrorMessage = (error) => {
  if (error.response?.data?.error) {
    return error.response.data.error
  }
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  return 'Сталася помилка. Спробуйте ще раз.'
}

const fetchPrograms = async () => {
  loading.value = true
  try {
    const response = await axios.get('http://localhost:3000/api/admin/programs')
    programs.value = response.data
  } catch (error) {
    console.error('Error fetching programs:', error)
    notify(getErrorMessage(error), 'error')
  } finally {
    loading.value = false
  }
}

const editItem = (item) => {
  editedIndex.value = programs.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

const deleteItem = async (item) => {
  if (confirm('Ви впевнені, що хочете видалити цю програму?')) {
    try {
      await axios.delete(`http://localhost:3000/api/admin/programs/${item._id}`)
      programs.value = programs.value.filter(p => p._id !== item._id)
      notify('Програму успішно видалено', 'success')
    } catch (error) {
      console.error('Error deleting program:', error)
      notify(getErrorMessage(error), 'error')
    }
  }
}

const closeDialog = () => {
  dialog.value = false
  editedItem.value = Object.assign({}, defaultItem)
  editedIndex.value = -1
}

const save = async () => {
  try {
    if (!editedItem.value.title || !editedItem.value.description) {
      notify('Будь ласка, заповніть всі обов\'язкові поля', 'error')
      return
    }

    const formData = new FormData()
    formData.append('title', editedItem.value.title)
    formData.append('description', editedItem.value.description)
    if (editedItem.value.image && editedItem.value.image instanceof File) {
      formData.append('image', editedItem.value.image)
    }

    if (editedIndex.value > -1) {
      // Update existing program
      await axios.put(
        `http://localhost:3000/api/admin/programs/${editedItem.value._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      Object.assign(programs.value[editedIndex.value], editedItem.value)
      notify('Програму успішно оновлено', 'success')
    } else {
      // Create new program
      const response = await axios.post(
        'http://localhost:3000/api/admin/programs',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      programs.value.push(response.data)
      notify('Програму успішно створено', 'success')
    }
    closeDialog()
  } catch (error) {
    console.error('Error saving program:', error)
    notify(getErrorMessage(error), 'error')
  }
}

const openDialog = () => {
  editedItem.value = Object.assign({}, defaultItem)
  editedIndex.value = -1
  dialog.value = true
}

onMounted(() => {
  fetchPrograms()
})
</script>

<style scoped>
.v-data-table {
  width: 100%;
}
</style> 