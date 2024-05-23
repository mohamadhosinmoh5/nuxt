<template>

    <div dir="rtl" class="container-fluid p-4">
        <NuxtLayout name="header"></NuxtLayout>

        <div class="row">
            <div class="col-sm-12">
                <h6 class="mt-2 adsTitle">مشخصات واحد</h6>
                <div class="row">
                    <div class="col-6 forms">
                        <input type="text" placeholder="متراژ">
                    </div>
                    <div class="col-6 forms">
                        <input type="text" placeholder="عمر ساختمان">
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-6 forms">
                        <input type="text" placeholder="تعداد طبقات">
                    </div>
                    <div class="col-6 forms">
                        <input type="text" placeholder=" موقعیت طبقه">
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-6 forms">
                        <input type="text" placeholder="تعداد واحد های ساختمان">
                    </div>
                    <div class="col-6 forms">
                        <input type="text" placeholder=" تعداد اتاق">
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-6 forms">
                        <input type="text" placeholder=" سال ساخت ">
                    </div>

                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <h6 class="adsTitle mt-4 ms-2">امکانات</h6>
                    <div class="Emcanat">
                        <div class="col-6 ms-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                <label class="form-check-label" for="flexCheckDefault">
                                    <p class="checkTxt">پارکینگ</p>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                <label class="form-check-label" for="flexCheckDefault">
                                    <p class="checkTxt">پارکینگ</p>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                <label class="form-check-label" for="flexCheckDefault">
                                    <p class="checkTxt">انباری</p>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                <label class="form-check-label" for="flexCheckDefault">
                                    <p class="checkTxt">
                                        مطبخ
                                    </p>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                <label class="form-check-label" for="flexCheckDefault">
                                    <p class="checkTxt"> ریموت پارکینگ
                                    </p>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6 TotalPrice">
                    <h6 class="mt-4 ms-2 adsTitle">قیمت</h6>
                    <div class="col-12 ms-2 forms">
                        <input type="text" placeholder="قیمت کل">
                    </div>
                    <div class="col-12 mt-2 ms-2 forms">
                        <input type="text" placeholder="قیمت هر متر">
                    </div>
                </div>
            </div>
            <p class="etelaat mt-4">اطلاعات مالک</p>
            <p class="etelaSub">در این قسمت می توانید اطلاعات مالک را وارد نمایید. این اطلاعات به کاریران دیگر نمایش
                داده نمیشود</p>
            <div class="col-6  forms">
                <input type="text" placeholder="نام و نام خوانوادگی">
            </div>
            <div class="col-6  forms">
                <input type="text" placeholder="شماره تماس مالک">
            </div>
        </div>
        <button type="button" class="col-2 next mt-5">
            <a href="/adsmap" class="nextPage">بعدی</a>
        </button>
    </div>

</template>


<script setup>

</script>