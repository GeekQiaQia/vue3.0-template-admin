/**
 * 通用 TypeScript 类型定义
 */

/** 国际化文本类型 */
export interface I18nText {
  '/zh-CN': string
  '/en-US': string
}

/** 路由元信息类型 */
export interface RouteMeta {
  title: I18nText
  icon?: string
  hidden?: boolean
  hiddenTab?: boolean
  breadcrumb?: boolean
  [key: string]: any
}

/** API 响应基础类型 */
export interface ApiResponse<T = any> {
  status: number
  data: T
  success: boolean
  message: string
  code?: string
}

/** 分页参数类型 */
export interface PaginationParams {
  page: number
  pageSize: number
  total?: number
}

/** 分页响应类型 */
export interface PaginationResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

/** 用户信息类型 */
export interface UserInfo {
  id: string | number
  username: string
  email?: string
  avatar?: string
  roleName: string
  roles?: string[]
  permissions?: string[]
}

/** 登录参数类型 */
export interface LoginParams {
  email: string
  password: string
}

/** 登录响应类型 */
export interface LoginResponse {
  accessToken: string
  refreshToken?: string
  userInfo: UserInfo
}

/**
 * Table formatter function type
 * @param row - Table row data
 * @param column - Column configuration
 * @param cellValue - Cell value
 * @param index - Row index
 */
export type TableFormatter = (row?: any, column?: any, cellValue?: any, index?: number) => string | number

/** 表格列配置类型 */
export interface TableColumn {
  prop: string
  label: string | I18nText
  width?: string | number
  minWidth?: string | number
  align?: 'left' | 'center' | 'right'
  fixed?: boolean | 'left' | 'right'
  sortable?: boolean
  formatter?: TableFormatter
  [key: string]: any
}

/**
 * Form validator function type
 * @param rule - Validation rule
 * @param value - Field value
 * @param callback - Validation callback
 */
export type FormValidator = (rule?: any, value?: any, callback?: Function) => void

/** 表单规则类型 */
export interface FormRule {
  required?: boolean
  message?: string
  trigger?: string | string[]
  min?: number
  max?: number
  type?: string
  validator?: FormValidator
  [key: string]: any
}

/** 表单规则集合类型 */
export type FormRules = Record<string, FormRule[]>

/** 菜单项类型 */
export interface MenuItem {
  id: string | number
  name: string
  path: string
  component?: string
  icon?: string
  children?: MenuItem[]
  meta?: RouteMeta
  [key: string]: any
}

/** Tab 选项类型 */
export interface TabOption {
  route: string
  title: I18nText | string
  name?: string
  closable?: boolean
}

/** 权限配置类型 */
export interface Permission {
  id: string | number
  name: string
  code: string
  description?: string
}

/** 角色配置类型 */
export interface Role {
  id: string | number
  name: string
  roleName: string
  permissions?: string[]
  description?: string
}
