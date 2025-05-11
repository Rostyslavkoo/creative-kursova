<template>
  <section class="reviews-slider-section c-anim-items" id="reviews">
    <div class="c-container">
      <h2 class="slider-title">Відгуки наших учнів та їхніх батьків</h2>
      <div class="slider-wrapper">
        <Swiper
          :slides-per-view="2"
          :space-between="40"
          :loop="true"
          :pagination="{ clickable: true }"
          :autoplay="{ delay: 4000, disableOnInteraction: false }"
          class="swiper-custom"
          :breakpoints="{
            0: { slidesPerView: 1, spaceBetween: 10 },
            600: { slidesPerView: 1, spaceBetween: 20 },
            900: { slidesPerView: 2, spaceBetween: 40 }
          }"
        >
          <SwiperSlide v-for="(review, idx) in reviews" :key="review._id || idx">
            <div class="review-card">
              <div class="review-card-avatar">
                <v-icon size="70" color="#F46362">mdi-account</v-icon>
              </div>
              <div class="review-card-content">
                <div class="review-card-header">
                  <div class="review-card-name">{{ review.name }}</div>
                  <div class="review-card-subtitle">
                    <span class="review-card-desc">{{ review.subtitle }}</span>
                  </div>
                </div>
                <div class="review-card-description">
                  {{ review.description }}
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_URL = `${API_BASE_URL}/api/admin/reviews`

const reviews = ref([])

const fetchReviews = async () => {
  try {
    const { data } = await axios.get(API_URL)
    reviews.value = data
  } catch (error) {
    reviews.value = []
  }
}

onMounted(fetchReviews)
</script>

<style scoped>
@import 'swiper/css';
@import 'swiper/css/navigation';
@import 'swiper/css/pagination';
@import 'swiper/css/autoplay';

.reviews-slider-section {
  padding: 60px 0 80px 0;
  background: #fff;
}
.slider-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
}
.slider-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: relative;
}
.swiper-custom {
  width: 100%;
  max-width: 1100px;
  padding: 20px;
}
.review-card {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  padding: 40px 32px 32px 32px;
  max-width: 420px;
  min-width: 320px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.3s, transform 0.3s;
  margin: 0 auto;
}
.review-card-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #F46362;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  overflow: hidden;
}
.review-card-header {
  text-align: center;
  margin-bottom: 8px;
}
.review-card-name {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 2px;
}
.review-card-subtitle {
  font-size: 1rem;
  margin-bottom: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.review-card-at {
  color: #F46362;
  font-weight: 500;
  font-size: 1rem;
  display: block;
}
.review-card-desc {
  color: #222;
  font-size: 1rem;
  font-weight: 400;
  display: block;
}
.review-card-description {
  font-size: 1.05rem;
  color: #222;
  margin-top: 18px;
  text-align: left;
}
.swiper-pagination-bullets {
  margin-top: 30px;
}
.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ddd;
  opacity: 1;
  margin: 0 5px !important;
  transition: background 0.3s, transform 0.3s;
}
.swiper-pagination-bullet-active {
  background: #F46362;
  transform: scale(1.2);
}
@media (max-width: 900px) {
  .review-card {
    padding: 24px 10px 20px 10px;
    min-width: 220px;
    max-width: 98vw;
  }
}
@media (max-width: 600px) {
  .swiper-custom {
    max-width: 98vw;
  }
}
</style> 