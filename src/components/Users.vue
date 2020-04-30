<template>
  <div>
    <div id="dashboard">
      <section>
        <b-container v-if="friendsProfile.length">
          <h2 class="mt-4">Friends</h2>
          <b-row
            class="mt-4"
            cols="1"
            cols-sm="2"
            cols-md="2"
            cols-lg="4"
            align-v="center"
          >
            <b-col v-for="user in friendsProfile" :key="user.email">
              <b-card
                :title="user.name"
                :sub-title="user.email"
                class="mb-4"
                :img-src="user.avatar"
                alt="Image"
                img-top
              >
                <b-card-text>
                  {{ user.city + ", " + user.country }}
                </b-card-text>
                <b-button
                  @click="removeFriend(user.uid)"
                  type="submit"
                  variant="danger"
                  >Remove friend</b-button
                >
              </b-card>
            </b-col>
          </b-row>
        </b-container>
      </section>
    </div>
    <div id="dashboard">
      <section>
        <b-container v-if="otherUsers.length">
          <div class="mt-4" v-if="!friendsProfile.length"></div>
          <h2>Other Users</h2>
          <b-row
            class="mt-4"
            cols="1"
            cols-sm="2"
            cols-md="2"
            cols-lg="4"
            align-v="center"
          >
            <b-col v-for="user in otherUsers" :key="user.email">
              <b-card
                :title="user.name"
                :sub-title="user.email"
                class="mb-4"
                :img-src="user.avatar"
                alt="Image"
                img-top
              >
                <b-card-text>
                  {{ user.city + ", " + user.country }}
                </b-card-text>
                <b-button
                  @click="addFriend(user.uid)"
                  type="submit"
                  variant="success"
                  >Add friend</b-button
                >
              </b-card>
            </b-col>
          </b-row>
        </b-container>
        <div v-if="!otherUsers.length && !friends.length">
          <p class="no-results">There are currently no users</p>
        </div>
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
      "conversations",
      "friends",
    ]),
    friendsProfile() {
      return this.allUsers.filter((user) => this.friends.includes(user.uid));
    },
    otherUsers() {
      return this.allUsers.filter(
        (user) =>
          !this.friends.includes(user.uid) && this.currentUser.uid !== user.uid
      );
    },
  },
  methods: {
    addFriend(friendId) {
      fb.conversationsCollection
        .add({
          messages: [],
          participants: [friendId, this.currentUser.uid],
        })
        .then(() => {
          this.$store.dispatch("fetchConversations");
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    },
    removeFriend(friendId) {
      const conversation = this.conversations.filter((e) => {
        return e.participants.includes(friendId);
      });
      fb.conversationsCollection
        .doc(conversation[0].id)
        .delete()
        .then(() => {
          this.$store.dispatch("fetchConversations");
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    },
  },
};
</script>
