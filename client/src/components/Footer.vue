<template>
  <v-footer class="footer c-anim-items">
    <div class="c-container">
      <div class="d-flex justify-space-between align-center flex-wrap">
        <a href="#intro" class="text-decoration-none">
          <div class="c-footer__logo">
            <div class="c-footer-logo-txt c-noselect">
              КРЕАТИВ
            </div>
          </div>
        </a>

        <div class="c-footer__txt">
          2024 © Всі права застережено
          <div class="c-footer__social">
            <a href="https://www.facebook.com/creativ.musicschool" target="_blank">
              <img src="/assets/img/fb-logo.svg" alt="школа музики креатив facebook">
            </a>
            <a href="https://www.instagram.com/creativ.musicschool/" target="_blank">
              <img src="/assets/img/inst-logo.svg" alt="музична школа креатив instagram">
            </a>
          </div>
        </div>

        <a href="#intro" class="text-decoration-none">
          <div class="footer__arrow">
            <img src="/assets/img/up-vector.svg" alt="vector">
          </div>
        </a>

        <div class="c-footer__contacts">
          <div class="c-footer__phone" @click="callPhone">
            <img src="/assets/img/call-footer.svg" alt="phone">
            <p>+380 99-30-18-153</p>
          </div>
          <div class="c-footer__phone">
            <img src="/assets/img/home-footer.svg" alt="home">
            <a target="_blank" href="https://www.google.com/maps/place/%22Kreatyv%22+Shkola+Muzyky/@48.5273015,25.0334914,17z/data=!3m1!4b1!4m5!3m4!1s0x4736d36310dd37c7:0x23d93d124a29b0!8m2!3d48.527298!4d25.0356801">
              <p>вул.Шевченка 21/2</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </v-footer>
</template>

<script setup>
const callPhone = () => {
  window.open('tel:+380993018153')
}
</script>

<style scoped>
.footer {
  background: #1a1a1a;
  color: white;
  padding: 40px 0;
}

.c-footer__logo {
  margin-bottom: 20px;
}

.c-footer-logo-txt {
  font-size: 24px;
  font-weight: 700;
  color: white;
}

.c-footer__txt {
  text-align: center;
  margin: 20px 0;
}

.c-footer__social {
  display: flex;
  gap: 15px;
  margin-top: 10px;
  justify-content: center;
}

.c-footer__social img {
  width: 24px;
  height: 24px;
  transition: opacity 0.3s ease;
}

.c-footer__social img:hover {
  opacity: 0.8;
}

.footer__arrow {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.footer__arrow:hover {
  transform: translateY(-5px);
}

.c-footer__contacts {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.c-footer__phone {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.c-footer__phone img {
  width: 20px;
  height: 20px;
}

.c-footer__phone a {
  color: white;
  text-decoration: none;
}

@media (max-width: 600px) {
  .c-container {
    text-align: center;
  }

  .c-footer__contacts {
    margin-top: 20px;
  }
}
</style> 