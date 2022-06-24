<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, computed, onMounted } from "vue";
import Layout from "./views/Layout.vue";
import Book from "./components/Book.vue";
import Pagination from "vant";
import { getMangas } from "./utils/axios";
// todo axios the manga
onMounted(() => {
  const mangas = getMangas();
});
const mangas = []
const currentPage = ref(1);
const pageItemNum = 10;
const startIndex = computed(() => pageItemNum * (currentPage.value - 1));
const endIndex = computed(() => pageItemNum * currentPage.value);
const list = computed(() => mangas.slice(startIndex.value, endIndex.value));
</script>

<template>
  <layout>
    <book v-for="book in list" :key="book.name" :book="book"></book>
    <template #footer>
      <van-pagination
        v-model="currentPage"
        :total-items="mangas.length"
        :items-per-page="pageItemNum"
        show-page-size="20"
      />
    </template>
  </layout>
</template>

<style lang="scss">
:root {
  --font-size-detail: 14px;
  --color-font: #515151;
  --color-detail: 14px;
}
html {
  background: #fff;
}
</style>
