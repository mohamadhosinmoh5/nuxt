<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="col-sm-12 text-center mt-5">انتخواب محدوده آگهی روی نقشه</div>
                <div class="col-sm-12 text-center">موقعیت قیق مکان در لیست آکخی های نمایش داده شده نخواهد شد</div>
                <div class="col-sm-12 text-center mt-5">
                    <div style="width: 300px; height: 300px; position: relative; right: 42%;" class="maps">
                        <LMap v-if="allNotices" id="map" ref="mapRef" :zoom="16"
                            :center="[allNotices[1].address.lat, allNotices[1].address.lng]" @zoomend="changeZoom"
                            @click="markersIconCallback">
                            <!-- url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  -->
                            <l-polygon :lat-lngs="polygonGrg" color="transparent"></l-polygon>
                            <LTileLayer url="http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
                                attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                                layer-type="base" name="OpenStreetMap" />
                            <l-circle-marker :lat-lng="[allNotices[1].address.lat, allNotices[1].address.lng]"
                                :radius="10" color="red" />
                            <l-marker v-for="notice in allNotices" :ref="`marker_${notice.id}`" :key="notice.id"
                                :lat-lng="[notice.address.lat, notice.address.lng]">
                                <l-popup @ready="ready">
                                    <div class="title">
                                        <NuxtLink class="link"
                                            :href="`notice?id=${notice?.id}&slug=${filterUrl(notice?.title)}`">
                                            {{ notice.title }}
                                        </NuxtLink>
                                    </div>
                                </l-popup>
                            </l-marker>
                        </LMap>
                    </div>
                </div>

                <div class="col-sm-12 text-center mt-5">
                    map title
                </div>
                <div class="col-sm-12 addresBox text-start mt-5"
                    style="width: 200px; height: 100px; border: 1px solid black; position: relative; right: 43%;">
                    addres box
                </div>
            </div>
        </div>
    </div>

</template>


<script setup>


</script>