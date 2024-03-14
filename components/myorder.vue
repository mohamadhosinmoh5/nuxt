<template>
    <div class="container">
        <div class="row myOrder">
            <div class="col-12 row ording">
                <div @click="changeOrderMenue('loading')" class="col-4"><a> درحال انجام</a></div>
                <div class="col-4" @click="changeOrderMenue('sectiontwo')"><a> دو مرحله ای</a></div>
                <div @click="changeOrderMenue('finish')" class="col-4"><a>انجام شده</a></div>

            </div>
            <!-- <div ref="underline" class="col-2 underline"></div> -->

            <div v-if="loading" class="col-sm-12 tab-Detaile">
                <div v-if="PendingCart.items.length < 1"><p class="alert alert-danger">سفارشی وجود ندارد</p></div>
                <div v-else>{{ PendingCart.items }}</div>
            </div>

            <div v-if="sectiontwo" class="col-sm-12 tab-Detaile">
                <div v-if="postPriceRequest.items.length < 1"><p class="alert alert-danger">سفارشی وجود ندارد</p></div>
                <div v-else>
                {{ postPriceRequest.items }}
                </div>
            </div>

            <div v-if="finish" class="col-sm-12 tab-Detaile">
                <div v-if="DoneFailed.items.length < 1"><p class="alert alert-danger">سفارشی وجود ندارد</p></div>
                <div v-else>
                    {{ DoneFailed.items }}
                </div>
                
            </div>
        </div>
    </div>
</template>


<script setup>
import { useAuthStore } from '../store/auth';
import { load } from 'ol/Image';

const underline = ref(null);
const loading = ref(true);
const sectiontwo = ref(false);
const finish = ref(false);
const PendingCart = ref(null);
const postPriceRequest = ref(null);
const DoneFailed = ref(null);
const useUser = useAuthStore();

const changeOrderMenue = ((name) => {
    loading.value = false;
    sectiontwo.value = false;
    finish.value = false;

    switch (name) {
        case 'loading':
            // underline.value.style.left = "0%";
            loading.value = true;
            break;
        case 'sectiontwo':
            // underline.value.style.right = "30%";
            sectiontwo.value = true;
            break;
        case 'finish':
            // underline.value.style.left = "-40%";
            finish.value = true;
            break;

        default:
            break;
    }
})
//get data and then loader hide
// loadingStyle(false);

const emit = defineEmits(['clicked'])

const loadingStyle = (query) => {
    emit('clicked', query)
}

useUser.getPendingCart().then((r) => {
    PendingCart.value = r;
    loadingStyle(false);
})

useUser.getpostPriceRequest().then((r) => {
    postPriceRequest.value = r;
    // loadingStyle(false);
})

useUser.getDoneFailed().then((r) => {
    DoneFailed.value = r;
    // loadingStyle(false);
})



</script>