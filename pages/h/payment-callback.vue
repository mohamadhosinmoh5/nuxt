<template>

    <div class="row mt-5">
        <div v-if="useCart.error" class="col-sm-6 offset-sm-3 error text-center">
            {{ useCart.error.message }}
        </div>
        <div v-if="PayData !== null" class="col-sm-6 offset-sm-3 text-center">
            <div class="row">
                <div class="col-sm-12">
                    مبلغ : {{PayData.price}}
                </div>
                <div class="col-sm-12">
                    مبلغ : 10000
                </div>
                <div class="col-sm-12">
                    مبلغ : 10000
                </div>
                <div class="col-sm-12">
                    مبلغ : 10000
                </div>
                <div class="col-sm-12">
                    مبلغ : 10000
                </div>
            </div>
            <div class="row">
                بازگشت به عقب 
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '../store/cart';

const route = useRoute()
const params = route.query;
const useCart = useCartStore();
const PayData = ref(null)
console.log(params);

setTimeout(() => {
    useCart.verifyPay(params.trackId,params.orderId).then(()=> {
        PayData.value = r;
    })
}, 0);
// import { ref, watch } from "vue";
// console.log(Vue.ol);


</script>
