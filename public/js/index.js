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


}

function removeAllClass(tabItems) {
    for (const key in tabItems) {
        if (tabItems.hasOwnProperty.call(tabItems, key)) {
            const element = tabItems[key];
            element.classList.remove('active')
        }
    }
 }
