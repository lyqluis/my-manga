<script setup>
import { ref, computed } from "vue";
import { shortenDomain, openPage } from "../utils/data";
import { Popover, Icon } from "vant";

const props = defineProps({
  book: {
    type: Object,
  },
});
const source = computed(() => props.book.sources[0]);

// popover
const showPopover = ref(false);

const placement = window.screen.width <= 400 ? "bottom" : "right";
</script>

<template>
  <div class="book" @mouseover="show">
    <div class="book_header">
      <div class="img" @click="openPage(source)">
        <img :src="book.sources[0].img" alt="" />
      </div>
      <van-popover :placement="placement" v-model:show="showPopover">
        <template #reference>
          <van-icon name="wap-nav" />
        </template>
        <template #default>
          <p v-for="(s, i) in book.sources" :key="i" @click="openPage(s)">
            <span>{{ s.latest }} - {{ s.update_time }} ({{ s.domain }})</span>
          </p>
        </template>
      </van-popover>
    </div>
    <div class="book_detail">
      <p>
        {{ book.name }}
      </p>
      <p>最新：{{ source.latest }}</p>
      <p>更新时间：{{ source.update_time }}</p>
      <p>来源：{{ shortenDomain(source.domain) }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.book {
  margin: 10px;
  margin-bottom: 50px;
  padding-left: 20px;
  position: relative;
  flex: none;
  width: 200px;
  height: 280px;
  border-radius: 10px;
  box-shadow: 0 0 3rem -1rem rgba(0, 0, 0, 0.5);
  &_header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .img {
      width: 120px;
      height: 160px;
      position: relative;
      transform: translateY(-30%);
      border-radius: 10px;
      box-shadow: 0 0 3rem -1rem rgba(0, 0, 0, 0.5);
      transition: all 0.2s ease-in-out;
      overflow: hidden;
      &:hover {
        transform: translateY(-25%) scale(1.0125);
        box-shadow: 0 0.5em 3rem -1rem rgba(0, 0, 0, 0.5);
      }
      img {
        width: 100%;
        height: auto;
      }
    }
  }
  &_detail {
    transform: translateY(-30%);
    font-size: var(--font-size-detail);
    color: var(--color-font);
    p {
      margin: 0;
      &:first-child {
        font-size: 16px;
        margin: 10px 0;
      }
    }
  }
  // iphone
  @media only screen and (max-width: 500px) {
    width: 170px;
    height: 250px;
    margin: 8.75px;
    margin-bottom: 50px;
    padding-left: 5px;
    &_header {
      .img {
        width: 105px;
        height: 140px;
      }
    }
  }
}
</style>