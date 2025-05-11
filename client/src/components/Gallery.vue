<template>
  <div class="gallery-container">
    <v-row>
      <v-col
        v-for="image in images"
        :key="image.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="gallery-card" elevation="2">
          <v-img
            :src="image.url"
            height="250"
            cover
            class="gallery-image"
            @click="openImageDialog(image)"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-title class="text-center">{{ image.title }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <!-- Image Preview Dialog -->
    <v-dialog v-model="showImageDialog" max-width="90vw">
      <v-card>
        <v-img
          :src="selectedImage?.url"
          max-height="80vh"
          contain
        ></v-img>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="showImageDialog = false"
          >
            Закрити
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGallery } from '@/composables/useGallery'

const { images, loading, error, fetchImages } = useGallery()
const showImageDialog = ref(false)
const selectedImage = ref(null)

onMounted(() => {
  fetchImages()
})

const openImageDialog = (image) => {
  selectedImage.value = image
  showImageDialog.value = true
}
</script>

<style scoped>
.gallery-container {
  padding: 20px;
}

.gallery-card {
  transition: transform 0.2s;
  cursor: pointer;
}

.gallery-card:hover {
  transform: scale(1.02);
}

.gallery-image {
  cursor: pointer;
}
</style> 