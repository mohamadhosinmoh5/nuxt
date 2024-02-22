<template>
    <div class="container">
        <div class="row">
            <div class="col box-information">
                <div class="col-sm-10 card-money">
                    <div class="col card-body">
                        <div class="col row">
                            <div class="col">
                                <a href="#" class="Title">کیف پول نقدی</a>
                            </div>
                            <div class="col">
                                <button type="button" class="col-sm-5 btn btn-light">
                                    <a href="#" class="btntext">افزایش موجودی</a>
                                </button>
                            </div>
                        </div>
                        <div class="col row">
                            <div class="col">
                                <a href="#" class="Title">0تومان</a>
                            </div>
                            <div class="col">
                                <button type="button" class="btn btn-light">
                                    <a href="#" class="btntext">تسفیه </a>

                                </button>
                            </div>

                        </div>

                    </div>
                </div>
                <div class="col-12 row tabbar-detailes">
                    <div @click="chnageTabMenu('wallet')" class="col-4"><a href="#">تراکنش ها</a></div>
                    <div @click="chnageTabMenu('verify')" class="col-4"><a href="#"> فیش های واریزی</a></div>
                    <div @click="chnageTabMenu('setting')" class="col-4"><a href="#">تنظیمات</a></div>
                </div>
                <div ref="underline" class="col-2 underline"></div>
                <div v-if="wallet" class="col-sm-12 tab-Detaile">
                    <div class="col">
                        <a href="#">مبلغ : </a>
                        <a href="#">250,000</a>
                    </div>
                    <div class="col mt-2">
                        <a href="#">نوع : </a>
                        <a href="#">واریزی</a>
                    </div>
                    <div class="col mt-2">
                        <a href="#">وضعیت : </a>
                        <a href="#">انجام شده</a>
                    </div>
                    <div class="col mt-2">
                        <a href="#">کدرهیگیری : </a>
                        <a href="#">ندارد</a>
                    </div>
                    <div class="col mt-2">
                        <a href="#">توضیحات : </a>
                        <a href="#">شارژ کیفه پول</a>
                    </div>
                </div>

                <div v-if="verify" class="col-sm-12 tab-Detaile">
                    verify
                </div>

                <div v-if="setting" class="col-sm-12 tab-Detaile">
                    <div class="col-sm-12 row setting-box">
                        <div class="col shaba">
                            <a href="#" class="mediumtxt">*شبا</a>
                        </div>
                        <div class="col-10 forms">
                           <input type="text" placeholder="شماره شبا">
                           
                        </div>
                        
                    </div>
                    <a href="#" class="mediumtxt"><a href="شماره شیا"></a></a>
                </div>
            </div>

        </div>
    </div>
</template>


<script setup>
const closeBox = ref(true);
const ShowBtn = ref(true);
const underline = ref(null);
const wallet = ref(true)
const verify = ref(false)
const setting = ref(false)

const chnageTabMenu = (name) => {
    wallet.value = false;
    verify.value = false;
    setting.value = false;
switch (name) {
    case 'wallet':
        underline.value.style.left = "25%";
        wallet.value = true;
        break;
    case 'verify':
        underline.value.style.left = "-10%";
        verify.value = true;
        break;
    case 'setting':
        underline.value.style.left = "-40%";
        setting.value = true;
        break;

    default:
        break;
}

}

onMounted(()=>{
    setTimeout(() => {
        underline.value.style.left = "25%";
        underline.value.style.left = "-10%";
        underline.value.style.left = "-40%";
    }, 0);
})

</script>