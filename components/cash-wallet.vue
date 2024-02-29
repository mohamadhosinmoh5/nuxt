<template>
  
    <div class="container">
        <div class="row">
            <div class="col box-information">
                <div class=" card-money">
                    <div class="col card-body">
                        <div class="col row">
                            <div class="col">
                                <a  class="Title">کیف پول نقدی</a>
                            </div>
                            <div class="col">
                                <button type="button" class="col-sm-5 btn btn-light">
                                    <a  class="btntext">افزایش موجودی</a>
                                </button>
                            </div>
                        </div>
                        <div class="col row">
                            <div class="col">
                                <a  class="Title">0 تومان</a>
                            </div>
                            <div class="col">
                                <button type="button" class="btn btn-light">
                                    <a  class="btntext">تصفیه </a>

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
             
                </div>

                <div v-if="wallet"  class="col-sm-12 tab-Detaile">
                    <div v-for="(item, index) in transactions.items" :key="index">
                    
                        <div class="row">
                            <div class="col-6">
                                <a href="#">مبلغ : </a>
                            </div>
                            <div class="col-6">
                                <a href="#">{{item.amount}}</a>
                            </div>
                        </div>
                    
                        <div class="row mt-2">
                            <div class="col-6">
                                <a href="#">نوع : </a>
                            </div>
                            <div class="col-6">
                                <span v-if="item.type ==`deposit`">واریز</span> 
                                <span v-else>نا مشخص</span>
                            </div>
                        </div>
                     

                        <div class="col mt-2">
                            <a href="#">وضعیت : </a>
                            <span v-if="item.status ==`failed`">نا موفق</span> 
                            <span v-else>موفق</span>
                        </div>

                        <div class="col mt-2">
                            <a href="#">کدرهیگیری : </a>
                            <span v-if="item.ref_id">{{item.ref_id}}</span>
                            <span v-else>ندارد</span>
                        </div>
                        
                        <div class="col mt-2">
                            <a href="#">توضیحات : </a>
                            <a href="#">{{item.description}}</a>
                        </div>
                     </div>
                </div>

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

                <div v-if="setting" class="col-sm-12 tab-Detaile">
                    <div class="col shaba">
                        <a href="#" class="mediumtxt">*شبا</a>
                    </div>
                    <div class="col-10 forms">
                        <input type="text" placeholder="شماره شبا">
                    </div>
                    <div class="text-shaba mt-5">
                        <a href="#">شماره شبا شما که بانک به شما داده است برای مثال : IR234525690123456789011234</a>
                    </div>
                    <div class="mediumtxt mt-2">
                        <a href="#">نحوه تسفیه حساب</a>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate">
                        <label class="form-check-label" for="flexCheckIndeterminate">
                            هفتگی
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate">
                        <label class="form-check-label" for="flexCheckIndeterminate">
                            ماهانه
                        </label>
                    </div>
                    <div class="form-check">
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


const closeBox = ref(true);
const ShowBtn = ref(true);
const underline = ref(null);
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

onMounted(() => {
    setTimeout(() => {
        underline.value.style.left = "25%";
        underline.value.style.left = "-10%";
        underline.value.style.left = "-40%";
    }, 0);
})

    useUser.transaction().then((r) => {
        transactions.value = r;
    })

    useUser.transactionBankReceipts().then((r) => {
        transactionBankReceipts.value = r;
    })

    const addSetting = async () => {
        // value of withdraw :
        //monthly
        //weekly
        //manually
        useUser.transactionSetting(sheba.value,withdraw.value).then(()=>{
                Message.value = 'تنظیمات ذخیره شد';
        })
    }

    const deposit = async () => {
        useUser.deposit(amount).then(()=>{
                Message.value = 'تنظیمات ذخیره شد';
        })
    }

</script>