<template>
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
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="#" @click="changePayiintTab('bank')" class="bank">درگاه بانکی</a>
                        </div>
                        <div class="col-6">
                            <a href="#" @click="changePayiintTab('fish')" class="fish">فیش واریزی</a>
                        </div>
                    </div>
                    <div ref="payiinBorder" class="payiin-border"></div>
                    <div class="col bank-detailes mt-4">
                        <a href="#" class="txtpay">مبلغ مورد نظر را جهت افزودن به کیف پول وارد گنید</a>
                        <div class="col-12 forms">
                            <input type="text" placeholder="مبلغ(تومان)">
                        </div>
                    </div>
                    <div v-if="fish" class="col fish-detailes">خالی است</div>
                    <button type="button" class="btn col-10  btn-secondary">ثبت</button>

                </div>
            </div>
        </UModal>
        <div class="row">
            <div class="col-sm box-info mt-5">
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
            </div>
            <div id="roaunded" class="col-sm box-info mt-5">
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
            <div class="col-sm-3 box-buttom mt-5">
                <div class="col card-body">
                    <div class="col">
                        <a href="#" class="wallettxt">اشتراک های فعال</a>
                    </div>
                    <div class="borderrs"></div>
                    <p href="#" class="greentxt">اشتراک فعال ندارید , فعلا مهمون هومنگر باش</p>
                </div>
            </div>
            <div  id="roaunded" class="col-sm box-buttom mt-5">
                <div class="col card-body">
                    <div class="col row">
                        <p href="#" class="wallettxt">
                            <img src="/_nuxt/assets/img/basket.svg" style="width: 30px;" alt="">
                            خرید های من
                        </p>
                    </div>
                    <div class="linese"></div>
                    <!-- <a href="#" id="" class="lice mt-2">درحال انجام</a> -->
                    <div class="col-sm-12 mt-2">
                        <p href="#" class="styling"> سبد خرید شما خالی است!  </p>
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
const isOpen = ref(false);
const bank = ref(true);
const fish = ref(false);
const user = defineProps(['user']);




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
</script>