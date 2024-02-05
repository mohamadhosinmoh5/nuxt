
export default function (array,obj) {

  for (const objs of array)
  {
    for (const key in objs) {
      if(obj[key]){
        array.splice(array.indexOf(objs), 1);
      }
    }
  }
  array.push(obj);
  return array;
  }