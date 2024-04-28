<template>
  <div class="form-group">
    <label :for="selectId">{{ label }}</label>
    <select class="form-control" :id="selectId">
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const { label, selectId, options } = defineProps([
  "label",
  "selectId",
  "options",
]);
</script>
