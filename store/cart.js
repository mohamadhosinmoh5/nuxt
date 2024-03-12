
import { defineStore } from 'pinia';

import { useAuthStore } from './auth';
// import function from './../utils/filterUrl';

  export const useCartStore = defineStore('cart',() => {

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
    const payLink = ref(null);
    const status = reactive({address : false,requestPrice : true,portal : 'cash'});

    (useCookie('token')) ?  token.value = useCookie('token') : error.value = {message:'ابتدا وارد شوید تا سبد خرید دسترسی داشته باشید '};

    async function getCart(){
          const { data:carts, pending:pendings, error:errors, refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/offices/${auth.getdefaultOffice}/carts/draft/show`, {
            method:'get',
            headers:{
              "Authorization":"Bearer "+token.value
            }
          });

          if(pendings){
            pending.value = pendings;
          }

          if(errors.value){
            error.value = errors.value.data;
          }
  
          if(carts.value){
            if(carts?.value?.items[0]?.post_price_tow_stage){
              if(carts.value.items[0].post_price_status =="answered" && carts.value.items[0].post_price != null){
                status.requestPrice = true;
              }else{
                error.value = 'لطفا ابتدا درخواست قیمت گذاری دهید'
                status.requestPrice = false;
              }
            }
          
            count.value = carts.value?.items[0].count;
            activeAdress.value = carts.value?.post_address_id;
            pending.value =false;
            return cart.value = carts.value;
          }
    }

    async function requestPrice(id){
      const { data:request, pending:pendings, error:errors, refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/carts/items/${id}/request-post-pricing`, {
        method:'get',
        headers:{
          "Authorization":"Bearer "+token.value
        }
      });

      if(pendings){
        pending.value = pendings;
      }

      if(errors.value){
        pending.value = false;
        error.value = errors.value.data;
      }

      if(request.value){
        pending.value = false;
        massage.value = 'درخواست قیمت گذاری ارسال شد';
        return request.value;
      }

    }

    async function setAdress(queryData){
      const { data:address2, pending:pendings, error:errors, refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/offices/${auth.getdefaultOffice}/post-address`, {
        method:'post',
        body:queryData,
        headers:{
          "Authorization":"Bearer "+token.value
        }
      });

      if(pendings){
        pending.value = pendings;
      }

      if(errors.value){
        pending.value = false;
        error.value = errors.value.data;
      }

      if(address2.value){
        pending.value = false;
        address.value.items.push(address2.value);
        massage.value = 'آدرس افزوده شد';
        return address2.value;
      }

    }

    async function setDefaultAddress(queryData){
      const { data:address2, pending:pendings, error:errors, refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/carts/${cart.value.id}/update-address`, {
        method:'put',
        body:{post_address_id:queryData},
        headers:{
          "Authorization":"Bearer "+token.value
        }
      });

      if(pendings){
        pending.value = pendings;
      }

      if(errors.value){
        error.value = errors.value.data;
      }

      if(address2.value){
        activeAdress.value = address2.value.post_address_id;
        pending.value =false;
        massage.value = 'آدرس پیشفرض تغییر کرد';
        return address2.value;
      }

    }

    async function getAdress(){

      const { data:address2, pending:pendings, error:errors, refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/offices/463/post-address?page=1`, {
        method:'get',
        headers:{
          "Authorization":"Bearer "+token.value
        }
      });

      if(pendings){
        pending.value = pendings;
      }

      if(errors.value){
        error.value = errors.value.data;
      }

      if(address2.value){
        return address.value = address2.value;
      }

    }

    async function addToCart(noticeId,number){
      pending.value = true;
      count.value = number + 1;
      console.log(count.value);
      await updateCart(count.value,noticeId,false,null)
    }

    async function removeCart(noticeId,number){
      if(count.value > 0){
        pending.value = true;
        count.value = number - 1;
    
        await updateCart(count.value,noticeId,true,null)
      }else{
        massage.value ='سبد خالی است '
      }
    }

    async function updateCart(count,noticeId,reduce=false,discountCode=null)
    {
        const { data, pending:pendings, error:errors,refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/offices/${auth.getdefaultOffice}/carts/update-item`, {
          method:'post',
          body:{
            count:count,
            notice_id:noticeId,
            reduce:reduce,
            discount_code:discountCode
          },
          headers:{
            "Authorization":"Bearer "+token.value
          }
        });


        if(pendings){
          pending.value = pendings;
        }

      
        if(errors.value?.data)
        {
          console.log(errors.value.data);
          error.value = errors.value.data;
        }
        
        if(data.value)
        {
          if(reduce){
            massage.value = 'از سبد خرید شما کاسته شد';
          }else{
            massage.value = ' به سبد خرید افزوده شد';
          }
          pending.value = false;
          return cart.value = data.value;
        }
    }

    async function verifyPay(trackId,orderId){
      const { data, pending:pendings, error:errors,refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/payments/${trackId}/verify?success=1&trackId=${trackId}&orderId=${orderId}`, {
        method:'get',
        headers:{
          "Authorization":"Bearer "+token.value
        }
      });

      if(pendings){
        pending.value = pendings;
      }

      if(errors.value)
      {
        error.value = errors.value.data;
      }

      if(data.value)
      {
        pending.value = false;
        return cart.value = data.value;
      }
    }

    async function pay(cartId){

      const { data, pending:pendings, error:errors,refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/carts/${cartId}/pay`, {
        method:'post',
        query:{
          pay_method: status.portal
        },
        headers:{
          'accept': 'application/json',
          'Access-Control-Allow-Origin': "*",
          'content-type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Credentials': 'true',
          "Authorization":"Bearer "+token.value
        },
        // mode: 'no-cors'
      });

      if(pendings){
        pending.value = pendings;
      }

      if(errors.value)
      {
        pending.value = false;
        error.value = errors.value.data;
      }

      if(data.value)
      {
        pending.value = false;
        return payLink.value = data.value.action;
      }
    }

    async function paySub(subId){
      console.log(token.value.value);
      const { data, pending:pendings, error:errors,refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/offices/${auth.getdefaultOffice}/subscribes/pay`, {
        method:'post',
        query:{
          pay_method: status.portal,
          matter_pricing_id:subId
        },
        headers:{
          "Authorization":"Bearer "+token.value.value,
          'accept': 'application/json',
          'Access-Control-Allow-Origin': "*",
          'content-type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Credentials': 'true',
        },
        // mode: 'no-cors'
      });

      if(pendings){
        pending.value = pendings;
      }

      if(errors.value)
      {
        pending.value = false;
        error.value = errors.value.data;
      }

      if(data.value)
      {
        pending.value = false;
        return payLink.value = data.value.action;
      }
    }

    async function deleteCart(id){
      await updateCart(0,id,true,null)
    }

    function changePay(name){
      status.portal = name;
    }


    return {
      cart,
      totalProduct,
      totalPrice,
      token,
      error,
      activeAdress,
      pending,
      status,
      massage,
      payLink,
      paySub,
      getCart,
      addToCart,
      removeCart,
      getAdress,
      setAdress,
      setDefaultAddress,
      requestPrice,
      deleteCart,
      changePay,
      pay,
      verifyPay,
      updateCart,
    };
  })