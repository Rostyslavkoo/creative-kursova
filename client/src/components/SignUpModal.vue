<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="text-center pt-5">
        <h3>Зареєструватися на пробний урок</h3>
      </v-card-title>
      
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  label="Ваше ім'я"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              
              <v-col cols="12">
                <v-text-field
                  v-model="phone"
                  :rules="phoneRules"
                  label="Номер телефону"
                  required
                  outlined
                  dense
                  placeholder="+380 XX XXX XX XX"
                ></v-text-field>
              </v-col>
              
              <v-col cols="12">
                <v-select
                  v-model="program"
                  :items="programItems"
                  :rules="programRules"
                  label="Програма"
                  required
                  outlined
                  dense
                ></v-select>
              </v-col>
              
              <v-col cols="12">
                <v-textarea
                  v-model="message"
                  label="Повідомлення (не обов'язково)"
                  outlined
                  auto-grow
                  rows="3"
                  row-height="20"
                  dense
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      
      <v-card-actions class="px-6 pb-6">
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          text
          @click="closeModal"
        >
          Скасувати
        </v-btn>
        <v-btn
          class="c-gradient-btn"
          :disabled="!valid"
          @click="submit"
        >
          Відправити
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineExpose } from 'vue'

const dialog = ref(false)
const valid = ref(true)
const name = ref('')
const phone = ref('')
const program = ref(null)
const message = ref('')

const nameRules = [
  v => !!v || "Ім'я обов'язкове",
  v => v.length >= 2 || "Ім'я повинно містити не менше 2 символів"
]

const phoneRules = [
  v => !!v || "Телефон обов'язковий",
  v => /^\+?[0-9\s-]{10,15}$/.test(v) || "Введіть коректний номер телефону"
]

const programRules = [
  v => !!v || "Виберіть програму"
]

const programItems = [
  'Групові заняття',
  'Індивідуальні заняття',
  'Підготовка до вступу в музичну школу',
  'Заняття для дорослих'
]

const resetForm = () => {
  name.value = ''
  phone.value = ''
  program.value = null
  message.value = ''
  if (valid.value === false) {
    valid.value = true
  }
}

const openModal = () => {
  dialog.value = true
}

const closeModal = () => {
  dialog.value = false
  resetForm()
}

const submit = () => {
  if (valid.value) {
    // TODO: Implement form submission to backend
    console.log({
      name: name.value,
      phone: phone.value,
      program: program.value,
      message: message.value
    })
    
    // Close modal after successful submission
    closeModal()
    
    // Show success message or notification
    alert('Дякуємо за реєстрацію! Ми зв\'яжемося з вами найближчим часом.')
  }
}

defineExpose({
  openModal
})
</script>

<style scoped>
.v-card-title h3 {
  width: 100%;
  font-size: 24px;
  font-weight: 700;
  color: #333;
}

.v-card {
  border-radius: 15px !important;
}

.c-gradient-btn {
  max-width: 200px !important;
  height: 60px !important;
}

.c-gradient-btn .c-gradient-btn__txt {
  font-size: 18px;
}

@media (max-width: 600px) {
  .v-card-title h3 {
    font-size: 20px;
  }
  
  .c-gradient-btn {
    height: 50px !important;
  }
  
  .c-gradient-btn .c-gradient-btn__txt {
    font-size: 16px;
  }
}
</style> 