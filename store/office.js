
import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

export const useOfficeStore = defineStore('office', {
    state: () => ({
      allOffices: null,
      office: null,
      query:'?per_page=15&use_gps=false&sold_with_loan=false&fetch_all=false',
      sections: null,
      clickCat:0,
      sectionKey:[],
      categories:null,
      lastCategory:[],
      pending: null ,
      error: null ,
      params:null,
      allNotices:null
    }),
    getters:{
      getclickCat:(state)=>{return state.clickCat;},
      getNotices:(state)=>{return state.allNotices;}
    },
    actions: {
      async getNoticeOffice(officeId){
      
        const {data:notices,pending:pendings,error:errors,refresh} = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/offices/${officeId}/page/notices?per_page=25&page=1`);
        
        this.pending = pendings;
        if(errors.value){
          this.error = errors.value.data;
        }
        
        if(notices.value){
          console.log(notices.value);
          this.allNotices = JSON.parse(JSON.stringify(notices.value.data));
        }

        return {
          allNotices:this.allNotices,
          error:this.error,
          pending:this.pending,
        }

      },async setQuery(key,value){
        if(section){
          if(existArrToArr(value, this.sectionKey,'field_id')){
            this.query = `?per_page=15&use_gps=false&sold_with_loan=false&fetch_all=false`;
          }

          for (const key in value) {
            if (value.hasOwnProperty.call(value, key)) {
              const element = value[key];
      
              this.query = this.query + `
              &section_query[${element['field_id']}][type] = ${element['type']}
              &section_query[${element['field_id']}][category] = ${element['category']}
              &section_query[${element['field_id']}][field_id] = ${element['field_id']}
              &section_query[${element['field_id']}][max] = ${(element['max'] != null) ? element['max'] : ''}
              &section_query[${element['field_id']}][min] = ${(element['min'] != null) ? element['min'] : ''}
              &section_query[${element['field_id']}][value] = ${(element['value'] != null) ? element['value'] : ''}
              `;
              this.sectionKey.push(element['field_id']);
            }
          }
        }else{
          if(key =='category_id'){
            this.query = `?per_page=15&use_gps=false&sold_with_loan=false&fetch_all=false&${key}=${value}`;
          }else{
            this.query = this.query + `&${key}=${value}`;
          }
        }
      this.pages = 1;
      return;

      },
      async fetchQuery(){
        const {data:offices,pending:pendings,error:errors,refresh} = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/v2/offices/${this.query}`);
        
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
        
        const {data:offices,pending:pendings,error:errors,refresh} = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/v2/offices/${this.query}`);
        
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
      async getOffice(officeId){
        const auth = useAuthStore();
        const {data:office,pending:pendings,error:errors,refresh} = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/offices/${officeId}`,{
            method:'get',
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