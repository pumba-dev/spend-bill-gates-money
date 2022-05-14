<template>
  <main class="main-container">
    <MainContainerHeader></MainContainerHeader>

    <MoneyBar :totalOfMoney="totalOfMoney"></MoneyBar>

    <MarketList :itemList="sortedList"></MarketList>

    <ReceiptWrapper
      :totalCostCart="totalCostCart"
      :currentCart="currentCart"
    ></ReceiptWrapper>
  </main>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";

import itensList from "@/assets/mocks/itens-to-sell.js";
import MoneyBar from "./MoneyBar.vue";
import MarketList from "./MarketList.vue";
import ReceiptWrapper from "./ReceiptWrapper.vue";
import MainContainerHeader from "./MainContainerHeader.vue";

const store = useStore();
const sortedList = ref([]);
const totalOfMoney = computed(() => store.getters["getMoney"]);
const currentCart = computed(() => store.getters["getCart"]);
const totalCostCart = computed(() => store.getters["getTotalCostCart"]);

onMounted(() => {
  sortedList.value = itensList.sort((a, b) => {
    return a.price - b.price;
  });
});
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 1000px;
  margin: auto;
}
</style>
