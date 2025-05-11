<template>
  <section class="gallery-section c-anim-items">
    <div class="c-container">
      <h2 class="section-title">Галерея</h2>
      <div class="gallery-grid">
        <div
          v-for="image in displayedImages"
          :key="image._id"
          class="gallery-item"
          @click="openImageDialog(image)"
        >
          <v-img
            :src="getImageUrl(image.url)"
            height="300"
            cover
            class="gallery-image"
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
          <div class="gallery-item-overlay">
            <span class="gallery-item-title">{{ image.title }}</span>
          </div>
        </div>
      </div>

      <div v-if="images.length > initialDisplayCount" class="show-more-container">
        <v-btn
          color="primary"
          variant="outlined"
          @click="toggleShowMore"
          class="show-more-btn"
        >
          {{ showAll ? 'Показати менше' : 'Показати більше' }}
          <v-icon
            :class="{ 'rotate-icon': showAll }"
            class="ml-2"
          >
            {{ showAll ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
          </v-icon>
        </v-btn>
      </div>
    </div>

    <!-- Image Preview Dialog -->
    <v-dialog v-model="showImageDialog" max-width="90vw">
      <v-card>
        <v-img
          :src="selectedImage ? getImageUrl(selectedImage.url) : ''"
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
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useGallery } from '@/composables/useGallery'

const { images, loading, fetchImages } = useGallery()
const showImageDialog = ref(false)
const selectedImage = ref(null)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const UPLOADS_URL = `${API_BASE_URL}`

const initialDisplayCount = 6
const showAll = ref(false)

const displayedImages = computed(() => {
  return showAll.value ? images.value : images.value.slice(0, initialDisplayCount)
})

onMounted(() => {
  fetchImages()
})

const openImageDialog = (image) => {
  selectedImage.value = image
  showImageDialog.value = true
}

const toggleShowMore = () => {
  showAll.value = !showAll.value
}

function getImageUrl(image) {
  if (!image) return ""
  if (image.startsWith("http")) return image
  return `${UPLOADS_URL}${image}`
}
</script>

<style scoped>
.gallery-section {
  padding: 80px 0;
  background-color: var(--light-bg);
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
  color: var(--text-color);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.gallery-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.02);
}

.gallery-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.gallery-item-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-item-overlay {
  opacity: 1;
}

.gallery-item-title {
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
}

.show-more-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.show-more-btn {
  min-width: 200px;
  transition: all 0.3s ease;
}

.rotate-icon {
  transform: rotate(0);
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .section-title {
    font-size: 2rem;
  }
}
</style> 