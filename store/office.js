
import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

export const useOfficeStore = defineStore('office', {
    state: () => ({ allOffices: null,office: null,query:{}, sections: null,pending: null ,error: null , params:null}),

    actions: {
      async setQuery(key,value){
        this.allOffices = null;
          this.query[key] = value;
          await this.fetchQuery();

          return this.allOffices;

      },
      async fetchQuery(){
        const {data:offices,pending:pendings,error:errors,refresh} = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/v2/offices`,{
          query:this.query
        });
        
        this.pending = pendings;
        if(errors.value){
          this.error = errors.value.data;
        }
        
        if(offices.value){
          console.log(offices.value);
          this.allOffices = JSON.parse(JSON.stringify(offices.value.data));
        }

        return {
          allOffices:this.allOffices,
          sections:this.sections,
          error:this.error,
          pending:this.pending,
        }
      },
      async fetchData(){
        
        const {data:offices,pending:pendings,error:errors,refresh} = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/v2/offices`,{
            query:{page:1,limit:15}
          });
        
        this.pending = pendings;
        if(errors.value){
          this.error = errors.value.data;
        }
        
        if(offices.value){
          this.allOffices = JSON.parse(JSON.stringify(offices.value.data));
        }
        
        return {
          allOffices:this.allOffices,
          sections:this.sections,
          error:this.error,
          pending:this.pending,
        }
      
      },
      async getoffice(officeId){
        const auth = useAuthStore();
        const {data:office,pending:pendings,error:errors,refresh} = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/offices/${officeId}?office_id=${auth.user.offices[0].id}`,{
            method:'get',
            headers:{
            "Authorization":"Bearer "+auth.token
            },
        })

        this.pending = pendings;
       
        if(errors.value){
          this.error = errors.value.data;
        }
        
        if(office.value){
          return this.office = office.value;
        }
      },
    },
  })