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
    <Wizard v-if="categories && categories.length === 0" />
  </div>
</template>

<script setup>
import { useNoticeStore } from "../store/notice";

const notice = useNoticeStore();
const categories = ref(null);

setTimeout(() => {
  notice.getCategory().then((r) => {
    categories.value = r;
    console.log(categories.value);
  });
}, 100);

const getCategory = (id) => {
  notice.getCategory(id).then((r) => {
    categories.value = r;
    console.log(r);
  });
};
</script>
