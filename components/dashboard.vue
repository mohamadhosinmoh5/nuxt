<template>

<!-- {{ carts }} -->
    <div class="row all-boxes">
        <div class="col-sm-12">
        <UModal v-if="isOpen">
            <div class="paying row">
                <div class="col-sm-12">
                    <div class="col">
                        <a href="#" class="exit" @click="isOpen = false">
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>
                        <a href="#" class="tile ms-2">افزایش موجودی</a>
                    </div>
                    <div class="border-modal mt-2"></div>
                    <div class="row mt-3 ms-5">
                        <div class="col-6">
                            <a href="#" @click="changePayiintTab('bank')" class="bank">درگاه بانکی</a>
                        </div>
                        <div class="col-6">
                            <a href="#" @click="changePayiintTab('fish')" class="fish disable">فیش واریزی</a>
                        </div>
                    </div>
                    <!-- <div ref="payiinBorder" class="payiin-border"></div> -->
                    <div class="col bank-detailes mt-4">
                        <a href="#" class="txtpay">مبلغ مورد نظر را جهت افزودن به کیف پول وارد گنید</a>
                        <div class="col-12 forms">
                            <input v-model="price" type="text" placeholder="مبلغ(تومان)">
                        </div>
                    </div>
                    <div v-if="fish" class="col fish-detailes">خالی است</div>
                    <button @click="deposit()" type="button" class="btn-sabt col-10  btn-secondary">ثبت</button>

                </div>
            </div>
        </UModal>
        <div class="row">
            <!-- <div class="col-sm box-info mt-5 ms-5">
                <div class="row">
                    <div class="col-sm">
                        <a href="#" class="wallettxt">کیف پول نقدی : 0 تومان</a>
                    </div>
                    <div class="col-sm-12">
                        <button @click="isOpen = true" type="button" class="col-sm-5 btn btn-light">
                            <a href="#" class="btntext">افزایش موجودی</a>
                        </button>
                    </div>
                </div>
            </div> -->
            <div id="roaunded" class="col-sm box-info mt-5 ms-5">
                <div class=" row">
                    <div class="col-sm">
                        <a href="#" class="wallettxt">کیف پول اعتباری : 0تومان</a>
                    </div>
                    <div class="col-sm-12">
                        <button @click="isOpen = true" type="button" class="col-sm-5 btn btn-light">
                            <a href="#" class="btntext">افزایش موجودی</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <div class="row ">
            <div class="col-sm-3 box-buttom mt-5 ms-5">
                <div class="col card-body">
                    <div class="col">
                        <a href="#" class="wallettxt">اشتراک های فعال</a>
                    </div>
                    <div class="borderrs"></div>
                    <p v-if="!subScribe" class="greentxt">اشتراک فعال ندارید , فعلا مهمون هومنگر باش</p>
                    <span class="greentxt" v-if="subScribe" v-for="(item, index) in subScribe.items" :key="index" >
                        {{item.matter_pricing.title}}
                        <br>
                    </span>
                </div>
            </div>
            <div id="roaunded" class="col-sm box-buttom mt-5 ms-5">
                <div class="col card-body">
                    <div class="col row">
                        <p href="#" class="wallettxt">
                            <img src="/assets/img/basket.svg" style="width: 30px;" alt="">
                            خرید های من
                        </p>
                    </div>
                    <div class="linese"></div>
                   
                    <!-- <a href="#" id="" class="lice mt-2">درحال انجام</a> -->
                    <div v-if="carts.items" class="row mt-2">
                        <div class="col-4">
                            
                            <div class="col-sm imageBoxe">
                                <img ref="mainImage" id=""
                                    :src="`${useRuntimeConfig().public.BaseUrl}/${carts?.items[0]?.items[0]?.notice?.gallery[0]?.image}`"
                                    class="prodict-image ms-2" alt="">
                            </div>
                        </div>
                        <div class="col-8">
                            <div class="row">
                                <div class="col-sm-6">
                                    <p class="maincart-Title">{{ carts.items[0]?.items[0]?.notice?.title }}</p>
                                </div>
                                <div class="col-sm-6">
                                    <p class="maincart-Title"> مبلغ {{ carts?.items[0]?.items[0]?.total_price }} تومان</p>

                                </div>
                            </div>
                            <p class="maincart-Title"> تعداد {{ carts?.items[0]?.items[0]?.count }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </div>
    <!-- <div class="mainBoxess">
        <div class="col-sm-12">
        
            <div class="col-sm mt-3">
                <a href="#" class="title ms-5"> تعداد {{ user.user.offices[0].ability.visits[2].number }}  بازدید از آگهی های  </a>
                <a href="#" class="title">{{ user.user.offices[0].ability.visits[2].matter_target.title }}</a>


            </div>
       

    </div>
    </div> -->
</template>


<script setup>
import { useAuthStore } from '../store/auth';
const carts = ref(true);
const useUser = useAuthStore();
const isOpen = ref(false);
const bank = ref(true);
const fish = ref(false);
const user = defineProps(['user']);
const price = ref(null)
const subScribe = ref(null)

const emit = defineEmits(['clicked'])

const loadingStyle = (query) => {
    emit('clicked', query)
}

setTimeout(() => {
    useUser.getCarts().then((r) => {
        carts.value = r;
        loadingStyle(false);
    })

    useUser.getSubScribe().then((r) => {
        subScribe.value = r;
    })
}, 0);

const changePayiintTab = (name) => {
    bank.value = false;
    fish.value = false;

    switch (name) {
        case 'bank':
            payiinBorder.value.style.left = "0%";
            bank.value = true;

            break;
        case 'fish':
            payiinBorder.value.style.left = "20%";
            fish.value = true;

            break;
        default:
            break;

    }

}

const deposit = async () => {
        useUser.deposit(price.value).then((r) => {
            if(r.action){
                window.location = r.action;
            }
            // loadingStyle(false);
        })
    }

    



</script>