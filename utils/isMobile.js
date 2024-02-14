
export default function(url){
   
if (typeof window !== 'undefined') {
    if(window?.innerWidth < 527 ){
      return true;
    }else{
      return false;
    }
  }
}
