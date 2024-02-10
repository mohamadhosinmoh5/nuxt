window.onload = () => {
    var bannerImage = document.getElementsByClassName('bannerImage');
    // var img = document.getElementsByClassName('image');
    // console.log(img);
    for (let index = 0; index < bannerImage.length; index++) {
        bannerImage[index].addEventListener('click',()=>{
            var img = document.getElementById('mainimage');
            img.src = bannerImage[index].src;
        })
    }
}


