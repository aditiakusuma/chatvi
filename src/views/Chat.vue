<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home"></ion-back-button>
          <ion-avatar style="width:40px; height:40px;">
            <img :src="currentChat.photoURL"
          /></ion-avatar>

          <div class="profile-chat">
            <div>
              {{ currentChat.displayName }}
            </div>
            <div>
              <small>{{ message }}</small>
            </div>
          </div>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="store.state.chat.chatMessages.length === 0">
        <ion-text>
          You have no conversation with {{ currentChat.displayName }}
          . Initiate the conversation by sending a message.
        </ion-text>
      </div>
      <div v-else>
        <p
          v-for="(message, index) in store.state.chat.chatMessages"
          :key="index"
          :class="
            message.senderId === store.state.user.currentUser.uid
              ? 'chat__sender chat__message'
              : 'chat__reciever chat__message'
          "
        >
          {{ message.message }}
          <span class="chat__timestamp">{{ message.time }}</span>
        </p>
      </div>
    </ion-content>
    <ion-footer class="ion-no-border">
      <div class="input-message">
        <ion-row class="ion-no-padding ion-align-items-center">
          <ion-col size="10" class="ion-no-padding">
            <div>
              <ion-input
                placeholder="Type message..."
                class="ion-no-padding"
                v-model="message"
              ></ion-input>
            </div>
          </ion-col>
          <ion-col
            size="auto"
            class="ion-no-padding"
            style="margin-left: 15px;"
          >
            <ion-button fill="clear" class="ion-no-padding" @click="submit">
              <ion-icon slot="" :icon="send"></ion-icon>
            </ion-button>
          </ion-col>
        </ion-row>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  //   IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonRow,
  IonCol,
  IonInput,
  IonText,
  IonFooter,
  IonBackButton,
  IonButtons,
  IonAvatar,
} from "@ionic/vue";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { send } from "ionicons/icons";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    // IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonRow,
    IonCol,
    IonInput,
    IonText,
    IonFooter,
    IonBackButton,
    IonButtons,
    IonAvatar,
  },

  setup() {
    const store = useStore();
    const currentChat = computed(() => store.state.chat.currentChat);
    const chatMessages = computed(() => store.state.chat.chatMessages);

    const message = ref("");

    const submit = () => {
      if (message.value === null || message.value === " ") {
        return;
      }
      const now = new Date();
      let hours = now.getHours();
      let minutes: string | number = now.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      const strTime = hours + ":" + minutes + " " + ampm;
      const chat = {
        id: +new Date(),
        date: now.toISOString().substr(0, 10),
        time: strTime,
        timestamp: +new Date(),
        message: message.value,
        senderId: store.state.user.currentUser.uid,
        receiverId: store.state.chat.currentChat.uid,
      };
      store.dispatch("UPDATE_CHAT_MESSAGES", {
        chat: chat,
        id: store.state.chat.conversationId,
      });
      message.value = "";
    };
    return { store, currentChat, send, chatMessages, submit, message };
  },
});
</script>

<style scoped>
.profile-chat {
  line-height: 95%;
  margin-left: 10px;
}

.input-message {
  border: 1px solid grey;
  border-radius: 30px;
  padding-left: 12px;
  margin: 2px 12px;
  background-color: white;
}

.chat__message {
  position: relative;
  font-size: 16px;
  padding: 10px;
  border-radius: 10px;
  background-color: #ffffff;
  width: fit-content;
  margin-bottom: 30px;
}

.chat__sender:after {
  content: "";
  position: absolute;
  margin-top: -6px;
  margin-left: -5px;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid #dcf8c6 !important;
  transform: rotate(-42deg);
  right: -10px;
  top: 4px;
}

.chat__reciever:after {
  content: "";
  position: absolute;
  margin-top: -6px;
  margin-left: -5px;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid #ffffff !important;
  transform: rotate(42deg);
  left: -6px;
  top: 4px;
}

.chat__sender {
  margin-left: auto;
  background-color: #dcf8c6;
}

.chat__timestamp {
  margin-left: 10px;
  font-size: xx-small;
}

ion-content {
  --background: var(--ion-color-medium);
}
</style>
