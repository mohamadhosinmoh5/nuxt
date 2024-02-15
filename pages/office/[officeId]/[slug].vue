
<template>
    <div dir="rtl" class="container-fluild p-4">
        <NuxtLayout name="header"></NuxtLayout>
        <title>
            {{ params.slug }}
        </title>
        
        <div class="row mt-4">
            <div class="col-sm-3 ">
                <div class="box-office-img">
                    <div class="descktop-img-box">
                        <div v-if="office?.image_banner" class="img" :style="`background-image: url(${useRuntimeConfig().public.BaseUrl}/${office.image_icon});`"></div>
                        <img v-else width="100px" height="100px" src="assets/img/homeLogo.png" alt="">
                    </div>
                </div>
            </div>
            <div class="col-sm-9 border-color">
                <div class="row">
                    <div class="col-12">
                        <h4>{{office?.title}}</h4>
                    </div>
                    <div class="col-12">
                        <p class="desc-single-office">
                            {{ office?.description }}
                        </p>
                    </div>
                    <div class="col-12 mt-2 font-samall">
                        <img src="assets/img/location.svg" alt="">
                        <span>{{ office?.address.address_compact }}</span>
                    </div>
                    <div class="col-12 mt-2">
                        <img src="assets/img/vector.svg" alt="">
                        <span>{{ office?.user.mobile }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div v-for="notice in allNotices" :key="notice.id"  class="col-sm-4 mt-5">
                    <div @mouseenter="showPop(`marker_${notice.id}`)" href="#">
                        <Notice :Notice="notice" />
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
import { useCartStore } from '../store/cart';
import { useOfficeStore } from '../store/office';

definePageMeta({
    middleware: 'auth'
})


const route = useRoute()
const params = route.params;
const useCart = useCartStore();
const useOffice = useOfficeStore();
const mainImage = ref(null);
const cart = ref(null);
const office = ref(null);

watch(useCart, async (newdata) => {
    if (cart.value.items != null)
        cart.value.items = newdata.cart.items;
    // pending.value = false;
})

setTimeout(async () => {

    useOffice.getOffice(params.officeId).then((r)=>{
        console.log(r);
        office.value = r;
    })

    cart.value = await useCart.getCart();

    });


const setBaseImage = (urlImage) => {
    mainImage.value.src = `${useRuntimeConfig().public.BaseUrl}/${urlImage}`;
}



</script>