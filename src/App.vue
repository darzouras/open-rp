<template>
  <div id="app">
    <Header />
    <Main />

    HI DOES THIS WORK
  </div>
</template>

<script>
import Main from '@/components/Main.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    Main,
    Header
  }
}
</script>

<style lang="scss">
  @import "../public/scss/global.scss";
  #app {
    
  }
</style>
