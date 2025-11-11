/**
 * API 统一管理
 * 集中管理所有 API 接口
 */

import request from '@/utils/request'
import type { LoginParams, LoginResponse, UserInfo, ApiResponse } from '@/types'

/**
 * 认证相关 API
 */
export const authApi = {
  // 用户登录
  login: (data: LoginParams) => {
    return request<ApiResponse<LoginResponse>>({
      url: '/auth/user/login',
      method: 'POST',
      json: true,
      data
    })
  },

  // 用户注册
  register: (data: any) => {
    return request<ApiResponse>({
      url: '/auth/user/register',
      method: 'POST',
      json: true,
      data
    })
  },

  // 获取用户信息
  getUserInfo: () => {
    return request<ApiResponse<UserInfo>>({
      url: '/auth/user/info',
      method: 'GET',
      json: true
    })
  },

  // 退出登录
  logout: () => {
    return request<ApiResponse>({
      url: '/auth/user/logout',
      method: 'POST',
      json: true
    })
  }
}

/**
 * 权限相关 API
 */
export const permissionApi = {
  // 获取权限路由
  getPermissionRoutes: (data: { roleName: string }) => {
    return request<ApiResponse<{ authedRoutes: string[] }>>({
      url: '/auth/permission/routes',
      method: 'POST',
      json: true,
      data
    })
  },

  // 获取权限列表
  getPermissions: () => {
    return request<ApiResponse<{ permissions: string[] }>>({
      url: '/auth/permission/permissions',
      method: 'POST',
      json: true,
      data: {}
    })
  }
}

/**
 * 用户相关 API
 */
export const userApi = {
  // 获取用户列表
  getUserList: (params?: any) => {
    return request({
      url: '/user/list',
      method: 'GET',
      json: true,
      params
    })
  },

  // 创建用户
  createUser: (data: any) => {
    return request({
      url: '/user/create',
      method: 'POST',
      json: true,
      data
    })
  },

  // 更新用户
  updateUser: (id: string | number, data: any) => {
    return request({
      url: `/user/${id}`,
      method: 'PUT',
      json: true,
      data
    })
  },

  // 删除用户
  deleteUser: (id: string | number) => {
    return request({
      url: `/user/${id}`,
      method: 'DELETE',
      json: true
    })
  }
}

/**
 * 角色相关 API
 */
export const roleApi = {
  // 获取角色列表
  getRoleList: () => {
    return request({
      url: '/role/list',
      method: 'GET',
      json: true
    })
  },

  // 创建角色
  createRole: (data: any) => {
    return request({
      url: '/role/create',
      method: 'POST',
      json: true,
      data
    })
  },

  // 更新角色
  updateRole: (id: string | number, data: any) => {
    return request({
      url: `/role/${id}`,
      method: 'PUT',
      json: true,
      data
    })
  },

  // 删除角色
  deleteRole: (id: string | number) => {
    return request({
      url: `/role/${id}`,
      method: 'DELETE',
      json: true
    })
  }
}

/**
 * 菜单相关 API
 */
export const menuApi = {
  // 获取菜单列表
  getMenuList: () => {
    return request({
      url: '/menu/list',
      method: 'GET',
      json: true
    })
  },

  // 创建菜单
  createMenu: (data: any) => {
    return request({
      url: '/menu/create',
      method: 'POST',
      json: true,
      data
    })
  },

  // 更新菜单
  updateMenu: (id: string | number, data: any) => {
    return request({
      url: `/menu/${id}`,
      method: 'PUT',
      json: true,
      data
    })
  },

  // 删除菜单
  deleteMenu: (id: string | number) => {
    return request({
      url: `/menu/${id}`,
      method: 'DELETE',
      json: true
    })
  }
}

// 导出所有 API
export default {
  auth: authApi,
  permission: permissionApi,
  user: userApi,
  role: roleApi,
  menu: menuApi
}
