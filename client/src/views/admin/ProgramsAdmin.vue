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
      class="elevation-0 program-table pb-2"
      item-key="_id"
      :items-per-page="programs.length"
      :loading="loading"
      dense
       height="80vh"
      fixed-header
      hide-default-footer
    >
      <template #item.image="{ item }">
        <div class="program-image-wrapper">
          <img
            v-if="item.image"
            :src="getImageUrl(item.image)"
            alt="img"
            class="program-image"
          />
          <div v-else class="program-image program-image-placeholder">
            <v-icon color="grey lighten-1" size="36">mdi-image</v-icon>
          </div>
        </div>
      </template>
      <template #item.type="{ item }">
        <v-chip
          v-if="item.type"
          :color="item.type === 'онлайн' ? 'blue' : 'green'"
          dark
          >{{ item.type }}</v-chip
        >
        <span v-else>--</span>
      </template>
      <template #item.mode="{ item }">
        <v-chip
          v-if="item.mode"
          :color="item.mode === 'групові' ? 'purple' : 'orange'"
          dark
          >{{ item.mode }}</v-chip
        >
        <span v-else>--</span>
      </template>
      <template #item.actions="{ item }">
        <v-row no-gutters >
          <v-col cols="12" md="6">
            <v-btn
              icon
              color="warning"
              size="x-small"
              @click="openEditDialog(item)"
              class="mr-2"
              ><v-icon density="compact">mdi-pencil</v-icon></v-btn
            >
          </v-col>
         <v-col cols="12" md=6>
            <v-btn icon color="error" size="x-small" @click="deleteProgram(item)"
              ><v-icon density="compact">mdi-delete</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </template>
      <template #item.description="{ item }">
        <span>{{ item.description || "--" }}</span>
      </template>
      <template #item.duration="{ item }">
        <span>{{ item.duration || "--" }}</span>
      </template>
      <template #item.price="{ item }">
        <span>{{ item.price || "--" }}</span>
      </template>
      <template #item.showInCarousel="{ item }">
        <v-checkbox-btn :model-value="item.showInCarousel" disabled color="primary" />
      </template>
    </v-data-table>

    <!-- Діалог додавання/редагування -->
    <v-dialog v-model="dialog" max-width="700px">
      <v-card class="pa-3">
        <v-card-title>
          <span class="text-h6"
            >{{ editedProgram._id ? "Редагувати" : "Додати" }} програму</span
          >
        </v-card-title>
        <v-divider class="my-4" />
        <v-card-text class="dialog-scrollable">
          <v-form ref="formRef" @submit.prevent="saveProgram">
            <v-row>
              <v-col
                cols="12"
                :md="editedProgram.image && !editedProgram.imageFile ? '2' : '12'"
              >
                <div v-if="editedProgram.image && !editedProgram.imageFile" class="mt-2">
                  <div class="program-image-wrapper">
                    <img
                      :src="getImageUrl(editedProgram.image)"
                      alt="img"
                      class="program-image"
                    />
                  </div>
                </div>
              </v-col>
              <v-col
                cols="12"
                :md="editedProgram.image && !editedProgram.imageFile ? '10' : '12'"
              >
                <v-file-input
                  v-model="editedProgram.imageFile"
                  label="Картинка"
                  accept="image/*"
                  show-size
                  variant="solo"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedProgram.title"
                  label="Основний заголовок"
                  :rules="[(v) => !!v || 'Основний заголовок обовʼязковий']"
                  required
                  variant="solo"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="editedProgram.description"
                  label="Опис (не обовʼязково)"
                  variant="solo"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedProgram.duration"
                  label="Тривалість заняття (хв)"
                  variant="solo"
                />
                <v-text-field
                  v-model="editedProgram.price"
                  label="Ціна грн/заняття (не обовʼязково)"
                  type="text"
                  variant="solo"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="editedProgram.type"
                  :items="['онлайн', 'офлайн']"
                  label="Тип (не обовʼязково)"
                  variant="solo"
                />
                <v-select
                  v-model="editedProgram.mode"
                  :items="['групові', 'індивідуальні']"
                  label="Режим (обовʼязково)"
                  :rules="[(v) => !!v || 'Режим обовʼязковий']"
                  variant="solo"
                />
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="editedProgram.showInCarousel"
                  label="Показувати в каруселі"
                  color="primary"
                  hide-details
                />
              </v-col>
            </v-row>
            <v-divider class="my-4" />
            <div class="mb-2 d-flex align-center justify-space-between">
              <span class="font-weight-bold">Підпункти (не обовʼязково)</span>
              <v-btn size="small" color="info" @click="addDetail"
                ><v-icon>mdi-plus</v-icon> Додати підпункт</v-btn
              >
            </div>
            <v-expansion-panels multiple v-if="editedProgram.details.length">
              <v-expansion-panel
                v-for="(detail, idx) in editedProgram.details"
                :key="idx"
              >
                <v-expansion-panel-title>
                  <span class="font-weight-bold">{{
                    detail.title || `Підпункт ${idx + 1}`
                  }}</span>
                  <v-spacer />
                  <v-btn
                    icon
                    size="x-small"
                    color="error"
                    class="mr-3"
                    @click.stop="removeDetail(idx)"
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-text-field v-model="detail.title" label="Заголовок" class="mb-2" />
                  <v-textarea v-model="detail.description" label="Опис" />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <div v-else class="text-grey">Підпункти не додані</div>
          </v-form>
        </v-card-text>
        <v-divider class="my-4" />
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog">Скасувати</v-btn>
          <v-btn color="primary" @click="saveProgram">Зберегти</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <DeleteConfirmationDialog
      v-model="deleteDialog"
      title="Видалення програми"
      message="Ви впевнені, що хочете видалити цю програму?"
      @confirm="confirmDeleteProgram"
      @cancel="programToDelete = null"
    />
  </v-card>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog.vue';
import { useSnackbar } from '../../composables/useSnackbar';

const { notify } = useSnackbar();

const headers = [
  { title: "Картинка", value: "image", sortable: false, align: "center" },
  { title: "Основний заголовок", value: "title", align: "center" },
  { title: "Опис", value: "description", align: "center" },
  { title: "Тривалість (хв)", value: "duration", align: "center" },
  { title: "Ціна (грн/заняття)", value: "price", align: "center" },
  { title: "Тип", value: "type", align: "center" },
  { title: "Режим", value: "mode", align: "center" },
  { title: "Дії", value: "actions", sortable: false, align: "center", width: "130px" },
];

const programs = ref([]);
const loading = ref(false);
const dialog = ref(false);
const editedProgram = reactive({
  _id: "",
  image: "",
  imageFile: null,
  title: "",
  description: "",
  duration: "",
  price: "",
  type: "",
  mode: "",
  details: [],
  showInCarousel: false,
});
const formRef = ref(null);
const deleteDialog = ref(false);
const programToDelete = ref(null);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/admin/programs`;
const UPLOADS_URL = `${API_BASE_URL}/uploads/`;

function getImageUrl(image) {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return `${UPLOADS_URL}${image}`;
}

async function fetchPrograms() {
  loading.value = true;
  try {
    const { data } = await axios.get(API_URL);
    programs.value = data;
  } catch (e) {
    const msg = e?.response?.data?.message || 'Не вдалося завантажити програми';
    notify(msg, 'error');
  } finally {
    loading.value = false;
  }
}

function openAddDialog() {
  Object.assign(editedProgram, {
    _id: "",
    image: "",
    imageFile: null,
    title: "",
    description: "",
    duration: "",
    price: "",
    type: "",
    mode: "",
    details: [],
    showInCarousel: false,
  });
  dialog.value = true;
}
function openEditDialog(item) {
  Object.assign(editedProgram, {
    ...item,
    imageFile: null,
    details: Array.isArray(item.details) ? [...item.details] : [],
    showInCarousel: !!item.showInCarousel,
  });
  dialog.value = true;
}
function closeDialog() {
  dialog.value = false;
}
function addDetail() {
  editedProgram.details.push({ title: "", description: "" });
}
function removeDetail(idx) {
  editedProgram.details.splice(idx, 1);
}
async function saveProgram() {
  // Валідація
  if (!editedProgram.title) return;
  const formData = new FormData();
  formData.append("title", editedProgram.title);
  formData.append("description", editedProgram.description);
  formData.append("duration", editedProgram.duration);
  formData.append("price", editedProgram.price);
  formData.append("type", editedProgram.type);
  formData.append("mode", editedProgram.mode);
  formData.append("details", JSON.stringify(editedProgram.details));
  formData.append("showInCarousel", editedProgram.showInCarousel);
  if (editedProgram.imageFile) formData.append("image", editedProgram.imageFile);
  try {
    if (editedProgram._id) {
      await axios.put(`${API_URL}/${editedProgram._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
    await fetchPrograms();
    closeDialog();
  } catch (e) {
    const msg = e?.response?.data?.message || 'Не вдалося зберегти програму';
    notify(msg, 'error');
  }
}
async function deleteProgram(item) {
  programToDelete.value = item;
  deleteDialog.value = true;
}

async function confirmDeleteProgram() {
  if (!programToDelete.value) return;
  try {
    await axios.delete(`${API_URL}/${programToDelete.value._id}`);
    await fetchPrograms();
  } catch (e) {
    const msg = e?.response?.data?.message || 'Не вдалося видалити програму';
    notify(msg, 'error');
  }
}

onMounted(fetchPrograms);
</script>

<style >
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
.dialog-scrollable {
  max-height: 70vh;
  overflow-y: auto;
}
.program-image-wrapper {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
.program-image {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 12px;
  border: 1.5px solid #e0e0e0;
  background: #fafafa;
}
.program-image-placeholder {
  background: #fafafa;
  border: 1.5px solid #e0e0e0;
  border-radius: 12px;
  width: 40px;
  height: 40px;
}
</style>
