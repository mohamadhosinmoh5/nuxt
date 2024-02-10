
<template>
    <div dir="rtl" class="container-fluild p-4">
        <div v-if="cart">
        </div>
        <title>
            {{ params.slug }}
        </title>
        <!-- addin html code -->
        <div v-if="!useNotice.notice" class="spinner-border" role="status"></div>
        <div v-if="useNotice.notice" class="row">


            <!-- {{useNotice.notice}} -->
            <div class="row">
                <div class="col-md-6">
                    <div class="row">
                        <div class="smalimage  col-md">
                            <img  class="bannerImage" src="assets/img/SinglePage_Image/homepicture.jpg" alt="">
                            <img src="assets/img/SinglePage_Image/homepicture.jpg" alt="">
                            <img src="assets/img/SinglePage_Image/homepicture.jpg" alt="">
                            <img src="assets/img/SinglePage_Image/homepicture.jpg" alt="">
                            <img src="assets/img/SinglePage_Image/homepicture.jpg" alt="">

                        </div>
                        <div class="col-md">
                            <img id="mainimage" class="image" src="assets/img/SinglePage_Image/homepicture.jpg" alt="">
                        </div>

                    </div>
                    <div class="map" id="Map">
                        <div class="col-md">
                            <img id="Map" src="assets/img/SinglePage_Image/map.svg" alt="">
                        </div>
                    </div>
                    <div class="Tozihat row mt-2">
                        <div class="col-sm">
                            <img src="assets/img/SinglePage_Image/tozihat.svg" alt="" style="width: 30px;">
                            <a href="#"> توضیحات</a>
                        </div>
                    </div>
                    <!--This card for tozihat-->
                    <div class="card-sm" id="card1"></div>
                    <!--Karshenasi Gheymat-->
                    <div class="Tozihat row mt-2">
                        <div class="col-sm">
                            <img src="assets/img/SinglePage_Image/money.svg" alt="" style="width: 30px;">
                            <a href="#"> کارشناسی قیت</a>
                        </div>
                    </div>
                    <div class="card-sm" id="card1">
                        <div class="range">
                            <div class="sliderValue">

                            </div>
                            <div class="field">
                                <input type="range" min="0" max="100" value={{price_expert_rating}}>
                                <img src="assets/img/SinglePage_Image/gheymat.svg" alt="">

                            </div>
                        </div>

                    </div>
                    <!-- End Karshenasi Gheymat-->
                    <div class="card-sm" id="card1">
                        <!-- {{ useNotice.notice.address_compact }} -->
                        <a href="#" id="text" class="Title mt-1"> {{ useNotice.notice.title }} </a>
                        <div class="row ms-1 mt-2">
                            <div class="col">
                                <a href="#" class="subtitle">محله : </a>
                                <a href="#" class="mediumtitle"></a>

                            </div>
                            <div class="col">
                                <a href="#" class="subtitle"> کدآگهی : </a>
                                <a href="#" class="mediumtitle">{{ useNotice.notice.id }}</a>
                            </div>
                            <div class="iconss col 6-md">
                                <img src="assets/img/SinglePage_Image/save.svg" alt="">
                                <img src="assets/img/SinglePage_Image/share.svg" alt="">
                            </div>
                        </div>
                        <div class="lineee"></div>
                        <div class="row ms-1">
                            <div class="col">
                                <a href="#" class="subtitle">قیت هر متر : </a>
                                <a href="#" class="mediumtitle">2,000,000</a>

                            </div>
                            <div class="col">
                                <a href="#" class="subtitle"> قیت کل : </a>
                                <a href="#" class="mediumtitle">35,000,000,000</a>
                            </div>
                            <div class="col ">
                                <button type="button" class="btn btn-success">تماس</button>

                            </div>
                        </div>
                    </div>
                    <!--moshkhasat gheymat-->
                    <single-section v-for="section in useNotice.notice.section_data_collection" :section="section" />
                    <!--Emkanat-->




                </div>
                <div class="col-md-6">
                    <div class="Side">
                        <div class="Detailes">
                            <div class="Detailess"></div>
                        </div>
                        <!-- <div class="Daftar col-sm" id="">
                            <div class="row">
                                <div class="daftar_detailes col-sm">
                                    <img src="assets/img/SinglePage_Image/homeenger.svg" alt="" style="width: 35px;">
                                    <a href="#" class="daftar_text ms-1">هومنگر</a>
                                </div>
                                <div class="arrow col-sm">
                                    <img src="assets/img/SinglePage_Image/row.svg" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="warning col-sm">
                            <div class="row">
                                <div class="daftar_detailes col-sm-6">
                                    <img src="assets/img/SinglePage_Image/warning.svg" alt="" style="width: 35px;">
                                    <a href="#" class="daftar_text ms-1">ثبت تخلف و مشکل آگهی</a>
                                </div>
                                <div class=" col-sm mt-3 ms-5">
                                    <img src="assets/img/SinglePage_Image/row.svg" style="width: 100px;" alt="">
                                </div>
                            </div>
                        </div> -->

                    </div>








                </div>



            </div>


            <!-- <div class="row" id="scroll" >
        <div v-if="pending">
            fetching...
        </div>
       
         <div class="col-sm-12">
            <single-notice  :notice="useNotice?.notice" />
        </div> -->
            <!--- <div v-if="useNotice?.notice?.category?.properties?.is_product" class="addProduct">
            <button class="btn btn-info" @click="useCart.addToCart(useNotice?.notice?.id)">add product</button>
            <button class="btn btn-danger" @click="useCart.removeCart(useNotice?.notice?.id)">remove product</button>
            
            <div v-if="useCart.error">
                {{ useCart.error.message }}
            </div>
            <div v-if="useCart.message">
                {{ useCart.message }}
            </div>
        </div>
    </div> -->
     dasdasdadass

        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '../store/cart';
import { useNoticeStore } from '../store/notice';

definePageMeta({
    middleware: 'auth'
})

const route = useRoute()
const params = route.params;
const useNotice = useNoticeStore();
const useCart = useCartStore();
// const pending = ref(true);
const cart = ref(null);

watch(useCart, async (newdata) => {
    if (cart.value.items != null)
        cart.value.items = newdata.cart.items;
    // pending.value = false;
})

setTimeout(async () => {
    await useNotice.getNotice(params.noticeId).then(() => {
        // pending.value = false;
    });

    cart.value = await useCart.getCart();

});



</script>