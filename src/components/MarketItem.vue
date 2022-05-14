<template>
  <div class="market-item">
    <img
      class="item__image"
      :src="require(`@/assets/images/${item.src}.jpg`)"
    />
    <h1 class="item__title">{{ item.title }}</h1>
    <h2 class="item__price">
      {{ "$" + item.price.toLocaleString("en") }}
    </h2>
    <div class="item__actions">
      <GeneralButton
        :class="[
          { 'button--red': itemAmount > 0 },
          { 'button--disabled': itemAmount == 0 },
        ]"
        @click="sellOneItem"
        :disabled="itemAmount == 0"
      >
        Sell</GeneralButton
      >
      <input
        class="item__amount"
        type="number"
        pattern="\d*"
        v-model="itemAmount"
        @input="changeItemAmount"
      />
      <GeneralButton
        :class="[
          { 'button--green': item.price <= totalOfMoney },
          { 'button--disabled': item.price > totalOfMoney },
        ]"
        @click="buyOneItem"
        :disabled="item.price > totalOfMoney"
        >Buy</GeneralButton
      >
    </div>
  </div>
</template>

<script setup>
import GeneralButton from "@/components/GeneralButton.vue";
import { computed, defineProps, ref } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const store = useStore();
const itemAmount = ref(0);
const totalOfMoney = computed(() => store.getters["getMoney"]);

function buyOneItem() {
  store.dispatch("addOneItem", props.item).then(() => {
    itemAmount.value += 1;
  });
}

function sellOneItem() {
  itemAmount.value -= 1;
  store.dispatch("removeOneItem", props.item);
}

function changeItemAmount() {
  store
    .dispatch("changeAmountOfItem", {
      item: props.item,
      quantity: itemAmount.value,
    })
    .then((response) => {
      if (response != "sucess") {
        console.log("newAmount::: " + response);
        itemAmount.value = response;
      }
    });
}
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
    margin-top: 0.35rem;
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
