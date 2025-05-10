<template>
  <v-card class="admin-content-card pa-0" elevation="2">
    <div class="d-flex align-center justify-space-between pa-3">
      <h4 class="mb-0">Управління програмами</h4>
      <v-btn color="info" @click="openAddDialog">Додати програму</v-btn>
    </div>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="programs"
      class="elevation-1 program-table"
      item-key="_id"
      :items-per-page="5"
      :loading="loading"
      dense
      height="100%"
      hide-default-footer
      fixed-header
    >
      <template #item.image="{ item }">
        <v-avatar size="56">
          <img :src="getImageUrl(item.image)" alt="img" v-if="item.image" />
        </v-avatar>
      </template>
      <template #item.type="{ item }">
        <v-chip :color="item.type === 'онлайн' ? 'blue' : 'green'" dark>{{ item.type }}</v-chip>
      </template>
      <template #item.mode="{ item }">
        <v-chip :color="item.mode === 'групові' ? 'purple' : 'orange'" dark>{{ item.mode }}</v-chip>
      </template>
      <template #item.actions="{ item }">
        <v-btn icon color="warning"size="small" @click="openEditDialog(item)" class="mr-2"><v-icon density="compact" >mdi-pencil</v-icon></v-btn>
        <v-btn icon color="error"size="small"  @click="deleteProgram(item)"><v-icon density="compact" >mdi-delete</v-icon></v-btn>
      </template>
    </v-data-table>

    <!-- Діалог додавання/редагування -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h6">{{ editedProgram._id ? 'Редагувати' : 'Додати' }} програму</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="formRef" @submit.prevent="saveProgram">
            <v-file-input
              v-model="editedProgram.imageFile"
              label="Картинка"
              accept="image/*"
              :rules="[v => !!v || 'Картинка обовʼязкова']"
              prepend-icon="mdi-image"
              show-size
              required
            />
            <v-text-field
              v-model="editedProgram.title"
              label="Тайтл"
              :rules="[v => !!v || 'Тайтл обовʼязковий']"
              required
            />
            <v-textarea
              v-model="editedProgram.description"
              label="Опис"
              :rules="[v => !!v || 'Опис обовʼязковий']"
              required
            />
            <v-select
              v-model="editedProgram.type"
              :items="['онлайн', 'офлайн']"
              label="Тип"
              :rules="[v => !!v || 'Тип обовʼязковий']"
              required
            />
            <v-select
              v-model="editedProgram.mode"
              :items="['групові', 'індивідуальні']"
              label="Режим"
              :rules="[v => !!v || 'Режим обовʼязковий']"
              required
            />
            <div v-if="editedProgram.image && !editedProgram.imageFile" class="mt-2">
              <img :src="getImageUrl(editedProgram.image)" alt="img" style="max-width: 100px; max-height: 100px;" />
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog">Скасувати</v-btn>
          <v-btn color="primary" @click="saveProgram">Зберегти</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

const headers = [
  { title: 'Картинка', value: 'image', sortable: false ,align: 'center'},
  { title: 'Тайтл', value: 'title' ,align: 'center'},
  { title: 'Опис', value: 'description' ,align: 'center'},
  { title: 'Тип', value: 'type' ,align: 'center'},
  { title: 'Режим', value: 'mode' ,align: 'center'},
  { title: 'Дії', value: 'actions', sortable: false ,align: 'center'},
]

const programs = ref([])
const loading = ref(false)
const dialog = ref(false)
const editedProgram = reactive({ _id: '', image: '', imageFile: null, title: '', description: '', type: '', mode: '' })
const formRef = ref(null)

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/admin/programs`;
const UPLOADS_URL = `${API_BASE_URL}/uploads/`;

function getImageUrl(image) {
  if (!image) return '';
  if (image.startsWith('http')) return image;
  return `${UPLOADS_URL}${image}`;
}

async function fetchPrograms() {
  loading.value = true
  try {
    const { data } = await axios.get(API_URL)
    programs.value = data
  } catch (e) {
    // handle error
  } finally {
    loading.value = false
  }
}

function openAddDialog() {
  Object.assign(editedProgram, { _id: '', image: '', imageFile: null, title: '', description: '', type: '', mode: '' })
  dialog.value = true
}
function openEditDialog(item) {
  Object.assign(editedProgram, { ...item, imageFile: null })
  dialog.value = true
}
function closeDialog() {
  dialog.value = false
}
async function saveProgram() {
  // Валідація
  if (!editedProgram.title || !editedProgram.description || !editedProgram.type || !editedProgram.mode || (!editedProgram.image && !editedProgram.imageFile)) return
  const formData = new FormData()
  formData.append('title', editedProgram.title)
  formData.append('description', editedProgram.description)
  formData.append('type', editedProgram.type)
  formData.append('mode', editedProgram.mode)
  if (editedProgram.imageFile) formData.append('image', editedProgram.imageFile)
  // Якщо редагування і не вибрано нову картинку, не додаємо image
  try {
    if (editedProgram._id) {
      await axios.put(`${API_URL}/${editedProgram._id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    } else {
      await axios.post(API_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    }
    await fetchPrograms()
    closeDialog()
  } catch (e) {
    // handle error
  }
}
async function deleteProgram(item) {
  if (!confirm('Видалити програму?')) return
  try {
    await axios.delete(`${API_URL}/${item._id}`)
    await fetchPrograms()
  } catch (e) {
    // handle error
  }
}

onMounted(fetchPrograms)
</script>

<style scoped>
.admin-content-card {
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.program-table {
  flex: 1 1 0;
  min-height: 0;
  border-radius: 0 0 16px 16px;
}
</style>
