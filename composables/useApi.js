
export default function useApi() {
    const fetch = async (url,params) => {
        const data =  await useFetch(`${useRuntimeConfig().public.BaseUrl}/${url}`,params).data;
    }

    return fetch;
    
}