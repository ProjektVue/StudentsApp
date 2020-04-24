<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href class="navbar-brand" @click.prevent="toHome">StudentsApp</a>
      <div v-if="currentUser" class="navbar-nav ml-auto">
        <div class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/addEvent" class="nav-link">
              Dodaj wydarzenie
            </router-link>
          </li>
        </div>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            Rejestracja
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            Logowanie
          </router-link>
        </li>
      </div>
      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            {{ currentUser.email }}
          </router-link>
        </li>
        <li class="nav-item">
          <a href class="nav-link" @click.prevent="singOut">
            Wyloguj
          </a>
        </li>
      </div>
    </nav>
  </div>
</template>

<script>
  import {auth} from "../firebase";

  export default {
    mounted() {
      this.setUp();
    },
    methods: {
      setUp() {
        auth.onAuthStateChanged(user => {
          console.log(user);
          this.currentUser = user;
        })
      },
      singOut() {
        const data = auth.signOut()
          .then(() => {
            console.log(data);
            this.$router.replace({name: "login"});
          })
          .catch(e => console.log(e));
      },
      toHome() {
        this.$router.replace({name: "home"});
      }
    },
    data() {
      return {
        loggedIn: false,
        currentUser: null
      }
    }
  }
</script>

<style scoped>

</style>
