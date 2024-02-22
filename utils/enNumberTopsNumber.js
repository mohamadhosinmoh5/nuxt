
export default function(el = null){

    if(el.nodeType==3){
        var list=el.data.match(/[0-9]/g);
        if(list!=null && list.length!=0){
            for(var i=0;i<list.length;i++)
                el.data=el.data.replace(list[i],persian[list[i]]);
        }
    }
    for(var i=0;i<el.childNodes.length;i++){
        enNumberTopsNumber(el.childNodes[i]);
    }
 
}



