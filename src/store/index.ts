import { createStore } from "vuex";
import user from "./modules/user";
import friends from "./modules/friends";
import chat from "./modules/chat";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    friends,
    chat,
  },
});
