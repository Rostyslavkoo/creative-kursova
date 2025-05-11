<template>
  <v-card class="admin-content-card pa-0">
    <div class="d-flex align-center justify-space-between pa-3">
      <h4 class="mb-0">Відгуки</h4>
      <v-btn color="info" @click="openDialog"> Додати відгук</v-btn>
    </div>
    <v-divider></v-divider>

    <v-data-table
      :headers="headers"
      :items="reviews"
      :loading="loading"
      :items-per-page="reviews.length"
      height="100%"
      hide-default-footer
      fixed-header
      dense
      class="elevation-0 pb-2 program-table"
    >
      <template #item.description="{ item }">
        <span class="text-truncate">{{ item.description }}</span>
      </template>
      <template #item.actions="{ item }">
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-btn
              icon
              color="warning"
              size="x-small"
              @click="openDialog(item)"
              class="mr-2"
              ><v-icon density="compact">mdi-pencil</v-icon></v-btn
            >
          </v-col>
          <v-col cols="12" md="6">
            <v-btn icon color="error" size="x-small" @click="confirmDelete(item)"
              ><v-icon density="compact">mdi-delete</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-card>

  <!-- Edit/Create Dialog -->
  <v-dialog v-model="dialog" max-width="600px">
    <v-card class="pa-3">
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.name"
                label="Ім'я"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.subtitle"
                label="Опис до імені"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="editedItem.description"
                label="Відгук"
                required
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-file-input
                v-model="imageFile"
                label="Фото"
                accept="image/*"
                prepend-icon="mdi-camera"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog"> Скасувати </v-btn>
        <v-btn color="blue darken-1" text @click="save"> Зберегти </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <DeleteConfirmationDialog
    v-model="deleteDialog"
    title="Видалення відгуку"
    message="Ви впевнені, що хочете видалити цей відгук?"
    @confirm="deleteItem"
    @cancel="itemToDelete = null"
  />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog.vue';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/admin/reviews`;

const loading = ref(false);
const reviews = ref([]);
const dialog = ref(false);
const deleteDialog = ref(false);
const imageFile = ref(null);

const headers = [
  { title: "Ім'я", value: "name" },
  { title: "Опис", value: "subtitle" },
  { title: "Відгук", value: "description" },
  { title: "Дії", value: "actions", width:"150px", sortable: false },
];

const defaultItem = {
  name: "",
  subtitle: "",
  description: "",
  image: null,
};

const editedItem = ref({ ...defaultItem });
const editedIndex = ref(-1);
const itemToDelete = ref(null);

const formTitle = computed(() => {
  return editedIndex.value === -1 ? "Новий відгук" : "Редагувати відгук";
});

const fetchReviews = async () => {
  loading.value = true;
  try {
    const { data } = await axios.get(API_URL);
    reviews.value = data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  } finally {
    loading.value = false;
  }
};

const openDialog = (item) => {
  if (item) {
    editedIndex.value = reviews.value.indexOf(item);
    editedItem.value = { ...item };
  } else {
    editedIndex.value = -1;
    editedItem.value = { ...defaultItem };
  }
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  editedItem.value = { ...defaultItem };
  editedIndex.value = -1;
  imageFile.value = null;
};

const save = async () => {
  try {
    const formData = new FormData();
    formData.append("name", editedItem.value.name);
    formData.append("subtitle", editedItem.value.subtitle);
    formData.append("description", editedItem.value.description);

    if (imageFile.value) {
      formData.append("image", imageFile.value);
    }

    if (editedIndex.value > -1) {
      await axios.put(`${API_URL}/${editedItem.value._id}`, formData);
    } else {
      await axios.post(API_URL, formData);
    }

    await fetchReviews();
    closeDialog();
  } catch (error) {
    console.error("Error saving review:", error);
  }
};

const confirmDelete = (item) => {
  itemToDelete.value = item;
  deleteDialog.value = true;
};

const deleteItem = async () => {
  try {
    await axios.delete(`${API_URL}/${itemToDelete.value._id}`);
    await fetchReviews();
    deleteDialog.value = false;
    itemToDelete.value = null;
  } catch (error) {
    console.error("Error deleting review:", error);
  }
};

onMounted(fetchReviews);
</script>

<style scoped>
.reviews-manager {
  padding: 20px;
}
.program-table {
  flex: 1 1 0;
  min-height: 0;
  border-radius: 0 0 16px 16px;
}
.text-truncate {
  max-width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
}
</style>
