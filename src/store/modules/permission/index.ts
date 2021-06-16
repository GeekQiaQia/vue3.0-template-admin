import { Module } from 'vuex';
import router, { constantRoutes, asyncRoutes } from '@/router';
import permissionStateTypes from './types';
import RootStateTypes from '../../types';
// create a new Store Modules.
const permissionModule: Module<permissionStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    roles: [], // 用户包含的权限集合
    routes: constantRoutes, // 所有路由集合
  },
  mutations: {
    SET_ROLES: (state: permissionStateTypes, roles) => {
      state.roles = roles;
    },
    setRoutes: (state:permissionStateTypes, routes) => {
      state.routes = constantRoutes.concat(routes);
    },
  },
  actions: {
    // 暂且放过异步接口请求，动态添加路由
    getPermissonRoutes({ commit }) {
      // api request
      const accessedRoutes = asyncRoutes;
      // 动态添加路由  vue-router4.x 暂时没有addRoutes
      // eslint-disable-next-line no-restricted-syntax
      for (const item of accessedRoutes) {
        router.addRoute(item);
      }
      router.options.routes = constantRoutes.concat(asyncRoutes);
      commit('setRoutes', accessedRoutes);
    },

  },
  getters: {
    getAccessRoutes(state:permissionStateTypes) {
      return state.routes;
    },

  },
};
export default permissionModule;
