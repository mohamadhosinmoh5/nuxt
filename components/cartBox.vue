<template>
            <!-- <div v-if="useCart.pending">
              update basket
            </div> -->
            <div class="container">
              <!-- <NeshanMap ref="mapRef" style="width: 100%; height:100vh;"
                mapKey="web.d2d15b53cc3048db981d514eb6221e39"
                serviceKey="service.22dda51fbcf6451c85bfd77e96f6face"
                :center="center"
                :zoom="15"
                :poi="true"
                hide-layers
                :markers-icon-callback="markersIconCallback"
                @on-zoom="changeZoom"
                @on-init="onInit"
              >
            </NeshanMap> -->
            <div v-if="pending" class="border-fixed">
              <div class="spinner-border " role="status"></div>
            </div>

              <div v-if="cart?.items.length >= 1" class="row">
                <div class="col-sm-3 box-address">
                      <div class="d-flex justify-content-between align-items-center mb-4">
                        <h5 class="mb-0"> انتخاب آدرس ارسال</h5>
                        <!-- <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                          class="img-fluid rounded-3" style="width: 45px;" alt="Avatar"> -->
                      </div>
                      <hr>
                      <div v-if="adress?.items.length >= 1" v-for="(item, index) in adress?.items" :key="index" class="adress">
                          <div @click="useCart.setDefaultAddress(item.id)" :class="useCart.activeAdress == item.id  ? 'borderSuccess mt-2' : 'mt-2' ">
                            <div class="card-body text-dark">
                                <h5 class="card-title">{{item.address.province}}/{{item.address.city}}</h5>
                                <p class="card-text">{{item.address.address}}</p>
                            </div>
                          </div>
                      </div>
                      <button @click="addressModel('open')" class="btn btn-info mt-4 ">
                        افزودن ادرس
                      </button>
                      <div v-if="cart?.items[0].post_price_tow_stage">
                        <button @click="useCart.requestPrice(cart?.items[0].id)" class="btn btn-danger">  درخواست قیمت گذاری </button>
                      </div>
                      <div class="modal" ref="addressModal" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title">Modal title</h5>
                              <button @click="addressModel('close')" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                                 <input class="form-control" type="text" placeholder="آدرس کامل" v-model="address">
                                 <br>
                                 <input class="form-control" type="text" placeholder=" نام گیرنده" v-model="name">
                                 <br>
                                 <input class="form-control" type="text" placeholder=" نام خانوادگی گیرنده" v-model="family">
                                 <br>
                                 <input class="form-control" type="text" placeholder=" شماره موبایل گیرنده" v-model="mobile">
                                 <br>
                                 <input class="form-control" type="text" placeholder="کد پستی" v-model="postCode">

                              {{ useCart.error?.message }}
                            </div>
                            <div class="modal-footer">
                              <button type="button" @click="addAdress" class="btn btn-primary">Save changes</button>
                              <button type="button" @click="addressModel('close')" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                          </div>
                        </div>
                      </div>
  
                      <hr class="my-4">
  
                      <div class="d-flex justify-content-between">
                        <p class="mb-2">مجموع قیمت با تخفیف</p>
                        <p class="mb-2">ریال {{totalPrice(cart?.items).discountPrice}}</p>
                      </div>
  
                      <div class="d-flex justify-content-between">
                        <p class="mb-2">مجموع قیمت اصلی</p>
                        <p class="mb-2">ریال {{totalPrice(cart?.items).allPrice}}</p>
                      </div>
  
                      <div class="d-flex justify-content-between mb-4">
                        <p class="mb-2">میزان سود شما</p>
                        <p class="mb-2">ریال {{totalPrice(cart?.items).profit}}</p>
                      </div>
  
                      <button type="button" class="btn btn-info btn-block btn-lg">
                        <div class="d-flex justify-content-between">
                          <span>ریال {{totalPrice(cart?.items).discountPrice}}</span>
                          <span @click="pay({method:1,id:cart.id})">پرداخت <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
                        </div>
                      </button>
  
                    </div>

                <div class="col-sm-9">
                        <div class="row" dir="ltr">
                                    <h5 class="mb-3"><a href="/" class="text-body"><i
                                          class="fas fa-long-arrow-alt-left me-2"></i>صفحه اصلی </a>
                                    </h5>
                                  <hr>
                  
                                  <div class="d-flex justify-content-between align-items-center mb-4">
                                    <div>
                                      <p class="mb-1">سبد خرید</p>
                                      <p class="mb-0">شما تعداد {{(cart?.items.length < 1) ? 0 : cart?.items.length}} محصول در سبد خرید خود دارید</p>
                                    </div>
                                  </div>
                                  <div v-for="(item, index) in cart?.items" :key="index" class="cart-item">
                                  
                                      <div class="mb-3">
                                        <div >
                                          <div class="d-flex justify-content-between">
                                            <div class="d-flex flex-row align-items-center">
                                              <div>
                                                <img
                                                  :src="`${useRuntimeConfig().public.BaseUrl}/${item.notice?.gallery[0].image}`"
                                                  class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                                              </div>
                                              <div class="ms-3">
                                                <h5>{{item.notice.title}}</h5>
                                                <p class="small mb-0">{{item.notice.category.title}}</p>
                                              </div>
                                            </div>
                                            <div class="d-flex flex-row align-items-center">
                                              <div style="width: 50px;">
                                                <h5 class="fw-normal mb-0">{{item.count}} {{item.unit}}</h5>
                                              </div>
                                              <div style="width: 80px;">
                                                <h5 class="mb-0">{{item.total_price}}</h5>
                                                {{ item.total_discounted_price }}
                                              </div>
                                              <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
                                            </div>
                                          </div>
                                      
                                        </div>
                                      </div>
                                  </div>
                                </div>
                </div>
              </div>
              
              <div v-if="useCart.error" class="error alert alert-danger text-center">
                {{ useCart.error.message }}
              </div>
      
          </div>
</template>

<script setup>
// import { ol } from "@neshan-maps-platform/ol";
// import { fromLonLat } from '@neshan-maps-platform/ol/proj';
// import OpenLayersMap from "vue3-openlayers";
// let marker = L.marker([35.699756, 51.338076]).addTo(neshanMap);


// import { ref, watch } from "vue";
import { useAuthStore } from '../store/auth';
import { useCartStore } from '../store/cart';
import { useMapStore } from '../store/map';
// console.log(Vue.ol);

definePageMeta({
  middleware:'cors'
})

const mapKey = "web.d2d15b53cc3048db981d514eb6221e39";
const serviceKey = "service.22dda51fbcf6451c85bfd77e96f6face";
const mapRef = ref();
const useCart = useCartStore();
const useAuth = useAuthStore();
const useMap = useMapStore();
const adress = ref(null);
const pending = ref(true);
const addressModal = ref();
const diplayPopUp = ref(false);
const addressData = ref({});
const name = ref('');
const family = ref('');
const mobile = ref('');
const postCode = ref('');
const address = ref('');
const cart = ref(null)
addressData.value.address = {
    address: "ایران، گلستان، گرگان، شهر گرگان، گرگان، محله گلشهر، بلوار گلشهر",
    address_compact: "گلستان، گرگان، محله گلشهر، بلوار گلشهر",
    city: "گرگان",
    country: "ایران",
    county: "گرگان",
    district: null,
    geom: {type: "Point", coordinates: ["54.45588542871091", "36.830367834794615"]},
    last: "بلوار گلشهر",
    name: "بلوار گلشهر",
    neighbourhood: "محله گلشهر",
    plaque: null,
    poi: null,
    postal_address: "گرگان، بلوار گلشهر",
    postal_code: null,
    primary: "بلوار گلشهر",
    province: "گلستان",
    region: null,
    rural_district: "شهر گرگان",
    village: null,
}

const addAdress = async () => {
  addressData.value.city = 'gorgan';
  addressData.value.lat = 36.830367834795;
  addressData.value.lng = 54.455885428711;
  addressData.value.user_id = useAuth.user.id;
  addressData.value.province = 'golestan';
  addressData.value.name = name.value;
  addressData.value.family = family.value;
  addressData.value.mobile = mobile.value;
  addressData.value.post_code = postCode.value;
  addressData.value.address.address = address.value;
  await useCart.setAdress(addressData.value)
  addressModal.value.style.display = 'none';
}

const pay = (obj) => {
  pending.value = true;
  console.log(obj);
  if(obj.method == 1){
    useCart.payDirect(obj.method,obj.id).then((r)=>{
      window.location.href = r.action;

    })
  }else{
    useCart.payCash(obj.method,obj.id).then((r)=>{
      console.log(r);
      pending.value = false;
    })
  }
}

setTimeout(async () => {
  pending.value = true;
   await useCart.getCart().then((r)=>{
    cart.value = r
    pending.value = false;
   });
   pending.value = true;
    await useCart.getAdress().then((r)=>{
      adress.value = r
      pending.value = false;
    });

}, 0);

const addressModel = (action)=> {

    if(action =='open'){
        addressModal.value.style.display = 'block';
    }else{
        addressModal.value.style.display = 'none';
    }
}
</script>
<style>
@import url("@neshan-maps-platform/vue3-openlayers/dist/style.css");
</style>

