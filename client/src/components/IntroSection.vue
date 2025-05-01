<template>
  <section class="c-intro" id="intro">
    <div class="c-container">
      <div class="c-intro-offer">
        <img
          draggable="false"
          class="c-intro-offer__bg-img c-unselectable c-anim-items"
          src="/assets/img/ellipse.svg"
          alt=""
        />
        <h1 class="c-intro-offer__title c-anim-items c-anim-hide">
          Музика знаходиться поряд з вами
        </h1>
        <p class="c-intro-offer__subtitle c-anim-items">
          Школа музики в <b>м.Коломия</b>
          для розвитку ваших дітей
        </p>
        <div class="c-intro-offer__btn c-anim-items">
          <v-btn class="c-gradient-btn" @click="openSignUpModal" elevation="0">
            <p class="c-gradient-btn__txt c-noselect">Записатися на урок</p>
          </v-btn>
        </div>
      </div>
      <div class="c-intro-image">
        <img
          draggable="false"
          src="/assets/img/intro-piano.png"
          class="c-unselectable c-anim-items c-anim-hide"
          alt="main-piano"
        />
      </div>
    </div>

    <!-- Sign Up Modal -->
    <SignUpModal ref="signUpModal" />
  </section>
</template>

<script setup>
import { ref } from "vue";
import SignUpModal from "./SignUpModal.vue";

const signUpModal = ref(null);

const openSignUpModal = () => {
  signUpModal.value.openModal();
};
</script>

<style scoped>
.c-intro {
  min-height: 90vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: 40px;
  padding-bottom: 100px;
  background: linear-gradient(125.46deg, #c6e2c3 11.19%, #9fc69b 89.3%);
}

.c-intro-offer {
  position: relative;
  z-index: 1;
  max-width: 600px;
}

.c-intro-offer__bg-img,
.c-intro-offer__sm-img {
  position: absolute;
  z-index: -1;
}

.c-intro-offer__bg-img {
  top: -10%;
  left: -20%;
  width: 100%;
}

.c-intro-offer__sm-img {
  bottom: -30%;
  right: -10%;
  width: 60%;
}

.c-intro-offer__title {
  font-size: 48px;
  font-weight: 900;
  margin-bottom: 20px;
  line-height: 1.2;
}

.c-intro-offer__subtitle {
  font-size: 24px;
  margin-bottom: 30px;
  line-height: 1.4;
}

.c-intro-offer__btn {
  margin-top: 40px;
}

.c-gradient-btn {
  max-width: 330px !important;
  height: 65px !important;
  border-radius: 15px !important;
  background: linear-gradient(282.41deg, #F46362 49.38%, #F26788 89.69%) !important;
  box-shadow: 0px 10px 35px rgba(244, 102, 117, 0.3) !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  cursor: pointer !important;
  transition: 0.5s !important;
  position: relative !important;
  padding: 0 30px !important;
  outline: none !important;
  border: none !important;
}

.c-gradient-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.5s;
  border-radius: 15px;
  opacity: 0;
  background: linear-gradient(83.35deg, #F46362 20.22%, #F26788 83.72%);
  box-shadow: 0px 10px 35px rgba(244, 102, 117, 0.3);
}

.c-gradient-btn:hover {
  transition: 0.3s;
  transform: translate(0, 2px);
}

.c-gradient-btn:focus,
.c-gradient-btn:active {
  outline: none !important;
  border: none !important;
}

.c-gradient-btn:focus::before,
.c-gradient-btn:active::before,
.c-gradient-btn::before {
  opacity: 0 !important;
  display: none !important;
}

.c-gradient-btn:hover::after {
  opacity: 1;
  transition: 0.5s ease-out;
}

.c-gradient-btn__txt {
  color: #fff;
  font-weight: bold;
  font-size: 17px;
  line-height: 15px;
  z-index: 1;
}

.c-intro-image {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  max-width: 600px;
}

.c-intro-image img {
  width: 100%;
  height: auto;
}

@media (max-width: 960px) {
  .c-intro {
    text-align: center;
    padding-top: 60px;
  }

  .c-intro-offer {
    margin: 0 auto;
  }

  .c-intro-image {
    position: relative;
    width: 100%;
    margin-top: 40px;
  }

  .c-intro-offer__title {
    font-size: 36px;
  }

  .c-intro-offer__subtitle {
    font-size: 20px;
  }
  
  .c-gradient-btn {
    height: 70px !important;
    margin: 0 auto;
  }
  
  .c-gradient-btn__txt {
    font-size: 16px;
  }
}
</style>
