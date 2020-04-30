<template>
  <div>
    <div id="dashboard">
      <section>
        <b-container v-if="friendsProfile.length">
          <b-row class="mt-4" cols="12">
            <b-col cols="6">
              <b-container>
                <b-col v-for="user in friendsProfile" :key="user.email">
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
                :submit-icon-size="submitIconSize"
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
        <b-container v-else class="mt-4">
          Add new friend to begin chat
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
        messageReceived: true,
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
    ...mapState([
      "userProfile",
      "currentUser",
      "allUsers",
      "activeChatUser",
      "friends",
      "currentConversation",
    ]),
    friendsProfile() {
      return this.allUsers.filter((user) => this.friends.includes(user.uid));
    },
    messages() {
      const currentMessages = this.currentConversation.messages || [];
      const transformedMessages = [];

      currentMessages.forEach((message) => {
        transformedMessages.push({
          content: message.content,
          myself: message.participantId === this.currentUser.uid,
          participantId: message.participantId,
          timestamp: JSON.parse(message.timestamp),
          type: message.type,
        });
      });
      return transformedMessages;
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
      this.$store.dispatch("fetchConversations");
    },
    onMessageSubmit(message) {
      fb.conversationsCollection
        .doc(this.currentConversation.id)
        .update({
          participants: this.currentConversation.participants,
          messages: [
            ...this.currentConversation.messages,
            {
              content: message.content,
              participantId: this.currentUser.uid,
              timestamp: JSON.stringify(message.timestamp),
              type: message.type,
            },
          ],
        })
        .then((ref) => {
          this.$store.dispatch("fetchConversations");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
