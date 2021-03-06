<template>
  <div id="login">
    <transition name="fade">
      <div v-if="performingRequest" class="loading">
        <p>Loading...</p>
      </div>
    </transition>
    <section>
      <div class="col1">
        <h1>Student App</h1>
        <p>
          Welcome to the Student App sample social media web app powered by
          Vue.js and Firebase.
        </p>
      </div>
      <div
        class="col2"
        :class="{
          'signup-form': !showLoginForm && !showForgotPassword,
        }"
      >
        <b-form @submit.prevent v-if="showLoginForm">
          <h1>Welcome Back</h1>
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="loginForm.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-2"
            label="Password"
            label-for="text-password"
          >
            <b-input
              type="password"
              id="text-password"
              v-model="loginForm.password"
            ></b-input>
          </b-form-group>
          <b-button @click="login" type="submit" variant="primary"
            >Login</b-button
          >
          <div class="extras">
            <a @click="togglePasswordReset">Forgot Password</a>
            <a @click="toggleForm">Create an Account</a>
          </div>
        </b-form>
        <b-form @submit.prevent v-if="!showLoginForm && !showForgotPassword">
          <h1>Welcome Back</h1>
          <b-form-group
            id="input-group-6"
            label="Email address:"
            label-for="input-6"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              @input="isTyping = true"
              v-model="signUpEmail"
              id="input-1"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-7" label="Password" label-for="input-7">
            <b-input
              type="password"
              id="text-password"
              v-model="signupForm.password"
            ></b-input>
            <b-form-text id="password-help-block">
              Your password must be at least 6 characters.
            </b-form-text>
          </b-form-group>
          <b-form-group id="input-group-2" label="Name:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="signupForm.name"
              placeholder="John Smith"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-3" label="Country:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="signupForm.country"
              placeholder="Poland"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-4" label="City:" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model="signupForm.city"
              placeholder="Krakow"
              required
            ></b-form-input>
          </b-form-group>
          <b-button @click="signup" type="submit" variant="primary"
            >Create account</b-button
          >
          <div class="extras">
            <a @click="toggleForm">Back to Log In</a>
          </div>
        </b-form>
        <form v-if="showForgotPassword" @submit.prevent class="password-reset">
          <div v-if="!passwordResetSuccess">
            <h1>Reset Password</h1>
            <p>We will send you an email to reset your password</p>
            <b-form-group
              id="input-group-6"
              label="Email address:"
              label-for="input-6"
            >
              <b-form-input
                id="input-1"
                v-model="passwordForm.email"
                type="email"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-form-group>

            <b-button @click="resetPassword" type="submit" variant="primary"
              >Reset password</b-button
            >

            <div class="extras">
              <a @click="togglePasswordReset">Back to Log In</a>
            </div>
          </div>
          <div v-else>
            <h1>Email Sent</h1>
            <p>
              check your email for a link to reset your password
            </p>
            <button @click="togglePasswordReset" class="button">
              Back to login
            </button>
          </div>
        </form>
        <transition name="fade">
          <div v-if="errorMsg !== ''" class="error-msg">
            <p>{{ errorMsg }}</p>
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
const fb = require("../firebaseConfig.js");
import isValidForm from "../utils/isValidForm";
import createGravatarHash from "../utils/createGravatarHash";
import axios from "axios";
import _ from "lodash";

export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      signupForm: {
        country: "",
        name: "",
        city: "",
        password: "",
      },
      passwordForm: {
        email: "",
      },
      showLoginForm: true,
      showForgotPassword: false,
      passwordResetSuccess: false,
      performingRequest: false,
      errorMsg: "",
      signUpEmail: "",
      isTyping: false,
      searchResult: [],
      isLoading: false,
      gravatarApi: process.env.VUE_APP_GRAVATAR_API_URL,
      gravatarAvatarUrl: process.env.VUE_APP_GRAVATAR_AVATAR_URL,
      geoApiKey: process.env.VUE_APP_GEO_API_KEY,
      geoApiUrl: process.env.VUE_APP_GEO_API_URL,
    };
  },
  methods: {
    prefillUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            axios
              .get(`${this.geoApiUrl}?key=${this.geoApiKey}&q=${lat}%2C${long}`)
              .then((response) => {
                if (
                  response &&
                  response.data &&
                  response.data.results &&
                  response.data.results.length &&
                  response.data.results[0].components
                ) {
                  const {
                    town,
                    country,
                    city,
                  } = response.data.results[0].components;
                  this.signupForm.city = city || town;
                  this.signupForm.country = country;
                }
                this.searchResult = response.data.items;
              })
              .catch((e) => {
                console.error("Localization API not working");
              });
          },
          (e) => {
            console.error("Geolocation not supported");
          }
        );
      }
    },
    toggleForm() {
      this.errorMsg = "";
      this.showLoginForm = !this.showLoginForm;
      if (!this.showLoginForm) {
        this.prefillUserLocation();
      }
    },
    togglePasswordReset() {
      if (this.showForgotPassword) {
        this.showLoginForm = true;
        this.showForgotPassword = false;
        this.passwordResetSuccess = false;
      } else {
        this.showLoginForm = false;
        this.showForgotPassword = true;
      }
    },
    login() {
      this.performingRequest = true;

      fb.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then((result) => {
          this.$store.commit("setCurrentUser", result.user);
          this.$store.dispatch("fetchUserProfile");
          this.performingRequest = false;
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          console.log(err);
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    },
    signup() {
      if (isValidForm(this.signupForm)) {
        this.performingRequest = true;

        fb.auth
          .createUserWithEmailAndPassword(
            this.signUpEmail,
            this.signupForm.password
          )
          .then((result) => {
            this.$store.commit("setCurrentUser", result.user);

            // create user obj
            fb.usersCollection
              .doc(result.user.uid)
              .set({
                country: this.signupForm.country,
                name: this.signupForm.name,
                city: this.signupForm.city,
                email: this.signUpEmail,
                avatar: this.getAvatarLink(this.signUpEmail),
                friends: [],
                events: [],
              })
              .then(() => {
                this.$store.dispatch("fetchUserProfile");
                this.performingRequest = false;
                this.$router.push("/dashboard");
              })
              .catch((err) => {
                console.log(err);
                this.performingRequest = false;
                this.errorMsg = err.message;
              });
          })
          .catch((err) => {
            console.log(err);
            this.performingRequest = false;
            this.errorMsg = err.message;
          });
      }
    },
    getAvatarLink(email) {
      if (email) {
        return `${this.gravatarAvatarUrl}/${createGravatarHash(email)}`;
      }
    },
    resetPassword() {
      this.performingRequest = true;

      fb.auth
        .sendPasswordResetEmail(this.passwordForm.email)
        .then(() => {
          this.performingRequest = false;
          this.passwordResetSuccess = true;
          this.passwordForm.email = "";
        })
        .catch((err) => {
          console.log(err);
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    },
    searchUserByEmail(searchQuery) {
      this.isLoading = true;
      const hash = createGravatarHash(searchQuery);
      axios
        .get(`${this.gravatarApi}/${hash}.json`)
        .then((response) => {
          this.isLoading = false;
          if (
            response &&
            response.data &&
            response.data.entry &&
            response.data.entry.length
          ) {
            this.signupForm.name = response.data.entry[0].preferredUsername;
          }
          this.searchResult = response.data.items;
        })
        .catch((e) => (this.isLoading = false));
    },
  },
  watch: {
    signUpEmail: _.debounce(function() {
      this.isTyping = false;
    }, 1000),
    isTyping(value) {
      if (!value) {
        this.searchUserByEmail(this.signUpEmail);
      }
    },
  },
};
</script>
