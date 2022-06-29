<script setup>
import { ref, computed, onMounted } from "vue";
import Layout from "./views/Layout.vue";
import Book from "./components/Book.vue";
import Pagination from "vant";
import { getMangas } from "./utils/axios";
import { handlePageInfo } from "./utils/mobile";

const pageInfo = handlePageInfo();
const { paginationSize, cols, rows } = pageInfo;
const pageItemNum = cols * rows;

const mangas = ref([]);
onMounted(async () => {
  const res = await getMangas();
  mangas.value = JSON.parse(res);
});
const currentPage = ref(1);
const startIndex = computed(() => pageItemNum * (currentPage.value - 1));
const endIndex = computed(() => pageItemNum * currentPage.value);
const list = computed(() =>
  mangas.value.slice(startIndex.value, endIndex.value)
);

const handlePageChange = (e) => {
  window.scrollTo(0, 0);
};
</script>

<template>
  <layout>
    <book v-for="book in list" :key="book.name" :book="book"></book>
    <template #footer>
      <van-pagination
        v-model="currentPage"
        :total-items="mangas.length"
        :items-per-page="pageItemNum"
        :show-page-size="paginationSize"
        @change="handlePageChange"
      />
    </template>
  </layout>
</template>

<style lang="scss">
</style>
