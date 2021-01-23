import { Friends } from "@/models/friends";

export default {
  state: {
    friends: {},
  },
  mutations: {
    SET_FRIENDS(state: { friends: Friends }, payload: Friends) {
      state.friends = payload;
    },
  },
  actions: {
    SET_FRIENDS({ commit }: any, payload: Friends) {
      commit("SET_FRIENDS", payload);
    },
  },
};
