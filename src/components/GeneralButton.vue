<template>
  <button class="general-button">
    <slot></slot>
  </button>
</template>

<style lang="scss">
@import "@/sass/_variables.scss";

.general-button {
  cursor: pointer;
  padding: 10px 12px;
  border-radius: 3px;
  color: $primary-white;
  border: none;
  font-weight: 700;
  user-select: none;
  touch-action: manipulation;

  font-size: $font-base;
  text-align: center;

  &:disabled {
    background: $primary-baby-blue !important;
  }

  &.button--red {
    background: $gradient-red;
  }

  &.button--green {
    background: $gradient-green;
  }
}
</style>
