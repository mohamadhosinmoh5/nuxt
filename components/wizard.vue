<template>
  <div class="container-fluid p-4">

    <!-- Three-step list wizard -->




    <div v-if="currentStep == 0">
      <show_step_data :section="wizard.section" />

    </div>

    <div v-if="currentStep == 1">
      <h6 class="Emcan text-center">امکانات</h6>
      <div v-for="Section in wizard.section[1].field" :key="Section.id" class="adsFilter justify-content-center">

        <form @submit.prevent="submitForm">
          <div class="form-checks ">
            <input class="form-check-input" type="checkbox" :id="Section.id" :value="Section.id"
              v-model="selectedOptions[Section.id]" />
            <label class="form-check-label ms-1" :for="Section.id">
              {{ Section.title }}
            </label>
          </div>
        </form>
      </div>
    </div>

    <div v-if="currentStep == 2">
      <h6>قیمت</h6>
      <h6>لطفا در این قسمت قیمت ملک خود را به صورت قیمت کل و قیمت هر متر جداگانه وارد نمایید </h6>
      <div v-for="Price in wizard.section[2].field" :key="Price.id" class="price">
        <div class="form-group mt-2">
          <label for="exampleInputEmail1">{{ Price.title }}</label>
          <!-- {{ FormData.data_sections[Price.id] }} -->
          <input type="text" @change="setData($event, Price, Price.id)" class="form-control" id="exampleInputEmail1"
            aria-describedby="emailHelp" placeholder="تومان">
          <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
        </div>
        <span v-if="error" class="error-message">{{ error }}</span>
      </div>
    </div>
    <div v-if="currentStep == 3">
      <h6>مشخصات</h6>

      <h6>در این قسمت می توانید اطلاعات مالک را وارد نمایید . این اطلاعات به کاربران دیگر نمایش داده نمی شود</h6>
      <div v-for="Price in wizard.section[3].field" :key="Price.id" class="price">
        <div class="form-group mt-3">
          <label for="exampleInputEmail1">{{ Price.title }}</label>
          <input type="text" class="form-control" @change="setData($event, Price, Price.id)" id="exampleInputEmail1"
            aria-describedby="emailHelp" placeholder="">
          <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
        </div>
        <span v-if="error" class="error-message">{{ error }}</span>

      </div>

      <!-- <a href="/ads-map">next</a> -->
    </div>

    <!-- Buttons -->
    <div class="buttons">
      <button v-if="currentStep !== 1" @click="prevStep">قبلی</button>
      <button v-if="currentStep !== 3" @click="nextStep">بعدی</button>
      <button v-if="currentStep === 3" @click="handleSubmit">
        <a style="text-decoration: none; color: white;" href="/ads-map">بعدی</a>
      </button>
    </div>
    <div class="wizard">
      <ul class="wizard-steps">
        <li v-for="(item, index) in wizard.section" :key="index" :class="{ active: currentStep === index }"
          @click="changeStep(index)">{{ index }}</li>


      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';
// console.log(wizard.section);
let prop = defineProps(['wizard']);
const numberValidations = ["required", "number"];

const wizard = toRefs(prop).wizard?.value;

const formDataArray = ref([]);

const options = ref({
  section: [
    {}, // Placeholder for other sections if needed
    {
      field: [
        { id: 'option1', title: 'Option 1' },
        { id: 'option2', title: 'Option 2' },
        { id: 'option3', title: 'Option 3' },
        // Add more sections as needed
      ]
    }
  ]
});

const selectedOptions = ref({
  option1: false,
  option2: false,
  option3: false,
  // Add more options as needed
});

console.log(selectedOptions)


const submitForm = () => {
  const selectedData = {};
  for (const [key, value] of Object.entries(selectedOptions.value)) {
    if (value) {
      selectedData[key] = value;
    }
  }
  console.log('Selected Options:', selectedData);
  // Handle the selected data as needed, e.g., send to a server
};


// save forme data element.
const FormData = ref({
  "title": 'asasasa',
  "description": "wefwefwefewf",
  "attachments": [],
  "pricing": {},
  "post_pricing": {},
  "gallery": [],
  "address": {},
  "data_sections": [],
});
// console.log(formDataArray)

const setData = (event, section, id) => {
  var data = event.target.value;
  FormData.value.data_sections[id] = {
    field: section,
    data: [data],
    field_id: id
  };

  console.log(FormData.value.data_sections);
}

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

// formDataArray.value.push(...FormData.value)
// const handleSubmit = async () => {
//   try {
//     // Add a deep copy of formData to the array
//     formDataArray.value.push(JSON.parse(JSON.stringify(FormData.value)));

//     const response = await fetch('https://panel.homeenger.com/api/notices', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(FormData.value),
//     });

//     if (response.ok) {
//       alert('Form submitted successfully!');
//     } else {
//       alert('Failed to submit the form.');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     alert('An error occurred.');
//   }
// };
// console.log(handleSubmit)

// Function to register
const register = () => {
  // Add your registration logic here
  alert("Registered successfully!");
};



const form = ref({

})
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
