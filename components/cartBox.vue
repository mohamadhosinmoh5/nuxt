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

              <div v-if="cart?.items.length >= 1" class="row" dir="rtl">
                <div class="col-sm-4 box-address" dir="rtl">
                  <div v-if="cart?.items[0].post_price_tow_stage" class="all-address">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                      <h5 class="mb-0"> انتخاب آدرس ارسال</h5>
                      <!-- <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                        class="img-fluid rounded-3" style="width: 45px;" alt="Avatar"> -->
                    </div>
                    <hr>
                    <div class="row">
                      <div class="col-12 addresses">
                        <div v-if="adress?.items.length >= 1" v-for="(item, index) in adress?.items" :key="index" class="adress">
                            <div @click="useCart.setDefaultAddress(item.id)" :class="useCart.activeAdress == item.id  ? 'borderSuccess mt-2' : 'mt-2' ">
                              <div class="card-body text-dark">
                                  <h5 class="card-title">{{item.address.province}}/{{item.address.city}}</h5>
                                  <p class="card-text">{{item.address.address}}</p>
                              </div>
                            </div>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="row">
                          <div class="col-5">
                            <button @click="addressBoxModel = true" class="btn btn-success mt-4">
                              افزودن ادرس
                            </button>
                          </div>
                          <div class="col-7">
                            <button @click="requestPrice(cart?.items[0].id)" class="btn btn-danger mt-4">
                              <div v-if="useCart.pending == true" class="spinner-border spinner-btn" role="status"></div>
                                درخواست قیمت گذاری
                            </button>
                          </div>
                        </div>
                      </div>
                      <div >
                      </div>

                    </div>
                    <div v-if="addressBoxModel" class="modal" tabindex="-1" role="dialog">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">افزودن آدرس</h5>
                            <button @click="addressBoxModel = false" type="button" class="closeCart" data-dismiss="modal" aria-label="Close">
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

                            <div v-if="useCart.error?.message" class="alert alert-danger m-2">
                              {{ useCart.error?.message }}
                            </div>
                            
                          </div>
                          <div class="row">
                            <div class="col-2"></div>
                            <button type="button" @click="addAdress" class="btn btn-primary col-3">افزودن آدرس</button>
                            <div class="col-2"></div>
                            <button type="button" @click="addressBoxModel = false" class="btn btn-secondary col-3" data-dismiss="modal">Close</button>
                            <div class="col-2"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
  
                      <hr class="my-4">
  
                      <div class="d-flex justify-content-between">
                        <p class="mb-2">مجموع قیمت با تخفیف</p>
                        <p class="mb-2 text-success">تومان {{ totaldisPrice }}</p>
                      </div>
  
                      <div class="d-flex justify-content-between">
                        <p class="mb-2">مجموع قیمت اصلی</p>
                        <p class="mb-2 text-info">تومان {{totalPriceNotice}}</p>
                      </div>
  
                      <div class="d-flex justify-content-between mb-4">
                        <p class="mb-2">میزان سود شما</p>
                        <p class="mb-2 text-danger">تومان {{profit}}</p>
                      </div>
                      <div class="row mb-5 mt-5">
                        <div @click="useCart.changePay('wallet'),wallet=true"  :class="wallet ? `col-5 pay-cart active` :`col-5 pay-cart`">کیف پول نقدی</div>
                        <div class="col-2"></div>
                        <div @click="useCart.changePay('cash'),wallet=false" :class=" !wallet ? `col-5 pay-cart active` : `col-5 pay-cart`">پرداخت مستقیم</div>
                      </div>
                      <button type="button" class="btn btn-info btn-block btn-lg">
                        <div class="d-flex justify-content-between">
                          <!-- <span> {{totalPrice(cart?.items).discountPrice}} تومان </span> -->
                          <span @click="pay(cart.id)">پرداخت <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
                        </div>
                      </button>
                </div>

                <div class="col-sm-8">
                      <div class="row" dir="rtl">
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
                                      <div v-if="item.count != 0" class="mb-3">
                                        <div >
                                          <div class="d-flex justify-content-between">
                                            <div class="d-flex flex-row align-items-center">
                                              <div class="image-cart">
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
                                              <div class="row">
                                                <div class="col-4">
                                                  <button @click="useCart.addToCart(item.notice.id,item.count),addCart = true,item.count++" class="btn-cus btn-success">
                                                    <div v-if="useCart.pending && addCart" class="spinner-border spinner-btn" role="status"></div>
                                                    <div v-else>+</div>
                                                  </button>
                                                </div>
                                                <div class="col-4 text-center">
                                                  <h5 class="fw-normal mb-0">
                                                    <div class="form-group">
                                                      <input id="count" class="form-control" disabled type="text" v-model="item.count">
                                                    </div>
                                                  </h5>
                                                </div>
                                                <div class="col-4">
                                                  <button @click="useCart.removeCart(item.notice.id,item.count),addCart = false,item.count--" class="btn-cus btn-success">
                                                    <div v-if="useCart.pending==true && !addCart" class="spinner-border spinner-btn" role="status"></div>
                                                    <div v-else>-</div>
                                                  </button>
                                                </div>
                                              </div>
                                              <div style="width: 80px;">
                                               {{ convertPrice(item.notice.pricing.price)}}
                                                <!-- {{ (item.notice.pricing.discount_percent > 0) ? convertPrice(item?.pricing?.price - (item?.notice?.pricing?.price * item.notice?.pricing?.discount_percent / 100)) :  convertPrice(item?.notice?.pricing?.price) }}  تومان -->
                                              </div>
                                              <a @click="useCart.deleteCart(item.notice.id),item.count=0" href="#" style="color: #cecece;margin-right:20px"><i class="fas fa-trash-alt"></i></a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                  </div>
                                </div>
                </div>
              </div>
        
              <div v-if="!pending && cart?.items.length < 1" class="error alert alert-danger text-center">
                سبد خرید شما خالی می باشد
              </div>

              <div v-if="pending" class="border-fixed">
                <div class="spinner-border " role="status"></div>
              </div>

              <div v-if="message" class="notif ">
                <span @click="message = null" class="closeNotife">x</span>
                  {{message }}
              </div>
              <div v-if="useCart.error?.message" class="notif error text-center">
                <span @click="useCart.error.message = null" class="closeNotife">x</span>
                <p>
                  {{ useCart.error.message }}
                </p>
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
const addressModal = ref(false);
const diplayPopUp = ref(false);
const addressData = ref({});
const name = ref('');
const family = ref('');
const mobile = ref('');
const postCode = ref('');
const address = ref('');
const cart = ref(null)
const count = ref(null)
const addCart = ref(null)
const addressBoxModel = ref(false)
const wallet = ref(false)
const totaldisPrice = ref(0)
const totalPriceNotice = ref(0)
const profit = ref(0)
const message = ref('')

const requestPrice = (item) => {
  pending.value = true
  useCart.requestPrice(item).then(()=>{
    message.value = 'درخواست قیمت گذاری شما ارسال شد پس از دریافت اس ام اس تایید مجدد جهت پرداخت اقدام کنید'  
    pending.value = false
  })
}

watch(useCart,(cart) =>{
  console.log(cart.cart.items);
   totaldisPrice.value = convertPrice(totalPrice(cart.cart.items).discountPrice);
   totalPriceNotice.value = convertPrice(totalPrice(cart.cart.items).allPrice);
   profit.value = convertPrice(totalPrice(cart.cart.items).profit);
})

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

const pay = async (id) => {
  pending.value = true;
  if(useCart.status.portal == 'cash'){
    useCart.pay(id).then((r)=>{
      pending.value = false;
      window.location.href = r.action;
    })
    
  }else{
    useCart.pay(id).then((r)=>{
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
    pending.value = false;
}, 0);

</script>
<style>
@import url("@neshan-maps-platform/vue3-openlayers/dist/style.css");
</style>

