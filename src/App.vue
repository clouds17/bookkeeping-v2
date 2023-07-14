<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '~@/assets/style/reset.scss';
@import '~@/assets/style/helper.scss';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  font-size: 15px;
  font-family: $font-kai;
  background-color: #f5f5f5;
  color: #333;
}


</style>
