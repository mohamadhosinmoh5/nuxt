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
          <div class="form">
            <div
              class="dropzone"
              @dragover.prevent
              @drop="sendFilesToBackend($event)"
            >
              <span typeof="file">+</span>
              <input
                multiple
                type="file"
                id="dropzoneFile"
                @change="sendFilesToBackend($event)"
              />
            </div>
            <div v-if="uploadedFiles.length > 0">
              <ul>
                <li v-for="(file, index) in uploadedFiles" :key="index">
                  {{ file.name }}
                </li>
              </ul>
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
import { useAuthStore } from "~/store/auth";

definePageMeta({
  middleware: "auth",
});

const title = ref("");
const description = ref("");
const showTelInput = ref(true);
const Number = ref("");
const uploadedFiles = ref([]);

const MAX_FILES = 10;

const sendFilesToBackend = (event) => {
  uploadedFiles.value = []; // reset the array
  const files = event.target.files || event.dataTransfer.files;

  for (let i = 0; i < files.length; i++) {
    if (uploadedFiles.value.length < MAX_FILES) {
      uploadedFiles.value.push(files[i]);
    } else {
      alert("حداکثر 10 فایل میتوانید آپلود کنید.");
      break;
    }
  }

  const formData = new FormData();
  uploadedFiles.value.forEach((file) => {
    formData.append("files", file);
  });
  const auth = useAuthStore();
  const backendEndpoint = "https://panel.homeenger.com/api/uploadsTest";

  useFetch(backendEndpoint, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: "Bearer " + auth.token,
    },
  })
    .then((response) => {
      console.log("Files uploaded successfully:", response);
    })
    .catch((error) => {
      console.error("Error uploading files:", error);
    });
};
</script>

<style>
.dropzone {
  position: relative;
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}

.dropzone input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
