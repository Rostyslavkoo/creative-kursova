<template>
  <section class="question-section c-anim-items" id="question">
    <div class="question-container">
      <div class="question-img">
        <img src="/assets/img/fno.png" alt="fno">
      </div>
      <div class="question-title">
        Залишилися запитання? Питайте!
      </div>
      
      <div class="question-input c-anim-items">
        <div class="question-fblock">
          <div class="input-block">
            <input type="text" class="input-field" v-model="form.name" required>
            <label class="input-title">
              Введіть ім'я
            </label>
          </div>
          <div class="input-block">
            <input type="text" class="input-field" v-model="form.phone" required>
            <label class="input-title">
              Введіть телефон
            </label>
          </div>
        </div>
        <div class="question-sblock">
          <div class="input-block">
            <input type="text" class="input-field" v-model="form.email" required>
            <label class="input-title">
              Введіть e-mail
            </label>
          </div>
          <div class="input-block">
            <input type="text" class="input-field" v-model="form.subject" required>
            <label class="input-title">
              Тема питання
            </label>
          </div>
        </div>
      </div>
      
      <div class="question-textarea c-anim-items">
        <div class="textarea-block c-anim-items">
          <textarea class="textarea-field" rows="1" v-model="form.message" minlength="1" maxlength="150" required></textarea>
          <label class="textarea-title">
            Введіть повідомлення
          </label>
          <div class="textarea-btn">
            <div class="gradient-btn" @click="submitForm" :class="{ 'disabled': !formValid || !form.agreedToTerms }">
              <div class="gradient-btn-text c-noselect">
                <img draggable="false" src="/assets/img/send.svg" alt="send">
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="checkbox-section c-anim-items">
        <label class="container-checkbox">
          <input id="accesData" type="checkbox" v-model="form.agreedToTerms">
          <span class="checkmark"></span>
        </label>
        <label for="accesData" class="checkbox-title c-noselect">
          Я погоджуюся з обробкою персональних даних
        </label>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const form = ref({
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
  agreedToTerms: false
})

const formValid = computed(() => {
  return form.value.name && 
         form.value.phone && 
         form.value.email && 
         /.+@.+\..+/.test(form.value.email) && 
         form.value.subject && 
         form.value.message
})

const submitForm = () => {
  if (formValid.value && form.value.agreedToTerms) {
    // TODO: Implement form submission to backend
    console.log('Form submitted:', form.value)
    
    // Show success message
    alert('Дякуємо за ваше запитання! Ми зв\'яжемося з вами найближчим часом.')
    
    // Reset form
    form.value = {
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
      agreedToTerms: false
    }
  }
}
</script>

<style scoped>
.question-section {
  height: auto;
  background: #201E1E;
  position: relative;
  padding-top: 10.5rem;
  padding-bottom: 10rem;
}

.question-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  position: relative;
  z-index: 2;
}

.question-img {
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: .8;
}

.question-img::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 90%;
  bottom: 0;
  left: 0;
  background: linear-gradient(90.38deg, #201E1E -19.82%, rgba(32, 30, 30, 0.1) 147.52%);
  z-index: 1;
  overflow: hidden;
}

.question-title {
  font-weight: 900;
  font-size: 4rem;
  color: #fff;
}

.question-input {
  max-width: 80rem;
  display: flex;
  justify-content: space-between;
  padding-top: 3rem;
}

.question-fblock,
.question-sblock {
  width: 48%;
}

.input-block {
  position: relative;
  margin-top: 8rem;
}

.input-title {
  position: absolute;
  color: #BDBBBB;
  font-weight: normal;
  font-size: 2.5rem;
  left: 0;
  top: 0;
  letter-spacing: 0.02em;
  transition: .1s linear;
  pointer-events: none;
}

.input-field {
  padding-left: .4rem;
  max-width: 36rem;
  width: 100%;
  height: 40px;
  background: transparent;
  outline: none;
  border: none;
  color: #BDBBBB;
  font-weight: normal;
  font-size: 25px;
  line-height: 30px;
  letter-spacing: 0.02em;
  border-bottom: 2px solid #BDBBBB;
  transition: .2s linear;
}

.input-field:focus {
  border-bottom: 2px solid #fff;
  transition: .2s linear;
  color: #fff;
}

.input-field:focus + .input-title {
  top: -2rem;
  font-size: 1.7rem;
  transition: .1s linear;
  color: #fff;
}

.input-field:not(:focus):valid ~ .input-title {
  top: -2rem;
  font-size: 1.7rem;
  transition: .1s linear;
  color: #BDBBBB;
}

.question-textarea {
  width: 100%;
}

.textarea-block {
  position: relative;
  margin-top: 8rem;
  max-width: 87rem;
}

.textarea-title {
  position: absolute;
  color: #BDBBBB;
  font-weight: normal;
  font-size: 2.5rem;
  left: 0;
  top: -.8rem;
  letter-spacing: 0.02em;
  transition: .1s linear;
  pointer-events: none;
}

.textarea-field {
  max-width: 80rem;
  width: 100%;
  max-height: 10rem;
  min-height: 10rem;
  background: transparent;
  outline: none;
  border: none;
  color: #BDBBBB;
  font-weight: normal;
  font-size: 2.5rem;
  line-height: 30px;
  letter-spacing: 0.02em;
  border-bottom: 2px solid #BDBBBB;
  transition: .2s linear;
  resize: none;
}

.textarea-field:focus {
  border-bottom: 2px solid #fff;
  transition: .2s linear;
  color: #fff;
}

.textarea-field:focus + .textarea-title {
  top: -2rem;
  font-size: 1.7rem;
  transition: .1s linear;
  color: #fff;
}

.textarea-field:not(:focus):valid ~ .textarea-title {
  top: -2rem;
  font-size: 1.7rem;
  transition: .1s linear;
  color: #BDBBBB;
}

.textarea-btn {
  position: absolute;
  right: 0;
  top: 5rem;
}

.textarea-btn .gradient-btn {
  width: 5.5rem;
  max-width: 5.5rem;
  height: 5.5rem;
  border-radius: 3rem;
  box-shadow: 0px 5px 10px rgba(244, 102, 117, 0.3);
  background: linear-gradient(282.41deg, #F46362 49.38%, #F26788 89.69%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: .5s;
  position: relative;
}

.gradient-btn-text {
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.textarea-btn .gradient-btn::after {
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
  box-shadow: 0px 5px 15px rgba(244, 102, 117, 0.3);
}

.textarea-btn .gradient-btn:hover {
  transform: translate(0, 1px);
}

.textarea-btn .gradient-btn:hover::after {
  opacity: 1;
  transition: .5s ease-out;
}

.textarea-btn .gradient-btn img {
  position: relative;
  z-index: 100;
}

.textarea-btn .gradient-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.checkbox-section {
  display: flex;
  margin-top: 4rem;
  position: relative;
}

.checkbox-title {
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: #FFFFFF;
  cursor: pointer;
}

.checkbox-title:hover {
  color: #e6e6e6;
}

.container-checkbox {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 2.2rem;
  width: 2.2rem;
  background: transparent;
  border: 1px solid #BDBBBB;
  box-sizing: border-box;
  border-radius: 5px;
}

.container-checkbox input:checked ~ .checkmark {
  background: transparent;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.container-checkbox .checkmark:after {
  left: 8px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

@media (max-width: 768px) {
  .question-input {
    flex-direction: column;
  }
  
  .question-fblock,
  .question-sblock {
    width: 100%;
  }
  
  .question-title {
    font-size: 3rem;
  }
  
  .input-block {
    margin-top: 5rem;
  }
  
  .input-title,
  .textarea-title {
    font-size: 2rem;
  }
  
  .input-field,
  .textarea-field {
    font-size: 1.8rem;
    line-height: 25px;
  }
}

@media (max-width: 480px) {
  .question-title {
    font-size: 2rem;
  }
  
  .input-title,
  .textarea-title {
    font-size: 1.5rem;
  }
  
  .input-field,
  .textarea-field {
    font-size: 1.5rem;
    line-height: 20px;
  }
  
  .checkbox-title {
    font-size: 16px;
  }
}
</style> 