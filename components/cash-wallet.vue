<template>
    <div class="row all-boxes">
        <div class="col-sm-10 offset-sm-1 mt-5">
            <div class="row box-wall">
                <div class="col-5">
                    <a href="#" class="Title">  کیف پول نقدی : 0تومان</a>
                </div>
            
                <div class="col-7">
                    <button @click="isOpen = true" type="button" class="col-sm-5 btn btn-light">
                        <a href="#" class="btntext">افزایش موجودی</a>
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
                                    <input type="text" v-model="price" placeholder="مبلغ(تومان)">
                                </div>
                            </div>
                            <div v-if="fish" class="col fish-detailes">خالی است</div>
                            <button @click="deposit()" type="button" class="btn col-10  btn-secondary mt-4">ثبت</button>

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
                            {{ bank }}
                            <div v-if="bank" class="col bank-detailes">
                                <a href="#" class="txtpay"> حد اکثر تا سه روز کاری مبلغ درخواستی به حساب شبای ثبت شده واریز
                                    خواهد شد. </a>
                                <div class="col-12 forms">
                                    <input type="text"  v-model="ClearPrice" placeholder="مبلغ(تومان)">
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
                    <a  class="tab-txts" @click="chnageTabMenu('wallet')">تراکنش ها</a>
                </div>
                <div class="col-4">
                    <a  class="tab-txts"  @click="chnageTabMenu('verify')"> فیش واریزی</a>
                </div>
                <div class="col-4">
                    <a  class="tab-txts" @click="chnageTabMenu('setting')">تنظیمات</a>
                </div>
                <!-- <div ref="underline" class="col-2 underline"></div> -->

            </div>

            <div v-if="wallet" class="col-sm-12 spacings mt-3">
                <div class="" v-for="(item, index) in transactions?.items" :key="index">

                    <div class="row">
                        <div class="col-12">
                            <a href="#" class="variz">مبلغ : </a>
                            <a class="variz" href="#">{{ item.amount }}</a>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-4 variz">
                            <a class="variz" href="#">نوع : </a>
                            <span v-if="item.type == `deposit`">واریز</span>
                            <span v-else>نا مشخص</span>
                        </div>
                        
                    </div>


                    <div class="col mt-2">
                        <a class="variz" href="#">وضعیت : </a>
                        <span class="variz" v-if="item.status == `failed`">نا موفق</span>
                        <span class="variz" v-else>موفق</span>
                    </div>

                    <div class="col mt-2">
                        <a class="variz" href="#">کدرهیگیری : </a>
                        <span class="variz" v-if="item.ref_id">{{ item.ref_id }}</span>
                        <span class="variz" v-else>ندارد</span>
                    </div>

                    <div class="col mt-2">
                        <a class="variz" href="#">توضیحات : </a>
                        <a class="variz" href="#">{{ item.description }}</a>
                    </div>
                </div>
            </div>
            <div v-if="verify" class="col-sm-12">

                <div v-if="verify" class="col-sm-12">
                    <div class="row mt-3 ">
                        <!-- {{ transactionBankReceipts }} -->
                        <p class="fishing">تراکنشی برای نمایش وجود ندارد</p>
                        <!-- <table class="table table-light">
                            <thead class="thead-light">
                                <tr>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>تراکنشی برای نمایش وجود ندارد</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>#</th>
                                </tr>
                            </tfoot>
                        </table> -->
                    </div>
                </div>

            </div>
            <div v-if="setting" class="col-sm-12">

               <div class="onMobile">
                <div class="col shaba mt-5">
                    <a href="#" class="Title ">*شبا</a>
                </div>
                <div class="col-10 forms">
                    <input v-model="sheba" type="text" placeholder="شماره شبا">
                </div>
                <div class="text-shaba mt-3">
                    <a href="#">شماره شبا شما که بانک به شما داده است برای مثال : IR234525690123456789011234</a>
                </div>
               </div>
                <!-- <div class="form-check">
                    <input id="my-input" class="form-check-input"  type="text" name="" >
                    <label for="my-input" class="form-check-label">sheba</label>
                </div> -->
                <div class="form-check mobil">
                    <div class="form-check col-11">
                        <div class="form-group">
                            <label for="my-select">نحوه تسفیه حساب</label>
                            <select id="my-select" class="custom-select" v-model="withDraw">
                                <option value="weekly">هفتگی</option>
                                <option value="monthly">ماهیانه</option>
                                <option value="manually" >دستی</option>
                            </select>
                        </div>
                       </div>
                </div>
                <button @click="addSetting" type="button" class="col-2 btn btn-success mt-5">ثبت</button>
                <div class="col warn">
                    <p class="mediumtxtes">توجه</p>
                </div>
                <div class="col multyline">
                    <p> برای انچام تسفیه حساب لازم است تمامی بخش های  اطلاعات مالک دفتر شما تایید شده باشد</p>
                    <p>شبا ارائه شده توسط شما باید متعلق به شخص حقیقی باشد که بخش اطلاعات مالک دفتر تکمیل شده باشد</p>
                    <p>در تسفیه هفتگی به صورت خودکار در اول هر هفته حساب شما تسفیه شده و پول به شماره شبا ثبت شده واریز می گردد</p>
                    <p>در تسفیه ماهانه بصورت خودکار در اول هر ماه حساب شما تصفیه شده و پول به شماره شبا ثبت شده واریز می گردد</p>
                    <p>در تصفیه دستی باید مبلغ درخواستی را از بخش درخواست تصفیه ثبت کنید حد اکثر تا سه روز کاری مبلغ درخواستی به حساب شبای ثبت شده واریز خواهد شد</p>
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
const price = ref(null)
const isOpen = ref(false)
const bank = ref(true)
const fish = ref(false)
const ClearPrice = ref(0)
const withDraw = ref(null)
const weekly = ref(null)
const manually = ref(null)

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
            // underline.value.style.left = "0%";
            wallet.value = true;
            break;
        case 'verify':
            // underline.value.style.left = "-33%";
            verify.value = true;
            break;
        case 'setting':
            // underline.value.style.left = "-67%";
            setting.value = true;
            break;
        default:
            break;

    }

}

// const changePayiintTab = (name) => {
//     bank.value = false;
//     fish.value = false;

//     switch (name) {
//         case 'bank':
//             payiinBorder.value.style.left = "0%";
//             bank.value = true;

//             break;
//         case 'fish':
//             payiinBorder.value.style.left = "20%";
//             fish.value = true;

//             break;
//         default:
//             break;

//     }

// }

// loadingStyle(false);


  setTimeout(() => {
        // underline.value.style.left = "0%";
        // payiinBorder.value.style.left = "20%";
        // underline.value.style.left = "-10%";
        // underline.value.style.left = "-40%";
        useUser.transaction().then((r) => {
            transactions.value = r;
            console.log(r);
            loadingStyle(false);
        })
    
        useUser.transactionBankReceipts().then((r) => {
            transactionBankReceipts.value = r;
            // loadingStyle(false);
    
        })
    }, 0);
  
    const addSetting = async () => {
        // value of withdraw :
        // monthly;
        // weekly;
        // manually;
        useUser.transactionSetting(sheba.value, withdraw.value).then(() => {
            Message.value = 'تنظیمات ذخیره شد';
            // loadingStyle(false);

        })
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