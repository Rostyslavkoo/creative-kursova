<template>
  <v-snackbar v-model="show" :color="color" :timeout="timeout" top right>
    <span>{{ message }}</span>
    <template #actions>
      <v-btn icon @click="show = false"><v-icon>mdi-close</v-icon></v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  modelValue: Boolean,
  message: String,
  color: {
    type: String,
    default: 'success'
  },
  timeout: {
    type: Number,
    default: 4000
  }
});
const emit = defineEmits(['update:modelValue']);
const show = ref(props.modelValue);
watch(() => props.modelValue, v => show.value = v);
watch(show, v => emit('update:modelValue', v));
</script> 