<template>
    <div v-if="section.section.section.id != 4" class="row">
        <div class="AllTitles ms-3 mt-3">
            <div class="Tozihat row">
                <div class="col-sm">
                    <img src="assets/img/SinglePage_Image/home.svg" alt="">
                    <a href="#">{{ section.section.section.title }}</a>
                </div>
            </div>
        </div>

        <div class="AllBoxes ms-4">
            <div class="box_moshakhasat col-11  row ">
               
                <div class="col-sm-11 borders"></div>


                <div v-for="sectionData in section.section.items" class="col-4">
                    <div class="row spacing">
                        <div class="col-12">
                            <a href="#" class="subtitle">{{ sectionData.field.title }}</a>
                        </div>
                        <div class="col-12 ">
                            <span  v-if="sectionData.data[0] == true">دارد</span>
                            <span v-if="sectionData.data[0] && sectionData.data[0] !== true">{{ sectionData.data[0]
                            }}</span>
                            <span v-if="!sectionData.data[0]">ندارد</span>

                        </div>
                    </div>
                </div>
              
            </div>
        </div>

    </div>
</template>

<script setup>
let section = defineProps(['section', 'keys']);
// let section = toRefs(prop);
</script>