/* eslint-disable no-restricted-syntax */
import { Module } from 'vuex';
import router, { constantRoutes, asyncRoutes } from '@/router';
import { RouteRecordRaw } from 'vue-router';
import permissionStateTypes from './types';
import RootStateTypes from '../../types';
import Service from './api'

const roles =  localStorage.getItem('role')||'';
// create a new Store Modules.
const permissionModule: Module<permissionStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    roles, // 用户包含的角色,
    permissions:[], // 用户指定局部操作权限
    accessRoutes: constantRoutes, // 可访问路由集合
    routes:constantRoutes, // 所有路由集合
    authedRoutes:[]
  },
  mutations: {
    setRoles: (state: permissionStateTypes, {roleName}) => {
      state.roles = roleName;
      console.log(state.roles);
    },
    setAccessRoutes: (state:permissionStateTypes, routes) => {
      state.accessRoutes = constantRoutes.concat(routes);
    },
    setRoutes: (state:permissionStateTypes, routes) => {
      state.routes = constantRoutes.concat(routes);
    },
    setAuthedRoutes:(state:permissionStateTypes,authedRoutes:string[])=>{
      state.authedRoutes = authedRoutes
      localStorage.setItem('authedRoutes',JSON.stringify(authedRoutes));

    },
    setPermissions:(state:permissionStateTypes,permissions:string[])=>{
      state.permissions = permissions
    }
  },
  actions: {
    // 异步接口请求，动态添加路由
     getPermissonRoutes({ commit },payload:any) {
      // api request
      const data={
        roleName:payload.roleName
      }
      // 后端根据角色名称，查询授权菜单
      Service.postAuthPermission(data).then(res=>{
        const {authedRoutes}=res.data;
        commit('setAuthedRoutes', authedRoutes);
               // 过滤只显示授权菜单
        const accessedRoutes: RouteRecordRaw[]=[]

        for(const path of authedRoutes){
          for (const item of asyncRoutes){
            if(item.path===path){

              accessedRoutes.push(item);
            }
          }
        }
        // 动态添加路由  vue-router4.x 暂时没有addRoutes
        router.isReady().then(()=>{
          accessedRoutes.forEach((route: RouteRecordRaw)=>{
            const routeName: any = route.name;
            if (!router.hasRoute(routeName)) {
              router.addRoute(route);
            }
          });
          router.options.routes = constantRoutes.concat(asyncRoutes);
          console.log(router);
          commit('setAccessRoutes', accessedRoutes);
        });
      })
    },
    getPermissions({ commit }){
        // 后端根据角色名称，查询授权菜单
        Service.postPermissions({}).then(res=>{
          const {permissions}=res.data;
          commit('setPermissions',permissions);
        })

    },

    getRoutes({ commit }) {
      // api request
           // 动态添加路由  vue-router4.x 暂时没有addRoutes
           if(localStorage.getItem("authedRoutes")){
            const authedRoutes=JSON.parse(localStorage.getItem("authedRoutes") as string);
            const accessedRoutes: RouteRecordRaw[]=[]
            for(const path of authedRoutes){
              for (const item of asyncRoutes){
                if(item.path===path){
                  accessedRoutes.push(item);
                }
              }
            }
            accessedRoutes.forEach((route: RouteRecordRaw)=>{
              const routeName: any = route.name;
              if (!router.hasRoute(routeName)) {
                router.addRoute(route);
              }
            });
           }

      commit('setRoutes', asyncRoutes);
    },
      // 授权角色
      getPermissonRoles({ commit },payload:any) {
        // api request
        localStorage.setItem('role',payload.roleName);
        commit('setRoles',payload);
      },

  },
  getters: {
    getAccessRoutes(state:permissionStateTypes) {
      return state.routes;
    },
    authedRoutes(state:permissionStateTypes){
      return state.authedRoutes;
    },
    getRoles(state:permissionStateTypes){
      return state.roles;
    },
    getPermission(state:permissionStateTypes){
      return state.permissions;

    }

  },
};
export default permissionModule;
