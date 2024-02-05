<template>
       
            {{section?.field?.title}}:{{section?.data[0]}}
</template>

<script setup>
let prop = defineProps(['Section']);
let section = toRefs(prop);
section = section.Section ;
</script>