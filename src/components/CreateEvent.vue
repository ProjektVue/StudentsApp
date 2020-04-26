<template>
  <section id="settings">
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
      <p>Create New Event</p>
      <div class="create-post">
        <form @submit.prevent>
          <label for="name">Name</label>
          <input v-model.trim="event.name" id="name" />
          <label for="name">Place</label>
          <input v-model.trim="event.place" id="name" />
          <label for="name">Date</label>
          <datepicker v-model="event.date" name="uniquename"></datepicker>
          <label for="name">Event Start Time</label>
          <input v-model="event.time" type="time" id="appt" name="appt" />
          <label for="description">Description</label>
          <textarea v-model.trim="event.content"></textarea>
          <button
            @click="createPost"
            :disabled="event.content == ''"
            class="button"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
const fb = require("../firebaseConfig.js");
import Datepicker from "vuejs-datepicker";
import { DropdownPlugin } from "bootstrap-vue";

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
    createPost() {
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
    },
  },
};
</script>
