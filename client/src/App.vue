<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import IntroSection from './components/IntroSection.vue'
import ProgramsSection from './components/ProgramsSection.vue'
import AboutSection from './components/AboutSection.vue'
import GallerySection from './components/GallerySection.vue'
import ReviewsSection from './components/ReviewsSection.vue'
import SignUpSection from './components/SignUpSection.vue'
import QuestionSection from './components/QuestionSection.vue'
import ProgramsSliderSection from './components/ProgramsSliderSection.vue'
</script>

<template>
  <v-app>
    <Header />
    
    <v-main class="pt-0">
      <IntroSection />
      <ProgramsSliderSection />
      <AboutSection />
      <ProgramsSection />
      <GallerySection />
      <SignUpSection />
      <ReviewsSection />
      <QuestionSection />
    </v-main>

    <Footer />
  </v-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;900&display=swap');

:root {
  --primary-color: #FF6B6B;
  --secondary-color: #4ECDC4;
  --text-color: #333;
  --light-bg: #f5f5f5;
  --dark-bg: #1a1a1a;
}

body {
  font-family: 'Montserrat', sans-serif;
  overflow-x: hidden;
}

/* Remove focus border from all buttons */
button,
button:focus,
button:hover,
button:active {
  outline: none !important;
  box-shadow: none !important;
}

.v-btn,
.v-btn:focus,
.v-btn:hover,
.v-btn:active {
  outline: none !important;
  box-shadow: none !important;
}

.v-btn::before,
.v-btn::after,
.v-btn:focus::before,
.v-btn:focus::after,
.v-btn:hover::before,
.v-btn:hover::after,
.v-btn:active::before,
.v-btn:active::after,
.v-btn.v-btn--active::before,
.v-btn.v-btn--active::after {
  opacity: 0 !important;
  display: none !important;
}
</style>

<style scoped>
.c-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.c-anim-items {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease 0s;
}

.c-anim-items._active {
  opacity: 1;
  transform: translateY(0);
}

.c-anim-hide {
  opacity: 0;
}
</style>
