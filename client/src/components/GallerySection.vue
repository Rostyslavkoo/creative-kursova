<template>
  <section class="c-section-gallery" id="gallery">
    <div class="c-container">
      <div class="c-section-gallery__title c-anim-items">
        Фотогалерея
      </div>
      <div class="c-section-gallery__block c-anim-items c-anim-hide" id="c-gallery">
        <v-img
          v-for="(image, index) in galleryImages"
          :key="index"
          :src="image.thumb"
          :alt="image.alt"
          class="c-section-gallery-block__item"
          @click="openLightbox(index)"
          @error="handleImageError(index)"
          cover
        >
          <template #placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-row>
          </template>
          <template #error>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-icon size="48" color="grey lighten-1">mdi-image-off</v-icon>
            </v-row>
          </template>
        </v-img>
      </div>
    </div>

    <!-- Lightbox -->
    <v-dialog v-model="lightbox" max-width="90vw">
      <v-card class="lightbox-card">
        <v-img
          v-if="currentImage && currentImage.full"
          :src="currentImage.full"
          :alt="currentImage?.alt"
          contain
          height="80vh"
          @error="handleFullImageError"
        >
          <template #placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-row>
          </template>
          <template #error>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-icon size="64" color="grey lighten-1">mdi-image-off</v-icon>
              <div class="mt-4 text-center">Не вдалося завантажити зображення</div>
            </v-row>
          </template>
        </v-img>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="lightbox = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const lightbox = ref(false)
const currentImageIndex = ref(0)

const galleryImages = ref([
  {
    thumb: '/assets/img/gallery/placeholder-thumb.jpg',
    full: '/assets/img/gallery/placeholder.jpg',
    alt: 'gallery-1'
  },
  {
    thumb: '/assets/img/gallery/placeholder-thumb.jpg',
    full: '/assets/img/gallery/placeholder.jpg',
    alt: 'gallery-2'
  },
  {
    thumb: '/assets/img/gallery/placeholder-thumb.jpg',
    full: '/assets/img/gallery/placeholder.jpg',
    alt: 'gallery-3'
  },
  {
    thumb: '/assets/img/gallery/placeholder-thumb.jpg',
    full: '/assets/img/gallery/placeholder.jpg',
    alt: 'gallery-4'
  }
])

const currentImage = computed(() => galleryImages.value[currentImageIndex.value])

const handleImageError = (index) => {
  galleryImages.value[index].thumb = null
}

const handleFullImageError = () => {
  if (currentImage.value) {
    currentImage.value.full = null
  }
}

const openLightbox = (index) => {
  if (galleryImages.value[index].thumb !== null) {
    currentImageIndex.value = index
    lightbox.value = true
  }
}
</script>

<style scoped>
.c-section-gallery {
  padding: 80px 0;
  background: #f5f5f5;
}

.c-section-gallery__title {
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
}

.c-section-gallery__block {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.c-section-gallery-block__item {
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  background-color: #e0e0e0;
}

.c-section-gallery-block__item:hover {
  transform: scale(1.05);
}

.lightbox-card {
  background: transparent;
  box-shadow: none;
}

.lightbox-card .v-card__actions {
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0 0 0 10px;
}

@media (max-width: 600px) {
  .c-section-gallery__title {
    font-size: 28px;
  }

  .c-section-gallery__block {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }
}
</style> 