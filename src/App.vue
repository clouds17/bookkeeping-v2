<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '~@/assets/style/reset.scss';
@import '~@/assets/style/helper.scss';
body {
  background-color: #333;

}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  font-size: 15px;
  font-family: $font-kai;
  color: #333;
  background-color: #f5f5f5;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;

}


</style>
