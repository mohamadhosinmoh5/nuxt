<template>
 
    <li>
        {{notice}}
    </li>


</template>

<script setup>
let prop = defineProps(['notice']);
let section = toRefs(prop);
</script>