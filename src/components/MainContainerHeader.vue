<template>
  <section class="main-container__header">
    <img
      src="@/assets/images/billgates.jpg"
      alt="Image of Bill Gates"
      class="header__logo"
    />
    <h1 class="header__text">Spend Bill Gates' Money</h1>
  </section>
</template>

<style lang="scss" scoped>
@import "@/sass/variables.scss";

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
</style>
