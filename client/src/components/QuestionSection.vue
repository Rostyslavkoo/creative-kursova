<template>
  <section class="question-section c-anim-items" id="question">
    <v-container class="question-container py-12">
      <v-row>
        <v-col cols="12">
          <h2 class="question-title mb-10">Залишилися запитання? Питайте!</h2>
        </v-col>
      </v-row>
      <v-form ref="formRef" v-model="valid" class="question-form">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.name"
              label="Введіть ім'я"
              variant="underlined"
              color="grey-lighten-2"
              class="mb-6"
              :rules="[(v) => !!v || 'Введіть імʼя']"
              required
            />
            <v-text-field
              v-model="form.phone"
              label="Введіть телефон"
              variant="underlined"
              color="grey-lighten-2"
              class="mb-6"
              :rules="[v => !!v || 'Введіть телефон', v => v.length === 17 || 'Введіть повний номер']"
              required
              v-mask="'+380 ## ### ## ##'"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.email"
              label="Введіть E-mail"
              variant="underlined"
              color="grey-lighten-2"
              class="mb-6"
              :rules="[
                (v) => !!v || 'Введіть e-mail',
                (v) => /.+@.+\..+/.test(v) || 'Некоректний e-mail',
              ]"
              required
            />
            <v-text-field
              v-model="form.subject"
              label="Тема питання"
              variant="underlined"
              color="grey-lighten-2"
              class="mb-6"
              :rules="[(v) => !!v || 'Введіть тему']"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex align-center">
            <v-textarea
              v-model="form.message"
              label="Введіть повідомлення"
              variant="underlined"
              color="grey-lighten-2"
              auto-grow
              rows="2"
              class="flex-grow-1 mr-2"
              :rules="[(v) => !!v || 'Введіть повідомлення']"
              required
            />
            <v-btn
              class="send-btn"
              :disabled="!valid || !form.agreedToTerms"
              @click="submitForm"
              icon
              size="large"
              color="primary"
              elevation="0"
            >
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex align-center mt-2">
            <v-checkbox
              v-model="form.agreedToTerms"
              :rules="[(v) => !!v || 'Потрібна згода']"
              color="primary"
              hide-details
              class="mr-2"
            />
            <span class="checkbox-title">Я погоджуюся з обробкою персональних даних</span>
          </v-col>
        </v-row>
      </v-form>
      <div class="question-img">
        <img src="/assets/img/fno.png" alt="fno" />
      </div>
    </v-container>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { mask } from "vue-the-mask";

const vMask = mask;

const form = ref({
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
  agreedToTerms: false,
});
const valid = ref(false);
const formRef = ref(null);

const submitForm = () => {
  if (valid.value && form.value.agreedToTerms) {
    // TODO: Implement form submission to backend
    console.log("Form submitted:", form.value);
    // Show success message
    // alert('Дякуємо за ваше запитання! Ми зв\'яжемося з вами найближчим часом.')
    form.value = {
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
      agreedToTerms: false,
    };
  }
};
</script>

<style scoped>
.question-section {
  background: #201e1e;
  color: #fff;
  position: relative;
  padding-top: 6rem;
  padding-bottom: 6rem;
  min-height: 600px;
}
.question-container {
  max-width: 1200px;
  margin: 0 auto;
  /* position: relative; */
  z-index: 2;
}
.question-title {
  font-weight: 900;
  font-size: 3rem;
  color: #fff;
  text-align: left;
}
.send-btn {
  background: linear-gradient(90deg, #f857a6 0%, #ff5858 100%) !important;
  color: #fff !important;
  border-radius: 50% !important;
  min-width: 56px !important;
  min-height: 56px !important;
  margin-left: 8px;
  box-shadow: 0 2px 12px 0 rgba(248, 87, 166, 0.15);
  transition: box-shadow 0.2s;
}
.send-btn:disabled {
  opacity: 0.6;
  box-shadow: none;
}
.checkbox-title {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 400;
}
.question-img {
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: 0.8;
  z-index: 1;
  max-width: 45vw;
}
.question-img img {
  width: 100%;
  max-width: 600px;
  min-width: 300px;
}
@media (max-width: 900px) {
  .question-title {
    font-size: 2rem;
  }
  .question-img img {
    max-width: 300px;
  }
}
@media (max-width: 600px) {
  .question-title {
    font-size: 1.3rem;
  }
  .question-img {
    display: none;
  }
}
.question-form {
  width: 70%;
}
</style>
