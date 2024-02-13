
import { defineStore } from 'pinia';

  export const useSearchStore = defineStore('search',() => {

    const cart = ref(null);
    const textSearch = ref(null);
    const allresult = ref(null)
    const pendding = ref(null);
    const error = ref(null);

    async function search(text){
        if(text == null && textSearch == null){
            return error.value = 'لطفا در فیلد جستجو نوشته ی مناسبی را وارد کنید'
        }
        const { data:request, pending:pendings, error:errors, refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/v2/notices-search?title=${(text) ? text : textSearch.value}`);
    
          if(pendings){
            pendding.value = pendings;
          }
    
          if(errors.value){
            error.value = errors.value.data;
          }
    
          if(request.value){
            pendding.value = false;
            allresult.value = request.value;
            return request.value;
          }
    }

    return {
      search,
      allresult,
    };
  })