  
<!-- script -->
<script >

import { useAuthStore } from '../store/auth';
import { useMapStore } from '../store/map';
import { useNoticeStore } from '../store/notice';
import { useOfficeStore } from '../store/office';

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
      scrolled:false,
      lastCat:null,
      emptyCat:null,
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
    }
    ,filterUptaded(query,section){
      this.pending = true;
      if(query){
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
        var map = this.$refs.mapRef;
      },
      markersIconCallback(point){
              console.log(point);
        },
        getCategory(noticeId){
          this.pending = true;
          this.notices.getCategory(noticeId).then((r)=> {
            this.categories =  r;
            if(r.length == 0){
              this.emptyCat = `دسته بندی ${this.lastCat} اخرین دسته بندی می باشد می توانید از دکمه بازگشت استفاده کنید`;
              this.notices.fetchData().then((r)=>{
              if(r.allNotices.length >= 1){
                this.allNotices = r.allNotices;
              }
              this.pending=false;
            });

            }else{
              this.emptyCat = null;
            }

            this.pending = false;
          });
        },
        lastCategory(){
          this.emptyCat = null;
          this.lastCat = null;
          if(this.notices.getclickCat <= 1){

            if(this.notices.getclickCat == 0){
              return
            }

            this.categories = this.notices.lastCategory[1];
            this.allNotices = this.defaultNotices;
            this.notices.categories = null;
            return
          }else{
            this.categories = this.notices.lastCategory[this.notices.getclickCat];
            this.notices.lastCategory.pop();
            this.notices.removeClickCat();
          }
        }
        },
  watch : {
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
      if(val){
        this.showCat =false
        // menuAndMapBox
        this.$refs.noticeBox.classList.remove('col-sm-9');
        this.$refs.menuAndMapBox.classList.remove('col-sm-3');
        this.$refs.noticeBox.classList.add('col-sm-8');
        this.$refs.menuAndMapBox.classList.add('col-sm-4');
      }else{
        this.showCat =true
        this.$refs.menuAndMapBox.classList.remove('col-sm-4');
        this.$refs.noticeBox.classList.remove('col-sm-8');
        this.$refs.menuAndMapBox.classList.add('col-sm-3');
        this.$refs.noticeBox.classList.add('col-sm-9');
      }
    },
    showCat(val){
      if(val){
        this.showMap = false;
        if(this.scrolled){
          this.$refs.menuAndMap.classList.remove('fixedCat2');
          this.$refs.menuAndMap.classList.add('fixedCat');
        }
        this.$refs.noticeBox.classList.remove('col-sm-8');
        this.$refs.noticeBox.classList.add('col-sm-9');
      }else{
        this.showMap = true;
        if(this.scrolled){
          this.$refs.menuAndMap.classList.remove('fixedCat');
        this.$refs.menuAndMap.classList.add('fixedCat2');
        }

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

          if(scrollTop > 200  && width > 527){
            this.scrolled = true;
            this.$refs.menuAndMap.classList.remove('relativeCat');
            if(this.showMap){
              this.$refs.menuAndMap.classList.add('fixedCat2');
            }else{
              this.$refs.menuAndMap.classList.add('fixedCat');
            }
          }

          if(scrollTop < 200){
            this.scrolled = false;
            this.$refs.menuAndMap.classList.remove('fixedCat');
            this.$refs.menuAndMap.classList.remove('fixedCat2');

            this.$refs.menuAndMap.classList.add('relativeCat');
          }
        })
  },
  setup() {
    definePageMeta({
        middleware:'mobile'
    })
    const notices = useNoticeStore();
    const offices = useOfficeStore();
    const auth =  useAuthStore();
    const useMap = useMapStore();
    // **only return the whole store** instead of destructuring


    return { notices,offices,auth,useMap}
  },
}

</script>

<template>
  <div class="p-4"  v-if="!isMobile()" >
    <NuxtLayout name="header"></NuxtLayout>
      <div class="row" ref="contentBox">
        <div class="row mt-4">
          <div class="col-sm-3">
            <!-- <div class="switchBox">
              <p class="switchItem">نقشه</p>
                <label class="switch switchItem">
                  <input v-model="showMap" class="checkBox"  type="checkbox">
                  <span class="slider"></span>
                </label>
              <p  class="switchItem">فیلترها</p>
            </div> -->

          </div>
        </div>

        <div ref="menuAndMapBox" class="col-sm-3 menu" >
          <div ref="menuAndMap" class="row">
          <div  class="tab_box">
              <div class="activeItem"></div>
              <a @click="showMap=false" class="col-6 tabItem active"> فیلتر ها  </a>
              <a @click="showMap=true" class="col-6 tabItem"> نقشه</a>
          </div>
            <div class="row">
              <div v-if="showCat">
                <div class="row mt-5 " ref="menuBox" >
                 <div class="col-sm-12 ">
                    <div class="row category-box">
                      <div class="col-7">
                        <div class="row">
                          <div class="col-12 margin-fix">
                            <h5 v-if="lastCat !==null" class="category-title">{{lastCat}}</h5>
                            <h5 v-else class="category-title">دسته بندی ها</h5>
                          </div>
                          <div class="col-12">
                            <div v-if="pending" class="spinner-border" role="status"></div>
                          </div>
                        </div>
                      </div>
                      <div class="col-5 text-end">
                        <span class="backCat" @click="lastCategory">
                          <i class="fa fa-chevron-circle-left" aria-hidden="true"></i> بازگشت
                        </span>
                      </div>
                    </div>
                    <ul class="categoryBox">
                      <li v-for="(item, index) in categories" :key="index">
                        <img v-if="index == 0" src='/assets/img/cat1.svg'>
                        <img v-if="index == 1" src='/assets/img/cat2.svg'>
                        <img v-if="index == 2" src='/assets/img/cat3.svg'>
                      <a @click="getCategory(item.id),setCat(item)" class="link">{{item.title}}</a>
                      </li>
                    </ul>
                    <span v-if="emptyCat" class=" alert-danger">{{emptyCat}}</span>
                  </div>
                  <div :class="(officeShow) ? `disable` : ``">
                    <Filter :status="pending" @clicked="filterUptaded" />
                  </div>
                </div>
              </div>
    
              <div v-if="showMap && allNotices[0].address != null" class="stickyStyle" >
                <LMap v-if="allNotices"
                  id="map"
                  ref="mapRef"
                  :zoom="16"
                  :center="[allNotices[1].address.lat, allNotices[1].address.lng]"
                  @zoomend="changeZoom"
                  @click="markersIconCallback"
                >
                <l-polygon :lat-lngs="polygonGrg" color="transparent"></l-polygon>
                  <LTileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                    layer-type="base"
                    name="OpenStreetMap"
                  />
                
                  <l-circle-marker
                  :lat-lng="[allNotices[1].address.lat, allNotices[1].address.lng]"
                  :radius="10"
                  color="red"
                />
                  <l-marker v-for="notice in allNotices" :ref="`marker_${notice.id}`"  :key="notice.id" :lat-lng="[notice.address.lat,notice.address.lng]">
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

        <!-- start Card-->
        <div ref="noticeBox" class="col-sm-9">
          <div class="row category-box-sort">
            <div class="col-9">
              <div class="row sort-box ">
                <h6 class="col-1">نمایش:</h6>
                <ul class="col-11 textPink">
                  <li @click="showOffice"><a href="#">دفتر ها</a></li>
                  <li @click="showNotice"><a href="#">آگهی ها</a></li>
                </ul>
              </div>
            </div>
  
            <div class="col-3">
                  <div class="row">
                    <div class="col-4 disable"><img class="pointer" src="~/assets/img/sort1.svg" alt=""></div>
                    <div class="col-4 disable"><img class="pointer" src="~/assets/img/sort2.svg" alt=""></div>
                    <div class="col-4"><img class="pointer" src="~/assets/img/sort3.svg" alt=""></div>
                  </div>
            </div>
          </div>
  
          <div  class="row" :style="noticeShow ? `display:flex` : 'display:none;'">
            <!-- Card 1-->
          <div v-if="infinity != null  && infinity.fetchingData" class="spinner-border-background-index">
            <br>
            <br>
            <br>
            <div class="spinner-border mt-5" role="status"></div>
          </div>
      
        <div class="col-sm-12 text-center">
          <div v-if="pending" class="spinner-border" role="status"></div>
        </div>
              <div v-for="notice in allNotices" :key="notice.id"  class="col-sm-4">
                <div @mouseenter="showPop(`marker_${notice.id}`)" href="#">
                  <Notice :Notice="notice" />
                </div>
              </div>
           
            <!-- Card 2-->
            <!-- End card-->
            <!--Loader-->
            <!-- <div v-if="infinity.error" class="d-flex justify-content-center mt-4">
              {{ infinity.error }}
              <div class="spinner-border" role="status"></div>
            </div>
  
            <div v-if="error" class="d-flex justify-content-center mt-4">
              {{ error }}
              <div class="spinner-border" role="status"></div>
            </div> -->
            <!-- End Loader-->
          </div>
    
          <div v-if="officeShow" class="row content">
            <div v-for="(office, index) in allOffices" :key="index" class="col-sm-12 col-md-6 col-xl-4 descktop-office">
              <div class="row">
                <div class="col-4 descktop-img-box">
                    <div v-if="office?.image_banner" class="img" :style="`background-image: url(${useRuntimeConfig().public.BaseUrl}/${office.image_icon});`"></div>
                    <img v-else width="100px" height="100px" src="assets/img/homeLogo.png" alt="">
                  </div>
                  <div class="col-8">
                    <div class="row">
                      <div class="col-12">
                        <h4 class="descktop-office-title"><img v-if="office.blue_tick" src="assets/img/blue-tick.svg" alt=""> &nbsp; {{office.title}} </h4>
                      </div>

                      <div class="col-12 mt-3 p-3">
                        <div class="row">
                          <div class="col-9">
                            <h4 class="descktop-office-matter">{{office.matter.title}}</h4>
                          </div>
                          <div class="col-3">
                            <NuxtLink :to="`office/${office?.uuid}/${filterUrl(office?.title)}/?id=${office?.id}`">
                              <img src="~/assets/img/arrow-left.svg" alt="">
                          </NuxtLink>
                          </div>
                        </div>
                      </div>
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
        </div>
      </div>
  </div>

  </template>





