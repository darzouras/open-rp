<template>
  <div id="app">
    <Header />

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang="scss">
  @import "../public/scss/global.scss";
  
  main {
      width: 90%;
      max-width: 800px;
      margin: auto;
  }
</style>
