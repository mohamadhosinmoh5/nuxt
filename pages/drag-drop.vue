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
                    <div class="form-check mt-5 ms-5">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                            ثبت آگهی با شماره خودم
                        </label>
                    </div>
                    <p class="mt-5 ms-2">عکس ها</p>
                    <p class="ms-2">اگهی های دارای عکس تا 3 برار بیشتر توسط کاربران دیده می شوند</p>
                    <div @dragover.prevent @drop="drop" class="form">
                        <div class="dropzone">
                            <span>drag or drop file</span>
                            <span>OR</span>
                            <input multiple type="file" id="dropzoneFile" @change="handleFileUpload" />
                        </div>
                        <img v-if="imageSrc" :src="imageSrc" alt="Selected Image" class="mt-3"
                            style="max-width: 100%; height: auto;">
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
const filesData = ref([]);

const imageSrc = ref(null);
const dataSending = ref({
    'file': '',
    'notice-gallery': '',

})

// Handle file drop
const drop = (e) => {
    const files = e.dataTransfer.files;
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        filesData.value.push(file);
        imageSrc.value = URL.createObjectURL(file);

        axios.post('https://panel.homeenger.com/api/uploads', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log(response.data);
                // Handle the response data as needed
            })
            .catch(error => {
                console.error(error);
            });
    }
    console.log(files)
};

// Handle file upload from input
const handleFileUpload = async (e) => {
    const files = e.target.files;
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        filesData.value.push(file);
        imageSrc.value = URL.createObjectURL(file);
        const { data, pending, error: errors, refresh } = await useFetch('https://panel.homeenger.com/api/uploads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }


        });
    }
    console.log(files)
};

// Submit form
const submitForm = async () => {
    const formData = new FormData();
    formData.append('parent', 'notice-gallery');
    filesData.value.forEach((file, index) => {
        formData.append(`file${index + 1}`, file);
    });
    console.log(formData)
}

const { data, pending, error: errors, refresh } = await useFetch('https://panel.homeenger.com/api/uploads', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',

    }

});



</script>