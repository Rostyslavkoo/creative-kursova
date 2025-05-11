<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card class="rounded-xl signuo-card">
      <div class="title">Залиште свою заявку на безкоштовне заняття</div>
      <v-card-text  class="pa-0">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container class="dialog-scrollable">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="studentName"
                  :rules="[(v) => !!v || 'Введіть ПІБ учня']"
                  label="Введіть ПІБ учня"
                  required
                  variant="underlined"
                  class="mb-2"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="birthDate"
                  :rules="[(v) => !!v || 'Введіть дату народження']"
                  label="Введіть дату народження"
                  required
                  variant="underlined"
                  class="mb-2"
                  type="date"
                  @click:prepend-inner="openDatePicker"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="phone"
                  v-mask="'+380 ## ### ## ##'"
                  :rules="[
                    (v) => !!v || 'Введіть номер телефону',
                    (v) => v.length === 17 || 'Введіть повний номер',
                  ]"
                  label="Введіть номер телефону"
                  required
                  variant="underlined"
                  class="mb-2"
                  type="tel"
                  placeholder="+380 XX XXX XX XX"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  :rules="[
                    (v) => !!v || 'Введіть e-mail',
                    (v) => /.+@.+\..+/.test(v) || 'Некоректний e-mail',
                  ]"
                  label="Ваш e-mail"
                  required
                  variant="underlined"
                  class="mb-2"
                  type="email"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="parentName"
                  :rules="[(v) => !!v || 'Введіть імʼя батьків']"
                  label="Імʼя батьків"
                  required
                  variant="underlined"
                  class="mb-2"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="message"
                  label="Повідомлення (не обовʼязково)"
                  variant="underlined"
                  class="mb-2"
                  rows="2"
                />
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="agree"
                  :rules="[(v) => !!v || 'Потрібна згода']"
                  label="Я погоджуюсь з обробкою персональних даних"
                  class="mt-2 mb-4"
                  size
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <div class="d-flex justify-center mt-2">
          <v-btn
            class="c-gradient-btn c-card-btn"
            :disabled="!valid || !agree"
            @click="submit"
            block
            size="small"
          >
            <p class="c-gradient-btn__txt ">Надіслати</p>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineExpose } from "vue";
import axios from "axios";
import { mask } from "vue-the-mask";
import { useSnackbar } from '../composables/useSnackbar'

const dialog = ref(false);
const valid = ref(false);
const studentName = ref("");
const birthDate = ref("");
const phone = ref("");
const email = ref("");
const parentName = ref("");
const message = ref("");
const agree = ref(false);

const vMask = mask;
const { notify } = useSnackbar()

const resetForm = () => {
  studentName.value = "";
  birthDate.value = "";
  phone.value = "";
  email.value = "";
  parentName.value = "";
  message.value = "";
  agree.value = false;
  valid.value = false;
};

const openModal = () => {
  dialog.value = true;
};

const closeModal = () => {
  dialog.value = false;
  resetForm();
};

const submit = async () => {
  if (!valid.value || !agree.value) return;
  try {
    await axios.post("/api/applications", {
      studentName: studentName.value,
      birthDate: birthDate.value,
      phone: phone.value,
      email: email.value,
      parentName: parentName.value,
      message: message.value
    });
    closeModal();
    notify('Дякуємо! Ваша заявка прийнята.', 'success');
  } catch (e) {
    notify('Сталася помилка. Спробуйте ще раз.', 'error');
  }
};

defineExpose({
  openModal,
});
</script>

<style scoped>
.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
}
.submit-btn {
  background: linear-gradient(90deg, #f857a6 0%, #ff5858 100%);
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  border-radius: 14px;
  min-width: 220px;
  min-height: 48px;
  box-shadow: 0 2px 12px 0 rgba(248, 87, 166, 0.15);
  transition: box-shadow 0.2s;
}
.submit-btn:disabled {
  opacity: 0.6;
  box-shadow: none;
}
.v-card {
  border-radius: 24px !important;
}
.signuo-card {
  padding: 90px 70px 25px 70px !important;
}
.title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  color: #333333;
}
.c-gradient-btn__txt {
  color: #fff;
  font-weight: bold;
  font-size: 13px;
  line-height: 10px;
  z-index: 1;
}
.c-card-btn {
  height: 50px !important;
  margin: 0 20px 20px !important;
  width: 40% !important;
  border-radius: 10px !important;
}
.dialog-scrollable {
  max-height: 50vh;
  overflow-y: auto;
}
</style>
