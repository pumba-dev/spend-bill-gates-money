<template>
  <footer class="footer">
    <span class="footer_message">
      Made with ♡ by
      <a href="https://github.com/pumba-dev" target="_blank">Pumba Developer</a>
    </span>
    <a class="footer__website-url" href="https://pumbadev.com/" target="_blank"
      >PumbaDev.com</a
    >
  </footer>
</template>

<style lang="scss">
@import "@/sass/variables.scss";

.footer {
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
</style>
