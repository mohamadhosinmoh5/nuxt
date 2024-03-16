<template #fallback>
             <!-- <div class="col-6" v-for="section in notice?.section_data">
                            <sections :Section="section" />
            </div> -->
        <!-- <li><a href="">{{notice.title}}</a></li> -->
            <!-- <a class="link" :href="`notice/${notice?.id}/${filterUrl(notice?.title)}`"> -->
                <NuxtLink class="link"  :to="`notice?id=${notice?.id}&slug=${filterUrl(notice?.title)}`">
                <div class="row box-notice">
                    <div class="col-sm-12 img-box">
                        <div class="img" :style="`background-image: url(${useRuntimeConfig().public.BaseUrl}/${notice.gallery[0].image});`"></div>
                    </div>
    
                    <div class="col-sm-12 mt-3">
                        <div class="titleNotice">
                           <h4>{{notice.title}}</h4>
                        </div>
                    </div>
                    
                    <div class="col-sm-12" v-if="notice?.section_data.length >= 1">
                        <div class="row">
                           
                            <div class="col-6 text-section">
                                {{ notice?.section_data[0]?.field.title }} : {{ notice?.section_data[0]?.data[0] }} <span v-if="notice?.section_data[1]">متر</span>
                            </div>
    
                            <div v-if="notice?.section_data[1]" class="col-6 text-section">
                                {{ notice?.section_data[1]?.field?.title }} : {{ notice?.section_data[1]?.data[0] }}
                            </div>
    
                            <div class="col-sm-12 text-section mt-4">
                                <div class="row">
                                    <div v-if="notice?.section_data[2]" class="col-10">
                                        {{ notice?.section_data[2]?.field?.title }} : {{ convertPrice(notice?.section_data[2]?.data[0]) }} تومان
                                    </div>
                                    <span v-else>قیمت : {{convertPrice(notice?.pricing.price)}} تومان</span>
        
                                    <div class="col-2">
                                        <NuxtLink :to="`notice?id=${notice?.id}&slug=${filterUrl(notice?.title)}`">
                                            <img src="~/assets/img/arrow-left.svg" alt="">
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-sm-12" v-if="notice?.section_data.length < 1">
                        <div class="row">
                            <div class="col-sm-12 text-section mt-4">
                                <div class="row">
                                    <div class="col-10">
                                        قیمت : {{ (notice.pricing.discount_percent > 0) ? convertPrice(notice?.pricing.price - (notice?.pricing.price * notice.pricing.discount_percent / 100)) :  convertPrice(notice?.pricing.price)}} تومان
                                    </div>
        
                                    <div class="col-2">
                                        <NuxtLink :to="`notice?id=${notice?.id}&slug=${filterUrl(notice?.title)}`">
                                            <img src="~/assets/img/arrow-left.svg" alt="">
                                        </NuxtLink>
                                    </div>
    
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </NuxtLink>
            <!-- </a> -->
   
</template>

<script setup>
    let prop = defineProps(['Notice']);
    let notice = toRefs(prop);
    notice = notice.Notice.value;

</script>