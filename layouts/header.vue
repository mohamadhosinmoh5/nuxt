<template>
  <!-- <div class="row ">
    <div class="col-sm-12 text-center">
        <div v-if="cart != null">
            <cartBox :cart="cart" />
        </div>

    </div>
   </div> -->


  <div class="row p-2 nav">
    <div class="col-sm-3">
      <div class="row mt-2">
        <div class="col-md-5 mt-2">
          <a href="#" class="logo"><img width="100" src="assets/logo/logo.png" alt=""></a>
        </div>
        <div class="col-md-1 text-center mt-3">
          <div class="line"></div>
        </div>
        <div class="col-md-6 mt-2">
          <!-- <a class="location">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
            گرگان
          </a> -->
        </div>
      </div>
    </div>
    <div class="col-sm-5 mt-2">
      <div class="row">
        <div class="col-sm-12">
          <div class="form-group" style="position:relative;">
            <img class="search-icon" src="~/assets/img/search.svg" alt="">
            <input type="text" class="form-control" name="" id="" aria-describedby="helpId"
              placeholder="جست و جو در همه آگهی ها" value="جست و جو در همه آگهی ها" style="color: #666777;font-size: 14px;text-align: right;
              padding: 6px 35px;">
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-4 mt-2" dir="ltr">
      <div class="row text-start">
        <div @click="isShowModal = true" class="col-2 profLink">
          <a href="#LogInModal">
            <img src="~/assets/img/profile.svg" alt="">
          </a>
        </div>
        <div v-if="isShowModal" id="LogInModal" class="LogInModal">
          <div class="Login-content">
            <div class="maydetailes col-sm-12">
              <div class="row">
                <div class="col">
                  <span class="Close">
                 
                     <a @click="isShowModal = false" href="#"><img src="assets/img/SinglePage_Image/back.png" style="width: 25px; float: right;" alt=""></a>
                  </span>
                  <a href="#" class="Title">ورود به حساب کاربری</a>
                </div>

              </div>
              <div class="lines"></div>
              <div class="col mt-3">
                <a href="#" class="phonenm">شماره مبایل خودرا وارد کنید</a>
              </div>
              <div class="col mt-2">
                <a href="#" class="subtitle">برای استفاده از امکانات هومنگر لطفا شماره مبایل خود را وارد کنید, کد تاید به
                  این شماره ارسال خواهد شد</a>
              </div>
              <div v-if="isShowNumber" class="FormNumber col">
                <input type="text" placeholder="شماره همراه">
              </div>
              <div v-if="isShowVerifyCode" class="FormPass col">
                <input type="text" placeholder=" کد تایید">
              </div>
              <div class="col mt-2">
                <a href="#" class="subtitle">شرایط و قوانین استفاده و سیاست نامه حریم خصوصی هومنگر را می پزیرم</a>
              </div>
              <div class="col">
                <div class="row mt-2">
                  <button v-if="isShowNumber" @click="showNumber" type="button" class="btn btn-success">بعدی</button>
                  <button v-if="isShowVerifyCode" @click="showVerifyCode" type="button" class="btn btn-success">ورود</button>

                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="col-2">
          <a href="">
            <img src="~/assets/img/basket.svg" alt="">
          </a>
        </div>
        <div class="col-4 mt-2">
          <a class="addNotice disabled">
            ثبت اگهی
          </a>
        </div>
      </div>
    </div>

    <!-- menu -->
    <div class="col-sm-12 navMenu">
      <ul>
        <li><a class="nav-item nav-link" href="">فروشی متری</a></li>
        <li><a class="nav-item nav-link" href="">خانه</a></li>
        <li><a class="nav-item nav-link" href="">هوش مصنوعی</a></li>
        <li><a class="nav-item nav-link" href="">پکیج های دانلودی</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// import {cartBox} from '../components/cart.vue';
// import { useNoticeStore } from '../store/notice';
const cart = ref(null);
const isShowNumber = ref(true);
const isShowVerifyCode = ref(false);
const isShowModal = ref(false);
if (useCookie('token').value) {
  const layoutCustomProps = useAttrs()
  definePageMeta({
    middleware: 'auth'
  })

  setTimeout(async () => {
    cart.value = layoutCustomProps.cart;
  }, 0);
}

const showNumber = () =>{
  isShowNumber.value = false;
  isShowVerifyCode.value = true;

}
const showVerifyCode = () =>{
  isShowNumber.value = true;
  isShowVerifyCode.value = false;

}
</script>