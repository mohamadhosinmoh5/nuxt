<template>
  <NuxtLayout name="header"/>
  <!-- <Suspense> -->
    <!-- <div class="container-fluid" v-if="!noData"> -->
      <!-- <div v-if="pending">
        fetching Data
      </div>
      <div v-if="error">
        error
      </div> -->

      <div style="height:30vh; width:100vw;position:fixed;z-index: 10000;">
   
        <LMap v-if="allNotices"
          id="map"
          ref="mapRef"
          :zoom="11"
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

      <button class="btn btn-info" @click="showOffice">getOffice</button>
      <button class="btn btn-info" @click="showNotice">getNotice</button>
      
      <div :style="notices.pending ? `display:block` : 'display:none;'">
        fetching...
      </div>
      <div id="scroll" ref="box">
        <div :style="noticeShow ? `display:block` : 'display:none;'" class="row" >
          <ul v-for="notice in allNotices" :key="notice.id"  class="col-sm-12 mt-5 ">
            <a @mouseenter="showPop(`marker_${notice.id}`)" href="#">
              <Notice  :Notice="notice" />
            </a>
          </ul>
        </div>
      </div>


      <div :style="offices.pending ? `display:block` : 'display:none;'">
        fetching...
      </div>
      <!-- {{ allOffices }} -->
      <div id="scroll" ref="box">
        <div :style="officeShow ? `display:block` : 'display:none;'" class="row" >
          <ul v-if="allOffices != null" v-for="office in allOffices" :key="office.id"  class="col-sm-12 mt-5 ">
            <office :office="office" />
          </ul>
        </div>
      </div>
    <!-- </div> -->
  <!-- </Suspense> -->

  <NuxtLayout name="footer"/>
</template>



<!-- script -->
<script >
import { useAuthStore } from '../store/auth';
import { useMapStore } from '../store/map';
import { useNoticeStore } from '../store/notice';
import { useOfficeStore } from '../store/office';
// const mobile = ref();
// const code = ref();
// const auth =  useAuthStore();
// const allNotices = ref(null);
// const notices =  useNoticeStore();

export default {
  data(){
    return {
      mobile:null,
      code:null,
      auth:null,
      allNotices:null,
      allOffices:null,
      infinity:null,
      error:null,
      noticeShow:true,
      officeShow:false,
      polygonGrg : [[36.873978, 54.346216],[36.880184, 54.500138],[36.794162, 54.506150],[36.786775, 54.357092],[36.873978, 54.346216]],
      center :ref({
        "latitude": 36.830367834795,
        "longitude": 54.455885428711
      }),
    }
  },
  methods: {
    setQuery(key,value){
      setTimeout(() => {
        this.notices.setQuery(key,value).then((r)=>{
          this.allNotices = r;
        });
      }, 0);
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
          
          this.$refs[2701][0].leafletObject.openPopup()
        }
        
      },
      showPop(id){
        console.log(id);
        this.$refs[id][0].leafletObject.openPopup();
      }
      ,
      markersIconCallback(point){
              console.log(point);
              console.log(this.$refs);
              // for (const key in this.$refs) {
              //   if (Object.hasOwnProperty.call(this.$refs, key)) {
              //     const element = this.$refs[key][0];
              //     if(element != null){
              //       element.leafletObject.openPopup()
              //     }
              //   }
              // }
              // console.log(this.$refs[`marker_`]);
              //this.useMap.getAdress(point.latlng);
        },
        ready(e){
          console.log(e);
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
    
  },
 computed:{

 },
  mounted() {
        setTimeout(() => {
          this.notices.fetchData().then((r)=> {
            this.allNotices =  r.allNotices;
          });
        }, 0);
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
