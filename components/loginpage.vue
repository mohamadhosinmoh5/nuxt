<template>
    <div class="Login-content" >
        <div class="maydetailes col-sm-12">
            <div class="row">

                <div class="col">
                    <span class="Close">

                        <a @click="isShowModal = false" href="#"><img src="assets/img/SinglePage_Image/back.png"
                                style="width: 25px; float: right;" alt=""></a>
                    </span>
                    <a href="#" class="Title">ورود به حساب کاربری</a>
                </div>

            </div>
            <div class="lines"></div>
            <div class="col mt-3">
                <a href="#" class="phonenm">شماره مبایل خودرا وارد کنید</a>
            </div>
            <div class="col mt-2">
                <a href="#" class="subtitle">برای استفاده از امکانات هومنگر لطفا شماره مبایل خود را وارد کنید, کد تاید به
                    این شماره ارسال خواهد شد</a>
            </div>
            <div :style="!auth.sendingSms ? `display:block` : 'display:none;'" class="FormNumber col">
                <input @input="checkMobile(mobile)" type="text" placeholder="شماره همراه"  v-model="mobile">
            </div>
            <div  class="FormPass col" :style="auth.sendingSms ? `display:block` : 'display:none;'">
                <input @input="checkVerify(code)" type="text" placeholder=" کد تایید" v-model="code">
            </div>
            <div class="col-sm-12 mt-2">
                <a href="#" class="subtitle">شرایط و قوانین استفاده و سیاست نامه حریم خصوصی هومنگر را می پزیرم</a>
                <input class="form-check-input ms-2" type="checkbox" v-model="checkBox" id="flexCheckIndeterminate">
                <div v-if="auth.pending" class="spinner-border" style="position: absolute;left: 30px;top: 38%;" role="status"></div>
                <div v-if="auth.error" class="alert alert-danger text-center" >{{ auth.error.message }}</div>
            </div>
            <div class="col">
                <div class="row mt-2">
                    <button v-if="checkBox" :style="!auth.sendingSms ? `display:block` : 'display:none;'" @click="auth.sendSms(mobile)" type="button" class="btn btn-success">بعدی</button>
                    <button  :style="auth.sendingSms ? `display:block` : 'display:none;'" @click="login()" type="button"
                        class="btn btn-success">ورود</button>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { useAuthStore } from '../store/auth';
const auth = useAuthStore();

const mobile = ref(null)
const code = ref(null)
const checkBox = ref(false)

const emit = defineEmits(['clicked'])
const ShowModal = (status) => {
  emit('clicked',status)
}


const checkMobile = (mobiles)=>{
    if(mobiles.length >= 10){
        auth.sendSms(mobiles)
    }
}

const checkVerify = (code)=>{
    if(code.length >= 5){
        login()
    }
}

const login = ()=>{
    auth.login(code.value,mobile.value).then( ()=>{
            ShowModal(false)
    })
}

// const isShowNumber = ref(true);
// const isShowVerifyCode = ref(false);
// const showNumber = () => {
//     isShowNumber.value = false;
//     isShowVerifyCode.value = true;

// }
// const showVerifyCode = () => {
//     isShowNumber.value = true;
//     isShowVerifyCode.value = false;

// }
</script>
