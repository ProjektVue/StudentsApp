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
          <b-form-group
            id="input-group-6"
            label="Email address:"
            label-for="input-6"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-1"
              v-model="signupForm.email"
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
import MD5 from "crypto-js/md5";

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
        email: "",
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
    };
  },
  methods: {
    toggleForm() {
      this.errorMsg = "";
      this.showLoginForm = !this.showLoginForm;
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
            this.signupForm.email,
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
                email: this.signupForm.email,
                avatar: this.getAvatarLink(this.signupForm.email),
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
      const gravatarUrl = "https://www.gravatar.com/avatar";
      if (email) {
        return `${gravatarUrl}/${MD5(email.toLowerCase().trim())}`;
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
  },
};
</script>
