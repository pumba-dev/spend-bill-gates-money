<template>
  <div class="market-item">
    <img
      class="item__image"
      :src="require(`@/assets/images/${item.src}.jpg`)"
    />
    <h1 class="item__title">{{ item.title }}</h1>
    <h2 class="item__price">{{ "$" + item.price }}</h2>
    <div class="item__actions">
      <button class="button button--red">Sell</button>
      <input class="actions__amount" type="number" pattern="\d*" />
      <button class="button button--green">Buy</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/sass/variables.scss";

.market-item {
  background-color: #fff;
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
}
</style>
