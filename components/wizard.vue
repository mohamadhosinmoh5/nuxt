<template>
  <div class="container-fluid p-4">

    <!-- Three-step list wizard -->
    <div class="wizard">
      <ul class="wizard-steps">
        <li :class="{ active: currentStep === 1 }" @click="changeStep(1)">1</li>
        <li :class="{ active: currentStep === 2 }" @click="changeStep(2)">2</li>
        <li :class="{ active: currentStep === 3 }" @click="changeStep(3)">3</li>
        <li :class="{ active: currentStep === 4 }" @click="changeStep(4)">4</li>

      </ul>
    </div>

    <!-- Content based on currentStep -->
    <div v-if="currentStep === 1">
      <UnitSpecifications />
    </div>
    <div v-if="currentStep === 2">
      <PriceInfoWidget />
    </div>
    <div v-if="currentStep === 3">
      <MapAddress />
    </div>
    <div v-if="currentStep === 4">
      <Advertising />
    </div>

    <!-- Buttons -->
    <div class="buttons">
      <button v-if="currentStep !== 1" @click="prevStep">قبلی</button>
      <button v-if="currentStep !== 4" @click="nextStep">بعدی</button>
      <button v-if="currentStep === 4" @click="register">ثبت</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

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
