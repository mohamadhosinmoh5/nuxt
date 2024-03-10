
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('Auth', {
    state: () => ({ user: null,pricing:null ,error:null,carts:null,subScribe:null,getdefaultOffice:0, token: null,mobile: null ,sendingSms:false}),
    getters: {
      getError: (state)=>{
        return state.error;
      }
    },
    actions: {
        async sendSms(mobile){
          
            const { data, pending:pendings, error:errors, refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/login-send-verify-code`, {
                method:'post',
                body:{
                    mobile:mobile
                }
              });

              this.pending = pendings;
            if(errors.value){
              this.error = errors.value.data;
            }

              if(data.value){
                
                this.sendingSms = true;
              }
        },
        async login(code,mobile){
          const { data, pending:pendings, error:errors, refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/login`, {
            method:'post',
            body:{
                mobile:mobile,
                code:code
            }
          });
          
          this.pending = pendings;
          if(errors.value){
            this.error = errors.value.data;
          }

          if(data.value){

            if(this.getdefaultOffice == 0 ){
              this.setDefaultOffice(data.value?.user.offices[0].id);
            }else{
              this.getdefaultOffice = useCookie('defaultOffice');
            }

            this.user= data.value.user;
            this.token = data.value.access_token;
           
            const d = new Date();
            d.setDate(d.getDate() + 7);
            const token = useCookie('token',{
              expires: d
            });
            token.value = this.token;
             return navigateTo('/');
          }
        },
        async getMe(){
          if (typeof window !== 'undefined' && this.user == null) {
            const { data, pending, error:errors, refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/me`, {
              method:'get',
              headers:{
                "Authorization":"Bearer "+this.token
              }
            });

            if(errors.value){
              this.error = errors.value.data;
            }

            if(data.value){
              console.log(data.value);
              if(this.getdefaultOffice == 0){
                this.setDefaultOffice(data.value.offices[0].id);
              }else{
                this.getdefaultOffice = useCookie('defaultOffice');
              }
              return this.user = data.value;
            }
          }else{
            return;
          }
        },
        logOut(){
          this.user=null;
          this.token = null;
          localStorage.setItem('token', null);
        },
        async getUser(){
          const {data:notices,pending:pendings,error:errors,refresh} = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/v2/notices`,{
              params:{page:1,limit:15}
            });
        
            this.pending = pendings;
            if(errors.value){
              this.error = errors.value.data;
            }

            if(notices !== null){
              this.allNotices = JSON.parse(JSON.stringify(notices.value.data));
            }
            
            return {
              notices:this.allNotices,
              sections:this.sections,
              error:this.error,
              pending:this.pending
            }
      
      },
      async getPricing(){
        // https://panel.homeenger.com/api/matters/1/pricings?page=1
        const { data, pending, error:errors, refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/matters/1/pricings?page=1`, {
          method:'get',
          headers:{
            "Authorization":"Bearer "+this.token
          }
        });

        if(errors.value){
          this.error = errors.value.data;
        }

        if(data.value){
          return this.pricing = data.value;
        }
      },
      async getSubScribe(){
        const { data, pending, error:errors, refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/offices/${this.getdefaultOffice}/subscribes?page=1`, {
          method:'get',
          headers:{
            "Authorization":"Bearer "+this.token
          }
        });

        if(errors.value){
          this.error = errors.value.data;
        }

        if(data.value){
          return this.subScribe = data.value;
        }
      },
      async getCarts(){
        // https://panel.homeenger.com/api/matters/1/pricings?page=1
        const { data, pending, error:errors, refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/offices/${this.getdefaultOffice}/carts?page=1`, {
          method:'get',
          headers:{
            "Authorization":"Bearer "+this.token
          }
        });

        if(errors.value){
          this.error = errors.value.data;
        }

        if(data.value){
          return this.carts = data.value;
        }
      }
      ,
      async getPendingCart(){
        // https://panel.homeenger.com/api/matters/1/pricings?page=1
        const { data, pending, error:errors, refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/offices/${this.getdefaultOffice}/cart-items/pending?page=1&per_page=25/`, {
          method:'get',
          headers:{
            "Authorization":"Bearer "+this.token
          }
        });

        if(errors.value){
          this.error = errors.value.data;
        }

        if(data.value){
          return data.value;
        }
      },
      async getpostPriceRequest(){
        
        const { data, pending, error:errors, refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/offices/${this.getdefaultOffice}/cart-items/post-pricing-requests?page=1&per_page=25`,{
          headers:{
            "Authorization":"Bearer "+this.token
          }
        });

        if(errors.value){
          this.error = errors.value.data;
        }

        if(data.value){
          return data.value;
        }
      },
      async answerRequestPostPricing(id,amount){
        const { data, pending:pendings, error:errors,refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/carts/items/${id}/answer-request-post-pricing
        `, {
          method:'post',
          body:{
            post_price:amount
          },
          headers:{
            "Authorization":"Bearer "+this.token
          }
        });
  
        if(pendings){
          this.pending = pendings;
        }
  
        if(errors.value)
        {
          this.error = errors.value.data;
        }
  
        if(data.value)
        {
          this.pending = false;
          return data.value;
        }
      },
      async getDoneFailed(){
        
        const { data, pending, error:errors, refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/offices/${this.getdefaultOffice}/cart-items/done-failed?page=1&per_page=25`,{
          headers:{
            "Authorization":"Bearer "+this.token
          }
        });

        if(errors.value){
          this.error = errors.value.data;
        }

        if(data.value){
          return data.value;
        }
      },
      async wallet(){
        const { data, pending:pendings, error:errors,refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/offices/${this.getdefaultOffice}/credit-wallets?page=1`, {
          method:'get',
          headers:{
            "Authorization":"Bearer "+this.token
          }
        });
  
        if(pendings){
          this.pending = pendings;
        }
  
        if(errors.value)
        {
          this.error = errors.value.data;
        }
  
        if(data.value)
        {
          this.pending = false;
          return data.value;
        }
      },
      async transaction(){
        const { data, pending:pendings, error:errors,refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/wallets/${this.getdefaultOffice}/transactions?page=1`, {
          method:'get',
          headers:{
            "Authorization":"Bearer "+this.token
          }
        });
  
        if(pendings){
          this.pending = pendings;
        }
  
        if(errors.value)
        {
          this.error = errors.value.data;
        }
  
        if(data.value)
        {
          this.pending = false;
          return data.value;
        }
      },
      async deposit(amount){
        const { data, pending:pendings, error:errors,refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/wallets/${this.getdefaultOffice}/deposit
        `, {
          method:'post',
          body:{
            amount:amount
          },
          headers:{
            "Authorization":"Bearer "+this.token
          }
        });
  
        if(pendings){
          this.pending = pendings;
        }
  
        if(errors.value)
        {
          this.error = errors.value.data;
        }
  
        if(data.value)
        {
          this.pending = false;
          return data.value;
        }
      },
      async transactionBankReceipts(){
        const { data, pending:pendings, error:errors,refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/wallets/${this.getdefaultOffice}/transaction-bank-receipts?page=1
        `, {
          method:'get',
          headers:{
            "Authorization":"Bearer "+this.token
          }
        });
  
        if(pendings){
          this.pending = pendings;
        }
  
        if(errors.value)
        {
          this.error = errors.value.data;
        }
  
        if(data.value)
        {
          this.pending = false;
          return data.value;
        }
      },
      async transactionSetting(sheba,withdraw_method){
        //monthly
        //weekly
        //manually
        const { data, pending:pendings, error:errors,refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/wallets/${this.getdefaultOffice}
        `, {
          method:'PUT',
          body:{
            sheba:sheba,
            withdraw_method:withdraw_method
          },
          headers:{
            "Authorization":"Bearer "+this.token
          }
        });
  
        if(pendings){
          this.pending = pendings;
        }
  
        if(errors.value)
        {
          this.error = errors.value.data;
        }
  
        if(data.value)
        {
          this.pending = false;
          return data.value;
        }
      },
      setDefaultOffice(id){

          const d = new Date();
          d.setDate(d.getDate() + 7);
          const defaultOffice = useCookie('defaultOffice',{
            expires: d
          });
          defaultOffice.value = id;
          this.getdefaultOffice = defaultOffice.value;
      },
      async refresh($data){
         await this.allNotices.push(...$data);
      }
    },
  })