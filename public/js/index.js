const tabItems = document.getElementsByClassName('tabItem');
const activeItem = document.getElementsByClassName('activeItem');

window.onload  = ()=>{
    
    for (const key in tabItems) {
        if (tabItems.hasOwnProperty.call(tabItems, key)) {
            var element = tabItems[key];
            element.addEventListener('click',(e)=>{
                removeAllClass(tabItems)
                if(key == 0){
                    activeItem[0].style.right = '0';
                }else{
                    activeItem[0].style.right = '50%';
                }
                e.target.classList.add('active')
            })
        }
    }


//     var persian={0:'۰',1:'۱',2:'۲',3:'۳',4:'۴',5:'۵',6:'۶',7:'۷',8:'۸',9:'۹'};

// 	function traverse(el){

// 		if(el.nodeType==3){
//             var list=el.data.match(/[0-9]/g);
// 			if(list!=null && list.length!=0){
// 				for(var i=0;i<list.length;i++)
// 					el.data=el.data.replace(list[i],persian[list[i]]);
// 			}
// 		}
// 		for(var i=0;i<el.childNodes.length;i++){
// 			traverse(el.childNodes[i]);
// 		}
// 	}

//     traverse(document.body);
//     var countset = 0;
//     var inter = setInterval(() => {
//         traverse(document.body);
//         if(countset > 15){
//             clearInterval(inter)
//         }
//         countset++;
//     }, 500);
}

function removeAllClass(tabItems) {
    for (const key in tabItems) {
        if (tabItems.hasOwnProperty.call(tabItems, key)) {
            const element = tabItems[key];
            element.classList.remove('active')
        }
    }
 }

