<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { auth } from "@/firebase";
import { useStore } from "vuex";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    const store = useStore();
    auth.onAuthStateChanged((user) => {
      if (user) {
        const currentUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
        };
        store.commit("SET_USER", currentUser);
        store.commit("SET_LOGGED_IN", true);
        store.dispatch("SET_CHAT_USERS");
      }
    });
  },
});
</script>
