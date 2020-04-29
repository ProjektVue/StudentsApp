<template>
  <div>
    <div id="dashboard">
      <section>
        <b-container>
          <b-row class="mt-4" cols="12">
            <b-col cols="6">
              <b-container v-if="friends.length">
                <b-col v-for="user in friends" :key="user.email">
                  <b-list-group style="max-width: 300px;">
                    <b-list-group-item
                      :active="activeChatUser === user.uid"
                      class="d-flex align-items-center"
                      @click="changeUser(user.uid)"
                    >
                      <b-avatar :src="user.avatar" class="mr-3"></b-avatar>
                      <span class="mr-auto">{{ user.name }}</span>
                    </b-list-group-item>
                  </b-list-group>
                </b-col>
              </b-container>
            </b-col>
            <b-col lg="6" sm="12" style="height: 800px;">
              <Chat
                :participants="participants"
                :myself="myself"
                :messages="messages"
                :chat-title="chatTitle"
                :placeholder="placeholder"
                :colors="colors"
                :border-style="borderStyle"
                :hide-close-button="true"
                :close-button-icon-size="closeButtonIconSize"
                :submit-icon-size="submitIconSize"
                :load-more-messages="
                  toLoad.length > 0 ? loadMoreMessages : null
                "
                :async-mode="asyncMode"
                :scroll-bottom="scrollBottom"
                :display-header="true"
                :send-images="false"
                :profile-picture-config="profilePictureConfig"
                @onMessageSubmit="onMessageSubmit"
              >
              </Chat>
            </b-col>
          </b-row>
        </b-container>
      </section>
    </div>
  </div>
</template>

<script>
import { Chat } from "vue-quick-chat";
import "vue-quick-chat/dist/vue-quick-chat.css";
import { mapState } from "vuex";
const fb = require("../firebaseConfig.js");

export default {
  components: {
    Chat,
  },
  data() {
    return {
      visible: true,
      messages: [],
      chatTitle: "Chat",
      placeholder: "send your message",
      colors: {
        header: {
          bg: "#007bff",
          text: "#fff",
        },
        message: {
          myself: {
            bg: "#fff",
            text: "#bdb8b8",
          },
          others: {
            bg: "#007bff",
            text: "#fff",
          },
          messagesDisplay: {
            bg: "#f7f3f3",
          },
        },
        submitIcon: "#007bff",
      },
      borderStyle: {
        topLeft: "10px",
        topRight: "10px",
        bottomLeft: "10px",
        bottomRight: "10px",
      },
      submitIconSize: 25,
      closeButtonIconSize: "20px",
      asyncMode: false,
      toLoad: [],
      scrollBottom: {
        messageSent: true,
        messageReceived: false,
      },
      displayHeader: true,
      profilePictureConfig: {
        others: true,
        myself: true,
        styles: {
          width: "30px",
          height: "30px",
          borderRadius: "50%",
        },
      },
    };
  },
  computed: {
    ...mapState(["userProfile", "currentUser", "allUsers", "activeChatUser"]),
    friends() {
      return this.allUsers.filter((user) =>
        this.userProfile.friends.includes(user.uid)
      );
    },
    myself() {
      return {
        name: this.userProfile.name,
        id: this.userProfile.uid,
        profilePicture: this.userProfile.avatar,
      };
    },
    participants() {
      const activeUserArr = this.allUsers.filter(
        (user) => user.uid === this.activeChatUser
      );

      if (activeUserArr.length === 0) {
        return [{}];
      }

      const activeUser = activeUserArr[0];
      console.log("USER", activeUser.uid);
      return [
        {
          name: activeUser.name,
          id: activeUser.uid,
          profilePicture: activeUser.avatar,
        },
      ];
    },
  },
  methods: {
    changeUser(userId) {
      this.$store.commit("setActiveChatUser", userId);
    },
    loadMoreMessages(resolve) {
      setTimeout(() => {
        resolve(this.toLoad); //We end the loading state and add the messages
        //Make sure the loaded messages are also added to our local messages copy or they will be lost
        this.messages.unshift(...this.toLoad);
        this.toLoad = [];
      }, 1000);
    },
    onMessageSubmit(message) {
      //   fb.messagesCollection
      //     .doc()
      //     .set({
      //       createdOn: new Date(),
      //       userId: this.currentUser.uid,
      //       place: this.event.place,
      //       date: this.event.date,
      //       description: this.event.description,
      //       time: this.event.time,
      //       participants: 0,
      //       createdBy: this.userProfile.name,
      //       name: this.event.name,
      //     })
      //     .then((ref) => {
      //       this.dismissCountDown = 4;
      //       this.clearEvent();
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      console.log(message);
      this.messages.push(message);
    },
  },
};
</script>
