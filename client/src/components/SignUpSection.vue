<template>
  <section class="signup-section c-anim-items" id="sign-up">
    <div class="signup-container">
      <div class="signup-title">
        Записатися на пробне заняття
      </div>
      <div class="signup-btn-wrapper">
        <div class="signup-btn" @click="openSignUpModal">
          <div class="signup-btn-text c-noselect">
            Записатися
          </div>
        </div>
      </div>
    </div>
    
    <!-- Sign Up Modal -->
    <SignUpModal ref="signUpModal" />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import SignUpModal from './SignUpModal.vue'

const signUpModal = ref(null)

const openSignUpModal = () => {
  signUpModal.value.openModal()
}
</script>

<style scoped>
.signup-section {
  /* background: linear-gradient(282.41deg, #F46362 49.38%, #F26788 89.69%); */
  background: #DEF2DC;
  height: 11.5rem;
  margin-top: 10rem;
  display: flex;
  align-items: center;
}

.signup-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.signup-title {
  transform: translateX(-10%);
  opacity: 0;
  transition: .3s ease 0s;
  font-weight: 600;
  font-size: 2rem;
  font-style: normal;
  color: #F46362;
}

.signup-btn-wrapper {
  transform: translateX(-10%);
  opacity: 0;
  transition: .3s ease .2s;
}

.signup-btn {
  width: 17rem;
  height: 5rem;
  border-radius: 3rem;
  background: linear-gradient(282.41deg, #F46362 49.38%, #F26788 89.69%);
  box-shadow: 0px 10px 35px rgba(244, 102, 117, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: .5s;
  position: relative;
}

.signup-btn-text {
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  z-index: 1;
}

.signup-btn:hover {
  transition: .3s;
  transform: translate(0, 1px);
}

.signup-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: .5s;
  border-radius: 3rem;
  opacity: 0;
  background: linear-gradient(83.35deg, #F46362 20.22%, #F26788 83.72%);
  box-shadow: 0px 5px 18px rgba(244, 102, 117, 0.3);
}

.signup-btn:hover::after {
  opacity: 1;
  transition: .5s ease-out;
}

/* Make the section visible immediately without animation for now */
.signup-section .signup-title,
.signup-section .signup-btn-wrapper {
  transform: translateX(0);
  opacity: 1;
}

@media (max-width: 768px) {
  .signup-container {
    flex-direction: column;
    text-align: center;
    padding: 20px 0;
  }
  
  .signup-section {
    height: auto;
  }
  
  .signup-title {
    font-size: 2rem;
    margin-bottom: 15px;
  }
  
  .signup-btn {
    width: 15rem;
    height: 5rem;
  }
}

@media (max-width: 480px) {
  .signup-title {
    font-size: 1.5rem;
  }
  
  .signup-btn {
    width: 12rem;
    height: 4rem;
  }
  
  .signup-btn-text {
    font-size: 16px;
  }
}
</style> 