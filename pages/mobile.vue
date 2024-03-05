<template>

    <div class="row">
      <div class="row mob-nav mt-2">
        <div class="col-2 menuToggle">
            <a @click="showCategory" href="#"><img src="assets/img/menuToggle.svg" /></a>
        </div>
  
        <div class="col-8">
          <div class="row tab_box">
            <div class="activeItem"></div>
            <a @click="showNotice" class="col-6 tabItem active">آگهی</a>
            <a @click="showOffice" class="col-6 tabItem">دفتر ها</a>
          </div>
        </div>
  
        <div class="col-2 text-end">
          <a href="#"><img src="assets/img/shop_icon.svg"/></a>
        </div>
      </div>

      <div class="row search-box">
        <div v-if="showCat"  class="col-12 ">
          <div class="form-group" style="position:relative;">
            <img class="search-icon" src="~/assets/img/search.svg" alt="">
            <input type="text" v-model="textSearch" class="form-control form-style" name="" id="" aria-describedby="helpId"
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
                       <a class="link" :href="`/notice/${item?.id}/${filterUrl(item?.title)}`">{{item.title}}</a>
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
  
        <div v-if="showCat"  class="row">
          <div class="col-sm-12 navMenu">
            <ul>
              <li>
                <a data-bs-toggle="offcanvas"
                data-bs-target="#navbarOffcanvasLg" @click="showFilter"  class="nav-item nav-link  filter-box" href="#">فیلتر ها {{countQuery}} <img class="" src="~/assets/img/filter_search.svg" alt=""></a>
              </li>
                
              <li>
                <a data-bs-toggle="offcanvas"
                data-bs-target="#navbarOffcanvasLg" @click="showCategory"  class="nav-item nav-link  filter-box" href="#"> دسته بندی : {{lastCat ? lastCat : 'همه آگهی ها'}} </a>
              </li>
            </ul>
      </div>
        </div>

        <div class="col-12 mt-2">
          <div class="col-12 mt-1 mob-map">
            <div @click="showMap=false" style="float:right !important;right:10px;" class="closeFilter">
              <img width="20" src="assets/img/cross-icon.svg" >
            </div>
        
            <div v-if="showNotice"  ref="mapDiv" @click="showMap=true" class="mob-stickyStyle" >
             
              <LMap v-if="allNotices"
                id="map"
                ref="mapRef"
                :zoom="12"
                :center="[allNotices[1]?.address?.lat, allNotices[1]?.address?.lng]"
                @zoomend="changeZoom"
                @click="markersIconCallback"

                style="height:100vh;"
              >
        
              <l-polygon :lat-lngs="polygonGrg" color="green"></l-polygon>
                <LTileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                  layer-type="base"
                  name="OpenStreetMap"
                />
              
                <l-circle-marker
                :lat-lng="[allNotices[1]?.address?.lat, allNotices[1]?.address?.lng]"
                :radius="10"
                color="red"
              />
                <l-marker v-for="notice in allNotices" :ref="`marker_${notice.id}`"  :key="notice.id" :lat-lng="[notice.address?.lat,notice.address?.lng]">
                  <l-popup @ready="ready" >
                    <div class="title">
                      {{ notice.title }}
                    </div>
                  </l-popup>
                </l-marker>
      
              </LMap>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- show category box -->
    <div ref="categoryCanvas" class="categoryCanvas">
      <div @click="closeCategory" class="closeFilter">
        <img width="20" src="assets/img/left.png" >
      </div>
     <div class="row mt-4">
      <div class="col-sm-12 ">
        <div class="row category-box">
          <div class="col-6">
            <div class="row">
              <div class="col-12">
                <h5 v-if="lastCat !==null" class="category-title">{{lastCat}}</h5>
                <h5 v-else class="category-title">دسته بندی ها</h5>
              </div>
              <div class="col-12">
                <div v-if="pending" class="spinner-border" role="status"></div>
              </div>
            </div>
          </div>
          <div class="col-6 text-end">
            <span class="backCat" @click="lastCategory">
              <i class="fa fa-chevron-circle-left" aria-hidden="true"></i> بازگشت
            </span>
          </div>
        </div>
        <ul class="categoryBox">
          <li v-for="(item, index) in categories" :key="index">
            <img :src='`/_nuxt/assets/img/cat-${index+1}.svg`'>
          <a @click="getCategory(item.id),setCat(item)" class="link">{{item.title}}</a>
          </li>
        </ul>
      </div>
     </div>
  </div>
    
    <div v-if="noticeShow" ref="content" class="row content">
      <div class="col-sm-12 text-center">
        <div v-if="pending" class="spinner-border" role="status"></div>
      </div>
      
      <div v-if="infinity != null  && infinity.fetchingData"  class="spinner-border-background">
        <br>
        <br>
        در حال بارگیری <br>
        <div class="spinner-border mt-5" role="status"></div>
      </div>
      <div v-for="(notice, index) in allNotices" :key="index" class="row box-content">
          <div class="col-4 mobile-img-box">
            <div class="img" :style="`background-image: url(${useRuntimeConfig().public.BaseUrl}/${notice.gallery[0].image});`"></div>
          </div>
          <div class="col-8">
            <div class="row">
              <div class="col-12">
                <h4 class="mobile-notice-title">{{notice.title}}</h4>
              </div>
              <div v-if="notice?.section_data.length > 1" class="row">
                
                <div  class="col-sm mobile-section mt-3">
                  <p>
                    {{ notice?.section_data[0]?.field.title }} : {{ notice?.section_data[0].data[0] }} متر
                  </p>
                  <p>
                    {{ notice?.section_data[1]?.field.title }} : {{ notice?.section_data[1].data[0] }}
                  </p>
                  <p>
                    <div class="row">
                    <div class="col-10 mobile-section">
                        {{ notice?.section_data[2].field.title }} : {{ convertPrice(notice?.section_data[2].data[0]) }} تومان
                    </div>

                    <div class="col-2 mobile-section ">
                        <a :href="`/notice/${notice?.id}/${filterUrl(notice?.title)}`">
                            <img src="~/assets/img/arrow-left.svg" alt="">
                        </a>
                    </div>

                </div>
                  </p>
                </div>
              </div>

              <div class="col-sm-12" v-if="notice?.section_data.length < 1">
                <div class="row">
                    <div class="col-sm-12 text-section mt-4">
                        <div class="row">
                            <div  class="col-10">
                                قیمت :   {{ (notice.pricing.discount_percent > 0) ? convertPrice(notice?.pricing.price - (notice?.pricing.price * notice.pricing.discount_percent / 100)) :  convertPrice(notice?.pricing.price)}} تومان
                                <br>
                                <del style="font-size: 12px;">{{ convertPrice(notice?.pricing.price)}}</del> <span class="text-danger">{{notice.pricing.discount_percent}} %</span>
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
          </div>
      </div>
    </div>

    <div v-if="officeShow" class="row content">
      <div v-for="(office, index) in allOffices" :key="index" class="row box-content">
          <div class="col-4 mobile-img-box">
            <div v-if="office?.image_banner" class="img" :style="`background-image: url(${useRuntimeConfig().public.BaseUrl}/${office?.image_banner  });`"></div>
            <img v-else width="100px" height="100px" src="assets/img/homeLogo.png" alt="">
          </div>
          <div class="col-8">
            <div class="row">
              <div class="col-12">
                <h4 class="mobile-notice-title">{{office.title}}</h4>
              </div>
            </div>
          </div>
      </div>
      <div v-if="infinity != null  && infinity.fetchingData"  class="spinner-border-background">
        <br>
        <br>
        در حال بارگیری <br>
        <div class="spinner-border mt-5" role="status"></div>
      </div>
      
      <div class="col-sm-12 text-center">
        <div v-if="pending" class="spinner-border" role="status"></div>
      </div>
    </div>

    <div ref="filterCanvas" class="filterCanvas" tabindex="-1" id="navbarOffcanvasLg">
        <div @click="closeFilter" class="closeFilter">
          <img width="20" src="assets/img/left.png" >
        </div>
        <Filter v-if="noticeShow" :status="pending" @clicked="filterUptaded" />
    </div>
    <!-- this is for bottomNavigationBar -->
    <div class="navbar">
        <div class="list-item">
            <button type="button" class="prson">
                <img src="assets/img/home-1 2.svg" style="width: 20px;" />
                <a href="#" class="homeIcon">خانه</a>
            </button>
        </div>
        <div class="list-item">
            <button type="button" class="prson">
                <img src="assets/img/note-21 1.svg"  style="width: 20px;"/>
                <a href="#" class="txtIcons">خدمات</a>
            </button>
        </div>
        <div  class="list-item">
            <button type="button" @click="showMap=true" class="circle">
               <p class="Maptext">
                نقشه
               </p>
            </button>
        </div>
        <div class="list-item">
            <button type="button" class="prson" >
                <img src="assets/img/notification-bing 2.svg"  style="width: 20px;"/>
                <a href="#"  class="txtIcons">اعلانات</a>
            </button>
        </div>
        <div class="list-item">
            <button type="button" class="prson" >
                <img src="assets/img/profile-circle 3.svg"  style="width: 20px;"/>
                <a href="#"  class="txtIcons">پروفایل</a>
            </button>
        </div>
    </div>

    <!-- <div class="notic" id="card1"></div> -->

</template>




  
<!-- script -->
<script >
import { useAuthStore } from '../store/auth';
import { useMapStore } from '../store/map';
import { useNoticeStore } from '../store/notice';
import { useOfficeStore } from '../store/office';
import { useSearchStore } from '../store/search';

const mapping = ref(true);

export default {
  data(){
    return {
      mobile:null,
      code:null,
      auth:null,
      allNotices:null,
      categories:null,
      pending:true,
      allOffices:null,
      infinity:null,
      error:null,
      noticeShow:true,
      defaultNotices:null,
      officeShow:false,
      showMap:false,
      showCat:true,
      countQuery:0,
      lastCat:null,
      textSearch:null,
      searchTimeOut:null,
      searchResult:null,
      searchPending:false,
      polygonGrg : [[36.873978, 54.346216],[36.880184, 54.500138],[36.794162, 54.506150],[36.786775, 54.357092],[36.873978, 54.346216]],
      center :ref({
        "latitude": 36.830367834795,
        "longitude": 54.455885428711
      }),
    }
  },
  methods: {
    setCat(item){
      this.lastCat = item.title;
    },
   closeSearch(){
      this.$refs.searchBox.style.display = 'none';
    },
    showSearch(){
      this.$refs.searchBox.style.display = 'block';
    },
    closeCategory(){
      this.$refs["categoryCanvas"].style.left = '100%';
    },
    showCategory(){
      this.$refs["categoryCanvas"].style.left = '4%';
    }
    ,closeFilter(){
      this.$refs["filterCanvas"].style.bottom = '-100vh';
    },
    showFilter(){
      this.$refs["filterCanvas"].style.bottom = '70px';
    },filterUptaded(query,section){
      this.pending = true;
      if(query){
        console.log(query);
        this.countQuery = Object.keys(query).length;
        setTimeout(() => {
        if(section){
          this.notices.setQuery(null,query,true);
        }else{
          this.notices.setQuery(key,query,false);
        }
        this.notices.fetchQuery().then((r)=>{
          if(r.allNotices == null){
            this.error = 'دیتایی با این فیلتر وجود ندارد :('
            return;
          }
          this.allNotices = r.allNotices;
          this.pending = false;
        });
      }, 0);
      }
      this.closeFilter();
    },
    showOffice(){
        setTimeout(() => {
         
          this.noticeShow = false;
          this.officeShow = true;
          if(this.allOffices == null){
            this.pending = true;
            this.offices.fetchData().then((r)=> {
              this.allOffices =  r.allOffices;
              this.pending = false;
            });
            this.pending = false;
          }
        }, 0);
      },
      showNotice(){
          this.noticeShow = true;
          this.officeShow = false;
      },
      changeZoom(zoom) {
        console.log(zoom);
        if(zoom.target._zoom > 16){
          console.log(zoom);
        }
      },
      showPop(id){
        this.$refs[id][0].leafletObject.openPopup();
      },
      markersIconCallback(point){
              console.log(point);
        },
        getCategory(noticeId){
          this.pending = true;
          this.lastCat = null;
          this.notices.getCategory(noticeId).then((r)=> {
            this.categories =  r;
            if(r.length == 0) {
              this.closeCategory();
              this.notices.fetchData().then((r)=>{
                console.log(r);
                this.allNotices = r.allNotices;
              });
            }
            this.pending = false;
          });
        },
        lastCategory(){
          if(this.notices.getclickCat <= 1){
            this.categories = this.notices.lastCategory[1];
            this.allNotices = this.defaultNotices;
            this.notices.categories = null;
            this.lastCat = null;
            return
          }else{
            this.categories = this.notices.lastCategory[this.notices.getclickCat];
            this.notices.lastCategory.pop();
            this.notices.removeClickCat();
          }
        }
        },
  watch : {
    textSearch(val){
      if(this.searchTimeOut) {
        clearTimeout(this.searchTimeOut);
      }
      
      this.searchTimeOut = setTimeout(() => {
      if(val != null){
      this.searchPending = true;
        this.useSearch.search(val).then((r)=>{
          if(r.data.length != 0 ){
            this.showSearch()
            this.searchResult = r.data;
          }else{
            this.closeSearch()
          }
          this.searchPending = false;
        })
      }
      }, 500);
    },
    allNotices(value){
      if(value != null){
        this.infinity = useInfinity({
            window:window,
            url:'api/v2/notices',
            allData:value
          });
          this.infinity.created()
      }
    },
    allOffices(value){
      if(value != null){
        console.log(value);
        this.infinity = useInfinity({
            window:window,
            url:'api/v2/offices',
            allData:value
          });
          this.infinity.created()
      }
    },
    showMap(val){
      console.log(val);
      if(val){
        this.showCat =false
        // this.$refs.content.classList.add('closeBox');
        this.$refs.mapDiv.classList.add('showMap');
      }else{
        this.showCat =true
        // this.$refs.content.classList.add('openBox');
        this.$refs.mapDiv.classList.remove('showMap');
      }
    },
    showCat(val){
      if(val){
        this.showMap = false;
        this.$refs.noticeBox.classList.remove('col-sm-8');
        this.$refs.noticeBox.classList.add('col-sm-9');
      }else{
        this.showMap = true;
        this.$refs.noticeBox.classList.remove('col-sm-9');
        this.$refs.noticeBox.classList.add('col-sm-8');
      }
    }
  },
 computed:{

 },
 created(){
  // $bus.$emit.$on('filterUptaded', ($event) => console.log($event))
 }
 ,mounted() {
        setTimeout(() => {
          this.notices.fetchData().then((r)=> {
            this.defaultNotices = r.allNotices;
            this.allNotices =  r.allNotices;
            this.pending = false;
          });

          this.notices.getCategory().then((r)=> {
            this.categories =  r;
            this.pending = false;
          });

        }, 0);

        window.addEventListener('scroll',()=>{
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          let width = window.innerWidth;
          console.log(width);
          if(scrollTop > 200 && width < 527){
            this.$refs.menuBox.classList.remove('relativeCat');
            this.$refs.menuBox.classList.add('fixedCat');
          }

          if(scrollTop < 200 ){
            this.$refs.menuBox.classList.remove('fixedCat');
            this.$refs.menuBox.classList.add('relativeCat');

          }
        })
  },
  setup() {
    const notices = useNoticeStore();
    const offices = useOfficeStore();
    const auth =  useAuthStore();
    const useMap = useMapStore();
    const useSearch = useSearchStore();
    // **only return the whole store** instead of destructuring

    return { notices,offices,auth,useMap,useSearch}
  },
}


</script>
