<template>
  <div class="container mt-5">
    <div class="row">
      <div v-for="(feature, key) in features" :key="key" class="col-md-2">
        <radioInput
          :label="feature.label"
          :inputId="key"
          :modelValue="feature.value"
          type="checkbox"
        />
      </div>
    </div>
  </div>
  <div class="container mt-5">
    <div class="row">
      <!-- Total Price -->
      <div class="col-md-6">
        <number label="قیمت کل" inputId="totalPrice" v-model="totalPrice" />
      </div>
      <!-- Price per Meter -->
      <div class="col-md-6">
        <number
          label="قیمت هر متر"
          inputId="pricePerMeter"
          v-model="pricePerMeter"
        />
      </div>
    </div>
  </div>
  <div class="container mt-5">
    <div class="row">
      <!-- Owner's Name -->
      <div class="col-md-6">
        <textInput
          :label="'نام و نام خانوادگی:'"
          inputId="ownerName"
          inputType="text"
          v-model="ownerName"
        />
      </div>

      <!-- Contact Number -->
      <div class="col-md-6">
        <telInput
          :label="'شماره تماس مالک:'"
          inputId="contactNumber"
          placeholder=""
          :modelValue="contactNumber"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import number from "./formInput/number.vue";
import textInput from "./formInput/textInput.vue";
import radioInput from "./formInput/radioInput.vue";
import telInput from "./formInput/telInput.vue";

const features = ref({
  elevator: { label: "آسانسور", value: false },
  parking: { label: "پارکینک", value: false },
  warehouse: { label: "انباری", value: false },
  kitchen: { label: "مطبخ", value: false },
  parkingRemote: { label: "ریموت پارکینک", value: false },
});

const totalPrice = ref(null);
const pricePerMeter = ref(null);

const ownerName = ref("");
const contactNumber = ref("");
</script>
