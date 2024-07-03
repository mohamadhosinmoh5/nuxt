<template>
  <div class="container mt-5">
    <div class="row">
      <!-- Square Footage -->
<<<<<<< Updated upstream
      <div class="col-md-6">
        <div  class="row">

        </div>
        <number
          label="متراژ"
          inputId="squareFootage"
          v-model="squareFootage"
          @change="setData($event,section)"
          :validations="squareFootageValidations"
        />
=======
      <div v-if="section?.active == 1" v-for="(item, index) in section" :key="index" class="row">
      <!-- {{ item }} -->
        <div v-for="(field, index2) in item" :key="index2" class="col-sm-6">
        
          <div v-if="field?.active == 1 && field.category =='single' && field?.type =='numeric'" class="row">
                <formInputNumber
                :label="field.title"
                :inputId="field.section_id"
                v-model="squareFootage"
                :validations="field.numeric"
              />
          </div>

           <div v-if="field?.active == 1 && field?.category =='select' " class="row">
              <formInputSelect
                :label="field.title"
                :selectId="field.section_id"
                :options="field?.data"
                v-model="field?.data"
              />
            </div> 

        </div>

>>>>>>> Stashed changes
      </div>
    </div>
      <!-- Building Life -->
  </div>
</template>

<script setup>
import { ref } from "vue";

let prop = defineProps(['section']);
const section = toRefs(prop).section?.value;

const squareFootage = ref(null);
const buildingUnits = ref(null);
const yearOfConstruction = ref(null);
const buildingLife = ref("0");
const numberOfFloors = ref("1");
const floorLocation = ref("Ground");
const numberOfRooms = ref("1");

const numValidations = ["required", "number"];
const numberValidations = ["required", "number"];
const squareFootageValidations = ["required", "number"];

// Define options for the SelectInput components
const buildingLifeOptions = [
  { label: "نوساز", value: "0" },
  { label: "کمتر از 5 سال", value: "5" },
  { label: "بین 5 تا 10 سال", value: "10" },
  { label: "بیشتر از 10 سال", value: "20" },
];

const numberOfFloorsOptions = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "بیشتر از 10", value: "11" },
];

const floorLocationOptions = [
  { label: "همکف", value: "Ground" },
  { label: "اول", value: "First" },
  { label: "دوم", value: "Second" },
  { label: "سوم", value: "Third" },
  { label: "چهارم", value: "Fourth" },
  { label: "پنجم", value: "Fifth" },
  { label: "ششم", value: "Sixth" },
  { label: "هفتم", value: "Seventh" },
  { label: "هشتم", value: "Eighth" },
  { label: "نهم", value: "Ninth" },
  { label: "دهم", value: "Tenth" },
  { label: "بیشتر از دهم", value: "Top" },
];

const numberOfRoomsOptions = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "بیشتر از 4", value: "5" },
];

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

const setData = (event,section,id) => {
  var data = event.target.value;
  FormData.value.data_sections[id] = {
    field : section,
    data:[data],
    field_id:id
  } ;
  
  console.log(FormData.value.data_sections);
}
</script>
