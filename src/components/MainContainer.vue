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
const currentMoneyAnimation = ref(null);
let animatedMoney = ref(0);

onMounted(() => {
  sortedList.value = itensList.sort((a, b) => {
    return a.price - b.price;
  });

  animatedMoney.value = totalOfMoney.value;
});

watch(totalOfMoney, (newValue, oldValue) => {
  const speed = 100;

  const increaseMoney = () => {
    const currentMoney = animatedMoney.value;
    const inc = Math.ceil((newValue - oldValue) / speed);

    if (currentMoney < newValue) {
      animatedMoney.value = Math.ceil(currentMoney + inc);
      currentMoneyAnimation.value = setTimeout(increaseMoney, 1);
    } else {
      animatedMoney.value = newValue;
    }
  };

  const decreaseMoney = () => {
    const currentMoney = animatedMoney.value;
    const inc = Math.ceil((oldValue - newValue) / speed);

    if (currentMoney > newValue) {
      animatedMoney.value = Math.ceil(currentMoney - inc);
      currentMoneyAnimation.value = setTimeout(decreaseMoney, 1);
    } else {
      animatedMoney.value = newValue;
    }
  };

  clearTimeout(currentMoneyAnimation.value);

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
