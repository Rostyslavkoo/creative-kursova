<template>
  <section class="c-section" id="about">
    <div class="c-container">
      <h2 class="c-section-title c-anim-items">
        Чому варто займатися музикою
      </h2>
      
      <div class="about-cards c-anim-items">
        <!-- Відчуття ритму та слуху -->
        <div class="about-card">
          <div class="about-card-icon-wrapper metronome-bg">
            <img src="/assets/img/metronome.svg" alt="Метроном" class="about-card-icon">
          </div>
          <h3 class="about-card-title">Відчуття ритму та слуху</h3>
          <p class="about-card-text">Музика формує у дітей відчуття ритму, розвиває голосовий апарат і слух</p>
        </div>
        
        <!-- Розвиток творчих здатностей -->
        <div class="about-card">
          <div class="about-card-icon-wrapper waves-bg">
            <img src="/assets/img/radio-waves.svg" alt="Звукові хвилі" class="about-card-icon">
          </div>
          <h3 class="about-card-title">Розвиток творчих здатностей</h3>
          <p class="about-card-text">Дитина занурюється в творчу атмосферу, де поступово розкриває і розвиває творчий потенціал</p>
        </div>
        
        <!-- Старт в музичній кар'єрі -->
        <div class="about-card">
          <div class="about-card-icon-wrapper music-bg">
            <img src="/assets/img/microphone.svg" alt="Мікрофон" class="about-card-icon">
          </div>
          <h3 class="about-card-title">Старт в музичній кар'єрі</h3>
          <p class="about-card-text">Відточуючи вокальні дані з дитинства, дитина розкриває свій потенціал і з легкістю може зв'язати своє життя з музичною кар'єрою</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.c-section {
  padding-top: 250px;
  padding-bottom: 80px;
  background-color: #fff;
}

.c-section-title {
  font-size: 36px;
  font-weight: 900;
  color: #000;
  text-align: center;
  margin-bottom: 60px;
}

.about-cards {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.about-card {
  flex: 1;
  min-width: 300px;
  max-width: 350px;
  text-align: center;
  padding: 20px;
}

.about-card-icon-wrapper {
  width: 100px;
  height: 100px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.metronome-bg {
  background-color: #FEE1DE;
}

.waves-bg {
  background-color: #FEFBD0;
}

.music-bg {
  background-color: #EFE1FD;
}

.about-card-icon {
  width: 50px;
  height: 50px;
}

.about-card-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #000;
}

.about-card-text {
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}

@media (max-width: 768px) {
  .about-cards {
    flex-direction: column;
    align-items: center;
  }
  
  .about-card {
    max-width: 100%;
  }
}
</style> 