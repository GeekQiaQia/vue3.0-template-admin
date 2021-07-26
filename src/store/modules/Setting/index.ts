import { Module } from 'vuex';
import defaultSetting from '@/config';
import settingStateTypes from './types';
import RootStateTypes from '../../types';

const {
  title, fixedHeader, sideBarLogo, showSettings,
} = defaultSetting.default;
// create a new Store Modules.
const settingsModule: Module<settingStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    title,
    fixedHeader,
    sideBarLogo,
    showSettings,
    tableHeight: 600, // 表格宽度
    hideHeader:false,
    lang:'/zh-CN'

  },
  mutations: {
    setTableHeight: (state:settingStateTypes, height) => {
      state.tableHeight = height;
    },
    toggleHeader:(state: settingStateTypes)=>{
      state.hideHeader=!state.hideHeader
    },
    toggleFixedHeader:(state: settingStateTypes)=>{
      state.fixedHeader=!state.fixedHeader
    },
    toggleSidebarLogo:(state: settingStateTypes)=>{
      state.sideBarLogo=!state.sideBarLogo
    },
    toggleLang:(state: settingStateTypes,payload:any)=>{
      state.lang=payload.lang
    },
  },
  actions: {
    toToggleHeader({commit}){
      commit('toggleHeader');
    },
    toToggleFixedHeader({commit}){
      commit('toggleFixedHeader');
    },
    toToggleSidebarLogo({commit}){
      commit('toggleSidebarLogo');
    },
    toToggleLang({commit},payload){
      commit('toggleLang',payload);
    }
  },
  getters: {

    getHideHeaderState(state:settingStateTypes){
      return state.hideHeader
    },
    getFixedHeaderState(state:settingStateTypes){
      return state.fixedHeader
    },
    getSidebarLogoState(state:settingStateTypes){
      return state.sideBarLogo
    },
    getLangState(state:settingStateTypes){
      return state.lang
    }
  },
};
export default settingsModule;
