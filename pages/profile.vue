<template>
    <!-- {{user}} -->
    <!-- {{ pricing }} -->
    <!-- {{ subScribe }} -->
    <!-- {{ carts }} -->

    <div class="container-fluid">
        <div class="row ">
            <div class="border"></div>
            <div class="TitleText">
                <div class="col mt-3">
                    <i class="fa fa-home" aria-hidden="true"></i>
                    <h class="myhomenger ms-2">هومنگر من</h>
                    <a href="#" class="daftar">
                        <i class="fa fa-repeat" aria-hidden="true"></i>
                        تقیرات دفتر
                    </a>
                </div>
            </div>

            <div class="col-sm-2 liness">
                <div class="col-sm-12  mt-2 ms-4">
                    <div class="TopTitle">

                        <div class="col mt-4">
                            <a href="#" class="sub">موجودی کیف پول نقدی : 0تومان</a>
                        </div>
                        <div class="col">
                            <a href="#" class="sub">موجودی کیف پول اعتباری : 0تومان</a>
                        </div>
                    </div>
                    <div class="col mt-4 hover">
                        <i class="fa fa-address-book" aria-hidden="true"></i>
                        <a href="#" class="mediumtxt ms-5">پیشخوان</a>
                    </div>
                    <div class="col hover mt-3">
                        <i class="fa-solid fa-wallet"></i>
                        <a href="#" class="mediumtxt ms-5">کیف پول نقدی</a>
                    </div>
                    <div class="col hover mt-3">
                        <i class="fa-solid fa-money-bill"></i>
                        <a href="" class="mediumtxt ms-5"> خرید اشتراک</a>
                    </div>


                    <div class="col hover mt-3">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <a href="#" class="mediumtxt ms-5"> خرید های من</a>
                    </div>
                    <div class="col hover mt-3">
                        <i class="fa-solid fa-arrow-down-wide-short"></i>
                        <a href="#" class="mediumtxt ms-5"> سفارش های من </a>
                    </div>
                    <div class="col hover mt-3">
                        <i class="fa-solid fa-money-bill"></i>
                        <a href="#" class="mediumtxt ms-5"> اشتراک های من</a>
                    </div>
                    <div class="col hover mt-3">
                        <i class="fa fa-address-book" aria-hidden="true"></i>
                        <a href="#" class="mediumtxt ms-5">قوانین مقررات</a>
                    </div>
                    <div class="col hover mt-3">
                        <i class="fa fa-address-book" aria-hidden="true"></i>
                        <a href="#" class="mediumtxt ms-5"> تماس با ما</a>
                    </div>
                </div>


                <div class="detailes row">

                </div>
            </div>
            <div class="col-sm-10">
                <div class="row info-box mt-5">
                    <div class="box-info col-2"></div>
                    <div class="box-info col-2"></div>
                    <div class="box-info col-2"></div>

                </div>
                <div class="daftar-detailes">
                    <div class="col">
                        <a href="#" class="title">Lorem ipsum dolor sit amet.</a>
                    </div>
                    <div class="col">
                        <a href="#" class="title">Lorem ipsum dolor sit amet.</a>
                    </div>
                    <div class="col">
                        <a href="#" class="title">Lorem ipsum dolor sit amet.</a>
                    </div>
                </div>
            </div>
            <!-- <div class="notifcard animate">
                <div class="progress"></div>
            </div> -->
        </div>
    </div>
</template>




  
<!-- script -->
<script setup>
import { useAuthStore } from '../store/auth';
import { useMapStore } from '../store/map';
import { useNoticeStore } from '../store/notice';
import { useOfficeStore } from '../store/office';
import { useSearchStore } from '../store/search';

definePageMeta({
    middleware: 'auth'
})

const useUser = useAuthStore();
const user = ref(useUser.user);
const pricing = ref(null)
const subScribe = ref(null)
const carts = ref(null)

setTimeout(() => {
    useUser.getPricing().then((r) => {
        pricing.value = r;
    })

    useUser.getSubScribe().then((r) => {
        subScribe.value = r;
    })

    useUser.getCarts().then((r) => {
        carts.value = r;
    })
}, 0);

</script>
