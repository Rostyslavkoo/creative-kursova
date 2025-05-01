<template>
  <section class="programs-slider c-anim-items" id="programs-slider">
    <div class="c-container">
      <div class="programs-slider-wrapper">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div v-for="program in programs" :key="program.id" class="swiper-slide">
              <div class="program-card">
                <div class="program-card-header">
                  <div class="program-card-title">{{ program.title }}</div>
                  <div class="program-card-arrow">{{program.arrow}}</div>
                </div>
                <div class="program-card-body">
                  <img 
                    :src="program.image" 
                    :alt="program.title"
                    class="program-card-image c-unselectable"
                    draggable="false"
                    @error="handleImageError(program)"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <!-- Navigation buttons -->
          <button class="nav-button prev" @click="prevSlide">
            <v-icon>mdi-chevron-left</v-icon>
          </button>
          <button class="nav-button next" @click="nextSlide">
            <v-icon>mdi-chevron-right</v-icon>
          </button>
          
          <!-- Pagination dots -->
          <div class="pagination">
            <div 
              v-for="(program, index) in programs" 
              :key="`dot-${index}`"
              class="pagination-dot"
              :class="{ 'active': currentIndex === index }"
              @click="goToSlide(index)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const programs = ref([
  {
    id: 1,
    title: 'Вокал',
    image: 'https://i.imgur.com/T3XlwkR.jpg',
    arrow: '→'
  },
  {
    id: 2,
    title: 'Фортепіано',
    image: 'https://i.imgur.com/0KzYTJv.jpg',
    arrow: '→'
  },
  {
    id: 3,
    title: 'Гітара',
    image: 'https://i.imgur.com/lwu1l9K.jpg',
    arrow: '→'
  },
  {
    id: 4,
    title: 'Скрипка',
    image: 'https://i.imgur.com/U9w9vQg.jpg',
    arrow: '→'
  }
])

const currentIndex = ref(0)

const handleImageError = (program) => {
  // Set default image if loading fails
  program.image = 'https://i.imgur.com/lrQ5QRR.jpg' // Default music image
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % programs.value.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + programs.value.length) % programs.value.length
}

const goToSlide = (index) => {
  currentIndex.value = index
}

onMounted(() => {
  // Removed autoplay
})

onBeforeUnmount(() => {
  // Removed autoplay cleanup
})
</script>

<style scoped>
.programs-slider {
  position: relative;
  padding: 20px 0;
  z-index: 10;
  margin-top: -30px;
  margin-bottom: -30px;
}

.programs-slider-wrapper {
  position: absolute;
  max-width: 800px;
  margin: 0 auto;
    top: -110px;
}

.swiper-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 20px 40px;
}

.swiper-wrapper {
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(calc(-100% * v-bind(currentIndex)));
}

.swiper-slide {
  flex: 0 0 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 15px;
}

.program-card {
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
  width: 100%;
  max-width: 320px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.program-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.program-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.program-card-title {
  font-size: 22px;
  font-weight: 600;
  color: #F46362;
}

.program-card-arrow {
  font-size: 22px;
  color: #F4A261;
  opacity: 0.7;
  transition: opacity 0.3s, transform 0.3s;
}

.program-card:hover .program-card-arrow {
  opacity: 1;
  transform: translateX(5px);
}

.program-card-body {
  height: 150px;
  overflow: hidden;
}

.program-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.program-card:hover .program-card-image {
  transform: scale(1.05);
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: none;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.nav-button:hover {
  background-color: #f8f8f8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.nav-button.prev {
  left: 0;
}

.nav-button.next {
  right: 0;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.pagination-dot {
  width: 10px;
  height: 4px;
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.2);
  margin: 0 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.pagination-dot.active {
  background-color: #C5CEC3;
  transform: scale(1.1);
}

@media (min-width: 768px) {
  .swiper-container {
    padding: 20px 60px;
  }
  
  .swiper-wrapper {
    display: flex;
    grid-gap: 30px;
  }
  
  .swiper-slide {
    flex: 0 0 50%;
    max-width: 50%;
    padding: 0 10px;
  }
}

@media (max-width: 767px) {
  .program-card {
    max-width: 280px;
  }
  
  .program-card-header {
    padding: 12px 15px;
  }
  
  .program-card-title {
    font-size: 18px;
  }
  
  .program-card-body {
    height: 180px;
  }
}
</style> 