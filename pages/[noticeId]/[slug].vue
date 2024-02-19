
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
                <div class="col-sm-7 col-md-7">
                    <!-- AX -->

                    <div class="row">
                        <div class="col-3">
                            <div class="scrollBar">
                                <div class="smalimage">

                                    <img @click="setBaseImage(image)" v-for="{ image, index } in useNotice.notice.gallery"
                                        :key="index" class="bannerImage"
                                        :src="`${useRuntimeConfig().public.BaseUrl}/${image}`" alt="">


                                </div>
                            </div>
                        </div>
                        <div class="col-9">
                            <div class="col-md">
                                <img ref="mainImage" id="mainimage"
                                    :src="`${useRuntimeConfig().public.BaseUrl}/${useNotice.notice.gallery[0].image}`"
                                    class="mainimages mt-5" alt="">
                                <!-- {{ useNotice.notice.gallery[0].image }} -->
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">

                            <single-section v-if="useNotice.notice.section_data_collection.length >= 1"
                                v-for="section in useNotice.notice.section_data_collection" :section="section" />
                            <div class="row mt-2">
                                <div class="col-3 row Tozihat">
                                    <div class="col-sm col-md">
                                        <img src="assets/img/SinglePage_Image/money.svg" alt="" style="width: 30px;">
                                        <a href="#"> توضیحات</a>
                                    </div>
                                </div>
                                <div class="col-10 box_tozihat">
                                    <a href="#" class="tile">
                                        {{ useNotice.notice.description }}
                                    </a>
                                </div>
                            </div>

                            <div class="col row Tozihat mt-5">
                                <div class="col">
                                    <img src="assets/img/SinglePage_Image/money.svg" alt="" style="width: 30px;">
                                    <a href="#"> کارشناسی قیت</a>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-10  reng_box">
                                    <div class="range ">
                                        <div class="sliderValue">

                                        </div>
                                        <div v-if="useNotice.notice.price_expert_rating != null" class="col-10  field">
                                            <input disabled type="range" min="0" max="100"
                                                value=" {{ useNotice.notice.price_expert_rating }}">
                                            <img src="assets/img/SinglePage_Image/gheymat.svg" alt="">
                                        </div>
                                        <!-- <div v-else>
                                            قیمت : {{ (useNotice.notice.pricing.discount_percent > 0) ?
                                                convertPrice(useNotice.notice?.pricing.price - (useNotice.notice?.pricing.price
                                                    *
                                                    useNotice.notice.pricing.discount_percent / 100)) :
                                                convertPrice(useNotice.notice?.pricing.price) }} تومان
                                        </div> -->
                                    </div>



                                </div>
                            </div>
                            <div class="row">
                                <div class="Tozihat">

                                </div>
                            </div>
                            <div class="row mt-5">
                                <div class="col-md-10 box_warning">
                                    <img src="assets/img/SinglePage_Image/warning.svg" alt="" style="width: 35px;">
                                    <a href="#" class="daftar_text ms-1">ثبت تخلف و مشکل آگهی</a>
                                    <img src="assets/img/SinglePage_Image/row.svg" style="float: left;" alt="">
                                    <a href="#" class="daftar_textt ms-1"> گزارش </a>

                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- end right -->
                </div>
                <div class="col-sm-5">
                    <div class="col row mt-5">
                        <div class="row box-title">
                            <div class="col-12">
                                <a href="#" class="Title">
                                    {{ useNotice.notice.title }}
                                </a>
                            </div>

                            <div class="boxdetailes col-md-12 row">
                                <div v-if="useNotice.notice.address != null" class="col-md-4">
                                    <a href="#" class="subtitle">محله : </a>
                                    <a href="#" class="texts">{{
                                        useNotice.notice.address.address.postal_address }}</a>
                                </div>
                                <div class="col-4">
                                    <a href="#" class="subtitle">
                                        کد آگهی :
                                    </a>
                                    <a href="#" class="texts"> {{ useNotice.notice.id }}</a>
                                </div>

                                <div class="col-2"><img class="detailicons" src="assets/img/SinglePage_Image/save.svg"
                                        alt="">
                                </div>
                                <div class="col-2"><img class="detailicon" src="assets/img/SinglePage_Image/share.svg"
                                        alt="">
                                </div>
                            </div>
                            <div class="lineee"></div>
                            <div v-if="useNotice.notice.section_data_collection.length >= 1"
                                class="boxdetailes col-xs-12 row mt-2">

                                <div class="col-5">

                                    <a href="#" class="subtitle">{{
                                        useNotice.notice.section_data_collection[2].items[0].field.title }}:</a>
                                    <a href="#" class="Price ms-1">{{
                                        useNotice.notice.section_data_collection[2].items[0].data[0] }}</a>

                                </div>
                                <div class="col-5">

                                    <a href="#" class="subtitle">{{
                                        useNotice.notice.section_data_collection[2].items[1].field.title }}:</a>
                                    <a href="#" class="Price ms-1">{{
                                        useNotice.notice.section_data_collection[2].items[1].data[0] }}</a>
                                </div>
                                <div class="col-2">
                                    <button type="button" class="btn btn-success btnmodal">تماس</button>
                                    <div id="myModal" class="modal">

                                        <!-- Modal content -->
                                        <div class="modal-content">
                                            <span class="close">&times;</span>
                                            <p href="#" class="Title">شماره تماس : {{ useNotice.notice.mobile }}</p>
                                        </div>

                                    </div>

                                </div>

                            </div>
                            <div v-if="useNotice?.notice?.category?.properties?.is_product" class="addProduct">
                                <button id="btn1" class="btn btn-info" @click="useCart.addToCart(useNotice?.notice?.id)">
                                    افزودن به سبد خرید</button>
                                <button id="btn1" class="btn btn-danger" @click="useCart.removeCart(useNotice?.notice?.id)">
                                    حذف از سبد خرید</button>

                                <div v-if="useCart.error">
                                    {{ useCart.error.message }}
                                </div>
                                <div v-if="useCart.message">
                                    {{ useCart.message }}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-sm-12 row">
                        <div class="col-12 box_daftar">
                            <img src="assets/img/SinglePage_Image/homeenger.svg" alt="" style="width: 35px;">
                            <a href="#" class="daftar_text ms-1">هومنگر</a>
                            <img src="assets/img/SinglePage_Image/row.svg" style="float: left;" alt="">
                            <a href="#" class="daftar_textt ms-1"> دفتر ها </a>

                        </div>
                        <div class="col-12 map_box">
                            <div v-if="useNotice.notice.address != null" class="col  mappingg">
                                <LMap v-if="useNotice.notice" id="map" ref="mapRef" :zoom="16"
                                    :center="[useNotice.notice.address.lat, useNotice.notice.address.lng]">
                                    <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                                        layer-type="base" name="OpenStreetMap" />

                                    <l-circle-marker :lat-lng="[useNotice.notice.address.lat, useNotice.notice.address.lng]"
                                        :radius="10" color="red" />
                                    <l-marker :lat-lng="[useNotice.notice.address.lat, useNotice.notice.address.lng]">
                                        <l-popup @ready="ready">
                                            <div class="title">
                                                {{ useNotice.notice.title }}
                                            </div>
                                        </l-popup>
                                    </l-marker>

                                </LMap>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col-sm-12 mt-5 ms-4">
                    <div class="row">
                        <div class="Moshabe">
                            <img src="assets/img/SinglePage_Image/dot.svg" alt="">
                            <a href="#" class="Title">اگهی های مشابه</a>
                            <img src="assets/img/SinglePage_Image/row.svg" id="moshabeIcon" alt="">
                            <a href="#" class="subtitle ms-2" id="moshabeIcon">مشاهده همه</a>
                        </div>
                        <!-- add Cards-->
                        <div v-for="notice in allNotices" :key="notice.id" class="col-sm-4 mt-5">
                            <div @mouseenter="showPop(`marker_${notice.id}`)" href="#">
                                <Notice :Notice="notice" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="row" id="scroll">
                <div v-if="pending">
                    fetching...
                </div>

                <div class="col-sm-12">
                    <!-- <single-notice :notice="useNotice?.notice" /> -->

                </div>

                <!-- <div v-if="useNotice?.notice?.category?.properties?.is_product" class="addProduct">
                    <button class="btn btn-info" @click="useCart.addToCart(useNotice?.notice?.id)">add product</button>
                    <button class="btn btn-danger" @click="useCart.removeCart(useNotice?.notice?.id)">remove
                        product</button>

                    <div v-if="useCart.error">
                        {{ useCart.error.message }}
                    </div>
                    <div v-if="useCart.message">
                        {{ useCart.message }}
                    </div>
                </div> -->
            </div>


        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '../store/cart';
import { useNoticeStore } from '../store/notice';
import { useMapStore } from '../store/map';

definePageMeta({
    middleware: 'auth'
})


const route = useRoute()
const params = route.params;
const useNotice = useNoticeStore();
const useCart = useCartStore();
const mainImage = ref(null);
const cart = ref(null);

watch(useCart, async (newdata) => {
    console.log(cart.value?.items);
    if (cart.value?.items.length >= 1)
        cart.value.items = newdata.cart.items;
    // pending.value = false;
})

setTimeout(async () => {
    await useNotice.getNotice(params.noticeId).then(() => {
        // pending.value = false;
    });

    cart.value = await useCart.getCart();

});


const setBaseImage = (urlImage) => {
    mainImage.value.src = `${useRuntimeConfig().public.BaseUrl}/${urlImage}`;
}



</script>