

export default defineNuxtRouteMiddleware(async (to,from)=>{

  if (typeof window !== 'undefined') {
    if(window?.innerWidth < 527 ){
      return navigateTo('/mobile')
    }else{
      return;
    }
  }
      
})