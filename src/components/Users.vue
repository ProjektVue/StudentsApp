<template>
  <div>
    <div id="dashboard">
      <section>
        <b-container v-if="allUsers.length">
          <b-row cols="1" cols-sm="2" cols-md="2" cols-lg="4" align-v="center">
            <b-col v-for="user in allUsers" :key="user.email">
              <h4>
                {{ user.name }}
              </h4>
              <small
                ><cite title="San Francisco, USA"
                  >{{ user.city + " ," + user.country }}
                  <i class="glyphicon glyphicon-map-marker"> </i></cite
              ></small>
              <p>
                <i class="glyphicon glyphicon-envelope"></i>{{ user.email }}
                <br />
                <i class="glyphicon glyphicon-gift"></i>June 02, 1988
              </p>
              <!-- Split button -->
              <div class="btn-group">
                <button type="button" class="btn btn-success">
                  Add friend
                </button>
              </div>
            </b-col>
          </b-row>
        </b-container>
        <div v-else>
          <p class="no-results">There are currently no posts</p>
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
    return {
      post: {
        content: "",
      },
      comment: {
        postId: "",
        userId: "",
        content: "",
        postComments: 0,
      },
      showCommentModal: false,
      showPostModal: false,
      fullPost: {},
      postComments: [],
    };
  },
  computed: {
    ...mapState(["userProfile", "currentUser", "allUsers"]),
  },
  methods: {
    showNewPosts() {
      return;
    },
  },
};
</script>
