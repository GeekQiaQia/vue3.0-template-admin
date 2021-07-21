import { Module } from 'vuex';
import Cookies from 'js-cookie';
import appStateTypes from './types';
import RootStateTypes from '../../types';
// create a new Store Modules.
const appModule: Module<appStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false,
    },
    hideHeader:false,
    device: 'desktop',
  },
  mutations: {
    TOGGLE_SIDEBAR: (state: appStateTypes) => {
      // eslint-disable-next-line no-console
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1 as Number);
      } else {
        Cookies.set('sidebarStatus', 0 as Number);
      }
    },
    toggleHeader:(state: appStateTypes)=>{
        state.hideHeader=!state.hideHeader
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR');
    },
    toToggleHeader({commit}){
      commit('setConfig');
    }

  },
  getters: {
    getSidebarState(state:appStateTypes) {
      return state.sidebar.opened;
    },
    getSidebarAnimation(state:appStateTypes) {
      return state.sidebar.withoutAnimation;
    },
    getDeviceState(state:appStateTypes) {
      return state.device;
    },
    getHideHeaderState(state:appStateTypes){
      return state.hideHeader
    }
  },
};
export default appModule;
