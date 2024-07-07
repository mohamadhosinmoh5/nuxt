<template>

  <div class="categoryBox">
   
    <div v-if="wizard == null" class="card p-5 m-4 border-1 rounded-sm">
    <loader :start="start" />
      <div class="alert alert-primary">
        ابتدا دسته بندی مربوطه برای گذاشتن آگهی را انتخاب کنید .
      </div>
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
    </div>

    <Wizard v-if="wizard != null" :wizard="wizard" />
  </div>
</template>

<script setup>
import { useNoticeStore } from "../store/notice";

const notice = useNoticeStore();
const categories = ref(null);
const wizard = ref(null);
const current = ref(0);
const start = ref(true);
setTimeout(() => {
  start.value = true;

  notice.getCategory().then((r) => {
    start.value = false;
    categories.value = r;
  });
}, 100);

const getCategory = (id) => {
  start.value = true;
  notice.getCategory(id).then((r) => {
  if(r.length > 1){
  start.value = false;
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
