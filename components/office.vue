<template>
 
        <!-- <li><a href="">{{office.title}}</a></li> -->
     
            <li>
                {{office.title}}
            </li>
            <li>
              <img width="200px" :src="`${useRuntimeConfig().public.BaseUrl}/${office.image_icon}`" alt="">  
            </li>
            <li>
                {{office.status}}
            </li>

            <!-- <li>
                <a :href="`${office?.id}/${office?.title}`">
                    <div v-for="section in office?.section_data">
                            <sections :Section="section" />
                    </div>
                </a>
            </li> -->
            <li>
                {{office.matter?.description}}
            </li>
        
</template>

<script setup>
    let prop = defineProps(['office']);
    let office = toRefs(prop);
    office = office.office.value;

</script>