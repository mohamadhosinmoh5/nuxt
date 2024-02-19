<template>
    <!-- {{user}} -->
    <!-- {{ pricing }} -->
    <!-- {{ subScribe }} -->
    <!-- {{ carts }} -->

    <div class="container-fluid">
        <div class="row" style="margin: 0 !important;padding: 0 !important;">
            <div class="col-sm-2 liness">
                <div class="TitleText row">
                    <div class="col mt-3">
                        icon
                        <a href="#" class="daftar ms-5">تقیرات دفتر</a>
                    </div>
                </div>
                <div class="TopTitle mt-3 ms-2">
                    <div class="col">
                        <a href="#" class="title">هومنگر من</a>
                    </div>
                    <div class="col mt-4">
                        <a href="#" class="sub">موجودی کیف پول نقدی : 0تومان</a>
                    </div>
                    <div class="col">
                        <a href="#" class="sub">موجودی کیف پول اعتباری : 0تومان</a>
                    </div>
                </div>
                <div class="border mt-2"></div>
                <div class="detailes row">
                    <div class="col-sm-12 mt-3">
                        <div class="col">
                            <i class="fa fa-address-book" aria-hidden="true"></i>
                            <a href="#" class="mediumtxt ms-5">پیشخوان</a>
                        </div>
                        <div class="col mt-3">
                            <i class="fa fa-address-book" aria-hidden="true"></i>
                            <a href="#" class="mediumtxt ms-5">کیف پول نقدی</a>
                        </div>
                        <div class="col mt-3">
                            <i class="fa fa-address-book" aria-hidden="true"></i>
                            <a href="#modalss" class="mediumtxt ms-5"> خرید اشتراک</a>
                            <div class="modassl" id="modalss">
                                <div class="modal-my ">
                                    <!-- <img class="check" src="~/assets/check-icon.png" alt="" /> -->
                                    <h6>Saved!</h6>
                                    <p>Your Details have been saved Successfully</p>
                                    <button>Go Home</button>
                                </div>

                            </div>
                        </div>
                       

                        <div class="col mt-3">
                            <i class="fa fa-address-book" aria-hidden="true"></i>
                            <a href="#" class="mediumtxt ms-5"> خرید های من</a>
                        </div>
                        <div class="col mt-3">
                            <i class="fa fa-address-book" aria-hidden="true"></i>
                            <a href="#" class="mediumtxt ms-5"> سفارش های من </a>
                        </div>
                        <div class="col mt-3">
                            <i class="fa fa-address-book" aria-hidden="true"></i>
                            <a href="#" class="mediumtxt ms-5"> اشتراک های من</a>
                        </div>
                        <div class="col mt-3">
                            <i class="fa fa-address-book" aria-hidden="true"></i>
                            <a href="#" class="mediumtxt ms-5">قوانین مقررات</a>
                        </div>
                        <div class="col mt-3">
                            <i class="fa fa-address-book" aria-hidden="true"></i>
                            <a href="#" class="mediumtxt ms-5"> تماس با ما</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-10">
                <div class="Cards row mt-5">
                    <div class="col-2">
                        <div class="card1"></div>
                    </div>
                    <div class="col-2">
                        <div class="card1"></div>
                    </div>
                    <div class="col-2">
                        <div class="card1"></div>
                    </div>
                </div>
            </div>
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
