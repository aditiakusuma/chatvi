<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Friend List</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list>
        <div v-for="(user, index) in store.state.chat.chatUsers" :key="index">
          <ion-item
            button
            @click="getCurrentChat(user)"
            v-if="user.uid !== store.state.user.currentUser.uid"
          >
            <ion-avatar slot="start">
              <img :src="user.photoURL" />
            </ion-avatar>
            <ion-label class="ion-text-wrap">
              <ion-text color="primary">
                <h3>{{ user.displayName }}</h3>
              </ion-text>
              <ion-text color="medium">
                <p>Hey there, I'm using Whatsa...</p>
              </ion-text>
            </ion-label>
          </ion-item>
        </div>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonLabel,
  IonText,
  IonAvatar,
  IonList,
  IonItem,
  IonBackButton,
  //   IonRow,
  //   IonCol,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonLabel,
    IonText,
    IonAvatar,
    IonList,
    IonItem,
    IonBackButton,
    // IonIcon,
    // IonRow,
    // IonCol,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const getCurrentChat = async (user: any) => {
      store.dispatch("SET_CURRENT_CHAT", user);

      const conversationId =
        store.state.user.currentUser.uid > store.state.chat.currentChat.uid
          ? store.state.user.currentUser.uid + store.state.chat.currentChat.uid
          : store.state.chat.currentChat.uid + store.state.user.currentUser.uid;

      store.dispatch("SET_CHAT_MESSAGES", conversationId);
      router.push(`/chat`);
    };
    return { store, getCurrentChat };
  },
});
</script>

<style scoped></style>
