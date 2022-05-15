<template>
  <section class="market-list">
    <MarketItem
      v-for="item in itemList"
      :key="item.id"
      :item="item"
    ></MarketItem>
  </section>
</template>

<script setup>
import { defineProps } from "vue";
import MarketItem from "./MarketItem.vue";

defineProps({
  itemList: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/sass/variables.scss";
@import "@/sass/media-querys.scss";

.market-list {
  display: grid;
  grid-gap: 10px 10px;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @include media-query(sm) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @include media-query(md) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
