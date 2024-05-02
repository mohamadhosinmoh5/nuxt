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
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import validate from "~/utils/validation";

const {
  label,
  inputId,
  inputType = "text",
  inputName = "",
  validations = [],
} = defineProps(["label", "inputId", "inputType", "inputName", "validations"]);

const handleInput = (event) => {
  const value = event.target.value;
  const result = validate(value, validations);
  console.log(result);
  if (result === true) {
    console.log("Valid input");
  } else {
    console.log(result.join("\n"));
  }
};
</script>
