<template>
    <div class="row mt-5">
        <div class="col-sm-10 offset-sm-1">
            <div class="row box-wall">
                <div class="col-6">
                    <a href="#" class="Title">کیف پول نقدی</a>
                </div>
                <div class="col-6">
                    <button @click="isOpen = true" type="button" class="col-sm-5 btn btn-light">
                        <a href="#" class="btntext">افزایش موجودی</a>
                    </button>
                </div>

                <div class="col-6">
                    <a href="#" class="Title">0تومان</a>
                </div>
                <div  class="col-6">
                    <button  @click="tasfie = true" type="button" class="btn btn-light">
                        <a href="#" class="btntext">تسفیه </a>

                    </button>
                </div>
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
                            <div v-if="bank" class="col bank-detailes mt-4">
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
                <UModal v-if="tasfie">
                    <div class="paying row">
                        <div class="col-sm-12">
                            <div class="col">
                                <a href="#" class="exit" @click="tasfie = false">
                                    <i class="fa-solid fa-arrow-right"></i>
                                </a>
                                <a href="#" class="tile ms-2">درخواست تسفیه</a>
                            </div>
                            <div class="border-modal mt-2"></div>
                            <div class="row mt-3">
                            <div class="col">
                                <p>مبلغ مورد نظر جهت برداشت از کیف پول را وارد کنید</p>
                            </div>
                                
                            </div>
                            <div v-if="bank" class="col bank-detailes">
                                <a href="#" class="txtpay"> حد اکثر تا سه روز کاری مبلغ درخواستی به حساب شبای ثبت شده واریز خواهد شد. </a>
                                <div class="col-12 forms">
                                    <input type="text" placeholder="مبلغ(تومان)">
                                </div>
                            </div>
                            <div v-if="fish" class="col fish-detailes">خالی است</div>
                            <button type="button" class="btn col-10  btn-secondary">ثبت</button>

                        </div>
                    </div>
                </UModal>
            </div>
            <div class="row mt-5 mobil">
                <div class="col-4">
                    <span @click="chnageTabMenu('wallet')"> تراکنش ها</span>
                </div>
                <div class="col-4">
                    <span @click="chnageTabMenu('verify')"> فیش واریزی</span>
                </div>
                <div class="col-4">
                    <span @click="chnageTabMenu('setting')"> تنظیمات</span>
                </div>
            </div>
            <div ref="underline" class="col-2 underline"></div>

            <div class="row">

                <div v-if="wallet" class="col-sm-12 mt-3 mobil">

                    <div class="col">
                        <a href="#" class="mabalegh">مبلغ : </a>
                        <a href="#" class="mabalegh">250,000</a>
                    </div>
                    <div class="col mt-2">
                        <a href="#" class="mabalegh">نوع : </a>
                        <a href="#" class="mabalegh">واریزی</a>
                    </div>
                    <div class="col mt-2">
                        <a href="#" class="mabalegh">وضعیت : </a>
                        <a href="#" class="mabalegh">انجام شده</a>
                    </div>
                    <div class="col mt-2">
                        <a href="#" class="mabalegh">کدرهیگیری : </a>
                        <a href="#" class="mabalegh">ندارد</a>
                    </div>
                    <div class="col mt-2">
                        <a href="#" class="mabalegh">توضیحات : </a>
                        <a href="#" class="mabalegh">شارژ کیفه پول</a>
                    </div>
                </div>
                <div v-if="verify" class="col-sm-12">

                    verify

                </div>
                <div v-if="setting" class="col-sm-12  ">

                    <div class="col shaba mt-5">
                        <a href="#" class="Title ">*شبا</a>
                    </div>
                    <div class="col-10 forms">
                        <input type="text" placeholder="شماره شبا">
                    </div>
                    <div class="text-shaba mt-3">
                        <a href="#">شماره شبا شما که بانک به شما داده است برای مثال : IR234525690123456789011234</a>
                    </div>
                    <div class="mediumtxt mt-2">
                        <a href="#" class="Title">نحوه تسفیه حساب</a>
                    </div>
                    <div class="form-check mobil">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate">
                        <label class="form-check-label" for="flexCheckIndeterminate">
                            هفتگی
                        </label>
                    </div>
                    <div class="form-check mobil">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate">
                        <label class="form-check-label" for="flexCheckIndeterminate">
                            ماهانه
                        </label>
                    </div>
                    <div class="form-check mobil" >
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate">
                        <label class="form-check-label" for="flexCheckIndeterminate">
                            دستی
                        </label>
                    </div>
                    <button type="button" class="col-2 btn btn-success">ثبت</button>
                    <div class="col warn">
                        <a href="#" class="mediumtxt">توجه</a>
                    </div>
                    <div class="col multyline">
                        <a href="#">ادامه توضیحات</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>




<script setup>
const closeBox = ref(true);
const ShowBtn = ref(true);
const underline = ref(null);
const payiinBorder = ref(null);
const wallet = ref(true)
const verify = ref(false)
const setting = ref(false)
const isOpen = ref(false);
const tasfie = ref(false);
const bank = ref(true);
const fish = ref(false);


const emit = defineEmits(['clicked'])

const loadingStyle = (query) => {
  emit('clicked',query)
} 

const chnageTabMenu = (name) => {
    wallet.value = false;
    verify.value = false;
    setting.value = false;


    switch (name) {
        case 'wallet':
            underline.value.style.left = "0%";
            wallet.value = true;
            break;
        case 'verify':
            underline.value.style.left = "-33%";
            verify.value = true;
            break;
        case 'setting':
            underline.value.style.left = "-67%";
            setting.value = true;
            break;
        default:
            break;

    }

}

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

// loadingStyle(false);
onMounted(() => {
    setTimeout(() => {
        underline.value.style.left = "0%";
        payiinBorder.value.style.left = "20%";
        // underline.value.style.left = "-10%";
        // underline.value.style.left = "-40%";
    }, 0);

})
</script>