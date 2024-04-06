<template>


    <div class="col-sm-2">
        <div :class="(closeBox) ? `sidebar` : `hidNav`">

            <div class="logo_items flex">
                <div class="TitleText">
                    <div class="col mt-3 ms-2">
                        <img src="assets/img/home.png" style="width: 25px;" alt="">
                        <h class="myhomenger ms-2">هومنگر من</h>
                        <a @click="modalOpen = true" style="cursor: pointer;" class="taghiratDaftar">
                            <i class="fa fa-repeat taghiratDaftar" aria-hidden="true"></i>
                            تغییر دفتر
                        </a>
                    </div>
                    <div class="liner-border col-12 mt-3 ms-3"></div>
                    <div v-if="modalOpen" class="daftar-modal">
                        <div class="daftarDetailes">
                            <div class="col-sm-12">
                                <div class="col">
                                    <a>
                                        <i id="khoroj" class="fa-solid fa-arrow-right"></i>
                                    </a>
                                    <a id="korojtxt" class="ms-2">انتخاب دفتر</a>
                                </div>
                                <div class="border-modal mt-2"></div>

                                <div v-for="office in user.offices" class="col-sm row">
                                    <a @click="useUser.setDefaultOffice(office.id), navigateTo('/')"
                                        :class="(office.id == useUser.getdefaultOffice) ? `wallettxt active mt-3` : `wallettxt mt-3`">
                                        {{ office.title }}
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="menu_container">
                <div class="menu_items">
                    <ul class="menu_item">

                        <li class="item">
                            <a href="#" @click="changeMenu('showDashboard')" class="link flex">
                                <img src="assets/img/home.png" style="width: 25px;position: relative; right: 10%"
                                    alt="">
                                <span class="ms-4">پیشخوان</span>
                            </a>
                        </li>
                        <li class="item">
                            <a href="#" @click="changeMenu('showWallet')" class="link flex">
                                <img src="assets/img/home.png" style="width: 25px;position: relative; right: 10%"
                                    alt="">
                                <span class="ms-4">کیف پول نقدی </span>
                            </a>
                        </li>
                    </ul>
                    <ul class="menu_item">
                        <li class="item">
                            <a href="#" @click="changeMenu('BuyLicence')" class="link flex">
                                <i class="fa-sharp fa-solid fa-store NewIcon"></i>
                                <span>خرید اشتراک </span>
                            </a>
                        </li>
                        <li class="item">
                            <a href="#" @click="changeMenu('MyProduct')" class="link flex">
                                <i class="fa-sharp fa-solid fa-cart-shopping NewIcon"></i>
                                <span>خرید های من </span>
                            </a>
                        </li>
                        <li class="item">
                            <a href="#" @click="changeMenu('MyOrder')" class="link flex">
                                <i class="fa fa-address-book NewIcon" aria-hidden="true"></i>
                                <span>سفارش های من</span>
                            </a>
                        </li>
                    </ul>
                    <ul class="menu_item">
                        <li class="item">
                            <a href="#" @click="changeMenu('MyLicence')" class="link flex ">
                                <i class="fa fa-address-book NewIcon" aria-hidden="true"></i>

                                <span>اشتراک های من</span>
                            </a>
                        </li>
                        <li class="item">
                            <a href="#" class="link flex">
                                <i class="fa fa-address-book NewIcon" aria-hidden="true"></i>

                                <span>قوانین مقررات</span>
                            </a>
                        </li>
                        <li class="item">
                            <a href="#" class="link flex">
                                <i class="fa fa-address-book NewIcon" aria-hidden="true"></i>

                                <span>تماس با ما</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- <div class="sidebar_profile flex">
                    <span class="nav_image">
                    </span>
                    <div class="data_text">
                        <span class="email">homenger@gmail.com</span>
                    </div>
                </div> -->
            </div>

        </div>
    </div>
    <!-- main details -->
    <div class="div col-sm-1">

        <div v-if="closeBox" class="background">
            <a class="bcak" @click="closeBox = false"><img src="assets/img/right.png" alt=""></a>
        </div>
        <div v-if="!closeBox" class="background-open">
            <a class="openIcon" @click="closeBox = true"><img src="assets/img/left.png" alt=""></a>
        </div>

    </div>
    <!-- <a @click="closeBox = false">SDDAA</a> -->
    <div class="col-sm-9">
        <dashboard @clicked="loadingStyle" :loading="loading" :user="user" v-if="showDashboard" />
        <cash-wallet @clicked="loadingStyle" :loading="loading" v-if="showWallet" />
        <buylicence @clicked="loadingStyle" :loading="loading" v-if="BuyLicence" />
        <myproduct @clicked="loadingStyle" :loading="loading" v-if="MyProduct" />
        <myorder @clicked="loadingStyle" :loading="loading" v-if="MyOrder" />
        <mylicence @clicked="loadingStyle" :loading="loading" v-if="MyLicence" />
        <roll v-if="Rolls" />
        <contact v-if="ContactUs" />
        <div v-if="loading" class="spinner-border text-secondary" role="status"></div>

    </div>



</template>

<script setup>

import { useAuthStore } from '../store/auth';

definePageMeta({
    middleware: 'auth'
})

const useUser = useAuthStore();
const user = ref(useUser.user);
const pricing = ref(null)
const subScribe = ref(null)
const carts = ref(null)
const closeBox = ref(false);
const showDashboard = ref(true);
const showWallet = ref(false);
const BuyLicence = ref(false);
const MyProduct = ref(false);
const MyOrder = ref(false);
const MyLicence = ref(false);
const Rolls = ref(false);
const ContactUs = ref(false);
const modalOpen = ref(false);
const transactions = ref(null);
const transactionBankReceipts = ref(null)
const loading = ref(true);


const loadingStyle = (query) => {
    loading.value = false;
}


const changeMenu = (name) => {
    loading.value = true;
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
    useUser.getCarts().then((r) => {
        carts.value = r;
        loadingStyle(false);
    })

    useUser.getCarts().then((r) => {
        carts.value = r;
    })



}, 0);

</script>