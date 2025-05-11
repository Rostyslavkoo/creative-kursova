<template>
  <section class="reviews-section c-anim-items" id="reviews">
    <div class="c-container">
      <h2 class="section-title">Відгуки</h2>
      <div class="reviews-grid">
        <div
          v-for="review in reviews"
          :key="review._id"
          class="review-card"
        >
          <div class="review-card-header">
            <div class="review-card-image">
              <img
                :src="review.image ? `${API_BASE_URL}/uploads/${review.image}` : 'https://i.imgur.com/lrQ5QRR.jpg'"
                :alt="review.name"
                @error="handleImageError"
              />
            </div>
            <div class="review-card-info">
              <div class="review-card-name">{{ review.name }}</div>
              <div class="review-card-subtitle">{{ review.subtitle }}</div>
            </div>
          </div>
          <div class="review-card-body">
            <p>{{ review.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_URL = `${API_BASE_URL}/api/admin/reviews`

const reviews = ref([])

const fetchReviews = async () => {
  try {
    const { data } = await axios.get(API_URL)
    reviews.value = data
  } catch (error) {
    console.error('Error fetching reviews:', error)
  }
}

const handleImageError = (event) => {
  event.target.src = 'https://i.imgur.com/lrQ5QRR.jpg'
}

onMounted(fetchReviews)
</script>

<style scoped>
.reviews-section {
  padding: 80px 0;
  background-color: #f8f9fa;
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
  color: #333;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
}

.review-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.review-card-header {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.review-card-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.review-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.review-card-info {
  flex-grow: 1;
}

.review-card-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.review-card-subtitle {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
}

.review-card-body {
  padding: 0 20px 20px;
}

.review-card-body p {
  color: #444;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .reviews-section {
    padding: 40px 0;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 30px;
  }

  .reviews-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 10px;
  }
}
</style> 