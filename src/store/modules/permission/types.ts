import {
  RouteRecordRaw,
} from 'vue-router';

export default interface permissionStateTypes {
    roles:String
    permissions:String[]
    accessRoutes: Array<RouteRecordRaw>
    routes:Array<RouteRecordRaw>
    authedRoutes:String[]
  // eslint-disable-next-line semi
  }
