import { Module } from 'vuex';
import messageStateTypes from './types';
import RootStateTypes from '../../types';
// create a new Store Modules.
const messageModule: Module<messageStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    messageNum:5
  },
  mutations: {
    UPDATE_MESSAGE: (state:messageStateTypes,payload) => {
     state.messageNum-=payload.num;
    },
  },
  actions: {
    updateMessageNum({ commit }) {
      commit('UPDATE_MESSAGE',{num:1});
    },

  },
  getters: {
    getMessageNum(state:messageStateTypes) {
      return state.messageNum
    },
  },
};
export default messageModule;
