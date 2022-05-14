<template>
  <section class="money-bar">
    {{ "$" + totalOfMoney.toLocaleString("en") }}
  </section>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  totalOfMoney: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/sass/variables.scss";

.money-bar {
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
</style>
