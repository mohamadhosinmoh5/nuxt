<template>
  <div class="form-group">
    <label :for="inputId">{{ label }}</label>
    <input
      :type="inputType"
      class="form-control"
      :id="inputId"
      :name="inputName"
      @input="handleInput"
    />
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import validate from "~/utils/validation";

const {
  label,
  inputId,
  inputType = "text",
  inputName = "",
  validations = [],
} = defineProps(["label", "inputId", "inputType", "inputName", "validations"]);

const value = ref("");
const error = ref("");

const handleInput = (event) => {
  value.value = event.target.value;
  const result = validate(value.value, validations);
  error.value = Array.isArray(result) ? result.join("\n") : "";
};
</script>
