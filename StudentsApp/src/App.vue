<template>
  <div id="app">
    <div id="nav">
      <div v-if="loggedIn">Yes</div>
      <div v-else>No</div>
      <router-link to="/">Home</router-link>
      |
      <span v-if="loggedIn">
        <button class="but" @click="singOut">Wyloguj</button>
      </span>
      <span v-else>
        <router-link to="/login">Zaloguj</router-link>
      </span>
    </div>
    <div>
      <top-header></top-header>
      <router-view/>
    </div>
  </div>
</template>

<script>
  import {auth} from "./firebase";
  import Header from "./components/Top-Header";

  export default {
    components: {
      "top-header": Header
    },
    mounted() {
      this.setUp();
    },
    methods: {
      setUp() {
        auth.onAuthStateChanged(user => {
          if (user) {
            console.log("signed in");
            this.loggedIn = true;
          } else {
            console.log("signed out", this.loggedIn);
            this.loggedIn = false;
          }
        })
      },
      singOut() {
        const data = auth.signOut()
          .then(() => {
            console.log(data);
            this.$router.replace({name: "login"});
          })
          .catch(e => console.log(e));

      }
    },
    data() {
      return {
        loggedIn: false
      }
    },
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


  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a .router-link-exact-active {
    color: #42b983;
  }

</style>
