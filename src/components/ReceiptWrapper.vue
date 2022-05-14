<template>
  <section class="receipt" v-if="currentCart.length">
    <h1 class="receipt__header">Your Receipt</h1>
    <ReceiptItem
      v-for="item in currentCart"
      :key="item.id"
      :item="item"
    ></ReceiptItem>
    <div class="receipt__total">
      <span class="total__title">TOTAL</span>
      <span class="total__value">{{
        "$" + totalCostCart.toLocaleString("en")
      }}</span>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from "vue";
import ReceiptItem from "./ReceiptItem.vue";

defineProps({
  totalCostCart: {
    type: Number,
    required: true,
  },
  currentCart: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/sass/variables.scss";
.receipt {
  max-width: 100%;
  font-size: 18px;
  padding: 15px 15px 30px;
  margin-top: 10px;
  background-color: #fff;
  text-align: center;

  .receipt__header {
    font-size: 28px;
    padding: 15px 15px 25px;
    font-weight: 700;
  }

  .receipt__total {
    font-weight: 700;
    max-width: 300px;
    border-top: 1px solid #333;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    font-size: $font-md;

    .total__value {
      color: $primary-green;
      text-align: right;
    }
  }
}
</style>
