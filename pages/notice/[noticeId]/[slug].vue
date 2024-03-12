<template>
    <div dir="rtl" class="container-fluild p-4">
        <NuxtLayout name="header"></NuxtLayout>
        <title>
            {{ params.slug }}
        </title>
        <!-- addin html code -->

        <div v-if="loadingStyle" class="spinner-border text-secondary" role="status"></div>

        <div v-if="useNotice.error" class="alert alert-danger text-center mt-4">
            {{ useNotice.error.message }}
        </div>
        <div v-if="notice" class="row">
            <div class="row">
                <div class="col-sm-7 col-md-7">
                    <div class="row myimages">
                        <div class="col-3">
                            <div class="scrollBar">
                                <div class="smalimage">
                                    <img @click="setBaseImage(image)" v-for="{ image, index } in notice.gallery"
                                        :key="index" class="bannerImage"
                                        :src="`${useRuntimeConfig().public.BaseUrl}/${image}`" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="col-9">
                            <div class="col-md">
                                <img ref="mainImage" id="mainimage"
                                    :style="`background-image: url(${useRuntimeConfig().public.BaseUrl}/${notice.gallery[0].image});`"
                                    class="mainimages mt-5" alt="">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">

                            <single-section v-if="notice.section_data_collection.length >= 1"
                                v-for="section in notice.section_data_collection" :section="section" />
                            <div class="col-sm-12 mt-3">
                                <div class="row Tozihat">
                                    <div class="col-sm col-md">
                                        <img src="assets/img/SinglePage_Image/money.svg" alt="" style="width: 30px;">
                                        <a href="#"> توضیحات</a>
                                    </div>
                                </div>
                                <div class="col-12  mt-3 box_tozihat">
                                    <a href="#" class="wallettxts-describtion">
                                        {{ notice.description }}
                                    </a>
                                </div>
                            </div>

                            <div v-if="useNotice?.notice?.price_expert_rating != null || notice?.pricing != null"
                                class=" col row Tozihat mt-3">
                                <div class="col">
                                    <img src="assets/img/SinglePage_Image/money.svg" alt="" style="width: 30px;">
                                    <a href="#"> کارشناسی قیت</a>
                                </div>
                            </div>
                            <div v-if="useNotice?.notice?.price_expert_rating != null || notice?.pricing != null"
                                class="row">
                                <div class="col-11 ms-4 mt-2 reng_box">
                                    <div class="range ">
                                        <div v-if="useNotice?.notice?.price_expert_rating != null"
                                            class="col-10  field">
                                            <input disabled type="range" min="0" max="100"
                                                :value="notice.price_expert_rating">
                                            <img src="assets/img/SinglePage_Image/gheymat.svg" alt="">
                                            <div class="row">
                                                <div class="col ms-4 range-txt">شکار</div>
                                                <div class="col range-txt">اکازیون</div>
                                                <div class="col range-txt">منصفانه</div>
                                                <div class="col range-txt">خیلی بالا</div>
                                                <div class="col range-txt">غیر منصفانه</div>
                                            </div>
                                        </div>

                                        <div v-else-if="notice?.pricing != null">
                                            قیمت : {{ (notice?.pricing?.discount_percent > 0) ?
                convertPrice(notice?.pricing?.price - (notice?.pricing?.price
                    *
                    notice.pricing?.discount_percent / 100)) :
                convertPrice(notice?.pricing?.price) }} تومان
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="Tozihat">

                                </div>
                            </div>
                            <div class="row">
                                <div class="Warn mt-3 ms-2 col-12">
                                    <div class="col-md box_warning">
                                        <img src="assets/img/SinglePage_Image/warning.svg" alt="" style="width: 35px;">
                                        <a href="#" class="daftar_text ms-1">ثبت تخلف و مشکل آگهی </a>
                                        <img src="assets/img/SinglePage_Image/row.svg"
                                            style="float: left;position: relative; top: 5px;" alt="">
                                        <a href="#" class="daftar_textt ms-1 mt-1"> گزارش </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- end right -->
                </div>
                <div class="col-sm-5">
                    <div class="col row mt-5">
                        <div class="row col-11 box-title">
                            <div class="col-12">
                                <a href="#" class="Titleontop">
                                    {{ notice.title }}
                                </a>
                            </div>

                            <div class="boxdetailes col-md-12 row">
                                <div v-if="notice.address != null" class="col-md-4">
                                    <a href="#" class="figmafont">محله : </a>
                                    <a href="#" class="texts">{{
                notice.address.address.neighbourhood }}</a>
                                </div>
                                <div class="col-4">
                                    <a href="#" class="figmafont">
                                        کد آگهی :
                                    </a>
                                    <a href="#" class="texts"> {{ notice.id }}</a>
                                </div>
                                <div class="col-sm-4 detailicons">
                                    <div class="col">
                                        <img class="" src="assets/img/SinglePage_Image/save.svg" alt="">
                                        <img class="ms-3" src="assets/img/SinglePage_Image/share.svg" alt="">
                                    </div>

                                </div>
                                <div v-if="useNotice?.notice?.pricing?.price" class="col-12 mt-3">
                                    قیمت : {{ (useNotice?.notice?.pricing?.discount_percent > 0) ?
                convertPrice(notice?.pricing.price - (notice?.pricing.price
                    *
                    notice.pricing.discount_percent / 100)) :
                convertPrice(notice?.pricing.price) }} تومان
                                </div>
                            </div>
                            <div class="lineee mt-3"></div>
                            <div v-if="notice.section_data_collection.length >= 1"
                                class="boxdetailes col-xs-12 row mt-3">
                                <div v-if="notice.section_data_collection[2]" class="col-6">
                                    <a href="#" class="subtitle">{{
                notice.section_data_collection[2].items[0].field.title }}:</a>
                                    <a href="#" class="Price ms-1">{{
                convertPrice(notice.section_data_collection[2].items[0].data[0]) }} تومان
                                    </a>
                                </div>


                                <div v-if="notice.section_data_collection[2]" class="col-6">
                                    <a href="#" class="subtitle">{{
                notice.section_data_collection[2].items[1].field.title }}:</a>
                                    <a href="#" class="Price ms-1">
                                        {{
                convertPrice(notice.section_data_collection[2].items[1].data[0]) }} تومان
                                    </a>


                                </div>
                                <div class="col-sm-12 row">
                                    <a href="#" class="mediumtxt col-8 mt-3"> جهت اطلاعات بیشتر با ما تماس بگیرید</a>

                                    <div class="col-4 tamas_btn mt-2">
                                        <button @click="showPhone = true" type="button"
                                            class="btn btn-success btnmodal">اطلاعات تماس</button>
                                    </div>
                                    <!-- <button type="button" class="col-4 tamas_btn" data-container="body"
                                        data-toggle="popover" data-placement="top"
                                        data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                                        Popover on top
                                    </button> -->
                                </div>

                                <div class="col-8 mt-4"></div>
                                <div class="col-4 mt-4">
                                    <div v-if="useNotice?.notice?.category?.properties?.is_product" class="addProduct">

                                        <div v-if="useCart.error">
                                            {{ useCart.error.message }}
                                        </div>
                                        <div v-if="useCart.message">
                                            {{ useCart.message }}
                                        </div>
                                    </div>
                                    <!-- <div v-if="!useNotice?.notice?.category?.properties?.is_product" class="row">
                                        <button @click="showPhone = true" type="button" class="btn btn-success btnmodal">تماس</button>
                                    </div> -->

                                    <div v-if="showPhone" id="myModal" class="modal">
                                        <div class="modal-content-index">
                                            <span @click="showPhone = false" class="hiding">&times;</span>
                                            <p href="#" class="Title">شماره تماس : {{ notice.mobile }}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div v-if="useNotice?.notice?.category?.properties?.is_product" class="addProduct mt-4">
                                <div class="col-sm-12">
                                    <div class="row">
                                        <div class="col-4 btn-right">
                                            <button
                                                @click="useCart.addToCart(useNotice?.notice?.id, count), addCart = true, count++"
                                                class="btn btn-success">
                                                <div v-if="useCart.pending && addCart"
                                                    class="spinner-border spinner-btn" role="status"></div>
                                                <div v-else>+</div>
                                            </button>
                                        </div>
                                        <div class="col-4">
                                            <div class="form-number">
                                                <input disabled type="number" class="form-text numberCount"
                                                    v-model="count">
                                            </div>
                                        </div>
                                        <div class="col-4 btn-left">
                                            <button
                                                @click="useCart.removeCart(useNotice?.notice?.id, count), addCart = false, (count >= 1) ? count-- : 0"
                                                class="btn btn-success">
                                                <div v-if="useCart.pending == true && !addCart"
                                                    class="spinner-border spinner-btn" role="status"></div>
                                                <div v-else>-</div>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="useCart.error" class="alert alert-danger">
                                    {{ useCart.error.message }}
                                </div>
                                <div v-if="useCart.message" class="alert alert-success">
                                    {{ useCart.message }}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-sm-12 row">
                        <div class="col-12 box_daftar">
                            <img src="assets/img/SinglePage_Image/homeenger.svg" alt="" style="width: 40px;">
                            <a href="#" class="daftar_text ms-2">هومنگر</a>
                            <img src="assets/img/SinglePage_Image/row.svg"
                                style="float: left; top: 6px;position: relative;" alt="">
                            <a :href="`../../office/${notice.office?.uuid}/${notice.office?.title}/?id=${notice.office?.id}`"
                                class="daftar_textt ms-1 mt-2"> دفتر ها </a>
                        </div>
                        <div class="col-12 map_box">
                            <div v-if="notice.address != null" class="col mappingg">
                                <LMap v-if="notice" id="map" ref="mapRef" :zoom="16"
                                    :center="[notice.address.lat, notice.address.lng]">
                                    <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                                        layer-type="base" name="OpenStreetMap" />

                                    <l-circle-marker :lat-lng="[notice.address.lat, notice.address.lng]" :radius="100"
                                        color="red" />
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
                            <!-- <a href="#" class="subtitle ms-2" id="moshabeIcon">مشاهده همه</a> -->

                        </div>
                        <!-- add Cards-->
                        <div class="box-similer row">
                            <div v-if="allNotices !== null" v-for="notice in allNotices?.items" :key="notice.id"
                                class="col-sm-3 mt-5">
                                <div class="row box-notice">
                                    <div class="col-sm-12 img-box">
                                        <div class="img"
                                            :style="`background-image: url(${useRuntimeConfig().public.BaseUrl}/${notice.gallery[0].image});`">
                                        </div>
                                    </div>

                                    <div class="col-sm-12 mt-3">
                                        <div class="titleNotice">
                                            <h4 class>{{ notice.title }}</h4>
                                        </div>
                                    </div>

                                    <div class="col-sm-12" v-if="notice?.section_data_collection[0]?.items.length >= 1">
                                        <div class="row">
                                            <div class="col-6 text-section">
                                                {{ notice?.section_data_collection[0].items[0]?.field.title }} : {{
                notice?.section_data_collection[0].items[0]?.data[0] }} متر
                                            </div>

                                            <div v-if="notice?.section_data_collection[0].items[5]"
                                                class="col-6 text-section">
                                                {{ notice?.section_data_collection[0].items[5]?.field?.title }} : {{
                notice?.section_data_collection[0].items[5]?.data[0] }}
                                            </div>

                                            <div class="col-sm-12 text-section mt-4">
                                                <div class="row">
                                                    <div v-if="notice?.section_data_collection[2].items[0]"
                                                        class="col-10">
                                                        {{ notice?.section_data_collection[2].items[0]?.field?.title }}
                                                        : {{
                convertPrice(notice?.section_data_collection[2].items[0]?.data[0])
            }} تومان
                                                    </div>

                                                    <div class="col-2">
                                                        <a :href="`notice/${notice?.id}/${filterUrl(notice?.title)}`">
                                                            <img src="~/assets/img/arrow-left.svg" alt="">
                                                        </a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="col-sm-12" v-if="notice?.section_data_collection[0].items.length < 1">
                                       <div class="row">
                                           <div class="col-sm-12 text-section mt-4">
                                               <div class="row">
                                                   <div class="col-10">
                                                       قیمت : {{ (notice?.pricing?.discount_percent > 0) ? convertPrice(notice?.pricing?.price - (notice?.pricing?.price * notice?.pricing?.discount_percent / 100)) :  convertPrice(notice?.pricing?.price)}} تومان
                                                   </div>
                       
                                                   <div class="col-2">
                                                       <a :href="`notice/${notice?.id}/${filterUrl(notice?.title)}`">
                                                           <img src="~/assets/img/arrow-left.svg" alt="">
                                                       </a>
                                                   </div>
                   
                                               </div>
                                           </div>
                                       </div>
                                   </div> -->

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
const pending = ref(null);
const showPhone = ref(false)
const count = ref(0);
const addCart = ref(null);
const loadingStyle = ref(true);
const allNotices = ref(null)
const notice = ref(null)
const oneRequest = ref(0)

watch(useCart, async (newdata) => {
    // loadingStyle.value = false;

    if (cart.value?.items.length >= 1) {
        cart.value.items = newdata.cart.items;
        console.log(notice.value);
        if (newdata.cart.items[0].notice.id == notice.value.id) {
            count.value = newdata.cart.items[0].count;
        } else {
            count.value = 0;
        }
    }
})

setTimeout(async () => {
    useNotice.getNotice(params.noticeId).then((r) => {
        notice.value = r;
        pending.value = false;
        getSimilar(r.category.id);
    });
    loadingStyle.value = false;

    await useCart.getCart().then((r) => {
        cart.value = r;
        if (r.items[0].notice.id == notice.value.id) {
            count.value = r.items[0].count;
        } else {
            count.value = 0;
        }
    });

})


const getSimilar = (catId) => {
    useNotice.getSimilar(params.noticeId, catId).then((r2) => {
        allNotices.value = r2.allNotices;
    });
}

const setBaseImage = (urlImage) => {
    mainImage.value.style.backgroundImage = `url("${useRuntimeConfig().public.BaseUrl}/${urlImage}")`;
}



</script>