<template>
  <v-dialog v-model="dialog" max-width="1100px">
    <v-card>
      <v-btn
        icon
        size="small"
        class="close-button"
        @click="closeModal"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <div class="programs-modal-list">
      <v-card-title>
        <div class="programs-modal-title">
          {{ mode === 'групові' ? 'Групові заняття' : 'Індивідуальні заняття' }}
        </div>
      </v-card-title>
      <v-card-text>
        <div class="programs-modal-cards">
          <div
            v-for="program in programs"
            :key="program._id"
            :class="[
              'programs-modal-card',
              'fade-in',
              mode === 'групові' ? 'group-card' : 'individual-card'
            ]"
            :style="{ animationDelay: $index * 100 + 'ms' }"
            @click="selectProgram(program)"
          >
            <div class="programs-modal-card-title">{{ program.title }}</div>
            <div class="programs-modal-card-age">{{ program.duration || program.price || '' }}</div>
            <v-btn icon size="x-small" class="programs-modal-card-arrow">
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </div>

        <ProgramDetailView
          ref="detailView"
          :program="selectedProgram"
        />
      </v-card-text>
      <v-card-actions class="px-6 pb-6">
        <v-spacer></v-spacer>
        <!-- <v-btn color="grey darken-3" text @click="closeModal">Закрити</v-btn> -->
      </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import ProgramDetailView from './ProgramDetailView.vue'

const dialog = ref(false)
const mode = ref('групові')
const programs = ref([])
const detailView = ref(null)
const selectedProgram = ref(null)

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_URL = `${API_BASE_URL}/api/admin/programs`

const openModal = async (selectedMode) => {
  mode.value = selectedMode
  programs.value = [] // Очищаємо програми перед новим завантаженням
  dialog.value = true
  
  try {
    const { data } = await axios.get(API_URL)
    // Невелика затримка перед показом карток для кращого ефекту анімації
    setTimeout(() => {
      programs.value = data.filter(p => p.mode === selectedMode)
    }, 100)
  } catch (e) {
    console.error('Error fetching programs:', e)
    programs.value = []
  }
}

const closeModal = () => {
  dialog.value = false
}

const selectProgram = (program) => {
  selectedProgram.value = program
  detailView.value.openModal()
}

// Для доступу з батьківського компонента
import { defineExpose } from 'vue'
defineExpose({ openModal })
</script>

<style scoped>
.programs-modal-list {
  padding: 32px 32px 0 32px;
}
.programs-modal-title {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 32px;
}
.programs-modal-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  justify-items: center;
  min-height: 300px;
}
.programs-modal-card {
  border-radius: 24px;
  padding: 32px 24px 24px 24px;
  min-width: 240px;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  transition: box-shadow 0.2s;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.5s ease-out forwards;
  cursor: pointer;
}

.group-card {
  background: linear-gradient(120deg, #f46362 0%, #f26788 100%);
  box-shadow: 0 4px 24px rgba(244, 102, 117, 0.12);
  color: #fff;

  &:hover {
    box-shadow: 0 8px 32px rgba(244, 102, 117, 0.25);
  }

  .programs-modal-card-arrow {
    color: #fff;
    background: rgba(255,255,255,0.12);
  }
}

.individual-card {
  background: linear-gradient(120deg, #A8DBA2 0%, #CDDF9B 100%);
  box-shadow: 0 4px 24px rgba(168, 219, 162, 0.12);
  color: #FFFFFF;

  &:hover {
    box-shadow: 0 8px 32px rgba(168, 219, 162, 0.25);
  }

  .programs-modal-card-arrow {
    color: #FFFFFF;
    background: rgba(63, 97, 68, 0.12);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.programs-modal-card-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 16px;
}

.programs-modal-card-age {
  font-size: 16px;
  opacity: 0.85;
  position: absolute;
  left: 24px;
  bottom: 24px;
}

.programs-modal-card-arrow {
  position: absolute;
  right: 18px;
  bottom: 18px;
  border-radius: 50%;
}

.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
}
</style> 