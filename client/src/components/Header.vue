<template>
  <header class="c-header">
    <div class="c-container">
      <div class="c-header__inner">
        <div class="c-header-logo">
          <a href="#intro">
            <img 
              class="c-main-logo" 
              src="/assets/img/main-logo.svg" 
              alt="Музична школа Креатив Коломия"
            >
          </a>
        </div>
        
        <div class="c-nav d-none d-md-flex">
          <a href="#intro">Головна</a>
          <a href="#programme">Програма</a>
          <a href="#gallery">Галарея</a>
          <a href="#review">Відгуки</a>
        </div>
        
        <div class="c-header-contacts">
          <div class="c-header__phone" @click="callPhone">
            <img src="/assets/img/call.svg" alt="телефон школи креатив коломия">
            <p>+380 99-30-18-153</p>
          </div>
          <div class="c-header__phone">
            <img src="/assets/img/home.svg" alt="знаходження школи креатив коломия">
            <a target="_blank" href="https://www.google.com/maps/place/%22Kreatyv%22+Shkola+Muzyky/@48.5273015,25.0334914,17z/data=!3m1!4b1!4m5!3m4!1s0x4736d36310dd37c7:0x23d93d124a29b0!8m2!3d48.527298!4d25.0356801">
              <p>вул.Шевченка 21/2</p>
            </a>
          </div>
        </div>
        
        <div class="c-burger d-md-none" @click="toggleSidebar">
          <span></span>
        </div>
        
        <div class="c-sidebar" :class="{ 'c-sidebar-active': sidebarOpen }">
          <div class="c-nav">
            <a class="c-burger__item" href="#intro" @click="closeSidebar">Головна</a>
            <a class="c-burger__item" href="#programme" @click="closeSidebar">Програма</a>
            <a class="c-burger__item" href="#gallery" @click="closeSidebar">Галарея</a>
            <a class="c-burger__item" href="#review" @click="closeSidebar">Відгуки</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const sidebarOpen = ref(false)

const callPhone = () => {
  window.open('tel:+380993018153')
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
  document.body.style.overflow = sidebarOpen.value ? 'hidden' : ''
}

const closeSidebar = () => {
  sidebarOpen.value = false
  document.body.style.overflow = ''
}

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.c-header {
  width: 100%;
  z-index: 100;
  box-shadow: none;
  position: absolute;
  top: 20px;
}

.c-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  position: relative;
}

.c-header-logo img {
  height: 100px;
  max-width: 200px;
  object-fit: contain;
  padding-top: 20px;
}

.c-nav {
  display: flex;
  gap: 30px;
}

 a {
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  white-space: nowrap;
  text-decoration: none;
  color:black
}

.c-nav a:hover {
  color: var(--primary-color);
}

.c-header-contacts {
  display: flex;
  gap: 20px;
}

.c-header__phone {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.c-header__phone img {
  width: 20px;
  height: 20px;
}

.c-header__phone p {
  margin: 0;
  white-space: nowrap;
}

.c-burger {
  width: 30px;
  height: 20px;
  position: relative;
  cursor: pointer;
  z-index: 101;
}

.c-burger span {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #333;
  top: 50%;
  transform: translateY(-50%);
  transition: 0.3s;
}

.c-burger span::before,
.c-burger span::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #333;
  transition: 0.3s;
}

.c-burger span::before {
  top: -8px;
}

.c-burger span::after {
  top: 8px;
}

.c-sidebar {
  position: fixed;
  right: -100%;
  top: 0;
  height: 100%;
  width: 250px;
  background: white;
  padding: 100px 30px 30px;
  z-index: 100;
  transition: right 0.3s ease;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.c-sidebar-active {
  right: 0;
}

.c-sidebar .c-nav {
  flex-direction: column;
  gap: 15px;
}

.c-burger__item {
  font-size: 18px;
  padding: 10px 0;
  display: block;
  border-bottom: 1px solid #eee;
}

@media (max-width: 767px) {
  .c-header__inner {
    height: 70px;
  }

  .c-header-logo img {
    height: 35px;
  }

  .c-header-contacts {
    flex-direction: column;
    gap: 10px;
  }

  .c-header__phone {
    font-size: 14px;
  }
  
  .c-header__phone img {
    width: 16px;
    height: 16px;
  }
}
</style> 