<template>
  <section class="c-section c-section-reviews" id="review">
    <div class="c-container">
      <div class="c-section-reviews__title c-anim-items">
        Відгуки наших студентів
      </div>
      
      <v-carousel
        hide-delimiters
        :show-arrows="false"
        height="auto"
        interval="6000"
        v-model="activeIndex"
        class="c-reviews-carousel c-anim-items"
      >
        <v-carousel-item
          v-for="(review, index) in reviews"
          :key="index"
        >
          <div class="c-review-slide">
            <div class="c-review-card">
              <div class="c-review-card__stars">
                <v-icon
                  v-for="i in 5"
                  :key="i"
                  color="amber"
                  size="20"
                >
                  mdi-star
                </v-icon>
              </div>
              <div class="c-review-card__text">
                "{{ review.text }}"
              </div>
              <div class="c-review-card__author">
                <div class="c-review-card__avatar">
                  <v-avatar size="60" color="grey lighten-2">
                    <v-icon v-if="!review.avatar" size="36" color="grey darken-2">
                      mdi-account
                    </v-icon>
                    <v-img 
                      v-else
                      :src="review.avatar" 
                      alt="аватар"
                      @error="handleAvatarError(index)"
                    ></v-img>
                  </v-avatar>
                </div>
                <div class="c-review-card__info">
                  <div class="c-review-card__name">{{ review.name }}</div>
                  <div class="c-review-card__role">{{ review.role }}</div>
                </div>
              </div>
            </div>
          </div>
        </v-carousel-item>
      </v-carousel>
      
      <div class="c-review-dots">
        <div 
          v-for="(review, index) in reviews" 
          :key="index"
          class="c-review-dot"
          :class="{ 'active': activeIndex === index }"
          @click="setActiveSlide(index)"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeIndex = ref(0)
const carouselInterval = ref(null)

const reviews = ref([
  {
    name: 'Марія Петренко',
    role: 'Мама учениці, 8 років',
    text: 'Моя донька відвідує групові заняття вже півроку, і результати просто вражають! Викладачі знаходять підхід до кожної дитини, а головне - дитина з радістю ходить на кожне заняття.',
    avatar: null
  },
  {
    name: 'Олександр Ковальчук',
    role: 'Батько учня, 10 років',
    text: 'Дуже задоволені індивідуальними заняттями для сина. За короткий час він навчився грати прості мелодії на фортепіано і значно розвинув слух. Рекомендую школу всім батькам!',
    avatar: null
  },
  {
    name: 'Наталія Іванченко',
    role: 'Учениця, 25 років',
    text: 'Вирішила здійснити свою давню мрію і почати займатися вокалом у дорослому віці. Дякую викладачам за професійний підхід та терпіння. Відчуваю прогрес з кожним заняттям!',
    avatar: null
  }
])

const handleAvatarError = (index) => {
  reviews.value[index].avatar = null
}

const setActiveSlide = (index) => {
  activeIndex.value = index
}

onMounted(() => {
  try {
    // Auto-advance slides
    carouselInterval.value = setInterval(() => {
      activeIndex.value = (activeIndex.value + 1) % reviews.value.length
    }, 6000)
  } catch (error) {
    console.error('Error in ReviewsSection mounted hook:', error)
  }
})

onUnmounted(() => {
  if (carouselInterval.value) {
    clearInterval(carouselInterval.value)
  }
})
</script>

<style scoped>
.c-section-reviews {
  background-color: #fff;
}

.c-section-reviews__title {
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
}

.c-reviews-carousel {
  margin-bottom: 30px;
}

.c-review-slide {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.c-review-card {
  max-width: 800px;
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.c-review-card__stars {
  margin-bottom: 20px;
}

.c-review-card__text {
  font-size: 18px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 30px;
  font-style: italic;
}

.c-review-card__author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.c-review-card__info {
  text-align: left;
}

.c-review-card__name {
  font-weight: 700;
  font-size: 18px;
  color: #333;
}

.c-review-card__role {
  font-size: 14px;
  color: #666;
}

.c-review-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.c-review-dot {
  width: 12px;
  height: 12px;
  background: #ddd;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.c-review-dot.active {
  background: var(--primary-color);
  transform: scale(1.2);
}

@media (max-width: 600px) {
  .c-section-reviews__title {
    font-size: 28px;
    margin-bottom: 40px;
  }
  
  .c-review-card {
    padding: 20px;
  }
  
  .c-review-card__text {
    font-size: 16px;
  }
}
</style> 