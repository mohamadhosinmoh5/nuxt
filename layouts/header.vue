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
              placeholder="جست و جو در همه آگهی ها" value="جست و جو در همه آگهی ها"
              style="color: #666777;font-size: 14px;text-align: right;
              padding: 6px 35px;">
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-4 mt-2" dir="ltr">
      <div class="row text-start">
        <div class="col-2 profLink">
          <a href="">
            <img src="~/assets/img/profile.svg" alt="">
          </a>
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
            <li><a  class="nav-item nav-link" href="">فروشی متری</a></li>
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

if(useCookie('token').value){
    const layoutCustomProps = useAttrs()
    definePageMeta({
        middleware:'auth'
    })

    setTimeout(async () => {
        cart.value = layoutCustomProps.cart;
    }, 0);
}

</script>