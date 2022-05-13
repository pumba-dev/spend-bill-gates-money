<template>
  <div class="market-item">
    <img
      class="item__image"
      :src="require(`@/assets/images/${item.src}.jpg`)"
    />
    <h1 class="item__title">{{ item.title }}</h1>
    <h2 class="item__price">{{ "$" + item.price }}</h2>
    <div class="item__actions">
      <GeneralButton
        :class="[
          { 'button--red': itemAmount > 0 },
          { 'button--disabled': itemAmount == 0 },
        ]"
        @click="itemAmount--"
      >
        Sell</GeneralButton
      >
      <input
        class="item__amount"
        type="number"
        pattern="\d*"
        v-model="itemAmount"
      />
      <GeneralButton class="button--green" @click="itemAmount++"
        >Buy</GeneralButton
      >
    </div>
  </div>
</template>

<script setup>
import GeneralButton from "@/components/GeneralButton.vue";
import { defineProps, ref } from "vue";
defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const itemAmount = ref(0);
</script>

<style lang="scss" scoped>
@import "@/sass/variables.scss";

.market-item {
  background-color: $primary-white;
  padding: 20px 15px;

  display: flex;
  flex-direction: column;
  align-items: center;

  .item__image {
    margin: 15px auto;
    height: 120px;
    max-width: 100%;
    object-fit: contain;
    user-select: none;
  }

  .item__title {
    font-size: $font-xl;
    font-weight: 700;
  }

  .item__price {
    font-size: $font-lg;
    color: $primary-green;
  }

  .item__actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px 10px;
    margin-top: 25px;
  }

  .item__amount {
    font-size: 16px;
    text-align: center;
    padding: 9px 12px;
    border-radius: 3px;
    border: 1px solid $primary-gray;
    width: 100%;
  }
}
</style>
