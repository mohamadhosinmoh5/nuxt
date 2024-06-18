<!-- TODO:
Performance Site
Performance Laptop
CSS: Option Sticky
Code Clean
Webstorm IDE 
Bug Fix
 Commit Push->Origin(Github) Fetch
 Branch -> Master
 Branch -> clean
 clean -> Master
 Componet Sakhtan
 Show error on My orders if(empty) => Componet Center Make one 
 Modal Bootstrap shadow - overlay 

-> 
-->

<template>
    <div class="container-fluild">
        <!-- <NuxtLayout name="header"></NuxtLayout> -->

        <div class="container-box">

            <div class="btn-navbar">
                <button v-if="closeBox" type="button" class="close-navbar mt-5" @click="closeBox = false">
                    <img src="assets/img/SinglePage_Image/togmenue.png" style="width: 40px;">

                </button>
            </div>

            <div :class="(closeBox) ? `sidebar dropdown-box` : `sidebar border-left`">

                <div class="logo_items col-sm-12">
                    <div class="TitleText">
                        <div class="col mt-3 ms-2">
                            <img src="assets/img/home.png" style="width: 25px;" alt="">
                            <h class="myhomenger ms-2">هومنگر من</h>
                            <a @click="modalOpen = true" style="cursor: pointer;" class="taghiratDaftar">
                                <i class="fa fa-repeat taghiratDaftar" aria-hidden="true"></i>
                                <span class="ms-2"> تغییر دفتر
                                </span>
                            </a>
                        </div>
                        <div class="liner-border col-12 mt-3 ms-3"></div>
                    </div>
                    <div v-if="modalOpen" class="daftar-modal">
                        <div class="daftarDetailes">
                            <div class="col-sm-12">
                                <div class="col">
                                    <a @click="modalOpen = false">
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
                <div class="menu_container">
                    <div class="menu_items">
                        <ul class="menu_item">

                            <li class="item">
                                <a href="#" @click="changeMenu('showDashboard')" class="link flex">
                                    <img src="assets/img/home.png" style="width: 25px;position: relative; right: 10%"
                                        alt="">
                                    <span class="text-spacing">پیشخوان</span>
                                </a>
                            </li>
                            <div class="borderProfile"></div>
                            <li class="item">
                                <a href="#" @click="changeMenu('showWallet')" class="link flex">
                                    <img src="assets/img/wallet.png" style="width: 25px;position: relative; right: 10%"
                                        alt="">
                                    <span class="text-spacing">کیف پول نقدی </span>
                                </a>
                            </li>
                            <div class="borderProfile"></div>
                        </ul>
                        <ul class="menu_item">
                            <li class="item">
                                <a href="#" @click="changeMenu('BuyLicence')" class="link flex">
                                    <img src="assets/img/buy.png" style="width: 25px;position: relative; right: 10%"
                                        alt="">
                                    <span class="text-spacing">خرید اشتراک </span>
                                </a>
                            </li>
                            <div class="borderProfile"></div>

                            <li class="item">
                                <a href="#" @click="changeMenu('MyProduct')" class="link flex">
                                    <img src="assets/img/shopping-bag.png"
                                        style="width: 25px;position: relative; right: 10%" alt="">
                                    <span class="text-spacing">خرید های من </span>
                                </a>
                            </li>
                            <div class="borderProfile"></div>

                            <li class="item">
                                <a href="#" @click="changeMenu('MyOrder')" class="link flex">
                                    <img src="assets/img/purchase-order.png"
                                        style="width: 25px;position: relative; right: 10%" alt="">
                                    <span class="text-spacing">سفارش های من</span>
                                </a>
                            </li>
                            <div class="borderProfile"></div>

                        </ul>
                        <ul class="menu_item">
                            <li class="item">
                                <a href="#" @click="changeMenu('MyLicence')" class="link flex ">
                                    <img src="assets/img/lists.png" style="width: 25px;position: relative; right: 10%"
                                        alt="">

                                    <span class="text-spacing">اشتراک های من</span>
                                </a>
                            </li>
                            <div class="borderProfile"></div>

                            <li class="item">
                                <a href="https://homeenger.com/mag/privacypolicy/" class="link flex">
                                    <img src="assets/img/information.png"
                                        style="width: 25px;position: relative; right: 10%" alt="">
                                </a>
                            </li>
                            <NuxtLink class="linkss" to="https://homeenger.com/mag/contact-us/">
                                <div class="col mt-3">
                                    <i class="fa fa-address-book" aria-hidden="true"></i>
                                    <a class="mediumtxt ms-2"> تماس با ما</a>
                                </div>
                            </NuxtLink>
                        </ul>

                    </div>

                </div>

                <div v-if="useUser.error?.message" class="notif error text-center">
                    <span @click="useUser.error.message = null" class="closeNotife">x</span>
                    <p>
                        {{ useUser.error.message }}
                    </p>
                </div>
            </div>
            <div class="div col-sm-1">
                <div v-if="closeBox" class="background-open">
                    <a class="openIcon" @click="closeBox = false"><img src="assets/img/left.png" alt=""></a>
                </div>

                <div v-if="!closeBox" class="background">
                    <a class="bcak" @click="closeBox = true"><img src="assets/img/right.png" alt=""></a>
                </div>

            </div>
            <div :style="(closeBox) ? `width:80% !important;` : `width:80% !important;`">
                <div v-if="loading" class="spinner-border text-secondary" role="status"></div>
                <dashboard @clicked="loadingStyle" :loading="loading" :user="user" v-if="showDashboard" />
                <cash-wallet @clicked="loadingStyle" :loading="loading" v-if="showWallet" />
                <buylicence @clicked="loadingStyle" :loading="loading" v-if="BuyLicence" />
                <myproduct @clicked="loadingStyle" :loading="loading" v-if="MyProduct" />
                <myorder @clicked="loadingStyle" :loading="loading" v-if="MyOrder" />
                <mylicence @clicked="loadingStyle" :loading="loading" v-if="MyLicence" />
                <roll v-if="Rolls" />
                <contact v-if="ContactUs" />
            </div>
        </div>
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
