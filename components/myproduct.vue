<template>
    <!-- {{carts}} -->

    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12 box-cart mt-5">
                <div class=" top-text">
                    <div class="row">
                        <div class="col">
                            <p class="title-cart">کد سبد</p>
                            <p  class="Sub-Cart">{{ carts.items[0].items[0].cart_id }}</p>
                        </div>
                        <div class="col">
                            <p class="title-cart">وضعیت</p>
                            <p class="Sub-Cart"> {{ carts.items[0].items[0].notice.status }}</p>
                        </div>
                        <div class="col">
                            <p class="title-cart">تاریخ پرداخت</p>
                            <p class="Sub-Cart">{{ carts.items[0].updated_at}}</p>
                        </div>
                        <div class="col">
                            <p class="title-cart">مبلغ(تومان)</p>
                            <p class="Sub-Cart">{{ carts.items[0].items[0].total_price }}</p>
                        </div>
                    </div>
                </div>
                <div class="bordersss"></div>
                <div class="row mt-3">
                    <div class="col-4">
                        <div class="col-sm imageBoxe">
                                <img ref="mainImage" id=""
                                    :src="`${useRuntimeConfig().public.BaseUrl}/${ carts.items[0].items[0].notice.gallery[0].image }`"
                                    class="cartImage ms-2" alt="">
                        </div>
                    </div>
                    <div class="col-8 mt-4">
                        <div class="row">
                            <div class="col-sm-6">
                                <p  class="maincart-Title">{{ carts.items[0].items[0].notice.title }}</p>
                            </div>
                            <div class="col-sm-6">
                                <p class="maincart-Title">{{ carts.items[0].items[0].notice.office.title }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <p class="maincart-Title"> مبلغ {{ carts.items[0].items[0].total_price }} تومان</p>
                            </div>
                            <div class="col-sm-6">
                                <p class="maincart-Title"> هزینه ارسال {{ carts.items[0].items[0].post_price }}  تومان</p>
                            </div>
                        </div>
                        <p class="maincart-Title"> تعداد {{ carts.items[0].items[0].count }}</p>
                    </div>
                </div>
                <!-- <div class="bordersss"></div> -->
                <div class="col-8 Box-Tozihat mt-2">
                    <div class="row">
                       <div class="col cart-Tozihat">
                        {{ carts.items[0].post_address.address.address_compact }}
                       </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col cart-Tozihat">
                            <i class="fa-solid fa-user"></i>
                            {{ carts.items[0].post_address.name }}
                            {{ carts.items[0].post_address.family }}
                        </div>               
                    </div>
                    <div class="row">
                        <div class="col cart-Tozihat">
                            <i class="fa fa-phone"></i>
                            {{ carts.items[0].post_address.mobile }}
                        </div>              
                    </div>
                    <div class="row">
                        <div class="col cart-Tozihat">
                            <i class="fa-solid fa-signs-post"></i>
                            {{ carts.items[0].post_address.post_code }}
                        </div>              
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useAuthStore } from '../store/auth';
const closeBox = ref(true);
const ShowBtn = ref(true);
const carts = ref(true);
const useUser = useAuthStore();


const emit = defineEmits(['clicked'])

const loadingStyle = (query) => {
  emit('clicked',query)
}

useUser.getCarts().then((r) => {      
        carts.value = r;
        loadingStyle(false);
    })
</script>