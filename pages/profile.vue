<template>
    <div class="container-fluild">
        <div class="row">
            <div class="col-sm-12">
                <div class="border"></div>
                <div class="TitleText">
                    <div class="col mt-3">
                        <i class="fa fa-home " aria-hidden="true"></i>
                        <h class="myhomenger ms-2">هومنگر من</h>
                        <a @click="modalOpen = true" style="cursor: pointer;" class="taghiratDaftar">
                            <i class="fa fa-repeat taghiratDaftar" aria-hidden="true"></i>
                            تغییر دفتر
                        </a>
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
            </div>
        </div>


        <div class="container-box">
            <button v-if="closeBox" type="button" id="" class="close-navbar mt-5" @click="closeBox = false">
                <img src="assets/img/left.png" style="width: 30px;">

            </button>
            <button v-if="!closeBox" type="button" class="close-navbar mt-5" @click="closeBox = true">
                <img src="assets/img/right.png" style="width: 30px;">
            </button>


            <div :class="(closeBox) ? `navbar-profile dropdown-box` : `navbar-profile border-left`">
                <div >
                    <div class="col-md-12">
                        <div class="col-sm-12 mt-4 hover">
                            <i class="fa fa-address-book" aria-hidden="true"></i>
                            <a @click="changeMenu('showDashboard')" href="#" class="mediumtxt ms-2">پیشخوان</a>
                        </div>
                        <div class="col-sm-12 hover mt-3">
                            <i class="fa-solid fa-wallet"></i>
                            <a @click="changeMenu('showWallet')" href="#" class="mediumtxt ms-2">کیف پول نقدی</a>
                        </div>
                        <div class="col-sm-12 hover mt-3">
                            <i class="fa-solid fa-money-bill"></i>
                            <a @click="changeMenu('BuyLicence')" href="#" class="mediumtxt ms-1"> خرید اشتراک</a>

                        </div>


                        <div class="col-sm-12 hover mt-3">
                            <i class="fa-solid fa-cart-shopping"></i>
                            <a @click="changeMenu('MyProduct')" href="#" class="mediumtxt ms-1"> خرید های من</a>
                        </div>
                        <div class="col-sm-12 hover mt-3">
                            <i class="fa-solid fa-arrow-down-wide-short"></i>
                            <a @click="changeMenu('MyOrder')" href="#" class="mediumtxt ms-1"> سفارش های من </a>
                        </div>
                        <div class="col-sm-12 hover mt-3">
                            <i class="fa-solid fa-money-bill"></i>
                            <a @click="changeMenu('MyLicence')" href="#" class="mediumtxt ms-1"> اشتراک های من</a>
                        </div>
                        <NuxtLink class="linkss" to="https://homeenger.com/mag/privacypolicy/">
                            <div class="col hover mt-3">
                                <i class="fa fa-address-book" aria-hidden="true"></i>
                                <a href="#" class="mediumtxt ms-2">قوانین مقررات</a>
                            </div>
                        </NuxtLink>

                        <NuxtLink class="linkss" to="https://homeenger.com/mag/contact-us/">
                            <div class="col hover mt-3">
                                <i class="fa fa-address-book" aria-hidden="true"></i>
                                <a href="#" class="mediumtxt ms-2"> تماس با ما</a>
                            </div>
                        </NuxtLink>

                    </div>

                </div>

                <div v-if="useUser.error?.message" class="notif error text-center">
                    <span @click="useUser.error.message = null" class="closeNotife">x</span>
                    <p>
                        {{ useUser.error.message }}
                    </p>
                </div>
            </div>

            <div :style="(closeBox) ? `width:100% !important;` : `width:80% !important;`">
                <div v-if="loading" class="spinner-border text-secondary" role="status"></div>


                <dashboard :user="user" v-if="showDashboard" />
                <cash-wallet v-if="showWallet" />
                <buylicence @clicked="loadingStyle" :loading="loading" v-if="BuyLicence" />
                <myproduct @clicked="loadingStyle" :loading="loading" v-if="MyProduct" />
                <myorder @clicked="loadingStyle" :loading="loading" v-if="MyOrder" />
                <mylicence @clicked="loadingStyle" :loading="loading" v-if="MyLicence" />
                <roll v-if="Rolls" />
                <contact v-if="ContactUs" />
            </div>
        </div>
    </div>





    <!-- {{ pricing.items[0].title }} -->
    <!-- {{ subScribe }} -->
    <!-- {{ carts }} -->
    <!-- {{ offices }} -->
    <!-- {{ transactions }} -->
    <!-- {{ transactionBankReceipts }} -->
    <!-- <div class="container-fluid">
        <div class="row ">
            <div class="col-12">
                <div class="border"></div>
                <div class="TitleText">
                    <div class="col mt-3">
                        <i class="fa fa-home " aria-hidden="true"></i>
                        <h class="myhomenger ms-2">هومنگر من</h>
                        <a @click="modalOpen = true" style="cursor: pointer;" class="taghiratDaftar">
                            <i class="fa fa-repeat taghiratDaftar" aria-hidden="true"></i>
                            تغییر دفتر
                        </a>
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
            </div>

            <div class="col-sm-12 mt-5">
                <div class="row">
        
                    <div :class="(closeBox) ? `col-sm-2 liness dropdown-box` : `navbar-box col-sm-2 liness`">
                        <button v-if="closeBox" type="button" id="" class="close-navbar mt-5" @click="closeBox = false">
                            <img src="assets/img/sidebar.png" style="width: 35px;" alt="">
    
                        </button>
                        <button v-if="!closeBox" type="button" class="close-navbar mt-5" @click="closeBox = true">
                            <img src="assets/img/closebox.png" style="width: 35px;" alt="">
    
                        </button>
                        <div class="col-md-12">
                            <div class="col-sm-12 mt-4 hover">
                                <i class="fa fa-address-book" aria-hidden="true"></i>
                                <a @click="changeMenu('showDashboard')" href="#" class="mediumtxt ms-2">پیشخوان</a>
                            </div>
                            <div class="col-sm-12 hover mt-3">
                                <i class="fa-solid fa-wallet"></i>
                                <a @click="changeMenu('showWallet')" href="#" class="mediumtxt ms-2">کیف پول نقدی</a>
                            </div>
                            <div class="col-sm-12 hover mt-3">
                                <i class="fa-solid fa-money-bill"></i>
                                <a @click="changeMenu('BuyLicence')" href="#" class="mediumtxt ms-1"> خرید اشتراک</a>
    
                            </div>
    
    
                            <div class="col-sm-12 hover mt-3">
                                <i class="fa-solid fa-cart-shopping"></i>
                                <a @click="changeMenu('MyProduct')" href="#" class="mediumtxt ms-1"> خرید های من</a>
                            </div>
                            <div class="col-sm-12 hover mt-3">
                                <i class="fa-solid fa-arrow-down-wide-short"></i>
                                <a @click="changeMenu('MyOrder')" href="#" class="mediumtxt ms-1"> سفارش های من </a>
                            </div>
                            <div class="col-sm-12 hover mt-3">
                                <i class="fa-solid fa-money-bill"></i>
                                <a @click="changeMenu('MyLicence')" href="#" class="mediumtxt ms-1"> اشتراک های من</a>
                            </div>
                            <NuxtLink class="linkss" to="https://homeenger.com/mag/privacypolicy/">
                                <div class="col hover mt-3">
                                    <i class="fa fa-address-book" aria-hidden="true"></i>
                                    <a href="#" class="mediumtxt ms-2">قوانین مقررات</a>
                                </div>
                            </NuxtLink>
    
                            <NuxtLink class="linkss" to="https://homeenger.com/mag/contact-us/">
                                <div class="col hover mt-3">
                                    <i class="fa fa-address-book" aria-hidden="true"></i>
                                    <a href="#" class="mediumtxt ms-2"> تماس با ما</a>
                                </div>
                            </NuxtLink>
    
                        </div>
                    </div>
                    <div v-if="useUser.error?.message" class="notif error text-center">
                        <span @click="useUser.error.message = null" class="closeNotife">x</span>
                        <p>
                            {{ useUser.error.message }}
                        </p>
                    </div>
    
                    <div class="col-sm-10">
                        <div v-if="loading" class="spinner-border text-secondary" role="status"></div>
                        <dashboard :user="user" v-if="showDashboard" />
                        <cash-wallet v-if="showWallet" />
                        <buylicence @clicked="loadingStyle" :loading="loading" v-if="BuyLicence" />
                        <myproduct @clicked="loadingStyle" :loading="loading" v-if="MyProduct" />
                        <myorder @clicked="loadingStyle" :loading="loading" v-if="MyOrder" />
                        <mylicence @clicked="loadingStyle" :loading="loading" v-if="MyLicence" />
                        <roll v-if="Rolls" />
                        <contact v-if="ContactUs" />
    
                      
                    </div>
                </div>

            </div>
             <div class="notif">

            </div>
        </div>
    </div> -->
</template>




  
<!-- script -->
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
    loadingStyle(false);
    useUser.getCarts().then((r) => {
        carts.value = r;
    })

    useUser.getCarts().then((r) => {
        carts.value = r;
    })

    useUser.transaction().then((r) => {
        transactions.value = r;
    })

    // useUser.transactionBankReceipts().then((r) => {
    //     transactionBankReceipts.value = r;
    // })


}, 0);

</script>
