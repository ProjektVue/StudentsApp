<template>
  <div>
    <div id="dashboard">
      <section>
        <b-container>
          <b-row class="mt-4" cols="12">
            <b-col cols="4">
              <b-card
                header="My profile"
                header-text-variant="white"
                header-tag="header"
                header-bg-variant="primary"
                style="max-width: 20rem;"
                class="mb-4"
              >
                <b-card-text>
                  <b-row>
                    <b-col align-self="center">
                      <img
                        style="min-width: 6rem;"
                        variant="info"
                        :src="userProfile.avatar"
                      />
                    </b-col>
                    <b-col>
                      {{ userProfile.name }}
                      <br />
                      <small
                        >{{ userProfile.email }}
                        <br />
                        {{ userProfile.city + ", " + userProfile.country }}
                        <br />
                        {{ userProfile.friends.length }}
                        {{
                          userProfile.friends.length === 1
                            ? "friend"
                            : "friends"
                        }}
                        <br />
                        {{ numberOfEventsCreatedByUser }}
                        {{
                          numberOfEventsCreatedByUser === 1 ? "event" : "events"
                        }}
                        created
                      </small>
                    </b-col>
                  </b-row>
                </b-card-text>
              </b-card>
            </b-col>
            <b-col lg="8" sm="12">
              <h2>Events</h2>
              <b-list-group
                class="mb-4 mt-4"
                v-for="event in events"
                :key="event.id"
              >
                <b-list-group-item
                  href="#"
                  class="flex-column align-items-start"
                >
                  <div class="d-flex w-100 justify-content-between mb-2">
                    <h5 class="mb-1">{{ event.name }}</h5>
                    <small>added by {{ event.createdBy }}</small>
                  </div>
                  <p>
                    <small>Date:</small> {{ event.date }} at {{ event.time }}
                  </p>
                  <p><small>Place:</small> {{ event.place }}</p>
                  <p class="mb-1">
                    <small>Description: </small>{{ event.description }}
                  </p>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-container>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
const fb = require("../firebaseConfig.js");

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState([
      "userProfile",
      "currentUser",
      "allUsers",
      "events",
      "numberOfEventsCreatedByUser",
    ]),
  },
  methods: {},
};
</script>
