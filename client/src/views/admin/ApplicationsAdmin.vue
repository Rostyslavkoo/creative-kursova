<template>
  <v-card class="admin-content-card pa-0" elevation="2">
    <div class="d-flex align-center justify-space-between pa-3">
      <h4 class="mb-0">Заявки учнів</h4>
      <v-btn color="info" @click="openAddDialog">Додати заявку</v-btn>
    </div>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="applications"
      class="elevation-1 pb-2 program-table"
      item-key="_id"
      :items-per-page="applications.length"
      :loading="loading"
      dense
      height="100%"
      fixed-header
      hide-default-footer
    >
      <template #item.status="{ item }">
        <v-chip :color="statusOptions.find(opt => opt.value === item.status)?.color || 'grey'" dark>
          {{ statusOptions.find(opt => opt.value === item.status)?.label || item.status }}
        </v-chip>
      </template>
      <template #item.actions="{ item }">
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-btn icon color="warning" size="x-small" @click="openEditDialog(item)" class="mr-2">
              <v-icon density="compact">mdi-pencil</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn icon color="error" size="x-small" @click="deleteApplication(item)">
              <v-icon density="compact">mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
      <template #item.createdAt="{ item }">
        <span>{{ formatDate(item.createdAt) }}</span>
      </template>
      <template #item.message="{ item }">
        <span class="text-truncate">{{ item.message }}</span>
      </template>
      <template #item.birthDate="{ item }">
        <span>{{ formatBirthDate(item.birthDate) }}</span>
      </template>
    </v-data-table>

    <!-- Діалог додавання/редагування -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card class="pa-3">
        <v-card-title>
          <span class="text-h6">{{ editedApplication._id ? 'Редагувати' : 'Додати' }} заявку</span>
        </v-card-title>
        <v-divider class="my-4" />
        <v-card-text>
          <v-form ref="formRef" @submit.prevent="saveApplication">
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="editedApplication.studentName" label="ПІБ учня" :rules="[v => !!v || 'ПІБ обовʼязковий']" required variant="solo" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editedApplication.birthDate" label="Дата народження" type="date" :rules="[v => !!v || 'Дата народження обовʼязкова']" required variant="solo" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editedApplication.phone" label="Телефон" :rules="[v => !!v || 'Телефон обовʼязковий']" required variant="solo" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editedApplication.email" label="E-mail" :rules="[v => !!v || 'E-mail обовʼязковий']" required variant="solo" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editedApplication.parentName" label="Імʼя батьків" :rules="[v => !!v || 'Імʼя батьків обовʼязкове']" required variant="solo" />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="editedApplication.message"
                  label="Повідомлення (не обовʼязково)"
                  variant="solo"
                  rows="2"
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="editedApplication.status"
                  :items="statusOptions"
                  item-title="label"
                  item-value="value"
                  label="Статус"
                  variant="solo"
                  required
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider class="my-4" />
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog">Скасувати</v-btn>
          <v-btn color="primary" @click="saveApplication">Зберегти</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <DeleteConfirmationDialog
      v-model="deleteDialog"
      title="Видалення заявки"
      message="Ви впевнені, що хочете видалити цю заявку?"
      @confirm="confirmDeleteApplication"
      @cancel="applicationToDelete = null"
    />
  </v-card>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useSnackbar } from '../../composables/useSnackbar';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog.vue';
import moment from 'moment';
import 'moment/locale/uk';

const { notify } = useSnackbar();
const deleteDialog = ref(false);
const applicationToDelete = ref(null);

const headers = [
  { title: 'ПІБ учня', value: 'studentName', align: 'center' },
  { title: 'Дата народження', value: 'birthDate', align: 'center' },
  { title: 'Телефон', value: 'phone', align: 'center' },
  { title: 'E-mail', value: 'email', align: 'center' },
  { title: 'Імʼя батьків', value: 'parentName', align: 'center' },
  { title: 'Повідомлення', value: 'message', align: 'center' },
  { title: 'Дата подачі', value: 'createdAt', align: 'center' },
  { title: 'Статус', value: 'status', align: 'center' },
  { title: 'Дії', value: 'actions', sortable: false, align: 'center', width: '130px' },
];

const applications = ref([]);
const loading = ref(false);
const dialog = ref(false);
const editedApplication = reactive({
  _id: '',
  studentName: '',
  birthDate: '',
  phone: '',
  email: '',
  parentName: '',
  message: '',
  status: 'new',
});
const formRef = ref(null);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/applications`;

const statusOptions = [
  { value: 'new', label: 'Новий', color: 'red' },
  { value: 'viewed', label: 'Переглянутий', color: 'blue' },
  { value: 'waiting', label: 'Очікує заняття', color: 'orange' },
  { value: 'continued', label: 'Продовжив навчання', color: 'green' },
  { value: 'rejected', label: 'Відмова', color: 'grey' },
];

function formatDate(date) {
  if (!date) return '';
  return moment(date).locale('uk').format('D MMMM YYYY, HH:mm');
}

function formatBirthDate(date) {
  if (!date) return '';
  const m = moment(date);
  const years = moment().diff(m, 'years');
  return m.format('DD.MM.YYYY') + (years ? ` (${years} ${years === 1 ? 'рік' : (years >= 2 && years <= 4) ? 'роки' : 'років'})` : '');
}

async function fetchApplications() {
  loading.value = true;
  try {
    const { data } = await axios.get(API_URL);
    applications.value = data;
  } catch (e) {
    const msg = e?.response?.data?.message || 'Не вдалося завантажити заявки';
    notify(msg, 'error');
  } finally {
    loading.value = false;
  }
}

function openAddDialog() {
  Object.assign(editedApplication, {
    _id: '',
    studentName: '',
    birthDate: '',
    phone: '',
    email: '',
    parentName: '',
    message: '',
    status: 'new',
  });
  dialog.value = true;
}
function openEditDialog(item) {
  Object.assign(editedApplication, { ...item });
  dialog.value = true;
}
function closeDialog() {
  dialog.value = false;
}
async function saveApplication() {
  if (!editedApplication.studentName || !editedApplication.birthDate || !editedApplication.phone || !editedApplication.email || !editedApplication.parentName) return;
  try {
    if (editedApplication._id) {
      await axios.put(`${API_URL}/${editedApplication._id}`, editedApplication);
      notify('Заявку оновлено', 'success');
    } else {
      await axios.post(API_URL, editedApplication);
      notify('Заявку додано', 'success');
    }
    await fetchApplications();
    closeDialog();
  } catch (e) {
    const msg = e?.response?.data?.message || 'Не вдалося зберегти заявку';
    notify(msg, 'error');
  }
}
function deleteApplication(item) {
  applicationToDelete.value = item;
  deleteDialog.value = true;
}
async function confirmDeleteApplication() {
  if (!applicationToDelete.value) return;
  try {
    await axios.delete(`${API_URL}/${applicationToDelete.value._id}`);
    await fetchApplications();
    notify('Заявку видалено', 'success');
  } catch (e) {
    const msg = e?.response?.data?.message || 'Не вдалося видалити заявку';
    notify(msg, 'error');
  }
  deleteDialog.value = false;
  applicationToDelete.value = null;
}

onMounted(fetchApplications);
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
.text-truncate {
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
}
</style>
