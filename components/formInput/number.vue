<template>
  <div class="form-group">
    <label :for="inputId">{{ label }}:</label>
    <input
      :type="inputType"
      class="form-control"
      :id="inputId"
      :name="inputName"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const {
  label,
  inputId,
  inputType = "number",
  inputName = "",
} = defineProps(["label", "inputId", "inputType", "inputName"]);
</script>
