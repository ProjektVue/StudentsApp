<template>
  <section id="event-create-form">
    <div class="col1">
      <b-alert
        variant="success"
        :show="dismissCountDown"
        dismissible
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
        >Event created</b-alert
      >
      <h3>Create Event</h3>
      <div>
        <b-form @submit.prevent>
          <b-form-group id="input-group-1" label="Name:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="event.name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Place:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="event.place"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-3" label="Date:" label-for="input-3">
            <b-form-datepicker
              id="example-datepicker"
              v-model="event.date"
              class="mb-2"
              required
            ></b-form-datepicker>
          </b-form-group>
          <b-form-group id="input-group-4" label="Time:" label-for="input-4">
            <b-form-timepicker
              v-model="event.time"
              locale="en"
              required
            ></b-form-timepicker>
          </b-form-group>
          <b-form-group
            id="input-group-5"
            label="Description:"
            label-for="input-5"
          >
            <b-form-textarea
              id="textarea"
              v-model="event.description"
              placeholder="Enter event description..."
              rows="3"
              max-rows="6"
              required
            ></b-form-textarea>
          </b-form-group>
          <b-button @click="createEvent" type="submit" variant="primary"
            >Add event</b-button
          >
        </b-form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
const fb = require("../firebaseConfig.js");
import Datepicker from "vuejs-datepicker";
import isValidForm from "../utils/isValidForm";

export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      event: {
        time: "",
        name: "",
        place: "",
        date: "",
        description: "",
      },
      dismissCountDown: 0,
    };
  },
  computed: {
    ...mapState(["userProfile", "currentUser"]),
  },
  methods: {
    clearEvent() {
      this.event = {
        time: "",
        name: "",
        place: "",
        date: "",
        description: "",
      };
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    createEvent() {
      if (isValidForm(this.event)) {
        fb.eventsCollection
          .add({
            createdOn: new Date(),
            userId: this.currentUser.uid,
            place: this.event.place,
            date: this.event.date,
            description: this.event.description,
            time: this.event.time,
            comments: 0,
            likes: 0,
            participants: 0,
          })
          .then((ref) => {
            this.dismissCountDown = 4;
            this.clearEvent();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
