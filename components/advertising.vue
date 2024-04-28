<template>
  <div class="container-fluid p-4">
    <div class="row">
      <div class="col-md-6">
        <textInput
          :label="'عنوان آگهی:'"
          inputId="title"
          inputType="text"
          v-model="title"
        />
      </div>
      <div class="col-md-6">
        <textInput
          :label="'توضیحات آگهی:'"
          inputId="description"
          inputType="text"
          v-model="description"
        />
      </div>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-6">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              v-model="showTelInput"
            />
            <label class="form-check-label" for="flexCheckDefault">
              ثبت آگهی با شماره خودم
            </label>
          </div>
          <div class="col-md-6" v-if="!showTelInput">
            <telInput
              :label="'شماره تماس:'"
              inputId="Number"
              placeholder=""
              v-model="Number"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="shopMapAdrres">
          <p class="mt-5 ms-2">عکس ها</p>
          <p class="ms-2">
            اگهی های دارای عکس تا 3 برار بیشتر توسط کاربران دیده می شوند
          </p>
          <div @dragover.prevent @drop.prevent="drop" class="form">
            <div class="dropzone">
              <span typeof="file">کشیدن و رها کردن فایل</span>
              <span>OR</span>
              <input multiple type="file" id="dropzoneFile" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import textInput from "./formInput/textInput.vue";
import telInput from "./formInput/telInput.vue";

const title = ref("");
const description = ref("");
const showTelInput = ref(true);
const Number = ref("");

const drag = (e) => {
  console.log(e);
};
const drop = (e) => {
  let formData = new FormData();

  const files = e.dataTransfer.files;
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    console.log(file);
    // formData.append(file);
  }
};
</script>
