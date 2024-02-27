
<template>
    <div dir="rtl" class="container-fluild p-4">
        <NuxtLayout name="header"></NuxtLayout>
        <title>
            {{ params.slug }}
        </title>
        <div v-if="useOffice.error" class="alert alert-danger text-center mt-4">
            {{ useOffice.error.message }}
        </div>
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
            <ul class="nav nav-tabs">
                <li class="nav-item">
                  <a :class="(showNotice) ? `nav-link active` : `nav-link`" @click="showNotice = true,showOffice = false" aria-current="page" >آگهی ها</a>
                </li>
                <li class="nav-item">
                  <a :class="(showOffice) ? `nav-link active` : `nav-link`" @click="showOffice = true,showNotice = false" >آدرس در نقشه</a>
                </li>
              </ul>

                <div v-if="allNotices != null && showNotice" v-for="notice in allNotices" :key="notice.id"  class="col-sm-3 mt-5">
                    <div class="row box-notice">
                        <div class="col-sm-12 img-box">
                            <div class="img" :style="`background-image: url(${useRuntimeConfig().public.BaseUrl}/${notice.gallery[0].image});`"></div>
                        </div>
        
                        <div class="col-sm-12 mt-3">
                            <div class="titleNotice">
                               <h4>{{notice.title}}</h4>
                            </div>
                        </div>
                

                        <div class="col-sm-12" v-if="notice?.section_data_collection[0]?.items.length >= 1">
                            <div class="row">
                                <div class="col-6 text-section">
                                    {{ notice?.section_data_collection[0].items[0]?.field.title }} : {{ notice?.section_data_collection[0].items[0]?.data[0] }} متر
                                </div>
        
                                <div v-if="notice?.section_data_collection[0].items[5]" class="col-6 text-section">
                                    {{ notice?.section_data_collection[0].items[5]?.field?.title }} : {{ notice?.section_data_collection[0].items[5]?.data[0] }}
                                </div>
        
                                <div class="col-sm-12 text-section mt-4">
                                    <div class="row">
                                        <div v-if="notice?.section_data_collection[2].items[0]" class="col-10">
                                            {{ notice?.section_data_collection[2].items[0]?.field?.title }} : {{ convertPrice(notice?.section_data_collection[2].items[0]?.data[0]) }} تومان
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
     

                <div v-if="showOffice" class="col-sm-12 mt-2 mapBox">
                    <div ref="mapDiv" class="stickyStyle" >
                      <LMap
                        id="map"
                        ref="mapRef"
                        :zoom="16"
                        :center="office?.address?.geom?.coordinates"
                      >
                      
                        <l-circle-marker
                        :lat-lng="office?.address?.geom?.coordinates"
                        :radius="10"
                        color="red"
                      />
                        <l-marker :lat-lng="office?.address?.geom?.coordinates">
                        </l-marker>
              
                      </LMap>
                    </div>
                  </div>
            
        </div>


    </div>
</template>

<script setup>
import { useCartStore } from '../store/cart';
import { useOfficeStore } from '../store/office';
import { useMapStore } from '../store/map';

definePageMeta({
    middleware: 'auth'
})


const route = useRoute()
const params = route.params;
const query = route.query;
const useCart = useCartStore();
const useOffice = useOfficeStore();
const mainImage = ref(null);
const cart = ref(null);
const office = ref(null);
const allNotices = ref(null);
const showNotice = ref(true);
const showOffice = ref(false);

watch(useCart, async (newdata) => {
    if (cart?.value?.items != null)
        cart.value.items = newdata.cart.items;
    // pending.value = false;
})

setTimeout(async () => {

    useOffice.getOffice(params.officeId).then((r)=>{
        console.log(r);
        office.value = r;
    })

    useOffice.getNoticeOffice(query.id).then((r)=>{
        allNotices.value = r.allNotices;
        console.log(allNotices);
    })

    cart.value = await useCart.getCart();

    });



</script>