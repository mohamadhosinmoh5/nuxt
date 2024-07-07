<template>
    <div>
        <div class="loaderBox">
                <div class="progress bg-success" :style="`width: ${current}%`" ></div>
          </div>
    </div>
</template>


<script setup>
    let prop = defineProps(['start','end','current']);
  
    const current = ref(prop.current);

    setTimeout(() => {
        if(prop.start){
            move();
        }
    }, 0);
    
    onUpdated(() => {
        if(prop.start){
            move();
        }
    })

    var i = 0;
    const move = () => {
        if (i == 0) {
        i = 1;
        var width = 1;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                current.value = 0;
                i = 0;
            } else {
                width++;
                current.value = width;
            }
            }
        }
    }
</script>

<style>
</style>