<template>
  <section class="c-section-programm c-anim-items" id="programme">
    <div class="c-container">
      <div class="c-section-programm__title">
        Наші програми
      </div>
      <div class="c-section-programm_card">
        <v-card
          v-for="program in programs"
          :key="program.id"
          class="c-card-md c-anim-items"
          elevation="2"
        >
          <v-card-title class="c-card-md__title">
            {{ program.title }}
          </v-card-title>
          <v-card-text class="c-card-md__desc">
            {{ program.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="c-gradient-btn c-card-btn"
              @click="openProgramsList(program.title,program.type)"
              elevation="0"
            >
              <p class="c-gradient-btn__txt c-noselect">
                Детальніше
              </p>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
    
    <!-- Program Details Modal -->
    <ProgramDetailsModal ref="programModal" />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import ProgramDetailsModal from './ProgramDetailsModal.vue'

const programModal = ref(null)

const programs = [
  {
    id: 1,
    title: 'Групові заняття',
    description: 'Для дітей від 3-х років, які хочуть займатися вокалом, виступати на сцені і працювати в команді',
    type: 'group',
  },
  {
    id: 2,
    title: 'Індивідуальні заняття',
    description: 'Персональні заняття з професійним викладачем. Індивідуальний підхід та програма навчання',
     type: 'individual',
  }
]

const openProgramsList = (programTitle,programType) => {
  const mode = programType === 'group' ? 'групові' : 'індивідуальні';

  programModal.value.openModal(mode);
}
</script>

<style scoped>
.c-section-programm {
  padding: 80px 0;
  background: #DEF2DC;
}

.c-section-programm__title {
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
}

.c-section-programm_card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.c-card-md {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.c-card-md:hover {
  transform: translateY(-5px);
}

.c-card-md__title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  padding: 20px;
}

.c-card-md__desc {
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  padding: 0 20px 20px;
  height: 180px;
}

.c-card-btn {
  height: 50px !important;
  margin: 0 20px 20px !important;
  width: 40% !important;
  border-radius: 10px !important;
}

.c-card-btn .c-gradient-btn__txt {
  color: #fff;
  font-weight: bold;
  font-size: 13px;
  line-height: 10px;
  z-index: 1;
}

@media (max-width: 600px) {
  .c-section-programm__title {
    font-size: 28px;
  }

  .c-card-md__title {
    font-size: 20px;
  }
  
  .c-card-btn {
    height: 50px !important;
  }
  
  .c-card-btn .c-gradient-btn__txt {
    font-size: 16px;
  }
}
</style> 