<template>
    <div class="container-fluid p-4">
        <NuxtLayout name="header"></NuxtLayout>
        <div class="row">
            <div class="col-sm-12">
                <div class="shopMapAdrres">
                    <div class="col-12  forms">
                        <input type="text" placeholder="عنوان آگهی ">
                    </div>
                    <div class="col-12 mt-3 adsForm">
                        <input type="text" placeholder="توضیحات آگهی ">
                    </div>
                    <div class="form-check mt-5 ms-5">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault">
                            ثبت آگهی با شماره خودم
                        </label>
                    </div>
                    <p class="mt-5 ms-2">عکس ها</p>
                    <p class="ms-2">اگهی های دارای عکس تا 3 برار بیشتر توسط کاربران دیده می شوند</p>
                    <!-- <div class="addPicture">
                        <a href="#" class="picture">افزودن عکس</a>
                    </div> -->
                    <!-- <dropzone/> -->
                    <div @dragover.prevent @drop.prevent="drop" class="form">
                        <div class="dropzone">
                            <span typeof="file">drag or drop file</span>
                            <span>OR</span>
                            <input multiple type="file" id="dropzoneFile">
                        </div>

                        <!-- <div v-if="drop" class="showing">
                            dsjcjdab
                        </div> -->
                    </div>
                    <!-- <span v-if="drop()" class="file-info">File: {{  }}</span> -->
                    <button type="button" class="col-2 next mt-5">
                        <a href="" class="nextPage">ثبت</a>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>

const drag = (e) => {

    console.log(e);
}
const drop = (e) => {
    let formData = new FormData();

    const files = e.dataTransfer.files;
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        formData.append(file);
    }

    console.log(files);

}
</script>