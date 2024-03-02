<template>
    {{carts}}
</template>


<script setup>
import { useAuthStore } from '../store/auth';
const closeBox = ref(true);
const ShowBtn = ref(true);
const carts = ref(true);
const useUser = useAuthStore();

useUser.getCarts().then((r) => {
        carts.value = r;
    })
</script>