<template>
  <div class="app">
    <HeaderWrapper></HeaderWrapper>
    <MainContainer></MainContainer>
    <FooterWrapper></FooterWrapper>
  </div>
</template>

<script setup>
import HeaderWrapper from "@/components/HeaderWrapper.vue";
import MainContainer from "@/components/MainContainer.vue";
import FooterWrapper from "./components/FooterWrapper.vue";
</script>

<style lang="scss">
@import "@/sass/reset.scss";
@import "@/sass/global.scss";
@import "@/sass/variables.scss";

.app {
  background-color: $primary-baby-blue;
}
</style>
