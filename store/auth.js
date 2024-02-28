
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('Auth', {
    state: () => ({ user: null,pricing:null ,carts:null,subScribe:null,getdefaultOffice:0, token: null,mobile: null ,sendingSms:false}),
    getters: {
      
    },
    actions: {
        async sendSms(mobile){
          
            const { data, pending, error, refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/login-send-verify-code`, {
                method:'post',
                body:{
                    mobile:mobile
                }
              });

              if(data.value){
                this.sendingSms = true;
              }
        },
        async login(code,mobile){
          const { data, pending, error:errors, refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/login`, {
            method:'post',
            body:{
                mobile:mobile,
                code:code
            }
          });
          
          if(errors.hasOwnProperty('value')){
            this.error = errors.value.data.message;
          }

          if(data.value){
            this.user= data.value.user;
            this.token = data.value.access_token;
            const d = new Date();
            d.setDate(d.getDate() + 7);
            const token = useCookie('token',{
              expires: d
            });
             this.token = this.token;
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
              if(this.getdefaultOffice == 0 && !useCookie('defaultOffice')){
                console.log(data.value.offices[0]);
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
        // https://panel.homeenger.com/api/matters/1/pricings?page=1
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
        const { data, pending:pendings, error:errors,refresh } = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/wallets/${this.getdefaultOffice}/deposit
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
      async transactionBankReceipts(sheba,withdraw_method){
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