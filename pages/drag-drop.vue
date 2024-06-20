<template>
    <div class="container-fluid p-4">
        <NuxtLayout name="header"></NuxtLayout>
        <div class="row">
            <div class="col-sm-12">
                <div class="shopMapAdrres">
                    <div class="col-12 forms">
                        <input type="text" placeholder="عنوان آگهی" />
                    </div>
                    <div class="col-12 mt-3 adsForm">
                        <input type="text" placeholder="توضیحات آگهی" />
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-check mt-5 ms-5">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    ثبت آگهی با شماره خودم
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <p class="mt-5 ms-2">عکس ها</p>
                            <p class="ms-2">اگهی های دارای عکس تا 3 برار بیشتر توسط کاربران دیده می شوند</p>
                            <div @dragover.prevent @drop="drop" class="form">
                                <div class="dropzone">
                                    <span>drag or drop file</span>
                                    <span>OR</span>
                                    <input multiple type="file" id="dropzoneFile" @change="handleFileUpload" />
                                </div>
                                <img v-if="imageUrl" :src="imageUrl" alt="Selected Image" class="mt-3"
                                    style="max-width: 30%; height: auto;">
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="col-2 next mt-5" @click="submitForm">
                    ثبت
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../store/auth';


definePageMeta({
    middleware: 'auth'
})

const auth = useAuthStore();
const filesData = ref([]);
const imageUrl = ref(null);

const drop = async (e) => {
    const files = e.dataTransfer.files;
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        filesData.value.push(file);
        imageUrl.value = URL.createObjectURL(file);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('parent', 'notice-gallery');

        try {
            const response = await axios.post('https://panel.homeenger.com/api/uploads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            const responseData = response.data;
            // Assuming response contains the image URL in `src` and `prefix`
            if (responseData.src && responseData.prefix) {
                imageUrl.value = `${responseData.prefix}${responseData.src}`;
                console.log(imageUrl)
            }

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
};

const handleFileUpload = async (e) => {
    const files = e.target.files;
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        filesData.value.push(file);
        imageUrl.value = URL.createObjectURL(file);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('parent', 'notice-gallery');

        try {
            const response = await axios.post('https://panel.homeenger.com/api/uploads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${auth.token}`

                }
            });

            const responseData = response.data;
            // Assuming response contains the image URL in `src` and `prefix`
            if (responseData.src && responseData.prefix) {
                imageUrl.value = `${responseData.prefix}${responseData.src}`;
            }

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
};

const submitForm = async () => {
    const formData = new FormData();
    formData.append('parent', 'notice-gallery');
    filesData.value.forEach((file, index) => {
        formData.append(`file${index + 1}`, file);
    });

    try {
        const response = await axios.post('https://panel.homeenger.com/api/notices', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${auth.token}`
            }
        });

        console.log('Files uploaded successfully:', response.data);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};
</script>