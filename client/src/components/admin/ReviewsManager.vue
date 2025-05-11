<template>
  <div class="reviews-manager">
    <v-card class="mb-4">
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Відгуки</span>
        <v-btn color="primary" @click="openDialog()"> Додати відгук </v-btn>
      </v-card-title>
    </v-card>

    <v-card>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="reviews"
          :loading="loading"
          class="elevation-1"
          height="80vh"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="openDialog(item)"> mdi-pencil </v-icon>
            <v-icon small @click="confirmDelete(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Edit/Create Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
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

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Видалення відгуку</v-card-title>
        <v-card-text> Ви впевнені, що хочете видалити цей відгук? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteDialog = false">
            Скасувати
          </v-btn>
          <v-btn color="red darken-1" text @click="deleteItem"> Видалити </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/admin/reviews`;

const loading = ref(false);
const reviews = ref([]);
const dialog = ref(false);
const deleteDialog = ref(false);
const imageFile = ref(null);

const headers = [
  { text: "Ім'я", value: "name" },
  { text: "Опис", value: "subtitle" },
  { text: "Відгук", value: "description" },
  { text: "Дії", value: "actions", sortable: false },
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
    formData.append("rating", editedItem.value.rating);

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
</style>
