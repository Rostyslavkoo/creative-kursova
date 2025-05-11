<template>
  <v-dialog v-model="dialog" max-width="900px">
    <v-card class="program-detail-card">
      <v-btn icon size="small" class="close-button" @click="closeModal">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-card-text>
        <div v-if="!program">
          <p>Програму не знайдено</p>
        </div>
        <div v-else>
          <h2 class="program-detail-title">
            В «{{ program.title?.toLowerCase() }}» входить:
          </h2>

          <!-- ПІДПУНКТИ -->
          <div class="info-list">
            <div v-for="(info, index) in program.details" :key="index" class="info-item">
              <div class="info-dot"></div>
              <div class="info-content">
                <h4 class="info-title">{{ info.title }}</h4>
                <p class="info-description">{{ info.description }}</p>
              </div>
            </div>
          </div>

          <div class="program-advantages">
            <h3 class="section-title">Переваги заняття:</h3>
            <!-- ОПИС ПРОГРАМИ -->
            <p class="program-description">{{ program.description }}</p>
          </div>

          <div class="program-details">
            <div class="detail-item" v-if="program.duration">
              <span class="detail-label">Тривалість заняття:</span>
              <span class="detail-value highlight">{{ program.duration }}</span>
            </div>
            <div class="separator" v-if="program.price">|</div>
            <div class="detail-item" v-if="program.price">
              <span class="detail-label">Ціна:</span>
              <span class="detail-value highlight">від {{ program.price }}/заняття</span>
            </div>
          </div>

          <div class="free-lesson-row">
            <span class="free-lesson-note">Перше заняття безкоштовне</span>
            <v-btn class="c-gradient-btn c-card-btn" @click="signUp" elevation="0">
              <p class="c-gradient-btn__txt c-noselect">Записатися на урок</p>
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  program: {
    type: Object,
    required: false,
    default: null,
  },
});

const dialog = ref(false);

const openModal = () => {
  dialog.value = true;
};

const closeModal = () => {
  dialog.value = false;
};

const signUp = () => {
  // Implement sign up logic
  console.log("Sign up clicked for program:", props.program?._id);
};

defineExpose({ openModal });
</script>

<style scoped>
.program-detail-card {
  padding: 38px 56px 20px 46px;
  border-radius: 32px;
  background: #fff;
  box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.1);
  position: relative;
}

.close-button {
  position: absolute;
  top: 24px;
  right: 24px;
  opacity: 0.7;
  transition: opacity 0.2s;
  z-index: 2;
}
.close-button:hover {
  opacity: 1;
}

.program-detail-title {
  font-size: 2.2rem;
  font-weight: 900;
  margin-bottom: 32px;
  color: #111;
  letter-spacing: -1px;
}

.program-description {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 32px;
  line-height: 1.6;
  text-align: left;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 18px;
}

.info-dot {
  width: 18px;
  height: 18px;
  background: #f46362;
  border-radius: 50%;
  margin-top: 7px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px 0 rgba(244, 99, 98, 0.1);
}

.info-content {
  flex: 1;
}

.info-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 4px;
  color: #222;
}

.info-description {
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
}

.program-advantages {
  margin-bottom: 36px;
  min-height: 150px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: 18px;
  color: #111;
}

.advantages-text {
  font-size: 1.1rem;
  color: #444;
  line-height: 1.7;
  margin-left: 24px;
  text-align: left;
}

.program-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: 32px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.detail-label {
  font-size: 1.2rem;
  font-weight: 700;
  color: #444;
}

.detail-value.highlight {
  color: #f46362;
  font-size: 1.2rem;
  font-weight: 700;
  margin-left: 2px;
}

.separator {
  color: #bbb;
  font-size: 1.5rem;
  font-weight: 400;
}

.free-lesson-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 80px;
  gap: 16px;
}

.free-lesson-note {
  font-size: 1.1rem;
  font-weight: 300;
  color: rgb(148, 148, 148);
}

.sign-up-button {
  background: #f46362 !important;
  color: white !important;
  font-size: 1.1rem;
  font-weight: 700;
  height: 48px !important;
  border-radius: 12px;
  text-transform: none;
  letter-spacing: normal;
  min-width: 220px;
  box-shadow: 0 2px 12px 0 rgba(244, 99, 98, 0.1);
  transition: background 0.2s;
}
.sign-up-button:hover {
  background: #e35251 !important;
}

@media (max-width: 700px) {
  .program-detail-card {
    padding: 24px 8px 24px 8px;
    border-radius: 18px;
  }
  .program-detail-title {
    font-size: 1.3rem;
  }
  .section-title {
    font-size: 1.1rem;
  }
  .advantages-text {
    margin-left: 0;
  }
  .program-details {
    flex-direction: column;
    gap: 12px;
  }
  .free-lesson-row {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
}
.c-gradient-btn__txt {
  color: #fff;
  font-weight: bold;
  font-size: 13px;
  line-height: 10px;
  z-index: 1;
}
.c-card-btn {
  height: 50px !important;
  width: 40% !important;
  border-radius: 10px !important;
}
</style>
