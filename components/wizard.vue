<template>
  <div class="container-fluid p-4">

    <!-- Three-step list wizard -->
    <div class="wizard">
      <ul class="wizard-steps">
        <li v-for="(item, index) in wizard.section" :key="index" :class="{ active: currentStep === index }" @click="changeStep(index)">{{index}}</li>

      </ul>
    </div>

    <!-- Content based on currentStep -->
    <div v-for="(item, index) in wizard.section" :key="index" v-if="currentStep === index">
      <show_step_data :section="item" />
    </div>

    <!-- Buttons -->
    <div class="buttons">
      <button v-if="currentStep !== 1" @click="prevStep">قبلی</button>
      <button v-if="currentStep !== 3" @click="nextStep">بعدی</button>
      <button v-if="currentStep === 3" @click="register">ثبت</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
let prop = defineProps(['wizard']);
const wizard = toRefs(prop).wizard?.value;
console.log(wizard);
const currentStep = ref(1);

// Function to change step based on clicked number
const changeStep = (step) => {
  currentStep.value = step;
};

// Function to go to the next step
const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++;
  }
};

// Function to go to the previous step
const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

// Function to register
const register = () => {
  // Add your registration logic here
  alert("Registered successfully!");
};
</script>

<style scoped>
.wizard {
  display: flex;
  justify-content: center;
  margin: 2rem;
  position: relative;
}

.wizard-steps {
  list-style-type: none;
  padding: 0;
  display: flex;
}

.wizard-steps li {
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 50%;
}

.wizard-steps li.active {
  background-color: #197c82;
  color: #fff;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

button {
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 20px;
  background-color: #197c82;
  color: #fff;
  border: 1px solid #197c82;
}

button:hover {
  background-color: #4aa5a9;
  color: #fff;
}
</style>
