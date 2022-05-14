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
      {{ "$" + totalOfMoney.toLocaleString("en") }}
    </section>

    <section class="main-container__market-list">
      <MarketItem
        v-for="item in sortedList"
        :key="item.id"
        :item="item"
      ></MarketItem>
    </section>

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

    <section class="main-container__footer">
      <span class="footer_message">
        Made with ♡ by
        <a href="https://github.com/pumba-dev" target="_blank"
          >Pumba Developer</a
        >
      </span>
      <a
        class="footer__website-url"
        href="https://pumbadev.com/"
        target="_blank"
        >PumbaDev.com</a
      >
    </section>
  </main>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";

import ReceiptItem from "./ReceiptItem.vue";
import MarketItem from "@/components/MarketItem.vue";
import itensList from "@/assets/mocks/itens-to-sell.js";

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
@import "@/sass/variables.scss";
@import "@/sass/media-querys.scss";

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
    grid-gap: 10px 10px;
    grid-template-columns: repeat(1, minmax(0, 1fr));

    @include media-query(sm) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @include media-query(md) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

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

  .main-container__footer {
    background: white;
    margin-top: 15px;
    padding: 30px 20px 45px;
    color: $primary-black;
    text-align: center;
    text-decoration: none;

    display: flex;
    flex-direction: column;
    justify-content: center;

    .footer_message {
      font-size: $font-lg;
    }

    .footer__website-url {
      margin-top: 20px;
      text-decoration: none;
      font-size: $font-xl;
      font-weight: 700;
    }
  }
}
</style>
