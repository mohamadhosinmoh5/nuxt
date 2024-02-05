<template>
    <div dir="rtl" class="container-fluild p-4">
    <div v-if="cart">
        
    </div>
    <title>
        {{ params.slug }}
    </title>


    <!-- <div class="row" id="scroll" >
        <div v-if="pending">
            fetching...
        </div>
       
         <div class="col-sm-12">
            <single-notice  :notice="useNotice?.notice" />
        </div> -->
       <!--- <div v-if="useNotice?.notice?.category?.properties?.is_product" class="addProduct">
            <button class="btn btn-info" @click="useCart.addToCart(useNotice?.notice?.id)">add product</button>
            <button class="btn btn-danger" @click="useCart.removeCart(useNotice?.notice?.id)">remove product</button>
            
            <div v-if="useCart.error">
                {{ useCart.error.message }}
            </div>
            <div v-if="useCart.message">
                {{ useCart.message }}
            </div>
        </div>
    </div> -->
    </div>
</template>

<script setup>
import { useCartStore } from '../store/cart';
import { useNoticeStore } from '../store/notice';

definePageMeta({
    middleware:'auth'
})


const route = useRoute()
const params = route.params;
const useNotice = useNoticeStore();
const useCart = useCartStore();
const cart = ref(null);

watch(useCart,async (newdata) => {
    if(cart.value.items != null)
        cart.value.items = newdata.cart.items;
    // pending.value = false;
})

setTimeout(async () => {
    await useNotice.getNotice(params.noticeId).then(()=>{
        // pending.value = false;
    });

    cart.value = await useCart.getCart();
    
});

</script>