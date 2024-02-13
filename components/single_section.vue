<template>

     <div v-if="section.section.section.id != 4" class="row">
        <div class="Tozihat row mt-2">
            <div class="col-sm">
                <img src="assets/img/SinglePage_Image/home.svg" alt="">
                <a href="#">{{ section.section.section.title }}</a>
            </div>
        </div>
        
            <div class="box_moshakhasat row mt-3">
                <div v-for="sectionData in section.section.items" class="col-4">
                   
                    <div class="row">
                        <div class="col-12 mt-2">
                            <a href="#" class="subtitle">{{ sectionData.field.title }}</a>
                        </div>
                      
                        
                        <div class="col-12 moshakhasat-Subtitle mt-2">
                            <span v-if="sectionData.data[0] == true">دارد</span>
                            <span v-if="sectionData.data[0] && sectionData.data[0] !== true">{{ sectionData.data[0] }}</span>
                            <span v-if="!sectionData.data[0]">ندارد</span>

                        </div>
                    </div>
                  

                </div>
            </div>
       
    </div> 
</template>

<script setup>
let section = defineProps(['section','keys']);
// let section = toRefs(prop);
</script>