<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h3>Rejestracja</h3>
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <div v-if="error" class="error">{{error.message}}</div>
      <form name="form" @submit.prevent="pressed">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            name="email"
            placeholder="email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            name="password"
            placeholder="hasło"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block">Rejestracja</button>
        </div>
      </form>
    </div>
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
        auth.createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            console.log(user);
            this.$router.replace({name: "home"});
          })
          .catch(e => {
            this.error = e;
          });
      }
    }
  }
</script>

<style scoped>
  .error {
    color: red;
    font-size: 18px;
  }

  label {
    display: block;
    margin-top: 10px;
  }

  .card-container.card {
    max-width: 350px !important;
    padding: 40px 40px;
  }

  .card {
    background-color: #f7f7f7;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  }

  .profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
  }
</style>
