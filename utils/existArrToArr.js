export default function(obj1,obj2,fieldName){
    for (const key in obj1) {
        if (obj1.hasOwnProperty.call(obj1, key)) {
          const element = obj1[key];
          if(obj2.includes(element[fieldName])){
            return true
          }
        }
      }
    return false;
}