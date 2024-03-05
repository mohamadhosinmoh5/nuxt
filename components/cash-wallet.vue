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
                <div class="col-6">
                    <button @click="tasfie = true" type="button" class="btn btn-light">
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
                            <button @click="deposit()" type="button" class="btn col-10  btn-secondary">ثبت</button>

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
                                <a href="#" class="txtpay"> حد اکثر تا سه روز کاری مبلغ درخواستی به حساب شبای ثبت شده واریز
                                    خواهد شد. </a>
                                <div class="col-12 forms">
                                    <input type="text" placeholder="مبلغ(تومان)">
                                </div>
                            </div>
                            <div v-if="fish" class="col fish-detailes">خالی است</div>
                            <button @click="deposit()" type="button" class="btn col-10  btn-secondary">ثبت</button>

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
                <div ref="underline" class="col-2 underline"></div>

            </div>

            <div v-if="wallet" class="col-sm-12 tab-Detaile">
                <div v-for="(item, index) in transactions.items" :key="index">

                    <div class="row">
                        <div class="col-6">
                            <a href="#">مبلغ : </a>
                        </div>
                        <div class="col-6">
                            <a href="#">{{ item.amount }}</a>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-6">
                            <a href="#">نوع : </a>
                        </div>
                        <div class="col-6">
                            <span v-if="item.type == `deposit`">واریز</span>
                            <span v-else>نا مشخص</span>
                        </div>
                    </div>


                    <div class="col mt-2">
                        <a href="#">وضعیت : </a>
                        <span v-if="item.status == `failed`">نا موفق</span>
                        <span v-else>موفق</span>
                    </div>

                    <div class="col mt-2">
                        <a href="#">کدرهیگیری : </a>
                        <span v-if="item.ref_id">{{ item.ref_id }}</span>
                        <span v-else>ندارد</span>
                    </div>

                    <div class="col mt-2">
                        <a href="#">توضیحات : </a>
                        <a href="#">{{ item.description }}</a>
                    </div>
                </div>
            </div>
            <div v-if="verify" class="col-sm-12">

                <div v-if="verify" class="col-sm-12 tab-Detaile">
                    <div class="row">

                        <table class="table table-light">
                            <thead class="thead-light">
                                <tr>
                                    <th>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>#</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

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
                <div class="form-check mobil">
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
</template>




<script setup>
import { useAuthStore } from '~/store/auth';



const underline = ref(null);
const payiinBorder = ref(null);
const wallet = ref(true)
const verify = ref(false)
const setting = ref(false)
const sheba = ref(null)
const withdraw = ref(null)
const useUser = useAuthStore();
const transactions = ref(null)
const transactionBankReceipts = ref(null)
const Message = ref(null)
const amount = ref(null)

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

const emit = defineEmits(['clicked'])

const loadingStyle = (query) => {
  emit('clicked',query)
}


// loadingStyle(false);
onMounted(() => {
    setTimeout(() => {
        underline.value.style.left = "0%";
        payiinBorder.value.style.left = "20%";
        // underline.value.style.left = "-10%";
        // underline.value.style.left = "-40%";
    }, 0);

    useUser.transaction().then((r) => {
        transactions.value = r;
        loadingStyle(false);
    })

    useUser.transactionBankReceipts().then((r) => {
        transactionBankReceipts.value = r;
        loadingStyle(false);

    })

    const addSetting = async () => {
        // value of withdraw :
        // monthly;
        // weekly;
        // manually;
        useUser.transactionSetting(sheba.value, withdraw.value).then(() => {
            Message.value = 'تنظیمات ذخیره شد';
        })
    }

    const deposit = async () => {
        useUser.deposit(amount).then(() => {
            Message.value = 'تنظیمات ذخیره شد';
        })
    }
}
)
</script>