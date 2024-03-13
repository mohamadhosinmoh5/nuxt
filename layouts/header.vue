<template>
  <!-- <div class="row ">
    <div class="col-sm-12 text-center">
        <div v-if="cart != null">
            <cartBox :cart="cart" />
        </div>

    </div>
   </div> -->


  <div class="row p-2 nav z-index-1000">
    <div class="col-sm-3">
      <div class="row mt-2">
        <div class="col-md-5 mt-2">
          <a href="../../" class="logo"><img width="100" src="assets/logo/logo.png" alt=""></a>
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
            <input v-model="textSearch" type="text" class="form-control"
              placeholder="جست و جو در همه آگهی ها"
              style="color: #666777;font-size: 14px;text-align: right;
              padding: 6px 35px;">
              <div v-if="searchPending" class="searchLoader">
                <div class="spinner-border" role="status"></div>
              </div>
              <div ref="searchBox" class="searchResult">
              <div class="row">
                <div @click="closeSearch" class="closeFilter">
                  <img width="20" src="assets/img/cross-icon.svg" >
                </div>
                <div v-for="(item, index) in searchResult" :key="index" class="col-12 mb-2">
                  <div class="row">
                    <div class="col-8 text-start">
                     <a class="link" :href="`${item?.id}/${filterUrl(item?.title)}`">{{item.title}}</a>
                    </div>
                    <div class="col-4 text-center search-cat">
                      {{item.category.title}}
                    </div>
                  </div>
                </div>
              </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-4 mt-2" dir="ltr">
      <div class="row text-start">
        <div v-if="token" class="col-2 profLink">
          <a href="/profile">
            <img src="~/assets/img/profile.svg" alt="">
          </a>
        </div>
        <div v-if="!token" @click="isShowModal = true" class="col-2 profLink">
          <a href="#LogInModal">
            <img src="~/assets/img/profile.svg" alt="">
          </a>
        </div>

        <div v-if="!token && isShowModal" id="LogInModal" class="LogInModal">
          <Loginpage @clicked="modalStatus(status)" />
        </div>
        
        <div class="col-2 bag-icon">
            <a v-if="useCart.cart?.items[0].count" href="/cart">
              <div class="count-cart">
                  {{useCart.cart?.items[0].count}}
                </div>
                <img  src="~/assets/img/basket.svg" alt="">
            </a>
            <a v-else disabled><img src="~/assets/img/basket.svg" alt=""></a>
        </div>
        <div class="col-4 mt-2">
          <a class="addNotice disabled">
            ثبت اگهی
            <!-- <span id="tooltiptext">به زودی</span> -->
          </a>
        </div>
      </div>
    </div>

    <!-- menu -->
    <div ref="navMenu" class="col-sm-12 navMenu">
      <ul>
        <li><a class="nav-item nav-link" href="">خانه</a></li>
        <li><a class="nav-item nav-link" href="https://abzar.homeenger.com/">ابزار محاسبه رهن و اجاره</a></li>
        <li><a class="nav-item nav-link" href="https://panel.homeenger.com/ai">هوش مصنوعی</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// import {cartBox} from '../components/cart.vue';
// import auth from '~/middleware/auth';
import { useAuthStore } from '../store/auth';
import { useCartStore } from '../store/cart';
import { useSearchStore } from '../store/search';
const cart = ref(null);
const textSearch = ref(null);
const searchTimeOut = ref(null);
const searchResult = ref(null);
const useSearch = useSearchStore();
const useCart = useCartStore();
const useAuth = useAuthStore();
const searchBox =ref(null)
const searchPending = ref(false)
const isShowModal = ref(false);
const navMenu = ref(null)

const token = useCookie('token');


const modalStatus = (status)=>{
  isShowModal.value = status;
}

  setTimeout(async () => {
    if(token.value != null){
      useAuth.token = token.value;
      await useAuth.getMe()
      await useCart.getCart()

    }
    // cart.value = layoutCustomProps.cart;
  }, 0);


    const closeSearch =  ()=> {
      searchBox.value.style.display = 'none';
    }

    const showSearch = () => {
      searchBox.value.style.display = 'block';
    }


    watch(textSearch,(val)=>{

        if(searchTimeOut.value) {
          clearTimeout(searchTimeOut.value);
        }
    
        searchTimeOut.value = setTimeout(() => {
          if(val != null){
            searchPending.value = true;
            useSearch.search(val).then((r)=>{
                if(r.data.length != 0 ){
                  showSearch()
                  searchResult.value = r.data;
                }else{
                  closeSearch()
                }
                searchPending.value = false;
              })
          }
        }, 500);
      
    })

    onMounted(() => {
      window.addEventListener('scroll',()=>{
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document
        if(scrollTop > 50){
          navMenu.value.style.height = '0px';
          navMenu.value.style.overflow = 'hidden';
          navMenu.value.style.opacity = '0';

        }else{
          navMenu.value.style.height = '40px';
          navMenu.value.style.opacity = '1';

        }
      })
    })
    

</script>