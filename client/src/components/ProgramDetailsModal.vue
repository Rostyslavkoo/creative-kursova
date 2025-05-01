<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card v-if="selectedProgram">
      <div class="program-image-container">
        <v-img
          v-if="selectedProgram.image"
          :src="selectedProgram.image"
          height="200px"
          cover
          :alt="selectedProgram.title"
          @error="handleImageError"
        ></v-img>
        <div v-else class="fallback-image-container">
          <v-icon size="64" color="grey lighten-1">mdi-music</v-icon>
        </div>
      </div>
      
      <v-card-title class="pt-5">
        {{ selectedProgram.title }}
      </v-card-title>
      
      <v-card-text>
        <p class="text-body-1 mb-4">{{ selectedProgram.description }}</p>
        
        <div class="program-details">
          <h3 class="text-h6 font-weight-bold mb-3">Деталі програми:</h3>
          
          <v-list>
            <v-list-item v-for="(detail, index) in selectedProgram.details" :key="index">
              <template #prepend>
                <v-icon color="primary" class="mr-3">mdi-check-circle</v-icon>
              </template>
              <v-list-item-title>{{ detail }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
        
        <div class="program-price my-4">
          <h3 class="text-h6 font-weight-bold mb-2">Вартість:</h3>
          <p class="text-h5 primary--text font-weight-bold">{{ selectedProgram.price }} грн / урок</p>
        </div>
        
        <div class="program-schedule my-4">
          <h3 class="text-h6 font-weight-bold mb-2">Розклад:</h3>
          <p>{{ selectedProgram.schedule }}</p>
        </div>
      </v-card-text>
      
      <v-card-actions class="px-6 pb-6">
        <v-spacer></v-spacer>
        <v-btn
          color="grey darken-3"
          text
          @click="closeModal"
        >
          Закрити
        </v-btn>
        <div class="modal-btn" @click="enrollProgram">
          <div class="modal-btn-text c-noselect">Записатися</div>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineExpose } from 'vue'

const dialog = ref(false)
const selectedProgram = ref(null)

// Program details data
const programsData = [
  {
    id: 1,
    title: 'Групові заняття',
    description: 'Для дітей від 3-х років, які хочуть займатися вокалом, виступати на сцені і працювати в команді.',
    details: [
      'Заняття в групах по 5-8 осіб',
      'Розвиток музичного слуху',
      'Постановка голосу',
      'Робота з мікрофоном',
      'Підготовка до виступів',
      'Участь у концертах школи'
    ],
    price: '250',
    schedule: 'Пн, Ср, Пт - 16:00-18:00',
    image: null
  },
  {
    id: 2,
    title: 'Індивідуальні заняття',
    description: 'Персональні заняття з професійним викладачем. Індивідуальний підхід та програма навчання.',
    details: [
      'Індивідуальний підхід',
      'Підбір репертуару за вподобаннями',
      'Інтенсивний розвиток вокальних навичок',
      'Робота з диханням та постановка голосу',
      'Навчання грі на інструменті',
      'Підготовка до конкурсів та фестивалів'
    ],
    price: '350',
    schedule: 'Гнучкий графік за домовленістю',
    image: null
  }
]

const handleImageError = () => {
  if (selectedProgram.value) {
    selectedProgram.value.image = null
  }
}

const openModal = (programId) => {
  try {
    const program = programsData.find(p => p.id === programId)
    if (program) {
      selectedProgram.value = { ...program }
      dialog.value = true
    }
  } catch (error) {
    console.error('Error opening program modal:', error)
  }
}

const closeModal = () => {
  dialog.value = false
  setTimeout(() => {
    selectedProgram.value = null
  }, 300)
}

const enrollProgram = () => {
  // Emit event that parent can listen to
  closeModal()
  alert('Перенаправлення на сторінку запису...')
}

defineExpose({
  openModal
})
</script>

<style scoped>
.v-card {
  border-radius: 15px !important;
  overflow: hidden !important;
}

.program-details,
.program-price,
.program-schedule {
  border-left: 4px solid var(--primary-color);
  padding-left: 16px;
}

.program-image-container {
  height: 200px;
  overflow: hidden;
}

.fallback-image-container {
  height: 200px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-btn {
  max-width: 200px;
  height: 60px;
  border-radius: 15px;
  background: linear-gradient(282.41deg, #F46362 49.38%, #F26788 89.69%);
  box-shadow: 0px 10px 35px rgba(244, 102, 117, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.5s;
  position: relative;
  padding: 0 30px;
}

.modal-btn-text {
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  z-index: 1;
}

.modal-btn::after {
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

.modal-btn:hover {
  transition: 0.3s;
  transform: translate(0, 2px);
}

.modal-btn:hover::after {
  opacity: 1;
  transition: 0.5s ease-out;
}

@media (max-width: 600px) {
  .modal-btn {
    height: 50px;
  }
  
  .modal-btn-text {
    font-size: 16px;
  }
}
</style> 