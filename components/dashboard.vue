<template>
    <div class="info-box col-sm-12 mt-5">
        <!-- {{user.user.offices[0].ability.visits[0].matter_target.title}} -->
        <div class="col row">
            <div class="col-sm-4 box-info">
                <div class="col card-body">
                    <div class="col row">
                        <div class="col-sm">
                            <a href="#" class="wallettxt">کیف پول نقدی : 0 تومان</a>
                        </div>
                        <div class="col-sm-12">
                            <button type="button" class="col-sm-5 btn btn-light">
                                <a href="#" class="btntext">افزایش موجودی</a>
                            </button>
                        </div>
                    </div>


                </div>
            </div>
            <div id="roaunded" class="col-sm-4 box-info">
                <div class="col card-body">
                    <div class="col row">
                        <div class="col-sm">
                            <a href="#" class="wallettxt">کیف پول اعتباری : 0تومان</a>
                        </div>
                        <div class="col-sm-12">
                            <button type="button" class="col-sm-5 btn btn-light">
                                <a href="#" class="btntext">افزایش موجودی</a>
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
        <div class="row bento">
            <div class="col-sm-2 box-buttom mt-5">
                <div class="col card-body">
                    <div class="col">
                        <a href="#" class="wallettxt">اشتراک های فعال</a>
                    </div>
                    <div class="borderrs"></div>
                    <a href="#" class="greentxt">درحال انجام</a>
                </div>
            </div>
            <div id="roaunded" class="col-sm-6 box-buttom mt-5">
                <div class="col card-body">
                    <div class="col row">

                        <a href="#" class="wallettxt">
                            <img src="/_nuxt/assets/img/basket.svg" style="width: 30px;" alt="">
                            خرید های من
                        </a>
                    </div>
                    <div class="borderrs"></div>
                    <!-- <a href="#" id="" class="lice mt-2">درحال انجام</a> -->
                    <div class="col-sm-12  mt-5">
                        <a href="#" class="styling">سبد خرید شما خالیه</a>
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
const user = defineProps(['user']);
console.log(user);
</script>