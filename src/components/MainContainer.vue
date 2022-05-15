<template>
  <main class="main-container">
    <MainContainerHeader></MainContainerHeader>

    <MoneyBar :totalOfMoney="animatedMoney"></MoneyBar>

    <MarketList :itemList="sortedList"></MarketList>

    <ReceiptWrapper
      :totalCostCart="totalCostCart"
      :currentCart="currentCart"
    ></ReceiptWrapper>
  </main>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref, watch } from "vue";

import itensList from "@/assets/mocks/itens-to-sell.js";
import MoneyBar from "./MoneyBar.vue";
import MarketList from "./MarketList.vue";
import ReceiptWrapper from "./ReceiptWrapper.vue";
import MainContainerHeader from "./MainContainerHeader.vue";

const store = useStore();
const sortedList = ref([]);
const currentCart = computed(() => store.getters["getCart"]);
const totalCostCart = computed(() => store.getters["getTotalCostCart"]);
const totalOfMoney = computed(() => store.getters["getMoney"]);
let animatedMoney = ref(0);

onMounted(() => {
  sortedList.value = itensList.sort((a, b) => {
    return a.price - b.price;
  });

  animatedMoney.value = totalOfMoney.value;
});

watch(totalOfMoney, (newValue, oldValue) => {
  const speed = 200;

  const increaseMoney = () => {
    const inc = (newValue - oldValue) / speed;

    if (animatedMoney.value < newValue) {
      animatedMoney.value = Math.ceil(animatedMoney.value + inc);
      setTimeout(increaseMoney, 1);
    } else {
      animatedMoney.value = newValue;
    }
  };

  const decreaseMoney = () => {
    const inc = (oldValue - newValue) / speed;

    if (animatedMoney.value > newValue) {
      animatedMoney.value = Math.ceil(animatedMoney.value - inc);
      setTimeout(decreaseMoney, 1);
    } else {
      animatedMoney.value = newValue;
    }
  };

  if (newValue > oldValue) {
    increaseMoney();
  } else {
    decreaseMoney();
  }
});
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 1000px;
  margin: auto;
}
</style>
