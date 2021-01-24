<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Welcome</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-row class="ion-align-items-center ion-justify-content-center">
        <ion-col size="auto">
          <div class="ion-text-center ion-margin-top">
            <ion-title>
              Selamat Datang <br />
              di ChatVi
            </ion-title>
          </div>
        </ion-col>
      </ion-row>
      <ion-row class="ion-align-items-center ion-justify-content-center">
        <ion-col size="auto" v-if="!isLoggedIn">
          <ion-button @click="signInwithGoogle">
            <ion-icon slot="start" :icon="logoGoogle"></ion-icon>
            Login with Google
          </ion-button>
        </ion-col>
        <ion-col size="auto" v-else>
          <ion-button color="success" @click="() => router.push('/friends')">
            <ion-icon slot="start" :icon="chatbubble"></ion-icon>
            Go Chat
          </ion-button>
          <ion-button color="danger" @click="signOut">
            <ion-icon slot="start" :icon="logOut"></ion-icon>
            Log Out
          </ion-button>
        </ion-col>
      </ion-row>
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
  IonButton,
  IonIcon,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { logoGoogle, chatbubble, logOut } from "ionicons/icons";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import router from "../router";
import { GooglePlus } from "@ionic-native/google-plus";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonRow,
    IonCol,
  },

  setup() {
    const store = useStore();
    // const router = useRouter();

    const signInwithGoogle = () => {
      GooglePlus.login({
        webClientId:
          "729986428725-iva1btkjrobck7l2rbjr8344pstdhd5s.apps.googleusercontent.com",
      }).then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
      // store.dispatch("SET_USER");
    };

    const signOut = () => {
      store.dispatch("LOGOUT");
    };

    const isLoggedIn = computed(() => store.getters.isLoggedIn);
    return {
      logoGoogle,
      signInwithGoogle,
      chatbubble,
      isLoggedIn,
      router,
      logOut,
      signOut,
    };
  },
});
</script>

<style scoped></style>
