<template>
    <!-- {{ pricing }} -->

    <div class="container">
        <div class="row">
        
            <div class="col-sm-7 Box-Licence mt-5">
                
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
                                <div @click="useCart.changePay('wallet'),wallet=true"  :class="wallet ? `pay-cart txte active2` :`pay-cart txte`">
                                    <div class="col">
                                        <a href="#" class="tile">کیف پول نقدی</a>
                                    </div>
                                    <div class="col">
                                        <a href="#" class="sub">پرداخت مستقیم از کیف پول نقدی</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-10 own-buying mt-2">
                                <div @click="useCart.changePay('cash'),wallet=false"  :class="!wallet ? `pay-cart txte active2` :`pay-cart txte`" >
                                    <div class="col">
                                        <a href="#" class="tile"> درگاه بانکی </a>
                                    </div>
                                    <div>
                                        <a href="#" class="sub">پرداخت مستقیم از درگاه بانکی</a>
                                    </div>
                                </div>
                            </div>

                            <button @click="pay(subId)" type="button" class="btn-pardakht col-10  btn-secondary">پرداخت</button>

                        </div>
                    </div>
                </UModal>
                <div class="row">
                    <div v-for="item in pricing.items" class="col-sm-12">
                        <a  class="buy-title">
                            {{ item.title }}
                        </a>
                        <div class="subtiles mt-2">
                            <a  class="sub">با دریافت این اشتراک قابلیت های زیر برای شما فعال خواهد شد</a>
                        </div>
                        <div class="subtitles mt-2">
                            <a  class="sub">دسترسی به بازدید آگهی</a>
                        </div>
                        <div v-for="visit in item.visits" class="subtitles mt-2">
                            <div class="row">
                                <div class=" col-sm-12">
                                    <a  class="Licenes">از {{ visit.matter_target.title }} تا </a>
                                    <a  class="Licenes">{{ visit.number }} عدد </a>
                                </div>
                            </div>
                        </div>

                        <div class="prices">
                            <a >{{ item.price }} تومان</a>
                        </div>
                        <button @click="isOpen = true,setSubId(item.id)" type="button" style="float: right;" class="btn col-8 btn-outline-secondary">خرید
                            اشتراک</button>
                    </div>
                </div>
                
                <div v-if="pending" class="border-fixed">
                    <div class="spinner-border " role="status"></div>
                  </div>
    
                  <div v-if="message" class="notif ">
                    <span @click="message = null" class="closeNotife">x</span>
                      {{message }}
                  </div>
                  <div v-if="useCart.error?.message" class="notif error text-center">
                    <span @click="useCart.error.message = null" class="closeNotife">x</span>
                    <p>
                      {{ useCart.error.message }}
                    </p>
                  </div>
            </div>


        </div>
    </div>
</template>


<script setup>
import { useCartStore } from '../store/cart';
import { useAuthStore } from '../store/auth';
const pricing = ref(null)
const useUser = useAuthStore();
const isOpen = ref(false);
const useCart = useCartStore();
const subId = ref(null);
const wallet = ref(false);
const pending = ref(false);

const emit = defineEmits(['clicked'])

const loadingStyle = (query) => {
  emit('clicked',query)
}

const pay = async (subIds) => {

  if(useCart.status.portal == 'cash'){
    useCart.paySub(subIds).then((r)=>{
      pending.value = false;
      window.location.href = r;
    })
  }else{
    useCart.paySub(subIds).then((r)=>{
      pending.value = false;
    })
  }

}


const setSubId = (id) => {
    subId.value = id;
}

setTimeout(() => {
    useUser.getPricing().then((r) => {
        pricing.value = r;
        loadingStyle(false);

    })
})

</script>