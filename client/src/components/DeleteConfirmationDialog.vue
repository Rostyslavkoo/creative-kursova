<template>
  <v-dialog v-model="dialog" max-width="400px">
    <v-card class="pa-3">
      <v-card-title class="text-h5">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="onCancel">Скасувати</v-btn>
        <v-btn color="red darken-1" text @click="onConfirm">Видалити</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Підтвердження видалення'
  },
  message: {
    type: String,
    default: 'Ви впевнені, що хочете видалити цей елемент?'
  }
});

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

const dialog = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  dialog.value = newValue;
});

watch(dialog, (newValue) => {
  emit('update:modelValue', newValue);
});

const onConfirm = () => {
  emit('confirm');
  dialog.value = false;
};

const onCancel = () => {
  emit('cancel');
  dialog.value = false;
};
</script> 