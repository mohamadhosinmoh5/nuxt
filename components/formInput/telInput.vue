<template>
  <div class="form-group">
    <label :for="inputId">{{ label }}</label>
    <input
      type="tel"
      :class="['form-control', { 'is-invalid': error }]"
      :id="inputId"
      :placeholder="placeholder"
      :v-model="modelValue"
    />
    <div v-if="error" class="invalid-feedback">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  label: String,
  inputId: String,
  placeholder: String,
  modelValue: String,
  error: String,
});
</script>
