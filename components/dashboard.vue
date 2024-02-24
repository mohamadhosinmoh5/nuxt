<template>
    <div class="row info-box mt-5">
        <!-- {{user.user.offices[0].ability.visits[0].matter_target.title}} -->
        <div class="box-info col-3">
            <div class="card-title">
                <div class="col">
                    <a href="#" class="sub">تعداد ثبت مانده</a>
                </div>
                <div class="col">
                    <a href="#" class="tile">0</a>
                </div>
            </div>
        </div>
        <div class="box-info col-3">
            <div class="card-title">
                <div class="col">
                    <a href="#" class="sub">تعداد ویژه مانده</a>
                </div>
                <div class="col">
                    <a href="#" class="tile">0</a>
                </div>
            </div>
        </div>
        <div class="box-info col-3">
            <div class="card-title">
                <div class="col">
                    <a href="#" class="sub">تعداد نردبان مانده</a>
                </div>
                <div class="col">
                    <a href="#" class="tile">0</a>
                </div>
            </div>
        </div>

    </div>
    <div class="col-sm-12 daftar-detailes">
        <div v-for="user in user.user.offices[0].ability.visits" class="col">
            <div class="col-sm mt-3">
                <a href="#" class="title ms-5"> تعداد {{ user.number }}  بازدید از آگهی های  </a>
                <a href="#" class="title">{{ user.matter_target.title }}</a>


            </div>
        </div>

    </div>
</template>


<script setup>
const user = defineProps(['user']);
console.log(user);
</script>