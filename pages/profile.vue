<template>
    <!-- {{user}} -->
    <!-- {{ pricing.items[0].title }} -->
    <!-- {{ subScribe }} -->
    <!-- {{ carts }} -->

    <div class="container-fluid">
        <div class="row ">

            <div class="col-12">
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
            </div>

            <div class="row">

                <div :class="(closeBox) ? `col-sm-2 liness dropdown-box` : `open-box col-sm-2 liness`">

                    <div class="col-sm-12">

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
                            <a @click="changeMenu('showDashboard')" href="#" class="mediumtxt ms-5">پیشخوان</a>
                        </div>
                        <div class="col hover mt-3">
                            <i class="fa-solid fa-wallet"></i>
                            <a @click="changeMenu('showWallet')" href="#" class="mediumtxt ms-5">کیف پول نقدی</a>
                        </div>
                        <div class="col hover mt-3">
                            <i class="fa-solid fa-money-bill"></i>
                            <a @click="changeMenu('BuyLicence')" href="#" class="mediumtxt ms-5"> خرید اشتراک</a>

                        </div>


                        <div class="col hover mt-3">
                            <i class="fa-solid fa-cart-shopping"></i>
                            <a @click="changeMenu('MyProduct')" href="#" class="mediumtxt ms-5"> خرید های من</a>
                        </div>
                        <div class="col hover mt-3">
                            <i class="fa-solid fa-arrow-down-wide-short"></i>
                            <a @click="changeMenu('MyOrder')" href="#" class="mediumtxt ms-5"> سفارش های من </a>
                        </div>
                        <div class="col hover mt-3">
                            <i class="fa-solid fa-money-bill"></i>
                            <a @click="changeMenu('MyLicence')" href="#" class="mediumtxt ms-5"> اشتراک های من</a>
                        </div>
                        <div class="col hover mt-3">
                            <i class="fa fa-address-book" aria-hidden="true"></i>
                            <a @click="changeMenu('Rolls')" href="#" class="mediumtxt ms-5">قوانین مقررات</a>
                        </div>
                        <div class="col hover mt-3">
                            <i class="fa fa-address-book" aria-hidden="true"></i>
                            <a @click="changeMenu('ContactUs')" href="#" class="mediumtxt ms-5"> تماس با ما</a>
                        </div>
                    </div>


                   
                </div>
                <div class="col-sm-1">
                    <button v-if="closeBox" type="button" id="closeicon" class="close mt-5" @click="closeBox = false">
                        <i class="fa-solid fa-arrow-left"></i>
                    </button>
                    <button v-if="!closeBox" type="button" class="close mt-5" @click="closeBox = true">
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
                <div class="col-sm-9">

                    <dashboard :user = "user" v-if="showDashboard" />
                    <cash-wallet v-if="showWallet" />
                    <buylicence v-if="BuyLicence" />
                    <myproduct v-if="MyProduct" />
                    <myorder v-if="MyOrder" />
                    <mylycence v-if="MyLicence" />
                    <roll v-if="Rolls" />
                    <contact v-if="ContactUs" />

                    <!-- <dashboard />
                  <dashboard />
                  <dashboard />
                  <dashboard /> -->
                </div>
            </div>
            <!-- <div class="notif">

            </div> -->
        </div>
    </div>
</template>




  
<!-- script -->
<script setup>
import { click } from 'ol/events/condition';
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
const closeBox = ref(true);
const showDashboard = ref(true);
const showWallet = ref(false);
const BuyLicence = ref(false);
const MyProduct = ref(false);
const MyOrder = ref(false);
const MyLicence = ref(false);
const Rolls = ref(false);
const ContactUs = ref(false);





const changeMenu = (name) => {
    console.log(name);
    showDashboard.value = false;
    showWallet.value = false;
    BuyLicence.value = false;
    MyProduct.value = false;
    MyOrder.value = false;
    MyLicence.value = false;
    Rolls.value = false;
    ContactUs.value = false;



    switch (name) {
        case 'showDashboard':
            showDashboard.value = true;
            break;
        case 'showWallet':
            showWallet.value = true;
            break;
        case 'BuyLicence':
            BuyLicence.value = true;
            break;
        case 'MyProduct':   
            MyProduct.value = true;
            break;
        case 'MyOrder':
            MyOrder.value = true;
            break;
        case 'MyLicence':
            MyLicence.value = true;
            break;
        case 'Rolls':
            Rolls.value = true;
            break;
        case 'ContactUs':
            ContactUs.value = true;
            break;
        default:
            break;
    }
}

setTimeout(() => {

  

    useUser.getSubScribe().then((r) => {
        subScribe.value = r;
    })

    useUser.getCarts().then((r) => {
        carts.value = r;
    })
}, 0);

</script>
