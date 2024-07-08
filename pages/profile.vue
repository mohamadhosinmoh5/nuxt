<template>
    <div class="container-fluid">
        <loader :start="start"/>
        <div class="d-flex justify-content-between">
            <div :class="['main-content', { 'main-content-expanded': closeBox }]">
                <!-- <div v-if="loading" class="spinner-border text-secondary" role="status"></div> -->
                <dashboard @clicked="loadingStyle" :loading="loading" :user="user" v-if="showDashboard" />
                <cash-wallet @clicked="loadingStyle" :loading="loading" v-if="showWallet" />
                <buylicence @clicked="loadingStyle" :loading="loading" v-if="BuyLicence" />
                <myproduct @clicked="loadingStyle" :loading="loading" v-if="MyProduct" />
                <myorder @clicked="loadingStyle" :loading="loading" v-if="MyOrder" />
                <mylicence @clicked="loadingStyle" :loading="loading" v-if="MyLicence" />
                <roll v-if="Rolls" />
                <contact v-if="ContactUs" />
            </div>

            <div :class="['sidebar', { 'sidebar-open': closeBox }]">
                <button type="button" class="toggle-navbar mt-5" @click="toggleSidebar">
                    <img v-if="closeBox" src="assets/img/left.png" style="width: 20px;">
                    <img v-else src="assets/img/right.png" style="width: 20px;">
                </button>
                <div class="logo_items col-sm-12">
                    <div class="TitleText">
                        <div class="col mt-3 ms-2">
                            <!-- <img src="assets/img/home.png" style="width: 25px;" alt=""> -->
                            <span class="myhomenger" v-if="!closeBox">هومنگر من</span>
                            <a @click="modalOpen = true" style="cursor: pointer;" class="taghiratDaftar"
                                v-if="!closeBox">
                                <i class="fa fa-repeat taghiratDaftar mt-1" aria-hidden="true"></i>
                                <span class=""> تغییر دفتر</span>
                            </a>
                        </div>
                    </div>
                    <!-- <div v-if="modalOpen" class="daftar-modal">
                        <div class="daftarDetailes">
                            <div class="col-sm-12">
                                <div class="col">
                                    <a @click="modalOpen = false">
                                        <i id="khoroj" class="fa-solid fa-arrow-right"></i>
                                    </a>
                                    <span id="korojtxt" class="ms-2">انتخاب دفتر</span>
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
                    </div> -->

                </div>
                <div class="liner-border col-12 mt-5" v-if="!closeBox"></div>

                <div class="menu_container">
                    <div class="menu_items mt-5">
                        <ul class="menu_item">
                            <li class="item">
                                <a href="#" @click="changeMenu('showDashboard')" class="links flex">
                                    <img src="assets/img/home.png" style="width: 25px;" alt="">
                                    <span class="text-spacing" v-if="!closeBox">پیشخوان</span>
                                </a>
                            </li>
                            <div class="borderProfile" v-if="!closeBox"></div>
                            <li class="item">
                                <a href="#" @click="changeMenu('showWallet')" class="links flex">
                                    <img src="assets/img/wallet.png" style="width: 25px;" alt="">
                                    <span class="text-spacing" v-if="!closeBox">کیف پول نقدی </span>
                                </a>
                            </li>
                            <div class="borderProfile" v-if="!closeBox"></div>
                        </ul>
                        <ul class="menu_item">
                            <li class="item">
                                <a href="#" @click="changeMenu('BuyLicence')" class="links flex">
                                    <img src="assets/img/buy.png" style="width: 25px;" alt="">
                                    <span class="text-spacing" v-if="!closeBox">خرید اشتراک </span>
                                </a>
                            </li>
                            <div class="borderProfile" v-if="!closeBox"></div>
                            <li class="item">
                                <a href="#" @click="changeMenu('MyProduct')" class="links flex">
                                    <img src="assets/img/shopping-bag.png" style="width: 25px;" alt="">
                                    <span class="text-spacing" v-if="!closeBox">خرید های من </span>
                                </a>
                            </li>
                            <div class="borderProfile" v-if="!closeBox"></div>
                            <li class="item">
                                <a href="#" @click="changeMenu('MyOrder')" class="links flex">
                                    <img src="assets/img/purchase-order.png" style="width: 25px;" alt="">
                                    <span class="text-spacing" v-if="!closeBox">سفارش های من</span>
                                </a>
                            </li>
                            <div class="borderProfile" v-if="!closeBox"></div>
                        </ul>
                        <ul class="menu_item">
                            <li class="item">
                                <a href="#" @click="changeMenu('MyLicence')" class="links flex ">
                                    <img src="assets/img/lists.png" style="width: 25px;" alt="">
                                    <span class="text-spacing" v-if="!closeBox">اشتراک های من</span>
                                </a>
                            </li>
                            <div class="borderProfile" v-if="!closeBox"></div>
                            <li class="item">
                                <a href="https://homeenger.com/mag/privacypolicy/" class="links flex">
                                    <img src="assets/img/information.png" style="width: 25px;" alt="">
                                    <span class="text-spacing" v-if="!closeBox">قوانین و مقررات</span>

                                </a>
                            </li>
                            <div class="borderProfile" v-if="!closeBox"></div>

                            <li class="item">
                                <a href="https://homeenger.com/mag/contact-us/" class="links flex">
                                    <img src="assets/img/information.png" style="width: 25px;" alt="">
                                    <span class="text-spacing" v-if="!closeBox"> تماس با ما </span>

                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-if="useUser.error?.message" class="notif error text-center">
                    <span @click="useUser.error.message = null" class="closeNotife">x</span>
                    <p>{{ useUser.error.message }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'

definePageMeta({
    middleware: 'auth'
})

const useUser = useAuthStore()
const user = ref(useUser.user)
const closeBox = ref(false)
const showDashboard = ref(true)
const showWallet = ref(false)
const BuyLicence = ref(false)
const MyProduct = ref(false)
const MyOrder = ref(false)
const MyLicence = ref(false)
const Rolls = ref(false)
const ContactUs = ref(false)
const modalOpen = ref(false)
const loading = ref(true)
const start = ref(true)

const loadingStyle = (query) => {
    // loading.value = false
    start.value = false
}

const changeMenu = (name) => {
    loading.value = true
    showDashboard.value = false
    showWallet.value = false
    BuyLicence.value = false
    MyProduct.value = false
    MyOrder.value = false
    MyLicence.value = false
    Rolls.value = false
    ContactUs.value = false

    switch (name) {
        case 'showDashboard':
            showDashboard.value = true
            break
        case 'showWallet':
            showWallet.value = true
            break
        case 'BuyLicence':
            BuyLicence.value = true
            break
        case 'MyProduct':
            MyProduct.value = true
            break
        case 'MyOrder':
            MyOrder.value = true
            break
        case 'MyLicence':
            MyLicence.value = true
            break
        case 'Rolls':
            Rolls.value = true
            break
        case 'ContactUs':
            ContactUs.value = true
            break
        default:
            break
    }
}

const toggleSidebar = () => {
    closeBox.value = !closeBox.value
}

setTimeout(() => {
    start.value = true
    useUser.getCarts().then((r) => {
        carts.value = r
        // this.start = false
        loadingStyle(false)
    })

    useUser.getCarts().then((r) => {
        carts.value = r
    })
}, 0)
</script>
