<template>
  <div id="app">
    <Header />

    <main>
      <router-view></router-view>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
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
  @media (min-width: 768px) {
    main {
      padding-top: 75px;
    }
  }
</style>
