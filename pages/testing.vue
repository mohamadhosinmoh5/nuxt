<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar Menu (Filter and Map Toggle) -->
      <div class="col-sm-3 menu">
        <div class="row">
          <div class="col-12 tab_box">
            <div class="activeItem"></div>
            <a @click="toggleView(false)" class="col-6 tabItem" :class="{ active: !showMap }"> فیلتر ها </a>
            <a @click="toggleView(true)" class="col-6 tabItem" :class="{ active: showMap }"> نقشه</a>
          </div>
          <div class="col-12">
            <transition name="fade" mode="out-in">
              <!-- Filter Section -->
              <div v-if="!showMap" key="filter" class="filter-section">
                <h5 v-if="lastCat" class="category-title">{{ lastCat }}</h5>
                <h5 v-else class="category-title">دسته بندی ها</h5>
                <div v-if="pending" class="spinner-border" role="status"></div>
                <ul class="categoryBox">
                  <li v-for="(item, index) in categories" :key="index">
                    <a @click="getCategory(item.id), setCat(item)" class="link">{{ item.title }}</a>
                  </li>
                </ul>
                <span v-if="emptyCat" class="alert-danger">{{ emptyCat }}</span>
                <Filter :status="pending" @clicked="filterUpdated" />
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <!-- Map Section -->
              <div v-if="showMap" key="map" class="map-section">
                <LMap id="map" ref="mapRef" :zoom="16" :center="[allNotices[0]?.address?.lat || 0, allNotices[0]?.address?.lng || 0]" @zoomend="changeZoom">
                  <LTileLayer
                    url="http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
                    attribution="&amp;copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
                  />
                  <l-marker v-for="notice in allNotices" :key="notice.id" :lat-lng="[notice.address.lat, notice.address.lng]">
                    <l-popup>{{ notice.title }}</l-popup>
                  </l-marker>
                </LMap>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="col-sm-9">
        <div class="row category-box-sort">
          <div class="col-9">
            <div class="row sort-box">
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

        <div class="row" :style="noticeShow ? 'display:flex' : 'display:none;'">
          <div v-if="infinity != null && infinity.fetchingData" class="spinner-border-background-index">
            <br><br><br>
            <div class="spinner-border mt-5" role="status"></div>
          </div>

          <div class="col-sm-12 text-center">
            <div v-if="pending" class="spinner-border" role="status"></div>
          </div>
          <div v-for="notice in allNotices" :key="notice.id" class="col-sm-4">
            <div @mouseenter="showPop(`marker_${notice.id}`)">
              <Notice :Notice="notice" />
            </div>
          </div>
        </div>

        <div v-if="officeShow" class="row content">
          <div v-for="(office, index) in allOffices" :key="index" class="col-sm-12 col-md-6 col-xl-4 descktop-office">
            <NuxtLink :to="`office?uid=${office?.uuid}&slug=${filterUrl(office?.title)}&id=${office?.id}`">
              <div class="row">
                <div class="col-4 descktop-img-box">
                  <div v-if="office?.image_banner" class="img" :style="{ backgroundImage: `url(${useRuntimeConfig().public.BaseUrl}/${office.image_icon})` }"></div>
                  <img v-else width="100px" height="100px" src="assets/img/homeLogo.png" alt="">
                </div>
                <div class="col-8">
                  <div class="row">
                    <div class="col-12">
                      <h4 class="descktop-office-title">
                        <img v-if="office.blue_tick" src="assets/img/blue-tick.svg" alt=""> &nbsp; {{ office.title }}
                      </h4>
                    </div>
                    <div class="col-12 mt-3 p-3">
                      <div class="row">
                        <div class="col-9">
                          <h4 class="descktop-office-matter">{{ office.matter.title }}</h4>
                        </div>
                        <div class="col-3">
                          <NuxtLink :to="`office?uid=${office?.uuid}&slug=${filterUrl(office?.title)}&id=${office?.id}`">
                            <img src="~/assets/img/arrow-left.svg" alt="">
                          </NuxtLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>

          <div v-if="infinity != null && infinity.fetchingData" class="spinner-border-background">
            <br><br>در حال بارگیری<br>
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

<script>
export default {
  data() {
    return {
      showMap: false,
      pending: false,
      lastCat: null,
      categories: [],
      emptyCat: '',
      allNotices: [],
      officeShow: false,
      noticeShow: true,
      error: null,
    };
  },
  methods: {
    toggleView(map) {
      this.showMap = map;
    },
    showOffice() {
      this.officeShow = true;
      this.noticeShow = false;
    },
    showNotice() {
      this.officeShow = false;
      this.noticeShow = true;
    },
    async getCategory(id) {
      // Logic to fetch category data
    },
    setCat(item) {
      this.lastCat = item.title;
    },
    lastCategory() {
      this.lastCat = null;
    },
    filterUpdated() {
      // Logic to handle filter update
    },
    changeZoom() {
      // Logic to handle map zoom
    },
    markersIconCallback() {
      // Logic for marker icon callback
    },
    showPop(markerId) {
      // Logic to show popup
    },
  },
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
