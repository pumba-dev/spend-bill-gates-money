<template>
  <div class="receipt-item">
    <span class="item__title">{{ item.title }}</span>
    <span class="item__amount">{{ "x" + item.amount }}</span>
    <span class="item__price">{{ "$" + parseToReducedPrice(item.price) }}</span>
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

function parseToReducedPrice(value) {
  const valueString = value.toString();
  const moneyLength = valueString.length;
  const isHundreds = moneyLength / 3 <= 1;
  const isThousands = moneyLength / 3 > 1 && moneyLength / 3 <= 2;
  const isMillions = moneyLength / 3 > 2 && moneyLength / 3 <= 3;
  const isBillions = moneyLength / 3 > 3 && moneyLength / 3 <= 4;
  const numberOfDigits = moneyLength % 3 === 0 ? 3 : moneyLength % 3;
  let acronym = "";
  let reducedNumber = valueString.substring(0, numberOfDigits);

  if (isHundreds) {
    return valueString;
  } else if (isThousands) {
    acronym = "k";
  } else if (isMillions) {
    acronym = "m";
  } else if (isBillions) {
    acronym = "b";
  }

  return reducedNumber + acronym;
}
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
