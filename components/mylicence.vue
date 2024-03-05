<template>
    <div class="container">
       
        <div class="row myLicence">
            <div v-for="(item, index) in subScribe.items" :key="index" class="col-sm-12 tab-Detaile">
                <div class="col">
                    <a href="#">اشتراک : </a>
                    <a href="#">{{item.matter_pricing.title}}</a>
                </div>
                <div class="col mt-2">
                    <a href="#">مبلغ : </a>
                    <a href="#">{{item.matter_pricing.price}}تومان</a>
                </div>
                <div class="col mt-2">
                    <a href="#">مدت اعتبار تا :  </a>
                    <a href="#">{{item.matter_pricing.period}} دیگر</a>
                </div>
                <!-- <div class="col mt-2">
                    <a href="#">وضعیت پرداخت : </a>
                    <a href="#">ندارد</a>
                </div> -->
                <div class="col mt-2">
                    <a href="#">تاریخ پرداخت : </a>
                    <a href="#">  {{item.matter_pricing.created_at}}</a>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useAuthStore } from '../store/auth';

const emit = defineEmits(['clicked'])

const loadingStyle = (query) => {
  emit('clicked',query)
}


const subScribe = ref(null);

const useUser = useAuthStore();

useUser.getSubScribe().then((r) => {
        subScribe.value = r;
        loadingStyle(false);
    })

</script>