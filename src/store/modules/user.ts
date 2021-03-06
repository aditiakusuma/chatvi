import firebase from "firebase";
import { User } from "@/models/user";
import { GooglePlus } from "@ionic-native/google-plus";
// import { useRouter } from "vue-router";

// const GOOGLE_AUTH_PROVIDER = new firebase.auth.GoogleAuthProvider();
// const router = useRouter();

export default {
  state: {
    currentUser: null,
    isLoggedIn: false,
  },
  getters: {
    isLoggedIn(state: { isLoggedIn: boolean }) {
      return state.isLoggedIn;
    },
  },
  mutations: {
    SET_USER(state: { currentUser: User | null }, payload: User | null) {
      state.currentUser = payload;
    },
    SET_LOGGED_IN(state: { isLoggedIn: boolean }, payload: boolean) {
      state.isLoggedIn = payload;
    },
  },
  actions: {
    SET_USER({ commit }: any) {
      GooglePlus.login({
        webClientId:
          "729986428725-iva1btkjrobck7l2rbjr8344pstdhd5s.apps.googleusercontent.com",
        offline: true,
      }).then((res) => {
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(
          res.idToken
        );
        firebase
          .auth()
          .signInWithCredential(googleCredential)
          .then((user) => {
            const currentUser = {
              uid: user.user?.uid,
              displayName: user.user?.displayName,
              email: user.user?.email,
              photoURL: user.user?.photoURL,
              phoneNumber: user.user?.phoneNumber,
            };
            firebase
              .firestore()
              .collection("users")
              .doc(user.user?.uid)
              .set(currentUser);

            commit("SET_USER", currentUser);
            commit("SET_LOGGED_IN", true);
            //   router.push("/friends");
          })
          .catch((err) => {
            commit("SET_FRIENDS", {
              showing: true,
              text: err.message,
              color: "error",
            });
          });
      }),
        (err: any) => {
          console.log(err);
        };

      // firebase
      //   .auth()
      //   .signInWithPopup(GOOGLE_AUTH_PROVIDER)
      //   .then((user) => {
      //     const currentUser = {
      //       uid: user.user?.uid,
      //       displayName: user.user?.displayName,
      //       email: user.user?.email,
      //       photoURL: user.user?.photoURL,
      //       phoneNumber: user.user?.phoneNumber,
      //     };

      //     firebase
      //       .firestore()
      //       .collection("users")
      //       .doc(user.user?.uid)
      //       .set(currentUser);

      //     commit("SET_USER", currentUser);
      //     commit("SET_LOGGED_IN", true);
      //     //   router.push("/friends");
      //   })
      //   .catch((err) => {
      //     commit("SET_FRIENDS", {
      //       showing: true,
      //       text: err.message,
      //       color: "error",
      //     });
      //   });
    },
    LOGOUT({ commit }: any) {
      firebase.auth().signOut();
      commit("SET_USER", null);
      commit("SET_LOGGED_IN", false);
    },
  },
};
