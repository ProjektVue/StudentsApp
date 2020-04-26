<template>
  <div>
    <div id="dashboard">
      <section>
        <b-container v-if="allUsers.length">
          <b-row
            class="mt-4"
            cols="1"
            cols-sm="2"
            cols-md="2"
            cols-lg="4"
            align-v="center"
          >
            <b-col v-for="user in allUsers" :key="user.email">
              <span v-if="currentUser.uid !== user.uid">
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
                    v-if="userProfile.friends.includes(user.uid)"
                    @click="removeFriend(user.uid)"
                    type="submit"
                    variant="danger"
                    >Remove friend</b-button
                  >
                  <b-button
                    v-else
                    @click="addFriend(user.uid)"
                    type="submit"
                    variant="success"
                    >Add friend</b-button
                  >
                </b-card>
              </span>
            </b-col>
          </b-row>
        </b-container>
        <div v-else>
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
    ...mapState(["userProfile", "currentUser", "allUsers"]),
  },
  methods: {
    addFriend(friendId) {
      fb.usersCollection
        .doc(this.currentUser.uid)
        .update({
          friends: [...this.userProfile.friends, friendId],
        })
        .then(() => {
          this.$store.dispatch("fetchUserProfile");
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    },
    removeFriend(friendId) {
      const friends = this.userProfile.friends.filter(
        (friend) => !(friend === friendId)
      );
      console.log(friends);
      fb.usersCollection
        .doc(this.currentUser.uid)
        .update({
          friends,
        })
        .then(() => {
          this.$store.dispatch("fetchUserProfile");
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    },
  },
};
</script>
