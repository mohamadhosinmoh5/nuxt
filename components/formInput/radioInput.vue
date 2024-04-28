<template>
  <div class="form-group">
    <div class="form-check">
      <input
        :class="['form-check-input', inputClass]"
        :type="type"
        :id="inputId"
        :v-model="modelValue"
      />
      <label :class="['form-check-label', labelClass]" :for="inputId">{{
        label
      }}</label>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const { label, inputId, modelValue, type, inputClass, labelClass } =
  defineProps([
    "label",
    "inputId",
    "modelValue",
    "type",
    "inputClass",
    "labelClass",
  ]);
</script>
