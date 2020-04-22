<template>
  <div id="app">
    <div>
      <top-header></top-header>
      <router-view/>
    </div>
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

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
