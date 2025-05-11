<template>
  <div class="home">
    <IntroSection />
    <ProgramsSliderSection />
    <AboutSection />
    <ProgramsSection />
    <GallerySection />
    <SignUpSection />
    <ReviewsSliderSection />
    <QuestionSection />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import IntroSection from '../components/IntroSection.vue'
import ProgramsSliderSection from '../components/ProgramsSliderSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ProgramsSection from '../components/ProgramsSection.vue'
import GallerySection from '../components/GallerySection.vue'
import SignUpSection from '../components/SignUpSection.vue'
import ReviewsSliderSection from '../components/ReviewsSliderSection.vue'
import QuestionSection from '../components/QuestionSection.vue'

onMounted(() => {
  const script = document.createElement('script')
  script.src = '/assets/js/scroll-animation.js'
  script.async = true
  script.onload = () => {
    // Викликаємо анімацію одразу після завантаження скрипта
    if (typeof window.animOnScroll === 'function') {
      window.animOnScroll()
    } else {
      // Якщо функція не глобальна, пробуємо вручну активувати
      const animItems = document.querySelectorAll('.c-anim-items')
      if (animItems.length > 0) {
        for (let i = 0; i < animItems.length; i++) {
          const animItem = animItems[i]
          const animItemHeight = animItem.offsetHeight
          const animItemOffset = animItem.getBoundingClientRect().top + window.pageYOffset
          const animItemStart = 4
          let animItemPoint = window.innerHeight - animItemHeight / animItemStart
          if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animItemStart
          }
          if ((window.pageYOffset > animItemOffset - animItemPoint) && (window.pageYOffset < animItemOffset + animItemPoint)) {
            animItem.classList.add('_active')
          } else {
            if (!animItem.classList.contains('c-anim-hide')) {
              animItem.classList.remove('_active')
            }
          }
        }
      }
    }
  }
  document.body.appendChild(script)
})
</script>

<style scoped>
.home {
  width: 100%;
  min-height: 100vh;
}
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