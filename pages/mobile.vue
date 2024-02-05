<template>

    <div class="row">
      <div class="col-2">
        <div class="navbutton">
          <button class="navbar-toggler " type="button" data-bs-toggle="offcanvas"
          data-bs-target="#navbarOffcanvasLg" aria-controls="navbarOffcanvasLg"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon">
              <img src="assets/img/iCon24.svg" />
          </span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="navbarOffcanvasLg"
              aria-labelledby="navbarOffcanvasLgLabel">
              add Filter
          </div>
      </div>
      </div>

      <div class="col-8">
        <div class="tab_box">
          <button class="tab_btn-color">آگهی</button>
          <button class="tab_btn">دفتر ها</button>
      </div>
      </div>


      <div class="col-2">
        <div class="Shop">
          <img src="assets/img/bag 1.svg"/>
      </div>
      </div>


      
      <div class="col-12">
        <div class="form-group" style="position:relative;">
          <img class="search-icon" src="~/assets/img/search.svg" alt="">
          <input type="text" class="form-control" name="" id="" aria-describedby="helpId"
            placeholder="جست و جو در همه آگهی ها" value="جست و جو در همه آگهی ها"
            style="color: #666777;font-size: 14px;text-align: right;
            padding: 6px 35px;">
        </div>
      </div>
    </div>
    


    <!-- this is for bottomNavigationBar -->
    <div class="navbar">


        <div class="list-item">
            <button type="button" class="prson">
                <img src="assets/img/home-1 2.svg" />
                <a href="#" class="homeIcon">خانه</a>
            </button>
        </div>
        <div class="list-item">
            <button type="button" class="prson">
                <img src="assets/img/note-21 1.svg" />
                <a href="#">خدمات</a>
            </button>
        </div>
        <div class="list-item">
            <button type="button" class="circle">
                <img src="assets/img/add 2.svg" />
            </button>
        </div>
        <div class="list-item">
            <button type="button" class="prson">
                <img src="assets/img/notification-bing 2.svg" />
                <a href="#">اعلانات</a>
            </button>
        </div>
        <div class="list-item">
            <button type="button" class="prson">
                <img src="assets/img/profile-circle 3.svg" />
                <a href="#">پروفایل</a>
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
