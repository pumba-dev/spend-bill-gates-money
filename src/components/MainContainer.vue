<template>
  <main class="main-container">
    <section class="main-container__header">
      <img
        src="@/assets/images/billgates.jpg"
        alt="Image of Bill Gates"
        class="header__logo"
      />
      <h1 class="header__text">Spend Bill Gates' Money</h1>
    </section>

    <section class="main-container__money-bar">
      {{ "$99.99" }}
    </section>

    <section class="main-container__market-list">
      <MarketItem
        v-for="item in sortedList"
        :key="item.id"
        :item="item"
      ></MarketItem>
    </section>
  </main>
</template>

<script setup>
import MarketItem from "@/components/MarketItem.vue";
import itensList from "@/assets/mocks/itens-to-sell.js";
import { onMounted, ref } from "@vue/runtime-core";

const sortedList = ref([]);
onMounted(() => {
  sortedList.value = itensList.sort((a, b) => {
    return a.price - b.price;
  });
});
</script>

<style lang="scss" scoped>
@import "@/sass/variables.scss";

.main-container {
  max-width: 1000px;
  margin: auto;

  .main-container__header {
    width: 100%;
    background: $primary-white;
    padding: 30px 20px;
    margin-bottom: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    .header__logo {
      user-select: none;
      width: 125px;
      height: 125px;
      margin: 10px auto 25px;
      border-radius: 125px;
    }

    .header__text {
      font-size: 32px;
      font-weight: 700;
      text-align: center;
      line-height: 1.3em;
    }
  }

  .main-container__money-bar {
    color: $primary-white;
    background-color: $primary-green;
    background: $gradient-green;

    top: 0;
    position: sticky;
    z-index: 9999;
    padding: 20px;
    margin: 10px 0;

    font-size: $font-4xl;
    font-weight: 700;
    text-align: center;
  }

  .main-container__market-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 10px 10px;
  }
}
</style>
