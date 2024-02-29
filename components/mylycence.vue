<template>
    <div class="container">
        <div class="row myLicence">
            <div class="col-sm-12 tab-Detaile">
                <div class="col">
                    <a href="#">اشتراک : </a>
                    <a href="#">30روزه</a>
                </div>
                <div class="col mt-2">
                    <a href="#">مبلغ : </a>
                    <a href="#">49,000تومان</a>
                </div>
                <div class="col mt-2">
                    <a href="#">تاریخ ثبت : </a>
                    <a href="#">.....</a>
                </div>
                <div class="col mt-2">
                    <a href="#">وضعیت پرداخت : </a>
                    <a href="#">ندارد</a>
                </div>
                <div class="col mt-2">
                    <a href="#">تاریخ پرداخت : </a>
                    <a href="#">شارژ کیفه پول</a>
                </div>
            </div>
        </div>
    </div>

    {{ setFalse() }}
</template>


<script setup>
const closeBox = ref(true);
const ShowBtn = ref(true);
const emit = defineEmits(['clicked'])

const loadingStyle = (query) => {
    emit('clicked', query)
}

//get data and then loader hide
loadingStyle(false);

</script>