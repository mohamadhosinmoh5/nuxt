<template>
    <!-- {{ pricing }} -->
    <div class="container">

        <div class="row">
            <!-- <div v-if="loading = false" class="spinner-border text-primary" role="status"></div> -->
        <div v-if="loadingStyle" class="spinner-border text-secondary" role="status"></div>

            <div class="col-sm-7 Box-Licence">
                <UModal v-if="isOpen">
                    <div class="moda-boxes row">
                        <div class="col-sm-12">
                            <div class="col">
                                <a href="#" class="exit" @click="isOpen = false">
                                    <i class="fa-solid fa-arrow-right"></i>
                                </a>
                                <a href="#" class="tile ms-2">انتخاب نحوه پرداخت</a>
                            </div>
                            <div class="border-modal mt-2"></div>
                            <div class="col-10 own-buying ">
                                <div class="txte">
                                    <div class="col">
                                        <a href="#" class="tile">کیف پول نفدی</a>
                                    </div>
                                    <div class="col">
                                        <a href="#" class="sub">پرداخت مستقیم از کیف پول نفدی</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-10 own-buying mt-2">
                                <div class="txte">
                                    <div class="col">
                                        <a href="#" class="tile"> درگاه بانکی </a>
                                    </div>
                                    <div class="col">
                                        <a href="#" class="sub">پرداخت مستقیم از درگاه بانکی</a>
                                    </div>
                                </div>
                            </div>

                            <button type="button" class="btn col-10  btn-secondary">پرداخت</button>

                        </div>
                    </div>
                </UModal>
                <div class="row">
                    <div v-for="item in pricing.items" class="col-sm-12">
                        <a href="#" class="buy-title">
                            {{ item.title }}
                        </a>
                        <div class="subtiles mt-2">
                            <a href="#" class="sub">با دریافت این اشتراک قابلیت های زیر برای شما فعال خواهد شد</a>
                        </div>
                        <div class="subtitles mt-2">
                            <a href="#" class="sub">دسترسی به بازدید آگهی</a>
                        </div>
                        <div v-for="visit in item.visits" class="subtitles mt-2">
                            <div class="row">
                                <div class=" col-sm-12">
                                    <a href="#" class="Licenes">از {{ visit.matter_target.title }} تا </a>
                                    <a href="#" class="Licenes">{{ visit.number }} عدد </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="prices">
                        <a href="#">{{ pricing.items[0].price }} تومان</a>
                    </div>
                    <button @click="isOpen = true" type="button" class="btn col-8 btn-outline-secondary">خرید
                        اشتراک</button>

                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useAuthStore } from '../store/auth';
const loading = ref(true);
const pricing = ref(null)
const useUser = useAuthStore();
const isOpen = ref(false);
const loadingStyle = ref(true);




setTimeout(() => {
    loadingStyle.value = false;
    useUser.getPricing().then((r) => {
        pricing.value = r;
    })
})



</script>