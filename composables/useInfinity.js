import { useNoticeStore } from '../store/notice';
export default function ({window,url=null,allData=null}){
    
    const allDatas = ref(allData);
    const scrollTop = ref(null);
    const scrollCount = ref(0);
    const page = ref(1);
    let limit = ref(15);
    const fetchingData = ref(false);
    // const infinity = ref(box);
    // const pending = ref(null);
    const error = ref(null);
    const scrollableHeight = ref(0);

    const handleScroll = async () => {
       
        scrollTop.value = window.scrollY;

        var scrollPosition = window.pageYOffset;
        var windowSize     = window.innerHeight;
        var bodyHeight     = document.body.offsetHeight;
        const distanceToBottom = document.body.scrollHeight - window.innerHeight - window.scrollY;
        scrollableHeight.value = Math.max(bodyHeight - (scrollPosition + windowSize), 0);
        // scrollableHeight.value = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
        //     document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - infinity.value.offsetTop;
        // scrollableHeight.value = window.scrollHeight - window.innerHeight + infinity.value.offsetTop ;
        // console.log(scrollableHeight.value,scrollTop.value,distanceToBottom);

        if(scrollableHeight.value < 40 && fetchingData.value != true){
            scrollCount.value++;
            fetchingData.value = true;
           await getUserOnScroll().then(()=>{
            fetchingData.value = false;

           });
        }
    }

    const created =  () => {
        window.addEventListener('scroll',handleScroll);
    }

    const destroyed = () => {
        if (process.client) {
            window.removeEventListener('scroll', handleScroll);
        }
    }

    const getUserOnScroll = async () => {
        // try {
        const store = useNoticeStore();
        let query = store.query;
        page.value = page.value + 1;
        const {data:newUser,pending:pending} = await useFetch(`${useRuntimeConfig().public.BaseUrl}/${url}${query}&page=${page.value}`)
     
        let alldatasNewUser = JSON.parse(JSON.stringify(newUser.value.data));
        console.log(alldatasNewUser,allDatas.value);
        // useNoticeStore().setData(alldatasNewUser);
        if(alldatasNewUser.length < 1){
            this.error = 'دیتایی دیگر وجود ندارد :('
        }
        allDatas.value.push(...alldatasNewUser);
        
        return allDatas.value;
        // } catch (e) {
        //     error.value =  'خطا در واکشی داده';
        // }
    }

    return {
        page,
        error,
        fetchingData,
        allDatas:allDatas,
        created,
        destroyed,
    }


}