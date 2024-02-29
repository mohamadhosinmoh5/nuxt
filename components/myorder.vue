<template>
    <div class="container">
        <div class="row myOrder">
            <div class="col-12 row tabbar-detailes">
                <div @click="changeOrderMenue('loading')" class="col-4"><a href="#"> درحال انجام</a></div>
                <div @click="changeOrderMenue('sectiontwo')" class="col-4"><a href="#"> دو مرحله ای</a></div>
                <div @click="changeOrderMenue('finish')" class="col-4"><a href="#">انجام شده</a></div>

            </div>
            <div v-if="loading" class="col-sm-12 tab-Detaile">
                loading
            </div>

            <div v-if="sectiontwo" class="col-sm-12 tab-Detaile">
                verify
            </div>

            <div v-if="finish" class="col-sm-12 tab-Detaile">
                setting
            </div>
            <div ref="underline" class="col-2 underline"></div>
        </div>
    </div>
</template>


<script setup>
import { load } from 'ol/Image';

const underline = ref(null);
const loading = ref(true);
const sectiontwo = ref(false);
const finish = ref(false);


const changeOrderMenue = ((name) => {
    loading.value = false;
    sectiontwo.value = false;
    finish.value = false;
    const emit = defineEmits(['clicked'])

    const loadingStyle = (query) => {
        emit('clicked', query)
    }

    switch (name) {
        case 'loading':
            underline.value.style.left = "25%";
            loading.value = true;
            break;
        case 'sectiontwo':
            underline.value.style.left = "-10%";
            sectiontwo.value = true;
            break;
        case 'finish':
            underline.value.style.left = "-40%";
            finish.value = true;
            break;

        default:
            break;
    }
})
//get data and then loader hide
loadingStyle(false);

</script>