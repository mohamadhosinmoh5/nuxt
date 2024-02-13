
import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

export const useNoticeStore = defineStore('notice', {
    state: () => ({
      allNotices: null,
      notice: null,
      query:`?per_page=15&use_gps=false&sold_with_loan=false&fetch_all=false`,
      pages:1,
      clickCat:0,
      sectionKey:[],
      categories:null,
      lastCategory:[],
      sections: null,
      pending: null ,
      error: null ,
      params:null
      }),
    getters:{
      getclickCat:(state)=>{return state.clickCat;},
      getNotices:(state)=>{return state.allNotices;}
    },
    actions: {
      setQuery(key=null,value,section=false){
           
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
       
        const {data:notices,pending:pendings,error:errors,refresh} = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/v2/notices${this.query}`,{
        method:'get',
        });
        
        this.pending = pendings;
        if(errors.value){
          this.error = errors.value.data;
        }
        console.log(notices.value);
        if(notices.value){
          this.allNotices = JSON.parse(JSON.stringify(notices.value.data));
        }

        

        return {
          allNotices:this.allNotices,
          sections:this.sections,
          error:this.error,
          pending:this.pending,
        }
      },
      async fetchData(){
        console.log(this.query);
        const {data:notices,pending:pendings,error:errors,refresh} = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/v2/notices${this.query}`);
        
        this.pending = pendings;
        if(errors.value){
          this.error = errors.value.data;
        }
        
        if(notices.value){
          this.allNotices = JSON.parse(JSON.stringify(notices.value.data));
        }
        
        return {
          allNotices:this.allNotices,
          sections:this.sections,
          error:this.error,
          pending:this.pending,
        }
      
      },
      async getNotice(noticeId){
        const auth = useAuthStore();
        const {data:notice,pending:pendings,error:errors,refresh} = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/notices/${noticeId}?office_id=${auth.getdefaultOffice}`,{
            method:'get',
            headers:{
            "Authorization":"Bearer "+auth.token
            },
        })

        this.pending = pendings;
       
        if(errors.value){
          this.error = errors.value.data;
        }
        
        if(notice.value){
          return this.notice = notice.value;
        }
      },
      async getCategory(catId = null){
       
        if( this.categories != null ){
          this.clickCat = this.clickCat+1;
          this.lastCategory[this.clickCat] = this.categories.data;
        }

       if(catId != null){
        this.setQuery('category_id',catId,false);
     
        this.categories = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/v2/NoticeCategory?category_id=${catId}`,{
             method:'get'
         })
       }else{
        this.categories = await useFetch(`${useRuntimeConfig().public.BaseUrl}/api/v2/NoticeCategory`,{
          method:'get'
        })
       }

        this.pending = this.categories.pending;
       
        if(this.categories.error){
          this.error = this.categories.error;
        }

        if(this.categories.data){
          return this.categories.data;
        }
      },
      removeClickCat(){
        this.clickCat = this.clickCat - 1;
      },

    },
  })