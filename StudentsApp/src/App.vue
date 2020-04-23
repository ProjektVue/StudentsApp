<template>
  <div id="app">
    <top-header></top-header>
    <router-view/>
  </div>
</template>

  <script>
  import Header from "./components/Top-Header";

  export default {
    components: {
      "top-header": Header
    }
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
