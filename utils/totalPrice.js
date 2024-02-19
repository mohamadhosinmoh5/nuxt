export default function(items= null){
    

    // console.log(items);
    var discountPrice = 0;
    var allPrice = 0;
    var allPrice = 0;
    if(items !== null){
        items.forEach(el => {
            const elDisprice = el.total_discounted_price * el.count;
            const eltotalPrice = el.total_price * el.count;
            discountPrice =+ elDisprice;
            allPrice =+ eltotalPrice;
        });
    }
    
    return {
        discountPrice:separate(discountPrice),
        allPrice:separate(allPrice),
        profit: separate(allPrice - discountPrice)
    };
}


function separate(Number) 
    {
    Number+= '';
    Number= Number.replace(',', '');
    var x = Number.split('.');
    var y = x[0];
    var z= x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(y))
    y= y.replace(rgx, '$1' + ',' + '$2');
    return y+ z;
    }