import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import { userStore, User } from "./providers/user-provider";

// Enter your config here
const firebaseConfig = {
  apiKey: "AIzaSyA0wbzrEHWMQPkjOtIiC3GKvVdZioAxMEk",
  authDomain: "ionvue-chat.firebaseapp.com",
  databaseURL: "https://ionvue-chat-default-rtdb.firebaseio.com",
  projectId: "ionvue-chat",
  storageBucket: "ionvue-chat.appspot.com",
  messagingSenderId: "729986428725",
  appId: "1:729986428725:web:be046c425bdc615af0267c",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

// const chatCollection = db.collection("chat");
// const userCollection = db.collection("user");

// auth.onAuthStateChanged(async (auth) => {
//   if (auth) {
//     const user = (await userCollection.doc(auth.uid).get()).data() as User;
//     userStore.setUser(user);
//     chatCollection.where("createdByID", "==", auth?.uid).onSnapshot((snap) => {
//       userStore.setChatIDs(snap.docs.map((doc) => doc.id));
//     });
//   }
// });

export { db, auth };
