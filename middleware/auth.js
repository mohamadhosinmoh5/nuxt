import { useAuthStore } from '../store/auth';

export default defineNuxtRouteMiddleware(async (to,from)=>{
    if (typeof window !== 'undefined') {
        const token = useCookie('token');

        if(token.value){
            let auth = useAuthStore();
          
            auth.token = token.value;
            await auth.getMe();
            navigateTo(to)
          }else{
            return navigateTo('/login')
          }
      }
      
})