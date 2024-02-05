<template>





 
    <!-- for category-->
    <div class="row" ref="contentBox">
      <div class="row mt-4">
        <div class="col-12">
          <div class="switchBox">
            <p class="switchItem">نقشه</p>
              <label class="switch switchItem">
                <input v-model="showMap" class="checkBox"  type="checkbox">
                <span class="slider"></span>
              </label>
            <p  class="switchItem">فیلترها</p>
          </div>
        </div>
      </div>

      <div v-if="showMap" class="col-sm-4 mt-2 mapBox">
        <div ref="mapDiv" class="stickyStyle" >
          <LMap v-if="allNotices"
            id="map"
            ref="mapRef"
            :zoom="16"
            :center="[allNotices[1].address.lat, allNotices[1].address.lng]"
            @zoomend="changeZoom"
            @click="markersIconCallback"
          >
          <l-polygon :lat-lngs="polygonGrg" color="green"></l-polygon>
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

      <div v-if="showCat" ref="menu" class="col-sm-3 menu " >
        <div class="stickyStyle">
          <div class="row mt-5 " ref="menuBox" >
            
           <div class="col-sm-12 ">
              <div class="row category-box">
                <div class="col-6">
                  <div class="row">
                    <div class="col-12">
                      <h5 class="category-title" style="font-size: 20px;">دسته بندی ها</h5>
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
                <a @click="getCategory(item.id)" class="link">{{item.title}}</a>
                </li>
              </ul>
            </div>
  
  
            <Filter :status="pending" @clicked="filterUptaded" />
          </div>
        </div>
      </div>
      <!-- start Card-->
      <div ref="noticeBox" class="col-sm-9">
        <div class="row category-box  mt-5 ">
          <div class="col-9">
            <div class="row sort-box ">
              <h6 class="col-3">مرتب سازی بر اساس : </h6>
              <ul class="col-9 textPink">
                <li><a href="">جدیدترین ها</a></li>
                <li><a href="">پر بازدید ترین ها</a></li>
                <li><a href="">ارزانترین ها</a></li>
                <li><a href="">گرانترین ها</a></li>
              </ul>
            </div>
          </div>

          <div class="col-3">
                <div class="row">
                  <div class="col-4"><img class="pointer" src="~/assets/img/sort1.svg" alt=""></div>
                  <div class="col-4"><img class="pointer" src="~/assets/img/sort2.svg" alt=""></div>
                  <div class="col-4"><img class="pointer" src="~/assets/img/sort3.svg" alt=""></div>
                </div>
          </div>
        </div>

        <div  class="row " :style="noticeShow ? `display:flex` : 'display:none;'">
          <!-- Card 1-->
            <div v-for="notice in allNotices" :key="notice.id"  class="col-sm-4 mt-5">
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
      </div>
    </div>
    
 
  </template>




  
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
      polygonGrg : [[36.873978, 54.346216],[36.880184, 54.500138],[36.794162, 54.506150],[36.786775, 54.357092],[36.873978, 54.346216]],
      center :ref({
        "latitude": 36.830367834795,
        "longitude": 54.455885428711
      }),
    }
  },
  methods: {
    filterUptaded(query,section){
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
          this.offices.fetchData().then((r)=> {
            this.allOffices =  r.allOffices;
          });
        }, 0);
          this.noticeShow = false;
          this.officeShow = true;
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
        console.log(id);
        this.$refs[id][0].leafletObject.openPopup();
      },
      markersIconCallback(point){
              console.log(point);
        },
        getCategory(noticeId){
          this.pending = true;
          this.notices.getCategory(noticeId).then((r)=> {
            this.categories =  r;
            this.notices.fetchData().then((r)=>{
              this.allNotices = r.allNotices;
              this.pending=false;
            });
            this.pending = false;
          });
        },
        lastCategory(){
          if(this.notices.getclickCat <= 1){
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
        this.$refs.noticeBox.classList.remove('col-sm-9');
        this.$refs.noticeBox.classList.add('col-sm-8');
      }else{
        this.showCat =true
        this.$refs.noticeBox.classList.remove('col-sm-8');
        this.$refs.noticeBox.classList.add('col-sm-9');
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
          if(scrollTop > 200){
            this.$refs.menuBox.classList.remove('relativeCat');
            this.$refs.menuBox.classList.add('fixedCat');
          }

          if(scrollTop < 200){
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
    // **only return the whole store** instead of destructuring

    return { notices,offices,auth,useMap}
  },
}


</script>
