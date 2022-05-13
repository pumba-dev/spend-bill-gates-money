<template>
  <header class="header">
    <div class="header__inner-container">
      <a href="https://perfectpay.com.br/" target="_blank" class="header__title"
        >Perfect Pay</a
      >
    </div>
  </header>
</template>

<style lang="scss">
@import "@/sass/variables.scss";

.header {
  padding: 30px 0;
  margin-bottom: 25px;
  background-color: #fff;

  .header__inner-container {
    max-width: 1000px;
    margin: auto;
  }

  .header__title {
    text-decoration: none;
    font-weight: 700;
    font-size: $font-3xl;
  }
}
</style>
