<template>
  <div>
    <h1>Login</h1>
    <div class="error" v-if="error">{{error.message}}</div>
    <form @submit.prevent="pressed">
      <div class="login">
        <input type="email" v-model="email" placeholder="login">
      </div>
      <div class="password">
        <input type="password" v-model="password" placeholder="hasło">
      </div>
      <button>Zaloguj</button>
    </form>
  </div>
</template>

<script>
  import {auth} from "../firebase";

  export default {
    data() {
      return {
        email: "",
        password: "",
        error: ""
      }
    },
    methods: {
      pressed() {
        auth.signInWithEmailAndPassword(this.email, this.password)
          .then(data => {
            console.log(data);
            this.$router.replace({name: "home"})
          })
          .catch(e => {
            this.error = e;
          });
      }
    }
  }
</script>

<style scoped>
  div {
    color: inherit;
  }

  input {
    width: 400px;
    padding: 30px;
    margin: 20px;
    font-size: 21px;
  }

  button {
    width: 400px;
    height: 75px;
    font-size: 100%;
  }

  .error {
    color: red;
  }
</style>
