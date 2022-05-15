<template>
  <div class="receipt-item">
    <span class="item__title">{{ item.title }}</span>
    <span class="item__amount">{{
      "x" + parseToReducedNumber(item.amount)
    }}</span>
    <span class="item__price">{{
      "$" + parseToReducedNumber(item.price)
    }}</span>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { parseToReducedNumber } from "@/utils/parseToReducedNumber";

defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/sass/variables.scss";

.receipt-item {
  max-width: 290px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.2rem;

  display: grid;
  grid-gap: 10px 0;
  grid-template-columns: 170px 45px 75px;

  font-size: 18px;

  .item__title {
    text-align: left;
    text-overflow: ellipsis;
  }

  .item__amount {
    text-align: left;
  }

  .item__price {
    font-weight: 700;
    text-align: right;
    color: $primary-green;
  }
}
</style>
