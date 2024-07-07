<template>
  
  <div class="container-fluid p-4">

    <div class="card">
      <div class="card-header">
        افزودن آگهی
      </div>
      <div class="card-body">

    <div v-if="currentStep == 0">
      <div class="alert alert-success text-center">
        مشخصات ملک خود را وارد کنید
      </div>
      <show_step_data :section="wizard.section" />
    </div>

    <div v-if="currentStep == 1">
      <div class="alert alert-success text-center">
        وضعیت آپشن های ملک رو مشخص کنید :)
      </div>
      <div v-for="Section in wizard.section[currentStep].field" :key="Section.id" class="adsFilter justify-content-center">
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
      <div class="alert alert-success">
        <h6 class="text-center">لطفا در این قسمت قیمت ملک خود را به صورت قیمت کل و قیمت هر متر جداگانه وارد نمایید </h6>
      </div>
      <div v-for="Price in wizard.section[currentStep].field" :key="Price.id" class="price">
        <div class="form-group adsform mt-2">
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
      <div class="alert alert-success">
        <h6 class="text-center">در این قسمت می توانید اطلاعات مالک را وارد نمایید , این اطلاعات به کاربران دیگر نمایش داده
          نمی شود</h6>
      </div>
      <div v-for="Price in wizard.section[currentStep].field" :key="Price.id" class="price">
        <div class="form-group adsform mt-3">
          <label for="exampleInputEmail1">{{ Price.title }}</label>
          <input type="text" class="form-control" @change="setData($event, Price, Price.id)" id="exampleInputEmail1"
            aria-describedby="emailHelp" placeholder="">
          <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
        </div>
        <span v-if="error" class="error-message">{{ error }}</span>

      </div>

      <!-- <a href="/ads-map">next</a> -->
    </div>

    <div v-if="currentStep == 4">
      <div class="alert alert-success">
        <h6 class="text-center"> آدرس خونه رو انتخاب کنید</h6>
      </div>

      <p class="text-center">انتخاب محدوده آگهی روی نقشه</p>
      <p class="text-center">موقعیت دقیق مکان در لیست آگهی ها نمایش داده نخواهد شد</p>

      <div class="row">
          <div class="col-sm-6 mt-3">
              <div class="map" >
                  <LMap  :zoom="16" :center="[36.841658, 54.432422]" @click="fetchAddressData">
                    <LTileLayer
                    url="http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
                    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                    layer-type="base"
                    name="OpenStreetMap"
                  />
                      <l-circle-marker v-if="markerPosition" :lat-lng="markerPosition" :radius="10" color="red" />
                      <l-marker v-if="markerPosition" :lat-lng="markerPosition">
                          <l-popup>
                              {{ markerPosition }}
                          </l-popup>
                      </l-marker>
                  </LMap>
              </div>
          </div>
          <div class="col-sm-6 ">
              <div class="col-sm-12  text-start">
                <textarea style="width:100%;height:min-height:250px;" name="" id="" > {{ MapAddress?.address }}</textarea>
                 
              </div>
              <!-- Add other address fields as needed -->
              <!-- <p>{{ addressData.address }}</p>
                              <p>{{ addressData.address_compact }}</p>
                              <p>{{ addressData.city }}</p>
                              <p>{{ addressData.country }}</p>
                              <p>{{ addressData.county }}</p>
                              <p>{{ addressData.geom.coordinates.join(', ') }}</p> -->

          </div>
      </div>

        <span v-if="error" class="error-message">{{ error }}</span>

    </div>

    <!-- Buttons -->
    <div class="buttons">
      <button v-if="currentStep > 0" @click="prevStep">قبلی</button>
      <button v-if="currentStep !== 4" @click="nextStep">بعدی</button>
      <button v-if="currentStep === 4" @click="handleSubmit">
        <a style="text-decoration: none; color: white;" href="/ads-map">ثبت آگهی</a>
      </button>
    </div>

      <!-- پایان ثبت آگهی  -->
      </div>
      <div class="card-footer">
        <div class="wizard">
          <ul class="wizard-steps">
            <li v-for="(item, index) in wizard.section" :key="index" :class="{ active: currentStep === index }"
              @click="changeStep(index)">{{ index+1 }}</li>
            <li @click="changeStep(4)" :class="{ active: currentStep === 4 }">5</li>
          </ul>
        </div>
      </div>
    </div>


  </div>
  

</template>
<style scoped>
.map {
    width: 100%;
    height: 300px;
    position: relative;
}

.addresBox {
    width: 200px;
    height: 100px;
    border: 1px solid black;
    position: relative;
}
</style>
<script setup>
import { ref } from "vue";
// console.log(wizard.section);
let prop = defineProps(['wizard']);
const numberValidations = ["required", "number"];

const wizard = toRefs(prop).wizard?.value;
const sectionCount = ref(wizard.section.length);
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

const currentStep = ref(0);
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


const markerPosition = ref(null);
const addressText = ref('');
const MapAddress = ref(null);

const fetchAddressData = async (event) => {
    const { lat, lng } = event.latlng;
    markerPosition.value = [lat, lng];

    const { data, pending, error: errors, refresh } = await useFetch(`https://map.ir/reverse/no?lon=${lng}&lat=${lat}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjIzMDgxNzVmM2IwYjFmY2YyMjEzOGM0MDJlNzNkYWY4N2YyN2M0YWRmYWZiZTJlMWM1MjExNmRlN2M4ZjczNmY5NDQ2NjRiOTE0ZGY5ZDQyIn0.eyJhdWQiOiIyNzU0NCIsImp0aSI6IjIzMDgxNzVmM2IwYjFmY2YyMjEzOGM0MDJlNzNkYWY4N2YyN2M0YWRmYWZiZTJlMWM1MjExNmRlN2M4ZjczNmY5NDQ2NjRiOTE0ZGY5ZDQyIiwiaWF0IjoxNzE2ODg1MDE0LCJuYmYiOjE3MTY4ODUwMTQsImV4cCI6MTcxOTQ3NzAxNCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.cbwf2DFueiMUUgHR2sXGBG0z66TSOcrSgyfb2L-pV52SzNL-92Yy3jiDvJuRk8rV1gBH_e4GsXEinwHyQeFqCfEPc8nMdVIgPdtRzaYK3qereMRBJG6mirX8I-4b8sJ7m81_GmgHhULfjd_FGXnTjOhNgN9AFviOP0d1PJSBYQ26xtRSMtmThc-memZZSsKNf7_kudwaTxg0W_YjZmNDimdJ8ke_PcAAQEoyhIo-RECP2Db_RyWJOfGzmA16DaOaZonCG3Hs5dpQvbKSZ4xi6OZkX0dtMYpEeCd16fy9WnGClS0uRpB1z7U2mOFDkFSeUUKtn9wnb8qqo00Ntr7tCw',
        }
    });

    if (data) {
        console.log(data.value)
        MapAddress.value = data.value;

    } else {
        // alert('Failed to submit the form.');
    }

};

onMounted(() => {
    fetchAddressData();
});

// const markerPosition = ref(null);
const onMapClick = (event) => {
    markerPosition.value = event.latlng;
};

const submit = () => {
    // Your submit logic here
    alert(`Submitting location: ${addressText.value}`);
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
