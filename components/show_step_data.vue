<template>
  <div class="container mt-5">
    <div class="row">
      <!-- Square Footage -->
      <div v-for="(item, index) in section" :key="index" class="col-md-6">
        <div v-if="item." class="row">

        </div>
        <number
          label="متراژ"
          inputId="squareFootage"
          v-model="squareFootage"
          :validations="squareFootageValidations"
        />
      </div>
      <!-- Building Life -->
      <div class="col-md-6">
        <SelectInput
          label="عمر ساختمان"
          selectId="buildingLife"
          :options="buildingLifeOptions"
          v-model="buildingLife"
        />
      </div>
    </div>

    <div class="row mt-3">
      <!-- Number of Floors -->
      <div class="col-md-6">
        <SelectInput
          label="تعداد طبقات"
          selectId="numberOfFloors"
          :options="numberOfFloorsOptions"
          v-model="numberOfFloors"
        />
      </div>
      <!-- Floor Location -->
      <div class="col-md-6">
        <SelectInput
          label="موقعیت طبقه"
          selectId="floorLocation"
          :options="floorLocationOptions"
          v-model="floorLocation"
        />
      </div>
    </div>

    <div class="row mt-3">
      <!-- Number of Building Units -->
      <div class="col-md-6">
        <number
          label="تعداد واحدهای ساختمان"
          inputId="buildingUnits"
          v-model="buildingUnits"
          :validations="numValidations"
        />
      </div>
      <!-- Number of Rooms -->
      <div class="col-md-6">
        <SelectInput
          label="تعداد اتاق"
          selectId="numberOfRooms"
          :options="numberOfRoomsOptions"
          v-model="numberOfRooms"
        />
      </div>
    </div>

    <div class="row mt-3">
      <!-- Year of Construction -->
      <div class="col-md-6">
        <number
          label="سال ساخت"
          inputId="yearOfConstruction"
          v-model="yearOfConstruction"
          :validations="numberValidations"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import number from "./formInput/number.vue";
import SelectInput from "./formInput/select.vue";
let prop = defineProps(['section']);
const section = toRefs(prop).section?.value;
console.log(section);
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
</script>
