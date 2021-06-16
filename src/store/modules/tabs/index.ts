import { Module } from 'vuex';
import tabStateTypes from './types';
import RootStateTypes from '../../types';
// create a new Store Modules.
const tabModule: Module<tabStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    tabsOption:[{route:'/home',title:'首页',name: 'home',}],
    currentIndex:'/home',
    breadcrumbList:[]
  },
  mutations: {
    ADD_TAB: (state: tabStateTypes,data:{route:string,name:string,title:string}) => {
      state.tabsOption.push(data);
    },
    DELETE_TAB: (state: tabStateTypes,route:string) => {
      const index=state.tabsOption.findIndex(tab=>tab.route===route)
        state.tabsOption.splice(index,1);
      },
    SET_TAB: (state: tabStateTypes,index:string) => {
        state.currentIndex=index;
    },
    CLEAR_TAB: (state: tabStateTypes) => {
        // 初始化tab
        state.tabsOption=[{route:'/home',title:'首页',name:'home'}];
    },
  },
  actions: {
  },
  getters: {
    getCurrentIndex(state:tabStateTypes) {
      return state.currentIndex;
    },
    getTabsOption(state:tabStateTypes) {
      return state.tabsOption;
    }
  },
};
export default tabModule;
