
import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

  export const useMapStore = defineStore('map',() => {

    const cart = ref(null);
    const totalProduct = ref(0);
    const totalPrice = ref(0);
    const token = ref(null);
    const pending = ref(null);
    const error = ref(null);
    const warning = ref(null);
    const count = ref(0);
    const massage = ref(null);
    const address = ref(null);
    const auth = useAuthStore();
    const activeAdress = ref(null);
    const status = reactive({address : false,requestPrice : true,portal : false});

    async function getAdress(position){
      const { data:address2, pending:pendings, error:errors, refresh } = await useFetch(`https://api.neshan.org/v5/reverse?lat=${position.lat}&lng=${position.lng}`, {
        method:'get',
        headers:{
          "Api-Key":"service.22dda51fbcf6451c85bfd77e96f6face"
        }
      });

      if(pendings){
        pending.value = pendings;
      }

      if(errors.value){
        error.value = errors.value.data;
      }

      if(address2.value){
        console.log(address2.value);
        return address.value = address2.value;
      }

    }


    return {
      cart,
      totalProduct,
      totalPrice,
      token,
      error,
      activeAdress,
      pending,
      getAdress,
    };
  })