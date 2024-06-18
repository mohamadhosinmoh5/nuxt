<template>
  <div class="categoryBox">
    <ul>
      <li v-for="(item, index) in categories" :key="index">
        <img
          v-if="index === 0"
          src="/assets/img/catOne.svg"
          alt="Category One Icon"
        />
        <img
          v-if="index === 1"
          src="/assets/img/catTow.svg"
          alt="Category Two Icon"
        />
        <img
          v-if="index === 2"
          src="/assets/img/catTree.svg"
          alt="Category Three Icon"
        />
        <a @click="getCategory(item.id)" class="link">{{ item.title }}</a>
      </li>
    </ul>
    <Wizard v-if="wizard != null" :wizard="wizard" />
  </div>
</template>

<script setup>
import { useNoticeStore } from "../store/notice";

const notice = useNoticeStore();
const categories = ref(null);
const wizard = ref(null);

setTimeout(() => {
  notice.getCategory().then((r) => {
    categories.value = r;
    console.log(categories.value);
  });
}, 100);

const getCategory = (id) => {
  notice.getCategory(id).then((r) => {
  if(r.length > 1){
    categories.value = r;
  }else{
    categories.value.map((val)=>{
      if(val.id == id){
        wizard.value = val;
      }
    })

  }

  });
};
</script>
